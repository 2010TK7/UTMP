/**
 * Created by shaynegui on 2017/6/14.
 */
;
(function (ABTest, IPAY, LIB, W, INFO) {
    location.href = "https://pay.qq.com/webpay/index.shtml?c=qqyfsc&aid=" + IPAY.getParam("aid")
})(ABTest, IPAY, LIB, window, INFO);

