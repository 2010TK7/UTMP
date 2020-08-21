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
})(IPAY, INFO, LIB, jQuery);//rule for avavip
//@author xsbchen@tencent.com

;
(function (ABTest, IPAY) {
    if (IPAY.getParam('p') !== '15998') {
		
		if (IPAY.getParam('actid')==='MP20131202162637808_02') {//avavip 永久开通活动
			IPAY.data.price = 588/IPAY.amount;
		}
		
		return;
	}

    var callback = function () {
        $('#ext_actions').html('<p><img src="../../../../../../../../../../../bossweb/ipay/images/public/icons/avad/logo_s.png"/*tpa=https://imgcache.qq.com/bossweb/ipay/images/public/icons/avad/logo_s.png*//><a href="' + location.href.replace('avavip', 'avad') + '">充值AVA点券</a></p><p class="current"><img src="../../../../../../../../../../../bossweb/ipay/images/public/icons/avavip/logo_s.png"/*tpa=https://imgcache.qq.com/bossweb/ipay/images/public/icons/avavip/logo_s.png*//><a href="javascript:void(0);">开通AVA会员</a></p>');
		$('#left_sidebar>.wrap-padding').hide();
		$('#ext_actions').removeClass('box-function').addClass('box-function-tap');
        $('#target_uin_field_label').text('开通帐号：');
        $('#send_link,#pay_mode_field').remove();
        $('#target_uin_input_field').show();
    };

    ABTest.after(IPAY, '_updateUI', callback);

    callback();
})(ABTest, IPAY);