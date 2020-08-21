//rule for ingame, p = 15998
//@author xsbchen@tencent.com
;(function(IPAY, INFO, LIB, $) {
    if (IPAY.getParam('p') !== '15998' || $('#ingame_info').length) return;

    var targetUinFieldLabel = '充值到：',
        userInfoTmpl = '<div id="ingame_info" class="pay-info"><div class="bu-logo"><img alt="QQ头像" src="../../../../../../../../../../../../my.pay.qq.com/cgi-bin/account/get_qq_face.cgi-uin={0}"/*tpa=https://my.pay.qq.com/cgi-bin/account/get_qq_face.cgi?uin={0}*//></div><p>{0}</p><a id="changeUin" href="###">切换账号</a></div>';

    INFO.langs.game.form.target_uin_field_label = targetUinFieldLabel;

    $('#target_uin_field_label').text(targetUinFieldLabel);
    $('div.bu-logo').remove();
    $('div.pay-info').before(LIB.stringFormat(userInfoTmpl, IPAY.uin));
    $('#changeUin').click(function() {
		$('#cft_template,#kj_template,#cftCB_template,#kj_kj_template,#kj_bank_template').hide();
        IPAY.login(null, true);
    });
    $('#changeUin').hide();
})(IPAY, INFO, LIB, jQuery);//rule for loldq
//@author xsbchen@tencent.com

;(function (IPAY, INFO) {
    var platform = IPAY.getParam('p');

    // 只在pay上显示成功充值后广告
    // 游戏内嵌
    if (platform === '15998') {

        ABTest.after(IPAY, 'onComplete', function (type) {
            if (this.data.code === '-loldq' && type === 'succeed') {
                //$('#result_success').append('<div class="ad-place"><img src="../../../../../../../../../../../../imgcache.gtimg.cn/bossweb/ipay/images/pic/game_lol_20160422.jpg"/*tpa=http://imgcache.gtimg.cn/bossweb/ipay/images/pic/game_lol_20160422.jpg*//></div>');
            }
        });

        // 去掉充值回流中的银行卡渠道
        var channels = INFO.services.qqacct_save.channels.minipay;

        function removeBankChannelCallback(ch) {
            return ch === 'bank' ? null : ch;
        }

        channels.self = $.map(channels.self, removeBankChannelCallback);
        channels.send = $.map(channels.send, removeBankChannelCallback);
    }

    // ABTest.before(IPAY, "selectChannel", function (channel, cb) {
    //     return [channel, function () {
    //         cb && cb()
    //         if (channel == "weixin") {
    //             $('#wxpay1 .img-rwm img').attr("src", "../../../../../../../../../../../../imgcache.gtimg.cn/bossweb/h5pay/images/loldq-recharge-qr.png"/*tpa=https://imgcache.gtimg.cn/bossweb/h5pay/images/loldq-recharge-qr.png*/)
    //         }
    //         else if (channel == "qqwallet") {
    //             $(".ios-qrcode-cont__img").attr("src", "../../../../../../../../../../../../imgcache.gtimg.cn/bossweb/h5pay/images/loldq-recharge-qr-mqq.png"/*tpa=https://imgcache.gtimg.cn/bossweb/h5pay/images/loldq-recharge-qr-mqq.png*/)
    //         }
    //     }]
    // })
})(IPAY, INFO);