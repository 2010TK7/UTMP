// Input blur will trigger 'updateAmount'. 
ABTest.before(IPAY, 'updateAmount', function (_amount, notSetInput, neverAutoSelectOption) {
    //fix no balance and to recharge
    if (IPAY.data.code == 'txsp') {

        if (globalPrice[globalPrice.mid].priceInfo[_amount]) {
            IPAY.data.price = globalPrice[globalPrice.mid].priceInfo[_amount].totalPrice / _amount
        }
        else {
            IPAY.data.price = 20;
        }
    } else if (IPAY.data.code == 'qqacct_save') {
        IPAY.data.price = 1;
    }
});

ABTest.before(IPAY, 'submit', function (opts) {
    opts = opts || {};
    opts.data = opts.data || {};
    if (IPAY.data.code == 'txsp') {

        if (globalPrice[globalPrice.mid].priceInfo[IPAY.amount]) {
            IPAY.data.price = globalPrice[globalPrice.mid].priceInfo[IPAY.amount].totalPrice / IPAY.amount
            opts.data.mp_id = globalPrice["mid"];
            opts.data.noadjust = 'yes';
        }
        else {
            IPAY.data.price = 20;
            opts.data.mp_id = '';
            opts.data.noadjust = '';
        }
    } else if (IPAY.data.code == 'qqacct_save') {
        IPAY.data.price = 1;
        opts.data.mp_id = '';
        opts.data.noadjust = '';
    }
    return [opts];
});

ABTest.before(IPAY, 'setCurrentChannel', function (args) {
    args = args || '';
    if (IPAY.data.code == 'txsp') {
        if (args != 'phonecard' && globalPrice[globalPrice.mid].priceInfo[IPAY.amount]) {
            IPAY.data.price = globalPrice[globalPrice.mid].priceInfo[IPAY.amount].totalPrice / IPAY.amount
        }
        else {
            IPAY.data.price = 20;
        }
    } else if (IPAY.data.code == 'qqacct_save') {
        IPAY.data.price = 1;
    }
});

ABTest.after(IPAY, 'onComplete', function (type) {
    if (IPAY.data.code === 'txsp' && type === 'succeed' && IPAY.pay_for === 'self') {
        LIB.loader('//pay.video.qq.com/fcgi-bin/bookmail?uin=' + IPAY.target_uin + '&_t=0&otype=json', function () {
            try {
                LIB.pingSender('//upayportal.qq.com/cgi-bin/action_report.fcg?ch=self&service=txsp&action=txsp.mail.book&sessionid=&aid=' + LIB.getUrlParam('aid') + '&uin=' + IPAY.target_uin + '&extend=' + QZOutputJson.result.code + '&rr=' + Math.random());
            } catch (e) {
            }
        });
    }
});

ABTest.before(IPAY, "selectChannel", function (channel, cb) {
    return [channel, function () {
        cb && cb()
        if (channel && channel == "uniphone") {
            $('#pay_mode_field').hide();
        }
        else {
            $('#pay_mode_field').show();
        }


    }]
})

//ABTest.after(IPAY, 'loadChannelJs', function(){
//if (IPAY.current_channel == 'kj'||IPAY.current_channel=='cft'||IPAY.current_channel=='bank') {
//} else if (IPAY.current_channel == 'qdqb'){
//$('#a_qdqb_auto_checkbox').html('<i class="icon-checkbox"></i>开通自动续费，享受<font color="orange">15</font>元/月续费优惠');
//}
//});
var globalPrice = globalPrice || {}

// Rule for txsp.
;
(function (window, document, $) {
    var uin = "9";
    if (typeof V != "undefined") {
        uin = V.util.getUin() || "9";
    } else if (typeof IPAY != "undefined") {
        uin = IPAY.target_uin || IPAY.uin || "9";
    }
    uin += "";

    var cometUUID = LIB.uuid()
    // Include txsp css.
    $('head').append('<link rel="stylesheet" href="../../../../../imgcache.gtimg.cn/tencentvideo_v1/vstyle/film/v3/style/iframe/minipay_path.css"/*tpa=https://imgcache.gtimg.cn/tencentvideo_v1/vstyle/film/v3/style/iframe/minipay_path.css*/ type="text/css" />');

    var $payField = $('#pay_mode_field'),
        $input = $('#amount_input');

    // 修改补齐逻辑
    IPAY.autoCompleteYear = function () {
        if (!this.agree_term) return;

        var _info;
        if (this.pay_for === 'self') {
            _info = this._yearInfos[this.data.baseCode];

            // 大于3个月推荐开通12个月
            if (_info.needed > 3) {
                _info.needed = 12;
            }
        } else {
            _info = {needed: 12};
        }

        if (_info) {
            this.updateAmount(_info.needed);
        }

        this.report('year');

        $input.trigger('keyup').trigger('blur');
    };
    var defer = $.Deferred();
    defer.always(function (date) {
        //2015.1.4--2015.1.20
        // if(date >= +new Date(2015,0,4,11) && date < +new Date(2015,0,8,11)){
        //	$.extend(globalPrice,{
        //		"3" : 40/3,
        //		"mid" : "MP20150707172022826_01"
        //	});
        // }else if(date >= +new Date(2015,0,8,11) && date < +new Date(2015,0,12,11)){
        // 	$.extend(globalPrice,{
        // 		"3" : 17,
        // 		"mid" : "MP20141121104110344_02"
        // 	});
        // }else if(date >= +new Date(2015,0,12,11) && date < +new Date(2015,0,16,11)){
        // 	$.extend(globalPrice,{
        // 		"3" : 16,
        // 		"12" : 11.5,
        // 		"mid" : "MP20141121104110344_05"
        // 	});
        // }else if(date >= +new Date(2015,0,16,11) && date < +new Date(2015,0,20,11)){
        // 	$.extend(globalPrice,{
        // 		"3" : 17,
        // 		"12" : 11.5,
        // 		"mid" : "MP20141121104110344_06"
        // 	});
        // }
        $.ajax({
            url: "//pay.video.qq.com/fcgi-bin/price-month",
            jsonpCallback: "txspCallback",
            dataType: "jsonp",
            data: {
                otype: "json"
            }
        })
            .done(function (res) {
                if (res.result.code == 0) {
                    globalPrice.mid = res.month_price.mp
                    globalPrice[res.month_price.mp] = {
                        priceInfo: {},
                        totalPrice: {}
                    }
                    $.each($.parseJSON(res.month_price.value).pay_info, function (index, value) {
                        globalPrice[res.month_price.mp].priceInfo[value.month] = {
                            monthPrice: value.month_price,
                            totalPrice: value.total_price,
                            style: value.save_style
                        }

                        globalPrice[res.month_price.mp].totalPrice[value.month] = value.total_price

                    })
                    init(globalPrice.mid);


                }

            })
            .fail(function () {
                IPAY.report("txsp.get_month_info.error", true)
            })
        //init();

    });

    // IPAY.scene != "minipay" && (IPAY.defaultChannel = "qdqb");

    $.ajax({
        type: "HEAD",
        url: location.href,
        cache: false,
        success: function (message, text, response) {
            var date = +new Date(response.getResponseHeader('Date'));
            defer.resolve(date);
        },
        fail: function () {
            var date = +new Date();
            defer.resolve(date);
        }
    });
    function init(mpid) {

        if (IPAY.data.code.toLowerCase() == "txsp") {

            IPAY.params["aid"] = "V0$$2:1000$4:109"

            // Modify pay mode.
            var columns = ['<span class="control-label" id="mode_field_label_txsp">开通套餐：</span>',
                '<div class="controls hollywood_sel_item">',
                '<div class="controls-option" id="mode_select_list_txsp">'];

            $.each(globalPrice[mpid].priceInfo, function (openMonth, value) {
                columns.push('<label _value="month" _type="mode_radio">' +
                    '<a class="radio-box" data-toggle="https://imgcache.qq.com/bossweb/ipay/js/rule/hw.pack" data-amount="' + openMonth + '" href="javascript:void(0);">' + openMonth + '个月' + value.totalPrice + '元<br>（<span class="hollywood_pay">' + value.monthPrice + '</span>元/月）<i class="icon-check"></i><i class="' + value.style + '"></i></a>' +
                    '</label>')
            })

            columns.push('</div>' +
                '</div>')
            if ($("#mode_field_label_txsp").length == 0) {
                $payField.append(columns.join(""))
                $("#mode_select_list_txsp").prepend('<label _value="month" id="txsp_continuous_month" _type="mode_radio">' +
                    '<a class="radio-box" href="javascript:void(0);">连续包月<br>（<span class="hollywood_pay">15</span>元/月）<i class="icon-check"></i></a>' +
                    '</label>')
            }
            else {
                $("#mode_field_label_txsp,#mode_select_list_txsp").show()
            }
            $("#mode_field_label,#mode_select_list").hide()
            IPAY._clearAmountTips()
            IPAY._hideAmountInput(false)


            IPAY._setAmountTips('<div class="help-normal"><i class="icon-mark-discount"></i>开通自动续费，享受<font color="orange">15</font>元/月续费优惠</div>');
            // Delegate events.
            $payField.on('click.hw.data-api', '[data-toggle="https://imgcache.qq.com/bossweb/ipay/js/rule/hw.pack"]', function (event) {
                event.preventDefault();

                var amount = $(this).data('amount');

                // Force trigger 'keyup' and 'blur', so the price info will update by default pay logic.
                $input.val(amount).trigger('keyup').trigger('blur');
                select();
                $("#txsp_pay_channel_continuous_month,#txsp_continuous_qrcode").hide()
                $("#pay_channel_field,[id*='main_template'],#amount_input_field,#amount_field_label,#amount_input,#amount_unit").show()
                $("#" + IPAY.current_channel + "_template").show()
                IPAY._setAmountTips('<div class="help-normal"><i class="icon-mark-discount"></i>开通自动续费，享受<font color="orange">15</font>元/月续费优惠</div>');
                // $('#amount_warning').hide();
                IPAY.continuousMonth = false
            });

            var defaultScanCode = "wechat"
            if (IPAY.isWechatBindCard == 1) {
                defaultScanCode = "wechat"
            }
            else if (IPAY._is_kj == 1) {
                defaultScanCode = "qqwallet"
            }
            if ($("#txsp_pay_channel_continuous_month").length == 0) {

                $("#pay_channel_field").after(
                    '<div id="txsp_pay_channel_continuous_month" class="control-group" style="display:none;">' +
                        '<span class="control-label">开通方式：</span>' +
                        '<div class="controls">' +
                            '<div  class="controls-option" style="display: block;">' +
                                '<label  data-value="qqwallet" class="' + (defaultScanCode == 'qqwallet' ? 'selected' : '') + '">' +
                                    '<a class="radio-box" href="javascript:void(0);">QQ钱包<i class="icon-check"></i></a>' +
                                '</label>' +
                                '<label  data-value="wechat"  class="' + (defaultScanCode == 'wechat' ? 'selected' : '') + '">' +
                                    '<a class="radio-box" href="javascript:void(0);">微信支付<i class="icon-check"></i></a>' +
                                '</label>' +
                                '<label data-value="more">' +
                                    '<a class="radio-box" href="javascript:void(0);">更多支付方式<i class="icon-check"></i></a>' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                        '<div class="controls">'+
                            '<div  class="controls-option" style="display: block;">' +
                                '<div style="color: #777;font-size: 12px;padding-top: 3px;">连续包月仅支持QQ钱包、微信支付，其他套餐支持更多支付渠道</div>'+
                            '</div>' +
                        '</div>'+
                    '</div>')
            }


            var sandbox = IPAY.getParam("sandbox") || "",
                qqwalletContinuousMonthUrl = "//pay.qq.com/cgi-bin/account/get_qr_image.cgi?" + $.param({
                        size: 178,
                        url: "https://pay.qq.com/wechat/sign-contract/views/channels.html?_wv=2&uuid=" + cometUUID + "&m=buy&c=qqsubscribe&service=TXSP&client=mqq&u=" + IPAY.target_uin + "&wxAppid2=wxca942bbff22e0e51&pf=vip_m-pcpay-html5&appid=1450000173&sandbox=" + sandbox + "&ru=http%3A%2F%2Fpay.qq.com%2Fh5%2Fmqqservice.shtml%3Faid%3D%26pf%3D50000.service_list%26codeid%3Dtxsp%26&service_name=%E8%85%BE%E8%AE%AF%E8%A7%86%E9%A2%91VIP"
                    }),
                wechatContinuousMonthUrl = "//pay.qq.com/cgi-bin/account/get_qr_image.cgi?" + $.param({
                        size: 178,
                        url: "https://pay.qq.com/wechat/sign-contract/views/channels.html?_wv=2&uuid=" + cometUUID + "m=buy&sdkpay=1&c=qqsubscribe&service=TXSP&client=wechat&u=" + IPAY.target_uin + "&wxAppid2=wxca942bbff22e0e51&pf=vip_m-pcpay-html5&appid=1450000173&sandbox=" + sandbox + "&ru=" + encodeURIComponent("https://pay.qq.com/h5/index.shtml?m=buy&c=txsp&wechat=1&style=wechat") + "&service_name=%E8%85%BE%E8%AE%AF%E8%A7%86%E9%A2%91VIP"
                    })

            if ($("#txsp_continuous_qrcode").length == 0) {

                $("#main_template").after('<div class="control-group" id="txsp_continuous_qrcode" style="display: none">' +
                    '<label class="control-label">应付金额：</label>' +
                    '<div class="controls">' +
                    '<h5 class="title-primary"><em>15</em>元</h5>' +
                    '<div>' +
                    '<div>' +
                    '<img data-channel="qqwallet" border="0" style="display: ' + (defaultScanCode == 'qqwallet' ? 'block' : 'none') + '" id="qqwallet_qrcode"  src="' + qqwalletContinuousMonthUrl + '" width="178" height="178" alt="手Q支付二维码" title="手Q支付二维码">' +
                    '<p class="ios-qrcode-cont__text" style="display: ' + (defaultScanCode == 'qqwallet' ? 'block' : 'none') + '"  data-channel="qqwallet" >打开手机QQ，扫码完成支付</p>' +
                    '</div>' +
                    '<div>' +
                    '<img data-channel="wechat" border="0" style="display: ' + (defaultScanCode == 'wechat' ? 'block' : 'none') + '"  id="wechat_qrcode" src="' + wechatContinuousMonthUrl + '" width="178" height="178" alt="微信支付二维码" title="微信支付二维码">' +
                    '<p class="ios-qrcode-cont__text" style="display: ' + (defaultScanCode == 'wechat' ? 'block' : 'none') + '"  data-channel="wechat">打开微信，扫码完成支付</p>' +
                    '</div>' +
                    '</div>' +
                    ' </div>' +
                    '</div>')
            }

            $("#txsp_pay_channel_continuous_month").off("click").on("click", "label", function (e) {

                if ($(this).data("value") == "more") {
                   if($("#continous_month_more_channel").length==0){

                       $("body").append("<div id='continous_month_more_channel'>" +
                           "<div class=\"float-header\">" +
                           "<h3>" +
                           "<span>温馨提示</span>" +
                           '<a href="javascript:void(0);" class="close" bank_button="close">×</a>'+
                           "</h3>" +
                           "</div>" +
                           "<div class=\"float-content\">" +
                           "<div  class=\"confirm attent\" style='margin:0 15px;'>" +
                           "<div class=\"confirm-cont\" style='margin:0'>" +
                           "<h5 id=\"dlg_text\">连续包月暂时仅支持QQ钱包、微信支付，其他套餐支持Q币等更多支付方式。将为您切换成开通1个月腾讯视频VIP。</h5>" +
                           "</div>" +
                           "</div>" +
                           "</div>" +
                           "<div class=\"float-footer\">" +
                           "<div class=\"form-actions\">" +
                           "<button type=\"button\" id=\"comfirm_select_one_month\" class=\"btn-primary-small\"><span>确认</span></button>" +
                           "</div>" +
                           "</div>"+
                           "</div>")
                   }
                   else{
                       $("#continous_month_more_channel").show()
                   }

                    IPAY.alert("continous_month_more_channel",350,150)

                    $("#comfirm_select_one_month").off("click").on("click",function(){
                        $("#mode_select_list_txsp a[data-amount='1']").trigger("click")
                        $("#mybg,#continous_month_more_channel").hide()
                    })
                    $("#continous_month_more_channel").off("click").on("click","a.close",function(){
                        $("#mybg,#continous_month_more_channel").hide()
                    })
                }
                else{
                    $(this).addClass("selected").siblings().removeClass("selected")
                    $("#txsp_continuous_qrcode").find('[data-channel]').hide()
                    $("#txsp_continuous_qrcode").find('[data-channel=' + $(this).data("value") + ']').css("display", "block");
                }
            })


            $("#txsp_continuous_month").off("click").on("click", function (e) {
                IPAY.continuousMonth = true;
                $("#txsp_pay_channel_continuous_month,#txsp_continuous_qrcode").show()
                $("#pay_channel_field,[id*='_template'],#amount_field_label,#amount_input,#amount_unit").hide()
                $payField.find('.selected').removeClass('selected');
                $(this).addClass("selected")
                IPAY.onBeforeChannelChange = $.noop//这里重置此方法是为了防止selectCHannel的时候kj渠道此回调会显示main_tempalte造成连续包月二维码和其他渠道同时显示出来
                window._unipay_callback = $.noop
                IPAY.selectChannel("qqwallet")
                IPAY._setAmountTips('<div class="help-normal"><i class="icon-mark-discount"></i>首次开通立省<span style="color:orange">5</span>元，尊享<span style="color:orange;">15</span>/月自动续费优惠，可随时取消</div>');
            })

            $(window).on("load",function () {
                longPolling({
                    isSandbox: sandbox,
                    uuid: cometUUID
                })
            })

            // $("#txsp_pay_channel_continuous_month").on("click", "label", function (e) {
            //     $("#txsp_continuous_qrcode").find('[data-channel]').hide()
            //     $("#txsp_continuous_qrcode").find('[data-channel=' + $(this).data("value") + ']').css("display","block");
            // })

            // Select pay package if the number of month match
            function select(val) {
                if (IPAY.data.code == "txsp") {

                    $payField.find('.selected').removeClass('selected');
                    $payField.find('[data-amount="' + parseInt(val || $input.val(), 10) + '"]').parent().addClass('selected');
                }
            }

            $input.on('keyup blur', function () {
                // Force updateAmount, because "_wxpay" will cause showing the wrong price.
                IPAY.updateAmount($(this).val());
                select();
            });

            // Select pay package while init.
            setTimeout(function () {
                select(IPAY.amount);
                globalPrice[mpid].priceInfo[IPAY.amount] && (IPAY.data.price = globalPrice[mpid].priceInfo[IPAY.amount].totalPrice / IPAY.amount)
                globalPrice[mpid].priceInfo[IPAY.amount] && (IPAY.fee = globalPrice[mpid].priceInfo[IPAY.amount].totalPrice)
                IPAY.onAmountChange(IPAY.amount)
                $("#txsp_continuous_month").triggerHandler("click")
            }, 1);
            IPAY.updateAmount(IPAY.amount)
            $('#amount_helper').hide();

            // ABTEST, 尾号大于4，用新版界面
            // if (uin.charAt(uin.length - 1) > 4) {
            // 	$('#amount_helper').hide();
            // 	$('#amount_tips').hide();
            // } else {
            // 	// skip
            // }
        }
    }

    function getQrcode() {
        var sandbox = IPAY.getParam("sandbox") || "";
        $("#qqwallet_qrcode").attr("src", "//pay.qq.com/cgi-bin/account/get_qr_image.cgi?" + $.param({
                size: 178,
                url: "https://pay.qq.com/wechat/sign-contract/views/channels.html?_wv=2&uuid=" + cometUUID + "&m=buy&c=qqsubscribe&service=TXSP&client=mqq&u=" + IPAY.target_uin + "&wxAppid2=wxca942bbff22e0e51&pf=vip_m-pcpay-html5&appid=1450000173&sandbox=" + sandbox + "&ru=http%3A%2F%2Fpay.qq.com%2Fh5%2Fmqqservice.shtml%3Faid%3D%26pf%3D50000.service_list%26codeid%3Dtxsp&service_name=%E8%85%BE%E8%AE%AF%E8%A7%86%E9%A2%91VIP"
            }))
        $("#wechat_qrcode").attr("src", "//pay.qq.com/cgi-bin/account/get_qr_image.cgi?" + $.param({
                size: 178,
                url: "https://pay.qq.com/wechat/sign-contract/views/channels.html?_wv=2&uuid=" + cometUUID + "&m=buy&sdkpay=1&c=qqsubscribe&service=TXSP&client=wechat&u=" + IPAY.target_uin + "&wxAppid2=wxca942bbff22e0e51&pf=vip_m-pcpay-html5&appid=1450000173&sandbox=" + sandbox + "&ru=" + encodeURIComponent("https://pay.qq.com/h5/index.shtml?m=buy&c=txsp&wechat=1&style=wechat") + "&service_name=%E8%85%BE%E8%AE%AF%E8%A7%86%E9%A2%91VIP"
            }))
    }

    function longPolling(opts) {
        $.ajax({
            type: 'GET',
            url: "//" + (opts.isSandbox ? "sandbox." : "") + "jspay.qq.com/jsonp?" + $.param({
                uin: IPAY.uin,
                skey: LIB.cookie.get('skey'),
                uuid: opts.uuid,
                tag: "continuousmonth"
            }),
            cache: false,
            dataType: 'jsonp',
            jsonp: "cb"
        })
            .done(function (response) {
                switch (parseInt(response, 10)) {
                    case 0: //要继续请求
                        longPolling(opts);
                        break;
                    case 1: //正在支付。这个先不要用
                        opts.onPaying && opts.onPaying();
                        break;
                    case 1000: //支付成功
                        INFO.langs.service.success_for_self = INFO.langs.service.success_for_send = "恭喜您，成功开通{1}连续包月【QQ帐号:{2}】"

                        IPAY._doChannelCallback({
                            autopay: '0',
                            lover_num: '0',
                            open_detail: '',
                            open_month: 1,
                            pay_mode: '1',
                            pay_uin: IPAY.uin,
                            pay_way: '2',
                            phonecard_pay_way: '',
                            phonecard_serial: '',
                            pre_open_month: '1000',
                            qlyz_uin: '0',
                            result: '0',
                            serial: '',
                            serve: '1',
                            service_code: IPAY.data.code.toUpperCase(),
                            service_name: IPAY.data.name,
                            timetype: '0',
                            user_num: IPAY.target_uin
                        });
                        break;
                }
            })
            .fail(function () {
                opts.onError && opts.onError()
            })
    }

    ABTest.after(IPAY, "updateTargetUin", function (uin) {
        if (IPAY.data.code == "txsp" && $("#txsp_continuous_month").hasClass("selected")) {
            // init(globalPrice.mid)
            getQrcode()
            $("#txsp_continuous_month").triggerHandler("click")
        }
    })

    ABTest.after(IPAY, "selectService", function (code) {
        if (code == "txsp") {
            IPAY.rebuildChannelList()
            init(globalPrice.mid)
        }
        else {
            IPAY.continuousMonth = false;
            $("#txsp_pay_channel_continuous_month,#txsp_continuous_qrcode").hide()
            $("#pay_channel_field").show()
            $("#main_template").show()
            IPAY.selectChannel(IPAY.current_channel)
        }
    })


})(window, document, $);