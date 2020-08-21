/**
 * Created by shaynegui on 2016/9/9.
 */
;
(function (ABTest, IPAY, LIB) {
    var nbaLists = {
            "TYNBAYSQQ": "勇士队",
            "TYNBAQSQQ": "骑士队",
            "TYNBAHRQQ": "湖人队",
            "TYNBAHJQQ": "火箭队",
            "TYNBAKCQQ": "快船队",
            "TYNBAMCQQ": "马刺队",
            "TYNBALTQQ": "雷霆队",
            "TYNBARHQQ": "热火队",
            "TYNBABXQQ": "步行者队",
            "TYNBAHXQQ": "灰熊队",
            "TYNBAXNQQ": "小牛队",
            "TYNBANKQQ": "尼克斯队",
            "TYNBAGNQQ": "公牛队",
            "TYNBALWQQ": "篮网队",
            "TYNBAKTQQ": "开拓者队",
            "TYNBAKEQQ": "凯尔特人队",
            "TYNBASLQQ": "森林狼队",
            "TYNBAGWQQ": "国王队",
            "TYNBAMSQQ": "魔术队",
            "TYNBAJSQQ": "爵士队",
            "TYNBAJJQQ": "掘金队",
            "TYNBATYQQ": "太阳队",
            "TYNBALYQQ": "老鹰队",
            "TYNBAHSQQ": "活塞队",
            "TYNBAHFQQ": "黄蜂队",
            "TYNBAXLQQ": "雄鹿队",
            "TYNBAMLQQ": "猛龙队",
            "TYNBATHQQ": "鹈鹕队",
            "TYNBAQCQQ": "奇才队",
            "TYNBA76QQ": "76人队"
        },
        defaultTeam = IPAY.getParam("defaultteam") && IPAY.getParam("defaultteam").toString().toUpperCase(),
        actid = LIB.getUrlParam('actid') || "MP20160918203441815_02",
        isKJ,
        nbaServiceCodes = (function () {
            var codes = []
            $.each(nbaLists, function (code, name) {
                codes.push(code)
            })
            return codes

        })()

    window.globalPrice = window.globalPrice || {

            totalPrice: {}
        }

    $.extend(window.globalPrice, {
        "MP20160918203441815_02": {
            discounts: function (amount) {
                var price = 0
                if (amount >= 1 && amount <= 2) {
                    price = 30
                }
                else if (amount >= 3 && amount <= 11) {
                    price = 30 * 0.8
                }
                else if (amount == 12) {
                    price = 264 / 12
                }
                else if (amount > 12) {
                    price = 30 * 0.73
                }
                return price
            },
            // "1": 30,
            // "3": 72,
            // "12": 264,
            tips: "1个月30元，3个月72元，12个月264元，其它月份享受阶梯折扣"
        },
        "MP20160913181442228_02": {
            "12": 218,
            tips: "早鸟优惠！NBA球队通年费6折，仅218元"
        },
        "MP20160913181442228_05": {
            "12": 318,
            tips: "NBA球队通年费+正版T恤，仅318元"
        },
        "MP20161215174539589_01": {
            "3": 68,
            tips: "3个月68"
        }
    })


    IPAY.langs.success_more_href = null//屏蔽支付成功后的更多详情
    IPAY.openServicesList = {}

    ABTest.after(IPAY, 'updateAmount', function (amount) {
        scanQrCode(IPAY.current_channel)
    });

    ABTest.before(IPAY, "updateAmount", function (amount) {
        calcPrice(amount)
    })

    ABTest.before(IPAY, "selectChannel", function (channel, cb) {

        if (channel == "kj" && IPAY.data.code.toLowerCase() == "tynba" && !IPAY.data.tynbaService) {//为了防止未选球队时财付通下单会checkform异常，导致渠道不可用
            isKJ = IPAY._is_kj//临时存放是否绑卡信息，以便于切换到联盟通能拉起财付通快捷
            IPAY._is_kj = '0'
        }
        else {
            IPAY._is_kj = isKJ
        }


        if (!IPAY.data.tynbaService && (channel == "weixin" || channel =="qqwallet") && IPAY.data.code.toLowerCase() == "tynba" && !(window._onlyCanSendBaseVip && IPAY.pay_for == "send")) {
            $("#team_selector_warning").show()
            return [IPAY.current_channel, function () {
                cb && cb()
                ABTest.before(IPAY, "onAmountChange", function (amount) {
                    calcPrice(amount)
                })

            }]
        }
        else {
            return [channel, function () {

                // //屏蔽财付通自动续费
                // IPAY.params["autopay"] = "0"
                // //$("#qdqb_auto_checkbox").hide()
                cb && cb()
                ABTest.before(IPAY, "onAmountChange", function (amount) {
                    calcPrice(amount)
                })
                scanQrCode(channel)
            }]
        }

    })


    function scanQrCode(channel) {

        if (channel == "weixin" && ((IPAY.data.tynbaService && IPAY.data.code.toUpperCase() == "TYNBA") || (IPAY.pay_for == "send" && window._onlyCanSendBaseVip))) {
            var url = location.protocol + "//pay.qq.com/h5/index.shtml?m=buy&c=" + ((IPAY.pay_for == "send" && window._onlyCanSendBaseVip) ? "txtypcby" : "tynba") + "&style=wechat&direct=1&wechat=1&u=" + IPAY.target_uin + (IPAY.data.tynbaService ? "&tynbaService=" + IPAY.data.tynbaService.toLowerCase() : "") + "&n=" + IPAY.amount + (IPAY.getParam('aid', '') ? '&aid=' + IPAY.getParam('aid', '') : '') + (IPAY.getParam('actid') ? ('&mpid=' + ((IPAY.pay_for == "send" && window._onlyCanSendBaseVip) ? 'MP20160918203441815_01' : IPAY.getParam('actid'))) : '') + (IPAY._uuid ? '&uuid=' + IPAY._uuid + '&pt=NodeJS' : '') + (IPAY.getParam('debug') ? '&sandbox=1' : '')
            setTimeout(function () {
                $('#wxpay1 .img-rwm img').attr("src", '//pay.qq.com/cgi-bin/account/get_qr_image.cgi?size=100&url=' + encodeURIComponent(url))
            }, 100)
        }

        if (channel == "qqwallet" && ((IPAY.data.tynbaService && IPAY.data.code.toUpperCase() == "TYNBA") || (IPAY.pay_for == "send" && window._onlyCanSendBaseVip))) {
            var url = location.protocol + "//pay.qq.com/h5/mqqservice.shtml?codeid=" + ((IPAY.pay_for == "send" && window._onlyCanSendBaseVip) ? "txtypcby" : "tynba") + "&target_uin=" + IPAY.target_uin + (IPAY.data.tynbaService ? "&tynbaService=" + IPAY.data.tynbaService.toLowerCase() : "") + "&n=" + IPAY.amount + "&"+(IPAY.scene == 'pay' ? 'pf=pay.morech.qqwallet&aid=' + (IPAY.getParam("aid") ? IPAY.getParam("aid") : 'pay.andriod.qqwallet') : 'pf=minipay.morech.qqwallet&aid=' + (IPAY.getParam("aid") ? IPAY.getParam("aid") : 'minipay.andriod.qqwallet')) + (IPAY.getParam('actid') ? ('&discountid=' + ((IPAY.pay_for == "send" && window._onlyCanSendBaseVip) ? 'MP20160918203441815_01' : IPAY.getParam('actid'))) : '') + (IPAY._uuid ? '&uuid=' + IPAY._uuid + '&pt=NodeJS' : '') + (IPAY.getParam('debug') ? '&sandbox=1' : '')
            setTimeout(function () {
                $('.ios-qrcode-cont__img').attr("src", '//pay.qq.com/cgi-bin/account/get_qr_image.cgi?size=178&url=' + encodeURIComponent(url))
            }, 100)
        }
    }

    function calcPrice(amount) {

        if (IPAY.data.code == "tynba") {
            if (window.globalPrice[actid] && window.globalPrice[actid][amount]) {
                (IPAY.data.price = (window.globalPrice[actid][amount] / amount))
            }
            else if ($.isFunction(window.globalPrice[actid]["discounts"])) {

                (IPAY.data.price = window.globalPrice[actid]["discounts"](amount))
            }
            else {
                IPAY.data.price = 30
            }
        }

    }

    function setMPDiscount(IPAY, actid) {

        if (IPAY.data.code == "tynba") {

            window.globalPrice[actid] && $.each(window.globalPrice[actid], function (month, totalPrice) {
                if ($.isNumeric(month)) {

                    // window.globalPrice.totalPrice[month] = totalPrice
                }
            })

            window.globalPrice[actid][IPAY.amount] && (IPAY.data.price = (window.globalPrice[actid][IPAY.amount] / IPAY.amount))

            $.isFunction(window.globalPrice[actid]["discounts"]) && (IPAY.data.price = window.globalPrice[actid]["discounts"](IPAY.amount))
            ABTest.before(IPAY, "gotoRechargeStep", function (data) {

                calcPrice(IPAY.amount)
            })

            IPAY.params["actid"] = actid
            if (window.globalPrice[actid].tips) {
                if ($("#mp_tips").length == 0) {

                    $("#amount_input_field .controls")
                        .append('<div class="help-normal" style="display: block;">\
                    <i class="icon-mark-discount"></i><em id="mp_tips">' + window.globalPrice[actid].tips + '</em>\
                </div>')
                }
                else {
                    $("#mp_tips").text(window.globalPrice[actid].tips)
                }
            }
        }
        else if (IPAY.data.code == 'qqacct_save') {
            IPAY.data.price = 1;
            IPAY.data.mp_id = '';
            IPAY.data.noadjust = '';
        }


    }


    //未选择球队的情况
    ABTest.after(IPAY, "checkForm", function () {
        if (!IPAY.data.tynbaService && IPAY.data.code.toUpperCase() == "TYNBA") {

            if (IPAY.pay_for == "send" && window._onlyCanSendBaseVip) {//给好友赠送基础班场景
                return true
            }
            else {
                $("#team_selector_warning").show()
                return false
            }

        }

    })

    ABTest.after(IPAY, 'selectService', function (service) {
        if (service.toUpperCase() == "TYNBA") {

            init()

            if ((IPAY.current_channel == "weixin" || IPAY.current_channel=="qqwallet") && !IPAY.data.tynbaService) {//防止微信渠道从联盟通切到球队通未选球队

                $("#team_selector_warning").show()
                IPAY.selectChannel("qdqb")
            }
            else {

                scanQrCode(IPAY.current_channel)
            }
        }
    });

    ABTest.before(IPAY, 'submit', function (opts) {
        opts = opts || {};
        opts.data = opts.data || {};

        if (IPAY.data.code.toLowerCase() == 'tynba') {
            if (IPAY.pay_for == "send" && window._onlyCanSendBaseVip) {
                opts.data.service_code = "TXTYPCBY"
                opts.data.mp_id = "MP20160918203441815_01"
            }
            else {
                opts.data.service_code = IPAY.data.tynbaService
            }
        }
        return [opts];
    });

    ABTest.after(IPAY, "updateTargetUin", function (uin) {
        init()
    })


    function init() {

        var sandbox = IPAY.getParam("sandbox"), debug = IPAY.getParam("debug"), domain = ""
        if (sandbox == 1) {
            domain = "sandbox."
        }
        else if (sandbox == 2) {
            domain = "dev."
        }

        $("#service_info_wrapper h3[stype='name']").text("腾讯体育会员")

        $("#kj_template").hide()

        // $("#game_type").length == 0 && $("#service_selector_field")
        //     .before(
        //         '<div id="game_type"  class="control-group" style="">\
        //             <span class="control-label">开通赛事：</span> \
        //             <div class="controls"> \
        //                 <div  class="controls-option"> \
        //                     <label _type="mode_radio" _value="month" class="selected"><a class="radio-box" href="javascript:void(0);">NBA<i class="icon-check"></i></a></label>\
        //                 </div>\
        //             </div>\
        //         </div>')

        $("#service_selector_field").show()

        setMPDiscount(IPAY, actid)


        if (IPAY.data.code.toUpperCase() == "TYNBA") {

            if (IPAY.openServicesList[IPAY.target_uin]) {
                handler(IPAY.openServicesList[IPAY.target_uin], +new Date())
            }
            else {
                var timestamp = new Date().getTime()
                $.ajax({
                    url: "//" + domain + "api.unipay.qq.com/v1/r/" + IPAY.data.appid + "/wechat_query",
                    data: {
                        cmd: 7,
                        pf: 'vip_m-pay_html5-html5',
                        openid: IPAY.uin,
                        provide_uin: IPAY.pay_for == "send" ? IPAY.target_uin : "",
                        openkey: LIB.cookie.get("skey"),
                        session_id: "uin",
                        session_type: "skey",
                        format: "jsonp__getOpenServices" + timestamp,
                        expire_month: 0
                    },
                    type: "get",
                    dataType: "jsonp",
                    jsonp: false,
                    jsonpCallback: "_getOpenServices" + timestamp
                })
                    .done(function (res) {
                        if (res.ret == 0) {
                            var opendServices = res.service
                            if (res.pack_service && res.pack_service.txty && res.pack_service.txty.length > 0) {
                                opendServices = opendServices.concat(res.pack_service.txty)
                            }
                            IPAY.openServicesList[IPAY.target_uin] = opendServices;
                            handler(opendServices, new Date())
                        }
                        else {
                            alert("获取服务列表失败，请重试")
                        }
                    })
            }

        }
    }

    function handler(services, now) {


        var hasNBATeamVIP = false, hasTYBaseVIP = false, hasNBAUnionVIP = false, openedNBATeams = {}, opendNBATeamsArray = []
        $.each(services, function (index, service) {

            var serviceCode = (service.service_code|| service.pack_txty_service_code).toUpperCase()
            if (new Date((service.end_time || service.pack_txty_end_time)) > now) {
                switch (serviceCode) {
                    case "TXTYPCBY"://拥有基础版
                        hasTYBaseVIP = true;
                        break;

                    case "TYNBALPQQ"://拥有联盟通
                        hasNBAUnionVIP = true;
                        break;

                }
                if ($.inArray(serviceCode, nbaServiceCodes) > -1) {
                    hasNBATeamVIP = true
                    openedNBATeams[serviceCode] = nbaLists[serviceCode]
                    opendNBATeamsArray.push(serviceCode)
                }
            }


        })


        if (hasNBATeamVIP) {
            //筛选出用户有的球队放到列表选择
            if (opendNBATeamsArray.length >= 2) {
                if (IPAY.pay_for == "self") {
                    buildTeamDropDownLists(openedNBATeams, opendNBATeamsArray)
                    setNBATips('已开通' + opendNBATeamsArray.length + '支同赛事球队，无法开通新球队')
                }
                else if (IPAY.pay_for == "send") {
                    openDialog("返回", "好友已开通两只球队,您只能赠送高级会员", function () {
                        if (IPAY.scene == "minipay") {
                            $("#send_friend_step").trigger("click")
                            $("#copyright_tips").hide()
                            $("#mybg").hide()
                        }
                        else {
                            location.href = location.href + "&c=tynbalpqq&u=" + IPAY.target_uin
                        }
                    })
                }
            }
            else {
                buildTeamDropDownLists(nbaLists, nbaServiceCodes)
                setNBATips('可看一支NBA球队全部比赛和其它付费比赛')
            }

        }
        else {
            if (hasTYBaseVIP && !hasNBAUnionVIP) {

                if (IPAY.pay_for == "self") {

                    $("#pay_channel_field,#main_template,#amount_input_field,#pay_mode_field").hide()
                    $("[id$='_template']").hide()

                    buildTeamDropDownLists(nbaLists, nbaServiceCodes)
                    setNBATips('您可免费升级到球队通，选球队可看该球队的所有比赛，其他特权不变')

                    //覆盖服务条款事件
                    $('#agree_term_checkbox').find('>.checkbox').off("click").on("click", {ipay: IPAY}, function (e) {
                        var $this = $(this).parent(),
                            _checked = false;
                        var $agreeTermField = $('#agree_term_field');
                        var $agreeTermWarning = $('#agree_term_warning');
                        if ($this.hasClass('selected')) {
                            _checked = false;
                            $this.removeClass('selected');
                            $agreeTermField.addClass('warning');
                            $agreeTermWarning.show();
                            IPAY.lockForm();
                        } else {
                            _checked = true;
                            $this.addClass('selected');
                            $agreeTermField.removeClass('warning');
                            $agreeTermWarning.hide();
                            IPAY.lockForm(false);
                        }
                        e.data.ipay.agree_term = _checked;
                        e.data.ipay.onAgreeTermChange(_checked);
                        $('#team_activate')[_checked ? 'removeClass' : 'addClass']('disabled');
                    });

                    IPAY.enableSend(false)
                    if ($("#team_activate").length == 0) {

                        //只有基础班激活转移球队通

                        $("#main_template").after(
                            '<div class="form-actions" id="show_teamactivate">    ' +
                            '<button id="team_activate" type="button" class="btn-primary">' +
                            '<span>激活球队</span>' +
                            '</button>' +
                            '</div>'
                        )

                    }
                    else {
                        $("#show_teamactivate").show()
                    }

                    $("#team_activate").on("click", function (e) {

                        if (IPAY.agree_term) {
                            IPAY.report("basevip.goto.teamactivate", true)
                            var self = this
                            var domain = ""
                            if (IPAY.getParam("debug") == 1) {
                                domain = "sandbox."
                            }
                            else if (IPAY.getParam("sandbox") == 2) {
                                domain = "dev."
                            }
                            if (!IPAY.data.tynbaService) {
                                $("#team_selector_warning").show()
                            }
                            else {
                                $.ajax({
                                    url: "//" + domain + "api.unipay.qq.com/v1/r/1450007944/wechat_query",
                                    data: {
                                        cmd: 19,
                                        pf: 'vip_m-pay_html5-html5',
                                        src_servicecode: "TXTYPCBY",
                                        dst_servicecode: IPAY.data.tynbaService,
                                        openid: IPAY.target_uin,
                                        openkey: LIB.cookie.get("skey"),
                                        session_id: "uin",
                                        session_type: "skey",
                                        format: "jsonp__teamActivate"
                                    },
                                    type: "get",
                                    dataType: "jsonp",
                                    jsonp: false,
                                    jsonpCallback: "_teamActivate"
                                })
                                    .done(function (res) {
                                        if (res.ret == 0) {
                                            IPAY.selectChannel("qdqb", function () {//防止调用dochannelCallback失败，先切换渠道
                                                var team = nbaLists[IPAY.data.tynbaService]
                                                team = team.substring(0, team.length - 1)
                                                IPAY.langs.success_for_self = "恭喜您，成功激活" + team + "球队通"
                                                IPAY._doChannelCallback({result: {result_code: 0}})
                                            })
                                        }
                                        else {
                                            if ($("#activate_msg").length == 0) {

                                                $(self).before(
                                                    '<div class="layer-error warning" >' +
                                                    '<i class="icon-help"></i>' +
                                                    '<em id="activate_msg">' + res.msg + '</em>' +
                                                    '</div>')
                                            }
                                            else {
                                                $("#activate_msg").text(res.msg)
                                            }
                                        }
                                    })
                            }
                        }

                    })
                }
                else if (IPAY.pay_for == "send") {//如果好友是只有基础班,继续赠送基础版
                    sendBaseVip()
                }

            }

            else if (hasNBAUnionVIP) {
                if (IPAY.pay_for == "self") {
                    buildTeamDropDownLists(nbaLists, nbaServiceCodes)
                    setNBATips("开通后会在高级会员过期后生效")
                }
                else if (IPAY.pay_for == "send") {
                    openDialog("返回", "好友已开通高级会员，您只能赠送高级会员", function () {
                        location.href = location.href + "&c=tynbalpqq&u=" + IPAY.target_uin
                    })
                }
            }
            else {
                if (IPAY.pay_for == "self") {

                    //什么都没有，正常开球队通,minipay加入暂不选择开基础班
                    if (IPAY.scene == "minipay") {
                        nbaLists["TXTYPCBY"] = "暂不选择"
                        nbaServiceCodes.unshift("TXTYPCBY")
                    }
                    buildTeamDropDownLists(nbaLists, nbaServiceCodes)

                    setNBATips('可看一支NBA球队全部比赛和其它付费比赛')
                }
                else if (IPAY.pay_for == "send") {
                    sendBaseVip()
                }
            }
        }


    }

    function sendBaseVip() {
        $("#team_select_list").hide()
        window._onlyCanSendBaseVip = true//标识该用户只能赠送基础版
    }

    function openDialog(clickText, dialogText, onClick) {
        $("#copyright_tips").append('' +
            '<div class="float-footer">' +
            '<div class="form-actions" style="float: none;text-align: center;">' +
            '<button type="button" class="btn-primary-small"><span>' + clickText + '</span></button>' +
            '</div>' +
            '</div>')
            .on("click", "button", function () {
                onClick()
            })
        $(".float-content .confirm-cont").css("padding-top", "5px")
        $("#copyright_text").text(dialogText)
        IPAY.alert("copyright_tips", 300, 150)
    }

    function setNBATips(tips) {
        if ($("#nba_tips").length > 0) {
            $("#nba_tips").text(tips)
        }
        else {

            $("#service_select_list").append(
                '<div class="help-block"  style="display: block;" id="nba_tips">' +
                tips +
                '</div>')
        }
    }

    function buildNBATeamSelector(options, serviceCodes, id, title, align) {
        align = align || 'right';
        var selectorTemplate = '<div id="{0}" data-type="selector" class="select-append select-game"><div data-type="selector_list_wrapper" class="btn-group"><label data-action="show_list" data-type="selected_item" class="select-mini"></label><button data-action="show_list" class="btn btn-mini"><i class="icon-caret"></i></button><div data-type="select_list" class="dropdown"></div></div></div>',
            optionTemplate = '<li><a title="{0}" data-action="select_item" href="javascript:void(0);">{0}</a></li>',
            $list = $('<ul class="list-menu"></ul>'),
            $selector = $('#' + id),
            column = Math.ceil(serviceCodes.length / IPAY._gameSelectorMaxRow),
            listClass = 'dropdown row' + (column <= 2 ? column : '-more') + (column >= 2 ? ' fl-' + align : '');

        $selector = $selector.length ? $selector : $(LIB.stringFormat(selectorTemplate, id));

        $.each(options, function (code, name) {


            var $item = $(LIB.stringFormat(optionTemplate, name))

            $item.find('a').data('value', code).data("name", name);
            $list.append($item);
        });
        $selector.find('label[data-type="selected_item"]').text(title);
        $selector.find('div[data-type="select_list"]').attr('class', listClass).empty().append($list);

        return $selector;
    }

    function buildTeamDropDownLists(nbaLists, serviceCodes) {

        if ($("#team_selector_field").length == 0) {

            $("#amount_input_field").after(
                '<div class="control-group" id="team_select_list">' +
                '<label class="control-label">开通球队：</label>' +
                '<div class="controls" id="team_selector_field">' +
                '<div id="team_selector_warning" class="help-block"><i class="icon-help"></i>请先选择球队</div>' +
                '</div>' +
                '</div>')
        }
        else {
            $("#team_selector_field").show()
        }

        if (!defaultTeam) {

            var title = IPAY.data.tynbaService ? nbaLists[IPAY.data.tynbaService.toUpperCase()] : "请选择球队"
            var $teamSelector = buildNBATeamSelector(nbaLists, serviceCodes, "team_selector", title)
            $("#team_selector_warning").before($teamSelector)
            $teamSelector.off("click", '[data-action="show_list"]').on('click', '[data-action="show_list"]', {ipay: IPAY}, function (e) {
                if (e.data.ipay._formLocked) return;

                var $wrapper = $(this).parent().toggleClass('open');
                $('div[data-type="selector_list_wrapper"]').not($wrapper).removeClass('open');
                e.stopPropagation();
            })
                .off("click", '[data-action="select_item"]')
                .on("click", '[data-action="select_item"]', function () {
                    var name = $(this).data('name');
                    $teamSelector.find('label[data-type="selected_item"]').text(name);
                    IPAY.data.tynbaService = $(this).data("value")
                    if (IPAY.current_channel == "weixin") {//球队发生变化重新刷新二维码
                        IPAY.selectChannel("weixin")
                    }
                    if (IPAY.current_channel == "qqwallet") {
                        IPAY.selectedChannel("qqwallet")
                    }
                    $("#team_selector_warning").hide()

                })

            $(document).click(function () {
                $('div[data-type="selector_list_wrapper"]').removeClass('open');
            });
        }
        else {
            if ($("#default_team").length == 0) {

                $("#team_selector_warning").before(
                    ' <div  class="controls-option"> \
                             <label _type="mode_radio" _value="month" class="selected">\
                                 <a class="radio-box" href="javascript:void(0);">\
                                     <span id="default_team"">' + nbaLists[defaultTeam] + '</span><i class="icon-check"></i>\
                            </a>\
                        </label>\
                </div>\
            ')
            }
            else {
                $("#default_team").text(nbaLists[defaultTeam])
            }
            IPAY.data.tynbaService = defaultTeam

        }
    }

    if (IPAY._defaultTargetType != "send") {
        init()
    }
})(ABTest, IPAY, LIB);
