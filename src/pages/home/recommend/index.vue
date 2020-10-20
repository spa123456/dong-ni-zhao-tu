<template>
  <scroll-view scroll-y @scrolltolower="scrolltolower()" class="recommend">
    <!-- 推荐模块 -->
    <view class="rec-recommend">
      <view
        class="rec-recommend-item"
        v-for="item in recommendList"
        :key="item.id"
      >
        <img mode="widthFix" :src="item.thumb" alt="" srcset="" />
      </view>
    </view>
    <!-- 月份模块 -->
    <view class="month">
      <view class="month-title">
        <view class="month-title-left">
          <!-- ri -->
          <view class="month-title-date">{{ monthData.DD }} / </view>
          <!-- yue -->
          <view class="month-title-month"> {{ monthData.MM }}月</view>
          <!-- title -->
          <view class="month-title-title">{{ monthData.title }}</view>
        </view>
        <view class="month-title-right">
          更多>
        </view>
      </view>
      <view class="month-content">
        <view
          class="month-content-item"
          v-for="item in monthData.items"
          :key="item.id"
        >
          <img
            mode="aspectFill"
            :src="item.thumb + item.rule.replace('$<Height>', 200)"
            alt=""
            srcset=""
          />
        </view>
      </view>
    </view>
    <!-- 热门模块 -->
    <view class="hots">
      <view class="hots-title"> 热门 </view>
      <view class="hots-content">
        <!-- 图片 -->
        <view
          class="hots-content-items"
          v-for="item in hotDataList"
          :key="item.id"
        >
          <img mode="widthFix" :src="item.thumb" alt="" srcset="" />
        </view>
      </view>
    </view>
  </scroll-view>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      requestData: {
        limit: 10, //显示多少条
        order: "hot", //关键字
        skip: 0, //跳过多少条
      },
      recommendList: [],
      monthData: {
        items: [],
        title: "",
        MM: 0,
        DD: 1,
      },
      hotDataList: [], //热门数据
    };
  },
  mounted() {
    this.getHomeDataList();
  },
  methods: {
    /*
     **  @description 请求数据 http://157.122.54.189:9088
     **  @param {}
     **  @return
     **  @author shipingan
     */
    getHomeDataList() {
      this.$request({
        url: `/api/image/v3/homepage/vertical?limit`,
        // url: `http://157.122.54.189:9088/image/v3/homepage/vertical?limit`,
        data: this.requestData,
      }).then((res) => {
        this.recommendList = res.res.homepage[1].items;
        this.monthData.items = res.res.homepage[2].items;
        this.monthData.title = res.res.homepage[2].title;
        let times = res.res.homepage[2].stime; //时间戳
        this.monthData.MM = moment(times).format("MM");
        this.monthData.DD = moment(times).format("DD");

        this.hotDataList = [...this.hotDataList,...res.res.vertical];
      });
    },
    /*
    **  @description 滚动事件
    **  @param {} 
    **  @return 
    **  @author shipingan
    */
    scrolltolower(){
      console.log("到底了");
      this.requestData.skip+=this.requestData.limit
      this.getHomeDataList()
    }
  },
};
</script>
<style lang="scss" scoped>
.recommend {
  //推荐
  height: calc(100vh - 37px);
  .rec-recommend {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10rpx;
    .rec-recommend-item {
      border: 3px solid #fff;
      box-sizing: border-box;
      width: 50%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  // 月份
  .month {
    margin: 20rpx 0;
    .month-title {
      display: flex;
      justify-content: space-between;
      .month-title-left {
        display: flex;
        .month-title-date {
          padding-left: 20rpx;
          color: $uni-text-color-main;
        }
        .month-title-month {
          padding: 0 10rpx;
          color: $uni-text-color-main;
          font-size: 28rpx;
          line-height: 60rpx;
        }
        .month-title-title {
          font-size: 32rpx;
          color: #aaa;
        }
      }
      .month-title-right {
        font-size: 28rpx;
        padding-right: 20rpx;
        line-height: 60rpx;
      }
    }
    .month-content {
      display: flex;
      flex-wrap: wrap;
      .month-content-item {
        width: 33.33%;
        // height: 400rpx;
        border: 3px solid #fff;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 360rpx;
          object-fit: cover;
        }
      }
    }
  }
  // 热门
  .hots {
    .hots-title {
      margin: 20rpx 0;
      border-left: 20rpx solid #e474ab;
    }
    .hots-content {
      display: flex;
      flex-wrap: wrap;
      .hots-content-items {
        width: 50%;
        border: 4rpx solid #fff;
        box-sizing: border-box;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
