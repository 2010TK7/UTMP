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
})(IPAY, INFO, LIB, jQuery);/**
 * Created by shaynegui on 2016/1/5.
 */
;
(function (ABTest, IPAY, LIB, W, INFO) {

    var pf = LIB.getUrlParam("pf");
    var actid = LIB.getUrlParam("actid")

    if (actid == "MA20160612102120033") {
        if (IPAY.openListInfo && IPAY.openListInfo.list) {
            showQgameTips(IPAY.openListInfo.list)
        }
        else {
            $.getJSON("https://imgcache.qq.com/cgi-bin/account/get_open_service_list.cgi")
                .success(function (res) {
                    if (res.resultcode == 0) {
                        IPAY.openListInfo = res.resultinfo;
                        showQgameTips(res.resultinfo.list)
                    }

                })
        }
    }

    function showQgameTips(services) {
        $("#amount_input_field .controls").append("<span id='qgame_tips' ' style='color:#0eabff;'>蓝钻用户，选择以上炫豆套餐，支付打八折</span>")


        $.each(services, function (index, service) {
            if (service.servicecode.toUpperCase() == "XXQGAME") {
                ABTest.before(IPAY, 'submit', function (opts) {
                    if(IPAY.data.code!=="qqacct_save"){
                        opts.data.mp_id = actid
                    }
                });

                ABTest.before(IPAY, 'updateAmount', function (amount) {
                    setPriceDiscount()

                    if (IPAY.data.code == 'qqacct_save') {//余额不足去充值的情况
                        return [Math.ceil(amount)]
                    }

                });

                ABTest.before(IPAY, 'setCurrentChannel', function (args) {
                    setPriceDiscount()
                });
            }
        })

    }

    function setPriceDiscount(){
        if (IPAY.data.code == 'qqacct_save') {
            IPAY.data.price = 1;
        }
        else if(actid == "MA20160612102120033"){
            IPAY.data.price = 0.08
        }
    }

    if (pf == "yxdt.xd.minipay" || pf == "ysdt.xd.minipay2") {
        (IPAY.scene == "minipay") && (IPAY.scene = "pay")
        $(".layout-content").width(730)
        $("body").height($("body").height - 8).css("background-color", "white")
        $("link").attr("href", "../../../../../../../../../../../../imgcache.gtimg.cn/c/=/bossweb/ipay/css/pay/global.css,/bossweb/ipay/css/pay/ipay.css"/*tpa=https://imgcache.gtimg.cn/c/=/bossweb/ipay/css/pay/global.css,/bossweb/ipay/css/pay/ipay.css*/)
        $("#agree_term_field").remove()
        //$("#target_uin_input_field").hide()
        $("#amount_input_field").after("<div id='agree_term_field' class='control-group'>" +
            "<label id='agree_term_checkbox' style='padding-top:0' class='selected control-label'>" +
            "<a href='javascript:void(0);' class='checkbox'>" +
            "<i class='icon-checkbox'></i>同意 </a>" +
            "</label>" +
            "<div class='controls'>" +
            "<a stype='term' href='https://game.qq.com/contract.shtml' target='_blank'><span stype='name' style='display: none;'>炫豆</span>服务条款</a>" +
            "</div>" +
            "</div>"
        )

        $('#agree_term_checkbox').find('>.checkbox').click({ipay: IPAY}, function (e) {
            var $this = $(this).parent(),
                _checked = false;
            var $agreeTermField = $('#agree_term_field');
            var $agreeTermWarning = $('#agree_term_warning');
            if ($this.hasClass('selected')) {
                _checked = false;
                $this.removeClass('selected');
                $agreeTermField.addClass('warning');
                $agreeTermWarning.show();
                IPAY.setChannelTips(LIB.tmpl('<div class="controls-expanded"><div class="loading warning"><span class="help-inline"><i class="icon-help"></i>$msg$</span></div></div>', {msg: '购买前请先同意服务条款!'}));
                IPAY.lockForm();
                $("#qgame_tips").css("color","#777777")
            } else {
                _checked = true;
                $this.addClass('selected');
                $agreeTermField.removeClass('warning');
                $agreeTermWarning.hide();
                IPAY.clearChannelTips()
                IPAY.lockForm(false);
                $("#qgame_tips").css("color","#0eabff")
            }
            e.data.ipay.agree_term = _checked;
            e.data.ipay.onAgreeTermChange(_checked);
        });


        // ABTest.after(IPAY, 'updateAmount', function (amount) {
        //     if (IPAY.current_channel == "weixin") {
        //         scanWeixinQrCode()
        //     }
        // });
        //
        // ABTest.after(IPAY, 'setCurrentChannel', function (channel) {
        //     if (channel == "weixin") {
        //         scanWeixinQrCode()
        //     }
        // });
        //
        // ABTest.before(IPAY, 'selectChannel', function (channel) {
        //     if (channel == "weixin") {
        //         return [channel, scanWeixinQrCode]
        //     }
        // });
        //
        // function scanWeixinQrCode() {
        //
        //     var url = '//pay.qq.com/h5/index.shtml?m=buy&style=wechat&wechat=1&pf=' + (IPAY.scene === 'pay' ? 2001 : 2002) + '&showwxpaytitle=1&c=' + IPAY.data.code.toLowerCase().replace('-', '') + '&zoneid=' + (IPAY._serverConf ? (IPAY._serverConf.server_selector || '') : '') + '&n=' + IPAY.amount + '&u=' + IPAY.target_uin + (IPAY._uuid ? '&uuid=' + IPAY._uuid + '&pt=NodeJS' : '') ;
        //     $('#wxpay1 .img-rwm img').attr("src", '//pay.qq.com/cgi-bin/account/get_qr_image.cgi?size=100&url=' + encodeURIComponent(url))
        // }


        //重建大区

        if (pf == "yxdt.xd.minipay") {
            IPAY.data.gameConf.serverUrl = "../../../../../../../../../../../../game.gtimg.cn/comm-htdocs/js/game_area/mgc_qgame_server_select.js"/*tpa=https://game.gtimg.cn/comm-htdocs/js/game_area/mgc_qgame_server_select.js*/
            IPAY.data.gameConf.serverName = "MGC_QQGAME_ServerSelect"
        }
        else if (pf == "ysdt.xd.minipay2") {
            IPAY.data.gameConf.serverUrl = "../../../../../../../../../../../../game.gtimg.cn/comm-htdocs/js/game_area/x52_mgc_server_select.js"/*tpa=https://game.gtimg.cn/comm-htdocs/js/game_area/x52_mgc_server_select.js*/
            IPAY.data.gameConf.serverName = "X52MGCServerSelect"
        }


        IPAY.rebuildServerSelector()
    }

})(ABTest, IPAY, LIB, window, INFO);