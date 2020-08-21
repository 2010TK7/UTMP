//rule for ingame, p = 15998
//@author xsbchen@tencent.com
;(function(IPAY, INFO, LIB, $) {
    if (IPAY.getParam('p') !== '15998' || $('#ingame_info').length) return;

    var targetUinFieldLabel = '充值到：',
        userInfoTmpl = '<div id="ingame_info" class="pay-info"><div class="bu-logo"><img alt="QQ头像" src="../../../../../../../../../../../../../../../../../my.pay.qq.com/cgi-bin/account/get_qq_face.cgi-uin={0}"/*tpa=https://my.pay.qq.com/cgi-bin/account/get_qq_face.cgi?uin={0}*//></div><p>{0}</p><a id="changeUin" href="###">切换账号</a></div>';

    INFO.langs.game.form.target_uin_field_label = targetUinFieldLabel;

    $('#target_uin_field_label').text(targetUinFieldLabel);
    $('div.bu-logo').remove();
    $('div.pay-info').before(LIB.stringFormat(userInfoTmpl, IPAY.uin));
    $('#changeUin').click(function() {
		$('#cft_template,#kj_template,#cftCB_template,#kj_kj_template,#kj_bank_template').hide();
        IPAY.login(null, true);
    });
    $('#changeUin').hide();
})(IPAY, INFO, LIB, jQuery);;(function(IPAY,LIB,$){if(IPAY.getParam('p')!=='15998')return;var timer=null,timeout=300;$('#amount_input').focus(function(){if(timer)clearTimeout(timer);var $this=$(this);timer=setTimeout(function(){$this.keyup();timer=setTimeout(arguments.callee,timeout);},timeout);}).blur(function(){if(timer)clearTimeout(timer);});})(IPAY,LIB,jQuery);/*  |xGv00|f4716102fea0104b3e8b58af8e9cf9ed *///rule for czjrby
//@author xsbchen@tencent.com

;
(function (ABTest, IPAY) {
    if (IPAY.getParam('p') !== '15998') return;

    var callback = function () {
        $('#ext_actions').html('<p><img src="../../../../../../../../../../../../../../../../bossweb/ipay/images/public/icons/nbakdq/logo_s.png"/*tpa=https://imgcache.qq.com/bossweb/ipay/images/public/icons/nbakdq/logo_s.png*//><a href="' + location.href.replace('czjrby', 'nbakdq') + '">NBA2KOL点券</a></p><p class="current"><img src="../../../../../../../../../../../../../../../../bossweb/ipay/images/public/icons/czjrby/logo_s.png"/*tpa=https://imgcache.qq.com/bossweb/ipay/images/public/icons/czjrby/logo_s.png*//><a href="javascript:void(0);">NBA2KOL全明星</a></p>');
		$('#left_sidebar>.wrap-padding').hide();
		$('#ext_actions').removeClass('box-function').addClass('box-function-tap');
        $('#target_uin_field_label').text('开通帐号：');
        $('#send_link,#pay_mode_field').remove();
        $('#target_uin_input_field').show();
    };

    ABTest.after(IPAY, '_updateUI', callback);

    callback();
})(ABTest, IPAY);