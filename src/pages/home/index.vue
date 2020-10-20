<template>
  <view class="home">
    <view class="home-header">
      <view class="home-header-title">
        <uni-segmented-control
          :current="current"
          :values="items.map((k) => k.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#e474ab"
        ></uni-segmented-control>
      </view>
      <icon
        class="home-header-icon"
        type="search"
        size="20"
        color="#e474ab"
      ></icon>
      <!-- <view class="home-hedaer-btn">
        <span>🔍</span>
      </view> -->
    </view>
    <view class="home-content">
      <view v-if="current === 0">
        <recommend></recommend>
      </view>
      <view v-if="current === 1">
        <classify></classify>
      </view>
      <view v-if="current === 2">
        <news></news>
      </view>
      <view v-if="current === 3">
        <album></album>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import album from "./album";
import classify from "./classify";
import news from "./news";
import recommend from "./recommend";
export default {
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      current: 0,
    };
  },
  components: {
    uniSegmentedControl,
    album,
    classify,
    news,
    recommend,
  },
  onLoad() {},
  methods: {
    onClickItem(e) {
      console.log(e);
      uni.setNavigationBarTitle({
        title: this.items[e.currentIndex].title,
      });
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .home-header {
    display: flex;
    position: relative;
    .home-header-title {
      width: 60%;
      margin: 0 auto;
    }
    // .home-header-btn {
    //  /deep/ span {
    //     padding-right: 10px !important;
    //   }
    // }
    .home-header-icon {
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .home-content {
  }
}
</style>
