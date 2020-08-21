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