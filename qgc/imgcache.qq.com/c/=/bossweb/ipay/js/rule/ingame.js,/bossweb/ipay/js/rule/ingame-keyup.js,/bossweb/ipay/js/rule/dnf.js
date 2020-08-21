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
})(IPAY, INFO, LIB, jQuery);;(function(IPAY,LIB,$){if(IPAY.getParam('p')!=='15998')return;var timer=null,timeout=300;$('#amount_input').focus(function(){if(timer)clearTimeout(timer);var $this=$(this);timer=setTimeout(function(){$this.keyup();timer=setTimeout(arguments.callee,timeout);},timeout);}).blur(function(){if(timer)clearTimeout(timer);});})(IPAY,LIB,jQuery);/*  |xGv00|f4716102fea0104b3e8b58af8e9cf9ed */;(function(ABTest,IPAY,LIB){if(IPAY.getParam('p')==='15998'){ABTest.after(IPAY,'_setTargetUinInputEditable',function(editable){editable&&setTimeout(function(){$('#target_uin_input').hide().show();},1);});}})(ABTest,IPAY,LIB);/*  |xGv00|fa98b06a42fde51bd7f751e59979a76e */