//rule for xxzxgp
//@author xsbchen@tencent.com

;(function (ABTest, IPAY) {
    if (IPAY.scene === 'pay') {
        // 蓝钻豪华版特殊逻辑，检查个账余额，跳转到蓝钻
        IPAY.checkBalance(function (data) {
            var _balance = !~~data.resultcode ? (parseFloat(data.resultinfo.qb_balance) * 10 + parseFloat(data.resultinfo.qd_balance)) : 0;
            if (LIB.getUrlParam('c').toLowerCase() == 'xxzxgp,xxqgame' && _balance >= 100 && _balance < 150) {
                location.href = location.href.replace('xxzxgp,xxqgame', 'xxqgame,xxzxgp');
            }
        });

        var lastCode = null;

        // 蓝钻豪华版增加索要按钮，跳到蓝钻的索要页面
        ABTest.addRule({
            id: 'xxzxgp_ask',
            autoRun: true,
            condition: 'IPAY.data.code==="xxzxgp"',
            action: function () {
                $('#a_ask_link').attr('href', '//pay.qq.com/service/ask_v3.shtml?sid=xxqgame&c=' + IPAY.getParam('c') + '&aid=ipay.qqgame&ADTAG=pay.service.ipay.qqgame').parent().show();
            }
        });

        // 蓝钻豪华版展示渠道与蓝钻一样
        ABTest.addRule({
            id: 'xxzxgp_channels',
            autoRun: true,
            condition: function () {
                var _serviceList = IPAY.serviceList;
                return IPAY.data.code === 'xxzxgp' && IPAY.pay_for === 'self' && _serviceList && $.inArray('xxqgame', _serviceList) !== -1;
            },
            action: function () {
                // 当前为豪华版且给自己开通时，重置渠道为蓝钻给自己开通的渠道
                IPAY.channels = INFO.services.xxqgame.channels.pay.self;
            }
        });

        // 重建渠道列表前执行规则：蓝钻豪华版展示渠道与蓝钻一样
        ABTest.before(IPAY, 'rebuildChannelList', function () {
            ABTest.run('xxzxgp_channels');
        });

        // 选择渠道前，如果当前为蓝钻豪华版且不支持当前渠道，则重置为推荐渠道
        ABTest.before(IPAY, 'selectChannel', function (_channel) {
            if (IPAY.data.code === 'xxzxgp' && typeof _channel !== 'undefined' && $.inArray(_channel, INFO.services.xxzxgp.channels.pay.self) === -1) {

                if (lastCode === 'xxqgame') {
                    lastCode = null;
                    return [IPAY.recommend_channel];
                } else {
                    // 对于豪华版不支持的渠道自动切换到蓝钻
                    IPAY.selectService('xxqgame', true);
                    IPAY.rebuildChannelList();
                    IPAY.selectChannel(_channel);
                }
            }
        });

        // 选择业务前保存当前业务代码
        ABTest.before(IPAY, 'selectService', function () {
            lastCode = IPAY.data.code;
        });

        // 选择业务前执行规则：蓝钻豪华版增加索要按钮，跳到蓝钻的索要页面
        ABTest.after(IPAY, 'selectService', function () {
            ABTest.run('xxzxgp_ask');
        });
    }
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

    ABTest.before(IPAY, "rebuildChannelList", function () {
        if (IPAY.data.code.toLowerCase().replace("-", "") == "xxzxgp") {
            disableWeixinChannel()
        }
    })
    disableWeixinChannel()

})(ABTest, IPAY);