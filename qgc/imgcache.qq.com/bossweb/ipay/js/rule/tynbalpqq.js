/**
 * Created by shaynegui on 2016/9/13.
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
        actid = LIB.getUrlParam('actid') || "MP20160918203441815_03",
        nbaServiceCodes = (function () {
            var codes = []
            $.each(nbaLists, function (code, name) {
                codes.push(code)
            })
            return codes

        })()

    var defaultPayMode

    IPAY.langs.success_more_href = null//屏蔽支付成功后的更多详情

    window.globalPrice = window.globalPrice || {

            totalPrice: {}
        }
    IPAY.openServicesList = {}
    $.extend(window.globalPrice, {
        "MP20160918203441815_03": {
            discounts: function (amount) {
                var price = 0
                if (amount == 1) {
                    price = 88
                }
                else if (amount == 2) {
                    price = 90
                }
                else if (amount == 3) {
                    price = 198 / 3
                }
                else if (amount >= 4 && amount <= 11) {
                    price = 90 * 0.75
                }
                else if (amount == 12) {
                    price = 720 / 12
                }
                else if (amount > 12) {
                    price = 90 * 0.67
                }
                return price
            },
            // "1": 88,
            // "3": 198,
            // "12": 720,
            tips: "1个月88元，3个月198元，12个月720元，其它月份享受阶梯折扣"
        },
        "MP20160913181442228_01": {
            "12": 648,
            tips: "早鸟优惠！NBA联盟通年费6折，仅648元"
        },
        "MP20160913181442228_03": {
            "12": 798,
            tips: "NBA联盟通年费+正版帽子，仅798元"
        },
        "MP20160913181442228_04": {
            "12": 698,
            tips: "NBA联盟通年费+正版T恤，仅698元"
        },
        "MP20161215174539589_02": {
            "3": 188,
            tips: "3个月188"
        },
        "MP20161117133832029_01": {
            discount: 0.75,
            "1": 88,
            "3": 198,
            "12": 720,
            tips: "1个月88元，3个月198元，12个月720元"
        }
    })


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


    ABTest.after(IPAY, 'selectService', function (service) {
        if (service == "tynbalpqq") {
            getOpenServiceList(function () {
                IPAY.selectPayMode("month")
            })

            scanQrCode(IPAY.current_channel)
        }
    });


    ABTest.after(IPAY, 'updateAmount', function (amount) {
        scanQrCode(IPAY.current_channel)
    });

    // ABTest.before(IPAY, "updateAmount", function (amount) {
    //
    //     calcPrice(amount)
    // })

    ABTest.after(IPAY, "updateTargetUin", function (uin) {
        if (IPAY.pay_for == "send" && IPAY.data.code.toUpperCase() == "TYNBALPQQ") {

            getOpenServiceList(function () {
                IPAY.selectPayMode("month")
            })
        }
    })

    ABTest.before(IPAY, "selectChannel", function (channel, cb) {
        return [channel, function () {
            cb && cb()

            scanQrCode(channel)
            // //屏蔽财付通自动续费
            // IPAY.params["autopay"] = "0"
            // //$("#qdqb_auto_checkbox").hide()
        }]
    })

    function scanQrCode(channel) {

        if (channel == "weixin" && ( IPAY.data.code.toUpperCase() == "TYNBALPQQ")) {

            var url = location.protocol + "//pay.qq.com/h5/index.shtml?m=buy&c=" + (IPAY.pay_mode == "upgrade" ? "tyupvipqq" : "tynbalpqq") + "&style=wechat&direct=1&wechat=1&u=" + IPAY.target_uin + "&n=" + IPAY.amount + (IPAY.getParam('aid', '') ? '&aid=' + IPAY.getParam('aid', '') : '') + (IPAY.getParam('actid') ? '&mpid=' + IPAY.getParam('actid') : '') + (IPAY._uuid ? '&uuid=' + IPAY._uuid + '&pt=NodeJS' : '') + (IPAY.getParam('debug') ? '&sandbox=1' : '')
            setTimeout(function () {
                $('#wxpay1 .img-rwm img').attr("src", '//pay.qq.com/cgi-bin/account/get_qr_image.cgi?size=100&url=' + encodeURIComponent(url))
            }, 100)
        }
        if (channel == "qqwallet" && ( IPAY.data.code.toUpperCase() == "TYNBALPQQ")) {

            var url = location.protocol + "//pay.qq.com/h5/mqqservice.shtml?codeid=" + (IPAY.pay_mode == "upgrade" ? "tyupvipqq" : "tynbalpqq") + "&target_uin=" + IPAY.target_uin + "&n=" + IPAY.amount + "&" + (IPAY.scene == 'pay' ? 'pf=pay.morech.qqwallet&aid=' + (IPAY.getParam("aid") ? IPAY.getParam("aid") : 'pay.andriod.qqwallet') : 'pf=minipay.morech.qqwallet&aid=' + (IPAY.getParam("aid") ? IPAY.getParam("aid") : 'minipay.andriod.qqwallet')) + (IPAY.getParam('actid') ? '&discountid=' + IPAY.getParam('actid') : '') + (IPAY._uuid ? '&uuid=' + IPAY._uuid + '&pt=NodeJS' : '') + (IPAY.getParam('debug') ? '&sandbox=1' : '')
            setTimeout(function () {
                $('.ios-qrcode-cont__img').attr("src", '//pay.qq.com/cgi-bin/account/get_qr_image.cgi?size=178&url=' + encodeURIComponent(url))
            }, 100)
        }
    }

    /**
     * 计算整开的价格
     * @param amount
     */
    function calcDirectPrice(amount) {
        if (IPAY.data.code == "tynbalpqq") {
            if (window.globalPrice[actid] && window.globalPrice[actid][amount]) {

                (IPAY.data.price = (window.globalPrice[actid][amount] / amount))
            }
            else if ($.isFunction(window.globalPrice[actid]["discounts"])) {

                (IPAY.data.price = window.globalPrice[actid]["discounts"](amount))
            }
            else {
                IPAY.data.price = INFO.services[IPAY.data.code].orgPrice;
            }
        }
    }

    function setMPDiscount(IPAY, actid) {

        if (IPAY.data.code == "tynbalpqq") {

            // window.globalPrice[actid] && $.each(window.globalPrice[actid], function (month, totalPrice) {
            //     if ($.isNumeric(month)) {
            //
            //         // window.globalPrice.totalPrice[month] = totalPrice
            //     }
            // })

            window.globalPrice[actid][IPAY.amount] && (IPAY.data.price = (window.globalPrice[actid][IPAY.amount] / IPAY.amount))

            $.isFunction(window.globalPrice[actid]["discounts"]) && (IPAY.data.price = window.globalPrice[actid]["discounts"](IPAY.amount))
            ABTest.before(IPAY, "gotoRechargeStep", function (data) {
                calcDirectPrice(IPAY.amount)

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

    function checkUpgrade(serviceData, payMode) {
        var mode = payMode

        if (IPAY.data.code == "tynbalpqq" || IPAY.data.code == "tyupvipqq") {

            mode = IPAY.pay_for == "send" ? "month" : payMode
            $("#show_teamactivate").hide()

            $("#pay_channel_field,#main_template,#amount_input_field,#pay_mode_field").show()

            $("#service_info_wrapper h3[stype='name']").text("腾讯体育会员")


            $("#service_selector_field").show()

            setMPDiscount(IPAY, actid)
            if (IPAY.openServicesList[IPAY.target_uin]) {
                mode = handler(IPAY.openServicesList[IPAY.target_uin], new Date().toLocaleDateString(), serviceData, payMode)
            }
            else {
                mode = "month"//取不到开通服务列表默认整开
            }
            $("#team_select_list").remove()
        }
        else {
            $('#mode_select_list').find('label[_value="upgrade"]').hide();//其他服务如球队通隐藏升级
            mode == "upgrade" && (mode = "month")//联盟通升级模式切换到球队通时，选中按月开通
        }
        return mode
    }

    function getOpenServiceList(callback) {
        var sandbox = IPAY.getParam("sandbox"), debug = IPAY.getParam("debug"), domain = ""
        if (sandbox == 1) {
            domain = "sandbox."
        }
        else if (sandbox == 2) {
            domain = "dev."
        }
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
                }
                callback()
            })
    }

    function parseStandardDate(date) {
        //获取当前0点为基准,时间格式为RFC2822 标准日期字符串
        return +new Date(date.substr(0, 10).replace(/\-|年|月/g, "/").replace("日","") + " 00:00:00 +0800")
    }

    function monthDiff(date1, date2) {
        return ~~((date1 - date2) / ( 86400000 * 31 ))
    }

    function getUpgradePrice(amount, openedNBATeams) {
        var reduction = 0
        var discount = (globalPrice[actid] && globalPrice[actid]["discount"] ) || 1
        $.each(openedNBATeams, function (code, val) {
            reduction += Math.min(amount, val.maxUpgradeMonth) * 30
        })

        return (amount * INFO.services[IPAY.data.code].orgPrice - reduction) * 100 * discount / 100
    }


    function handler(services, now, serviceData, payMode) {
        var hasNBATeamVIP = false,
            hasTYBaseVIP = false,
            hasNBAUnionVIP = false,
            NBAUnionCloseTime = parseStandardDate(now),
            openedNBATeams = {},
            opendNBATeamsArray = [],
            maxUpgradeMonth = 0,
            oneMoreMonthTeams = []//满足球队通大于联盟通一个月的数组
        $.each(services, function (index, service) {
            var serviceCode = (service.service_code || service.pack_txty_service_code).toUpperCase()
            if (new Date(service.end_time || service.pack_txty_end_time) > parseStandardDate(now)) {
                switch (serviceCode) {
                    case "TXTYPCBY"://拥有基础版
                        hasTYBaseVIP = true;
                        break;
                    case "TYNBALPQQ"://拥有联盟通
                        hasNBAUnionVIP = true;
                        NBAUnionCloseTime = parseStandardDate(service.end_time || service.pack_txty_end_time)
                        break;

                }

            }

        })

        $.each(services, function (index, service) {

            var serviceCode = (service.service_code || service.pack_txty_service_code).toUpperCase(),
                maxTeamUpgradeUnionMonth
            if ($.inArray(serviceCode, nbaServiceCodes) > -1 && (service.expire || service.pack_txty_expire) > 0) {
                hasNBATeamVIP = true
                openedNBATeams[serviceCode] = {closetime: parseStandardDate(service.end_time || service.pack_txty_end_time)}
                opendNBATeamsArray.push(serviceCode)
                maxTeamUpgradeUnionMonth = monthDiff(parseStandardDate(service.end_time || service.pack_txty_end_time), NBAUnionCloseTime)
                if (maxTeamUpgradeUnionMonth > 0) {
                    if (maxTeamUpgradeUnionMonth > maxUpgradeMonth) {
                        maxUpgradeMonth = maxTeamUpgradeUnionMonth//获得最大可升级月份，为球队通最长的那个队
                    }
                    oneMoreMonthTeams.push(serviceCode)//首先判断用户是否有超过3只有效期大于一个月的球队通，自动帮用户激活联盟通
                }
                openedNBATeams[serviceCode]["maxUpgradeMonth"] = maxTeamUpgradeUnionMonth > 0 ? maxTeamUpgradeUnionMonth : 0
            }
        })
        function getTotalCalcPrice(amount) {
            if (IPAY.data.code.toUpperCase() == "TYNBALPQQ") {


                var totalPrice = 0
                if (IPAY.pay_mode == "upgrade") {
                    totalPrice = getUpgradePrice(amount, openedNBATeams)
                    if (totalPrice == 0) {
                        IPAY.data.price = 0
                    }
                    else {

                        IPAY.data.price = totalPrice / amount
                    }
                    window.globalPrice.totalPrice[amount] = null
                }
                else {
                    calcDirectPrice(amount)
                }
            }
        }

        ABTest.before(IPAY, "onAmountChange", function (amount) {
            getTotalCalcPrice(amount)
        })
        ABTest.before(IPAY, "updateAmount", function (amount) {
            getTotalCalcPrice(amount)

        });

        ABTest.before(IPAY, "selectChannel", function (channel, cb) {
            return [channel, function () {
                cb && cb()
                ABTest.before(IPAY, "onAmountChange", function (amount) {
                    getTotalCalcPrice(amount)
                })
            }]
        })

        ABTest.before(IPAY, "submit", function (opts) {
            opts = opts || {};
            opts.data = opts.data || {};
            if (IPAY.pay_mode == "upgrade" && IPAY.data.code.toLowerCase() == "tynbalpqq") {
                opts.data.service_code = "tyupvipqq".toUpperCase()
            }
        })

        if (opendNBATeamsArray.length >= 3 && oneMoreMonthTeams.length >= 3) {


            $("#copyright_tips").append('' +
                '<div class="float-footer">' +
                '<div class="form-actions" style="float: none;text-align: center;">' +
                '<button type="button" id="upgrade_union" class="btn-primary-small"><span>确认升级</span></button>' +
                '</div>' +
                '</div>')
                .on("click", "button#upgrade_union", function () {
                    if (IPAY.agree_term) {
                        IPAY.report("3team.free.goto.unionactivate", true)
                        var self = this
                        var domain = ""
                        if (IPAY.getParam("sandbox") == 1) {
                            domain = "sandbox."
                        }
                        else if (IPAY.getParam("sandbox") == 2) {
                            domain = "dev."
                        }

                        $.ajax({
                            url: "//" + domain + "api.unipay.qq.com/v1/r/" + IPAY.data.appid + "/wechat_query",
                            data: {
                                cmd: 21,
                                pf: 'vip_m-pay_html5-html5',
                                openid: IPAY.target_uin,
                                openkey: LIB.cookie.get("skey"),
                                session_id: "uin",
                                session_type: "skey",
                                format: "jsonp__unionActivate",
                                remark: encodeURIComponent("aid=" + IPAY.getParam("aid"))
                            },
                            type: "get",
                            dataType: "jsonp",
                            jsonp: false,
                            jsonpCallback: "_unionActivate"
                        })
                            .done(function (res) {
                                if (res.ret == 0) {
                                    IPAY.selectChannel("qdqb", function () {//防止调用dochannelCallback失败，先切换渠道

                                        IPAY.langs.success_for_self = "恭喜您，成功激活" + res.open_month + "个月" + IPAY.data.name
                                        IPAY._doChannelCallback({result: {result_code: 0}})
                                        $("#copyright_tips").hide()
                                    })
                                }
                                else {
                                    if ($("#upgrade_union_err_msg").length == 0) {
                                        $("#copyright_text").after(
                                            '<div class="layer-error warning" >' +
                                            '<i class="icon-help"></i>' +
                                            '<em id="upgrade_union_err_msg">' + res.msg + '</em>' +
                                            '</div>')
                                    }
                                    else {
                                        $("#upgrade_union_err_msg").text(res.msg)
                                    }
                                }
                            })

                    }
                })
            $(".float-content .confirm-cont").css("padding-top", "5px")
            $("#copyright_text").text("您已开通2只以上球队，可直接激活高级会员")
            IPAY.alert("copyright_tips", 300, 180)


        }
        else {
            if (maxUpgradeMonth > 0 && IPAY.pay_for == "self") {
                $('#mode_select_list').find('label[_value="upgrade"]').show();
                if (payMode == "upgrade") {

                    serviceData.maxAmount = maxUpgradeMonth
                    serviceData.defaultAmount = ((IPAY._defaultAmount <= maxUpgradeMonth && IPAY._defaultAmount > 0) ? IPAY._defaultAmount : maxUpgradeMonth)
                    IPAY._setAmountTips(LIB.stringFormat('根据您当前包月服务状态，最多可优惠升级<em>{0}</em>个月的' + IPAY.data.name, maxUpgradeMonth));
                    serviceData.mode = "upgrade"
                    serviceData.price = getUpgradePrice(IPAY.amount, openedNBATeams) / IPAY.amount
                    $("#mp_tips").parent().hide()
                    return payMode
                }
            }
            else if (payMode == "upgrade") {//如果检查升级又不满足升级条件返回按月付费
                payMode = "month"
            }

            if (payMode == 'month' || payMode == 'year') {
                //用户切换升级到按月或者是按年，修改单价到包月的价格

                $("#mp_tips").parent().show()
                serviceData.price = INFO.services[serviceData.code].orgPrice;
                if (maxUpgradeMonth <= 0 || IPAY.pay_for == "send") {//不能升级或赠送隐藏升级按钮
                    $('#mode_select_list').find('label[_value="upgrade"]').hide();
                }
                IPAY._clearAmountTips();
                serviceData.maxAmount = 999;
                serviceData.defaultAmount = 3;
                serviceData.mode = "service"
                //_self.selectPayMode(mode);
                if (!hasTYBaseVIP) {

                    if (hasNBATeamVIP) {
                        setNBATips('未消费的会员将在高级会员过期后生效')
                    }
                    else {
                        setNBATips('可看全部NBA比赛和其它付费比赛')
                    }
                }
                else {
                    if (!hasNBATeamVIP && !hasNBAUnionVIP) {
                        //提示用户进球队升级
                        if (IPAY.pay_for == "self") {

                            $("#copyright_tips").append('' +
                                '<div class="float-footer">' +
                                '<div class="form-actions" style="float: none;text-align: center;">' +
                                '<button type="button" id="upgrade_nbateam" class="btn-primary-small"><span>选择球队</span></button>' +
                                '</div>' +
                                '</div>')
                                .on("click", "button#upgrade_nbateam", function () {
                                    IPAY.report("nba.goto.teamchoose", true)
                                    IPAY.load(["tynba"])
                                    $("#mybg").remove()
                                    $('#copyright_tips').detach();
                                })
                            $(".float-content .confirm-cont").css("padding-top", "5px")
                            $("#copyright_text").text("您可免费选择一支球队")
                            IPAY.alert("copyright_tips", 300, 150)
                        }
                        else if (IPAY.pay_for == "send") {
                            $("#copyright_tips").append('' +
                                '<div class="float-footer">' +
                                '<div class="form-actions" style="float: none;text-align: center;">' +
                                '<button type="button" id="refresh_nbateam" class="btn-primary-small"><span>返回</span></button>' +
                                '</div>' +
                                '</div>')
                                .on("click", "button#refresh_nbateam", function () {
                                    location.reload()
                                })
                            $(".float-content .confirm-cont").css("padding-top", "5px")
                            $("#copyright_text").text("需要您的好友先选球队升级，才能继续赠送")
                            IPAY.alert("copyright_tips", 300, 150)
                        }
                    }
                    else if (hasNBATeamVIP) {
                        setNBATips('未消费的会员将在高级会员过期后生效')
                    }
                    else {
                        setNBATips('可看全部NBA比赛和其它付费比赛')
                    }
                }

                return payMode
            }
        }


    }

    function setNBATips(tips) {
        if ($("#nba_tips").length > 0) {
            $("#nba_tips").text(tips)
        }
        else {
            $("#service_select_list").append(
                '<div class="help-normal" style="display: block;" id="nba_tips">' +
                tips +
                '</div>')
        }
    }


    IPAY._checkUpgrade = checkUpgrade//覆盖默认的检测升级函数,星钻的升级比较特殊
    //amountType，我理解的是，如果我不传，那你应该是默认指定（升级，无发升级则包月）
    //如果我指定了，并且有效，那就用我指定的（指定无效值则同上处理）
    switch (IPAY.getParam("nt")) {
        case "year":
            defaultPayMode = "year"
            break;
        case "month":
            defaultPayMode = "month"
            break;
        default :
            defaultPayMode = "upgrade"
    }

    getOpenServiceList(function () {
        if (IPAY._defaultTargetType != "send") {
            IPAY.selectPayMode(defaultPayMode)
        }

    })

    // init()
})(ABTest, IPAY, LIB);

