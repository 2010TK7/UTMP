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
})(IPAY, INFO, LIB, jQuery);//TODO:fix login target
$('#changeUin').hide();
;/*  |xGv00|500746b1560973568f21349a59fd7792 */