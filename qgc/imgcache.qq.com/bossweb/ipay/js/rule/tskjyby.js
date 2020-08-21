/**
 * Created by shaynegui on 2017/2/23.
 */
;(function (IPAY, LIB, INFO, ABTest, window) {

    var $payField = $('#pay_mode_field'),
        $amountField = $("#amount_input_field"),
        bizCode = "tskjyby",
        cometUUID = LIB.uuid(),
        $input = $('#amount_input');

    window.globalPrice = window.globalPrice || {}
    window.globalPrice[bizCode] = {}

    ABTest.before(IPAY, 'updateAmount', function (_amount, notSetInput, neverAutoSelectOption) {
        //fix no balance and to recharge


        if (IPAY.data.code == 'tskjyby') {
            if (IPAY.pay_mode == "upgrade") {

                return [_amount, undefined, true]
            }
            else {
                if (globalPrice[globalPrice[bizCode].mid].priceInfo[_amount]) {
                    IPAY.data.price = globalPrice[globalPrice[bizCode].mid].priceInfo[_amount].totalPrice / _amount
                }
                else {
                    IPAY.data.price = 30;
                }
            }
        } else if (IPAY.data.code == 'qqacct_save') {
            IPAY.data.price = 1;
        }
    });

    ABTest.before(IPAY, 'submit', function (opts) {
        opts = opts || {};
        opts.data = opts.data || {};
        if (IPAY.data.code == 'tskjyby') {
            if (IPAY.pay_mode == "month") {
                if (globalPrice[globalPrice[bizCode].mid].priceInfo[IPAY.amount]) {
                    IPAY.data.price = globalPrice[globalPrice[bizCode].mid].priceInfo[IPAY.amount].totalPrice / IPAY.amount
                    opts.data.mp_id = globalPrice[bizCode].mid;
                    opts.data.noadjust = 'yes';
                }
                else {
                    IPAY.data.price = 30;
                    opts.data.mp_id = '';
                    opts.data.noadjust = '';
                }
            }
            else {
                IPAY.data.price = 10
                opts.data.mp_id = "";
                opts.data.noadjust = '';
            }
        } else if (IPAY.data.code == "qqacct_save") {
            IPAY.data.price = 1;
            opts.data.mp_id = '';
            opts.data.noadjust = '';
        }
        return [opts];
    });

    ABTest.before(IPAY, 'setCurrentChannel', function (args) {
        if (IPAY.data.code == 'tskjyby' && IPAY.pay_mode == "month") {
            if (globalPrice[globalPrice[bizCode].mid].priceInfo[IPAY.amount]) {
                IPAY.data.price = globalPrice[globalPrice[bizCode].mid].priceInfo[IPAY.amount].totalPrice / IPAY.amount
                opts.data.mp_id = globalPrice[bizCode].mid;
                opts.data.noadjust = 'yes';
            }
            else {
                IPAY.data.price = 30;
            }
        } else if (IPAY.data.code == 'qqacct_save') {
            IPAY.data.price = 1;
        }
    });
    ABTest.after(IPAY, "selectPayMode", function (mode) {
        switchPayModeAmount(IPAY.pay_mode)
    })

    function init(mpid) {

        if (IPAY.data.code == "tskjyby") {

            IPAY.params["actid"] = mpid || 'MP20170228153730674_01'
            if ($amountField.find("label[_value='month']").length == 0) {
                var columns = [];

                $.each(globalPrice[mpid].priceInfo, function (openMonth, value) {
                    columns.push('<label _value="month" _type="mode_radio">' +
                        '<a class="radio-box" data-toggle="https://imgcache.qq.com/bossweb/ipay/js/rule/hw.pack" data-amount="' + openMonth + '" href="javascript:void(0);">' + openMonth + '个月' + value.totalPrice + '元</span><br>（<span class="hollywood_pay">' + value.monthPrice + '</span>元/月）<i class="icon-check"></i><i class="' + value.style + '"></i></a>' +
                        '</label>')
                })
                columns.unshift('<label _value="month" id="tskjyby_continuous_month" _type="mode_radio">' +
                    '<a class="radio-box" href="javascript:void(0);">连续包月<br>（<span class="hollywood_pay">27</span>元/月）<i class="icon-check"></i></a>' +
                    '</label>')
                // columns.push('</div>' +
                //     '</div>')
                $amountField.find('label[data-action="updateAmount"]').remove()
                $("#amount_value").after(columns.join(""))

                // $payField
                //     .html(columns.join(""))
                IPAY._setAmountTips('<div class="help-normal"><i class="icon-mark-discount"></i>开通自动续费，享受<font color="orange">27</font>元/月续费优惠</div>');
                $amountField.on('click.hw.data-api', '[data-toggle="https://imgcache.qq.com/bossweb/ipay/js/rule/hw.pack"]', function (event) {
                    event.preventDefault();

                    var amount = $(this).data('amount');

                    // Force trigger 'keyup' and 'blur', so the price info will update by default pay logic.
                    $input.val(amount).trigger('keyup').trigger('blur');
                    select();
                    $("#tskjyby_pay_channel_continuous_month,#tskjyby_continuous_qrcode").hide()
                    $("#pay_channel_field,[id*='main_template'],#amount_input_field,#amount_input").show()
                    IPAY._setAmountTips('<div class="help-normal"><i class="icon-mark-discount"></i>开通自动续费，享受<font color="orange">27</font>元/月续费优惠</div>');
                    $("#" + IPAY.current_channel + "_template").show()
                    // $('#amount_warning').hide();
                    IPAY.continuousMonth = false
                    // $('#amount_warning').hide();
                });

                $input.on('keyup blur', function () {
                    // Force updateAmount, because "_wxpay" will cause showing the wrong price.
                    IPAY.updateAmount($(this).val());
                    select();
                });

            }
            else{
                $amountField.find("label[_value='month']").show()
            }

            $("#mode_field_label,#mode_select_list").show()
            $("#mode_field_label_txsp,#mode_select_list_txsp").hide()
            // $("#amount_input_field").hide()

            var defaultScanCode = "wechat"
            if (IPAY.isWechatBindCard == 1) {
                defaultScanCode = "wechat"
            }
            else if (IPAY._is_kj == 1) {
                defaultScanCode = "qqwallet"
            }
            if ($("#tskjyby_pay_channel_continuous_month").length == 0) {

                $("#pay_channel_field").after(
                    '<div id="tskjyby_pay_channel_continuous_month" class="control-group" style="display:none;">' +
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
                    url: "https://pay.qq.com/wechat/sign-contract/views/channels.html?_wv=2&uuid=" + cometUUID + "&m=buy&c=qqsubscribe&service=QETVQV1&client=mqq&aid=V0$$2:1000$4:109$15:9&u=" + IPAY.target_uin + "&pf=vip_m-pcpay-html5&appid=1450012108&sandbox=" + sandbox + "&ru=" + encodeURIComponent("http://pay.qq.com/h5/mqqservice.shtml?aid=&pf=50000.service_list&codeid=tskjyby") + "&service_name=" + encodeURIComponent("超级影视VIP")
                }),
                wechatContinuousMonthUrl = "//pay.qq.com/cgi-bin/account/get_qr_image.cgi?" + $.param({
                    size: 178,
                    url: "https://pay.qq.com/wechat/sign-contract/views/channels.html?_wv=2&uuid=" + cometUUID + "m=buy&sdkpay=1&c=qqsubscribe&service=QETVQV1&client=wechat&aid=V0$$2:1000$4:109$15:9&u=" + IPAY.target_uin + "&pf=vip_m-pcpay-html5&appid=1450012108&sandbox=" + sandbox + "&ru=" + encodeURIComponent("https://pay.qq.com/h5/index.shtml?m=buy&c=tskjyby&wechat=1&style=wechat") + "&service_name=" + encodeURIComponent("超级影视VIP")
                })

            if ($("#tskjyby_continuous_qrcode").length == 0) {

                $("#main_template").after('<div class="control-group" id="tskjyby_continuous_qrcode" style="display: none">' +
                    '<label class="control-label">应付金额：</label>' +
                    '<div class="controls">' +
                    '<h5 class="title-primary"><em>27</em>元</h5>' +
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

            $("#tskjyby_pay_channel_continuous_month").off("click").on("click", "label", function (e) {

                if ($(this).data("value") == "more") {
                    if($("#tskjyby_continous_month_more_channel").length==0){

                        $("body").append("<div id='tskjyby_continous_month_more_channel'>" +
                            "<div class=\"float-header\">" +
                            "<h3>" +
                            "<span>温馨提示</span>" +
                            '<a href="javascript:void(0);" class="close" bank_button="close">×</a>'+
                            "</h3>" +
                            "</div>" +
                            "<div class=\"float-content\">" +
                            "<div  class=\"confirm attent\" style='margin:0 15px;'>" +
                            "<div class=\"confirm-cont\" style='margin:0'>" +
                            "<h5 id=\"dlg_text\">连续包月暂时仅支持QQ钱包、微信支付，其他套餐支持Q币等更多支付方式。将为您切换成开通1个月超级影视VIP。</h5>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "<div class=\"float-footer\">" +
                            "<div class=\"form-actions\">" +
                            "<button type=\"button\" id=\"tskjyby_comfirm_select_one_month\" class=\"btn-primary-small\"><span>确认</span></button>" +
                            "</div>" +
                            "</div>"+
                            "</div>")
                    }
                    else{
                        $("#tskjyby_continous_month_more_channel").show()
                    }

                    IPAY.alert("tskjyby_continous_month_more_channel",350,150)

                    $("#tskjyby_comfirm_select_one_month").off("click").on("click",function(){
                        $("#tskjyby_continuous_month ~ label a[data-amount='1']").trigger("click")
                        $("#mybg,#tskjyby_continous_month_more_channel").hide()
                    })
                    $("#tskjyby_continous_month_more_channel").off("click").on("click","a.close",function(){
                        $("#mybg,#tskjyby_continous_month_more_channel").hide()
                    })
                }
                else{
                    $(this).addClass("selected").siblings().removeClass("selected")
                    $("#tskjyby_continuous_qrcode").find('[data-channel]').hide()
                    $("#tskjyby_continuous_qrcode").find('[data-channel=' + $(this).data("value") + ']').css("display", "block");
                }
            })

            $("#tskjyby_continuous_month").off("click").on("click", function (e) {
                IPAY.continuousMonth = true;
                $("#tskjyby_pay_channel_continuous_month,#tskjyby_continuous_qrcode").show()
                $("#pay_channel_field,[id*='_template'],#amount_input,#amount_unit").hide()
                $("#tskjyby_continuous_month").siblings('.selected').removeClass('selected');
                $(this).addClass("selected")
                IPAY.onBeforeChannelChange = $.noop//这里重置此方法是为了防止selectCHannel的时候kj渠道此回调会显示main_tempalte造成连续包月二维码和其他渠道同时显示出来
                window._unipay_callback = $.noop
                IPAY.selectChannel("qqwallet")
                IPAY._setAmountTips('<div class="help-normal"><i class="icon-mark-discount"></i>尊享<span style="color:orange;">27</span>/月自动续费优惠，可随时取消</div>');
            })



            if(IPAY.pay_mode=="month"){
                setTimeout(function () {
                    select(IPAY.amount);
                    globalPrice[mpid].priceInfo[IPAY.amount] && (IPAY.data.price = globalPrice[mpid].priceInfo[IPAY.amount].totalPrice / IPAY.amount)
                    globalPrice[mpid].priceInfo[IPAY.amount] && (IPAY.fee = globalPrice[mpid].priceInfo[IPAY.amount].totalPrice)
                    IPAY.onAmountChange(IPAY.amount)

                }, 1);
            }
        }

        function setMPDiscount(amount) {

            if (IPAY.data.code == 'tskjyby' && IPAY.pay_mode == "month") {
                if (amount == 3) {
                    IPAY.data.price = 85 / 3;
                } else if (amount == 12) {
                    IPAY.data.price = 330 / 12
                } else {
                    IPAY.data.price = 30;
                }
            } else if (IPAY.data.code == 'qqacct_save') {
                IPAY.data.price = 1;
            }
        }


        // IPAY._rebuildAmountSelector(IPAY.data)


        IPAY.updateAmount(IPAY.data.defaultAmount)
        switchPayModeAmount(IPAY.pay_mode)
        $("#mode_select_list label[_type='mode_radio'][_value='year']").remove()

        $(window).on("load",function () {
            longPolling({
                isSandbox: sandbox,
                uuid: cometUUID
            })
        })


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

    function getQrcode() {
        var sandbox = IPAY.getParam("sandbox") || "";
        $("#qqwallet_qrcode").attr("src", "//pay.qq.com/cgi-bin/account/get_qr_image.cgi?" + $.param({
            size: 178,
            url: "https://pay.qq.com/wechat/sign-contract/views/channels.html?_wv=2&uuid=" + cometUUID + "&m=buy&c=qqsubscribe&service=QETVQV1&client=mqq&aid=V0$$2:1000$4:109$15:9&u=" + IPAY.target_uin + "&pf=vip_m-pcpay-html5&appid=1450012108&sandbox=" + sandbox + "&ru=" + encodeURIComponent("http://pay.qq.com/h5/mqqservice.shtml?aid=&pf=50000.service_list&codeid=tskjyby") + "&service_name="+encodeURIComponent("超级影视VIP")
        }))
        $("#wechat_qrcode").attr("src", "//pay.qq.com/cgi-bin/account/get_qr_image.cgi?" + $.param({
            size: 178,
            url: "https://pay.qq.com/wechat/sign-contract/views/channels.html?_wv=2&uuid=" + cometUUID + "&m=buy&sdkpay=1&c=qqsubscribe&service=QETVQV1&client=wechat&aid=V0$$2:1000$4:109$15:9&u=" + IPAY.target_uin + "&pf=vip_m-pcpay-html5&appid=1450012108&sandbox=" + sandbox + "&ru=" + encodeURIComponent("https://pay.qq.com/h5/index.shtml?m=buy&c=tskjyby&wechat=1&style=wechat") + "&service_name=" + encodeURIComponent("超级影视VIP")
        }))
    }

    // Select pay package if the number of month match
    function select(val) {
        $amountField.find('.selected').removeClass('selected');
        $amountField.find('[data-amount="' + parseInt(val || $input.val(), 10) + '"]').parent().addClass('selected');
    }
    function switchPayModeAmount(mode) {

        if (IPAY.data.code == "tskjyby") {
            if (mode == "upgrade") {
                IPAY.params["aid"] = "V0$$2:1000$4:109$15:5"
                IPAY._hideAmountInput(false)
                $("#amount_unit").show()
                $("#amount_input").val(IPAY.data.defaultAmount).removeClass("selected")
                $("#amount_input_field label[_value='month']").hide()

            }
            else if (mode == "month") {
                IPAY.params["aid"] = "V0$$2:1000$4:109$15:4"
                IPAY._hideAmountInput(true)
                $("#amount_input_field label[_value='month']").show()
                $("#amount_unit").hide()
                select(IPAY.data.defaultAmount)
                // IPAY._setAmountTips("<i class='icon-mark-discount'></i>1个月30元，3个月85元，12个月330元")
            }
        }
    }

    $.ajax({
        url: "//pay.video.qq.com/fcgi-bin/price-month_tv",
        jsonpCallback: "txspTvCallback",
        dataType: "jsonp",
        data: {
            otype: "json"
        }
    })
        .done(function (res) {
            if (res.result.code == 0) {
                globalPrice[bizCode].mid = res.month_price.mp
                globalPrice[res.month_price.mp] = {
                    priceInfo: {},
                    totalPrice: {}
                }
                $.each(res.month_price.value.pay_info, function (index, value) {
                    globalPrice[res.month_price.mp].priceInfo[value.month] = {
                        monthPrice: value.month_price,
                        totalPrice: value.total_price,
                        style: value.save_style
                    }

                    globalPrice[res.month_price.mp].totalPrice[value.month] = value.total_price

                })
                init(res.month_price.mp);
            }

        })
        .fail(function () {
            IPAY.report("tskjyby.get_month_info.error", true)
        })


    ABTest.after(IPAY, "selectService", function (code) {
        if (code == "tskjyby") {
            IPAY.rebuildChannelList()
            init(globalPrice[bizCode].mid)
            IPAY.params["aid"] = "V0$$2:1000$4:109$15:4"
        }
        else {
            $("#tskjyby_pay_channel_continuous_month,#tskjyby_continuous_qrcode").hide()
            $amountField.find("label[_value='month']").hide()
        }
    })

    ABTest.after(IPAY, "updateTargetUin", function (uin) {
        if (IPAY.data.code == "tskjyby" && $("#tskjyby_continuous_month").hasClass("selected")) {
            // init(globalPrice.mid)
            getQrcode()
            $("#tskjyby_continuous_month").triggerHandler("click")
        }
    })})(IPAY, LIB, INFO, ABTest, window);
