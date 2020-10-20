export default (options) => {
    uni.showToast({
        title: '请求中...',
        icon: "loading"
    })
    return new Promise((reslove, reject) => {
        uni.request({
            ...options,
            success: (reslut) => {
                reslove(reslut.data)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                uni.hideToast()
            }
        })
    })
}