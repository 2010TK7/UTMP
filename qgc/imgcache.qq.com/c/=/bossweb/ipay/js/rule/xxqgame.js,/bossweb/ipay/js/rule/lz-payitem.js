//rule for ltmclub
//@author xsbchen@tencent.com

;(function (ABTest, IPAY, LIB) {

    function disableWeixinChannel() {

        if (IPAY.getParam("token")) {
            var newChannels = []
            $.each(IPAY.channels, function (i, channel) {
                if (channel != "weixin") {
                    newChannels.push(channel)
                }
            })

            IPAY.channels = newChannels
        }
    }

    ABTest.after(IPAY, "selectService", function (service) {
        if (service.replace("-", "") == "xxqgame") {
            disableWeixinChannel()
        }
    })

    ABTest.before(IPAY, "rebuildChannelList", function () {
        if (IPAY.data.code.toLowerCase().replace("-", "") == "xxqgame") {
            disableWeixinChannel()
        }
    })
    disableWeixinChannel()
})(ABTest, IPAY, LIB);
ABTest.before(IPAY,'submit',function(opts){opts=opts||{};opts.data=opts.data||{};opts.data.pay_item='paycount='+(IPAY.amount*IPAY.data.price*100);opts.data.pay_info=' ';return[opts];});/*  |xGv00|cc9dd9424c236ad172b4f22668ce30f9 */