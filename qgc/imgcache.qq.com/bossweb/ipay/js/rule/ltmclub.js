//rule for ltmclub
//@author xsbchen@tencent.com

;(function (IPAY, LIB, INFO, ABTest, w) {
//    if (IPAY.scene === 'minipay') {
//        // 会员4、6号段只显示qdqb、bank、cft、kj 4个长驻渠道
//        ABTest.addRule({
//            id: 'ltmclub_channels_1',
//            autoRun: true,
//            condition: function () {
//                var _last1stNum = IPAY.numOfUin(-1);
//                return IPAY.data.code === 'ltmclub' && (_last1stNum === 4 || _last1stNum === 6);
//            },
//            action: function () {
//                var _channels = ['qdqb', 'bank', 'cft', 'kj'];
//                var _allChannels = INFO.channels;
//                IPAY.channels = _channels;
//
//                $.each(_channels, function(i, v) {
//                    _allChannels[v].type = 'main';
//                });
//            }
//        });
//
//        // 重建渠道列表前执行规则：会员4、6号段只显示qdqb、bank、cft、kj 4个长驻渠道
//        ABTest.before(IPAY, 'rebuildChannelList', function () {
//            ABTest.run('ltmclub_channels_1');
//        });
//
//        // 重建渠道列表前执行规则：黄钻豪华版展示渠道与黄钻一样
//        ABTest.before(IPAY, 'selectChannel', function (_channel) {
//            if (ABTest.test('ltmclub_channels_1') && $.inArray(_channel, ['qdqb', 'bank', 'cft', 'kj']) === -1) {
//                return ['kj'];
//            }
//        });
//    }
    var ipay = IPAY;

    //检查当前页面的 aid ，如果是vip.pingtai.pay.pay_sqq2vip，则为超级QQ引导过来的用户
    var aid = LIB.getUrlParam('aid');


    var qqSpeedAid = ["vip.gongneng.client.xuanfeng.773_wjdx_nianfei",
        "vip.gongneng.client.xuanfeng.757_lx_kaitong",
        "vip.gongneng.client.xuanfeng.773_tx_putong",
        "vip.gongneng.client.xuanfeng.773_lx",
        "vip.gongneng.client.xuanfeng.773_90s",
        "vip.gongneng.act.xuanfeng.lixian",
        "vip.gongneng.client.xuanfeng.773_90sing",
        "vip.gongneng.client.xuanfeng.769_lx",
        "vip.gongneng.client.xuanfeng.769_tx_putong",
        "vip.gongneng.client.xuanfeng.769_90s",
        "vip.gongneng.bd.xuanfeng.lixian3",
        "vip.gongneng.client.xuanfeng.769_90sing",
        "vip.gongneng.client.xuanfeng.773_lx_kaitong",
        "vip.gongneng.client.xuanfeng_lixian_yq",
        "vip.gongneng.client.xuanfeng_lixian",
        "vip.gongneng.client.xuanfeng.772_tx_putong",
        "vip.gongneng.act.xuanfeng.shiyong",
        "vip.gongneng.client.xuanfeng.772_lx",
        "vip.gongneng.client.xuanfeng.773_tx_xufei",
        "vip.gongneng.client.xuanfeng.773_lx_xufei",
        "vip.gongneng.client.xuanfeng.769_lx_kaitong",
        "vip.gongneng.client.xuanfeng.757_tx_putong",
        "vip.gongneng.client.xuanfeng.772_90s",
        "vip.gongneng.client.xuanfeng.762_lx",
        "vip.gongneng.client.xuanfeng.757_lx",
        "vip.gongneng.client.xuanfeng.751_tx_putong",
        "vip.gongneng.client.xuanfeng.773_tx_nianfei",
        "vip.gongneng.client.xuanfeng.769_90sover",
        "vip.gongneng.client.xuanfeng.772_lx_kaitong",
        "vip.gongneng.client.xuanfeng.771_lx",
        "vip.gongneng.client.xuanfeng.751_90s",
        "vip.gongneng.client.xuanfeng.766_tx_putong",
        "vip.gongneng.client.xuanfeng.751_lx",
        "vip.gongneng.client.xuanfeng.773_90sover",
        "vip.gongneng.client.xuanfeng.771_tx_putong",
        "vip.gongneng.client.xuanfeng.772_90sing",
        "vip.pingtai.vipsite.tqxqy_jsxztop",
        "vip.gongneng.client.xuanfeng.757_90s",
        "vip.pingtai.vipsite.tqxqy_jsxzbottom",
        "vip.gongneng.client.xuanfeng.745_lx",
        "vip.gongneng.client.xuanfeng.760_lx",
        "vip.gongneng.client.xuanfeng.772_lx_xufei",
        "mvip.pt.vipsite.tqxqy_jsxz",
        "vip.gongneng.client.xuanfeng.769_tx_nianfei",
        "vip.gongneng.client.xuanfeng.769_tx_xufei",
        "vip.gongneng.client.xuanfeng.766_90sing",
        "mios.pt.vipsite.tqxqy_jsxz",
        "vip.gongneng.client.xuanfeng.762_tx_putong",
        "vip.gongneng.client.xuanfeng.751_90sing",
        "vip.gongneng.client.xuanfeng.766_90s",
        "vip.gongneng.client.xuanfeng.762_90s",
        "vip.gongneng.client.xuanfeng.766_lx_kaitong",
        "vip.gongneng.client.xuanfeng.743_lx_kaitong",
        "vip.gongneng.client.xuanfeng.751_lx_xufei",
        "vip.gongneng.client.xuanfeng.755_90s",
        "vip.gongneng.client.xuanfeng.771_90s",
        "vip.gongneng.client.xuanfeng.772_90sover",
        "vip.gongneng.client.xuanfeng.771_90sing",
        "vip.gongneng.client.xuanfeng.757_90sing",
        "vip.gongneng.client.xuanfeng.760_90s",
        "vip.gongneng.client.xuanfeng.771_90sover",
        "vip.gongneng.client.xuanfeng.745_90s",
        "vip.gongneng.client.xuanfeng.757_90sover"
    ]
    if (aid.indexOf('sqq2vip') > -1) {

        $('#about-vipstatus').html('<i class="icon-caret-top t1"></i><i class="icon-caret-top t2"></i><p style="text-align:center; color:#666">由于业务升级<br>超级QQ已升级为QQ会员！</p>').show();

        INFO.services[ipay.data.code].descs.list = '<p>系统已为您自动跳转<em>开通QQ会员</em></p>';

        $('div[stype="desc"]').html('<p>系统已为您自动跳转<em>开通QQ会员</em></p>').show();
    }

    function qqSpeedOpen(aid,qqSpeedAid){
        if ($.inArray(aid, qqSpeedAid) > -1) {
            $(".box-entry").hide()
            if ($("#qqspeed_tips").length == 0) {
                $("#left_sidebar")
                    .append('<div id="qqspeed_tips" style=" color:#666;float: left;margin-top: 10px;margin-left: 5px;">\
                        <p style="color: orange;">由于业务调整,QQ旋风将于2017.9.6停止运营。届时<span class="code_name">'+IPAY.data.name+'</span>将无法使用旋风相关特权。</p>\
                    <p style="color:black;margin-top: 5px;"><span class="code_name">' + IPAY.data.name + '</span>仍享80余项尊贵特权</p>\
                    <p><a target="_blank" href="http://vip.qq.com/">查看特权！</a></p>\
                </div>')
            }
            else {
                $("#qqspeed_tips").show().find(".code_name").text(IPAY.data.name)

            }


            var disableOpenDialog ='<div id="disable_ltmclub" class="float">' +
                '<div class="float-header">' +
                    '<h3><span>温馨提示</span></h3>' +
                '</div>' +
                '<div class="float-content">' +
                    '<div id="dlg_body" class="confirm attent">' +
                        '<i class="icon-confirm"></i>' +
                        '<div class="confirm-cont">' +
                            '<h5>因业务调整，QQ旋风将于2017.9.6停止运营。届时'+IPAY.data.name+'将无法使用旋风相关特权。\n' +
                IPAY.data.name+'仍享80余项尊贵特权：</h5>' +
                            '<ul style="list-style: disc;margin-left:17px;">' +
                                '<li>QQ等级最高2.2倍加速</li>'+
                                '<li>免费创建1000人群</li>'+
                                '<li>免费游戏礼包</li>'+
                                '<li>十万本书免费看</li>'+
                            '</ul>' +
                            '<h5><a href="https://vip.qq.com/" target="_blank">期待您继续开通会员服务！</a></h5>'
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="float-footer">' +

                '</div>' +
            '</div>'


            if($("#disable_cjclub").length==0){
                $("body").append(disableOpenDialog)
                IPAY.alert("disable_ltmclub",400,240)
            }
        }
    }

    qqSpeedOpen(aid,qqSpeedAid)



    /*ABTest.after(IPAY, '_doChannelCallback', function(){
     if (IPAY.scene === 'minipay') {
     if ($('#result_success>.ad-place')[0]) {
     $('#result_success>.ad-place').html('<a href="http://film.qq.com//act/openvip/qqvip.html?ptag=qqvip.qq" target="_blank"><img src="../../../../../imgcache.gtimg.cn/bossweb/ipay/images/pic/minipay_20140904.jpg"/*tpa=http://imgcache.gtimg.cn/bossweb/ipay/images/pic/minipay_20140904.jpg*//></a>');
     } else {
     $('#result_success').append('<div class="ad-place"><a href="http://film.qq.com//act/openvip/qqvip.html?ptag=qqvip.qq" target="_blank"><img src="../../../../../imgcache.gtimg.cn/bossweb/ipay/images/pic/minipay_20140904.jpg"/*tpa=http://imgcache.gtimg.cn/bossweb/ipay/images/pic/minipay_20140904.jpg*//></a></div>');
     }
     } else {
     $('#result_ad_area').html('<div class="ad-place"><a target="_blank" href="http://film.qq.com//act/openvip/qqvip.html?ptag=qqvip.qq"><img src="../../images/pic/pay_20140904.jpg"/*tpa=http://imgcache.qq.com/bossweb/ipay/images/pic/pay_20140904.jpg*//></a></div>');
     }
     LIB.loader('http://qzs.qq.com/tencentvideo_v1/js/report.webboss.min.js?r='+Math.random(),function(){
     'function'=== typeof report_webboss && report_webboss({"sPageId":'qqvip'});
     });
     });*/
    function setAmountTips(tips) {

        //清空检查是否需要显示年费信息
        IPAY.data.yearCode = null

        if (IPAY.pay_for !== "self") {
            IPAY._clearAmountTips()
            return
        }

        ABTest.after(IPAY, '_setAmountTips', function (tip) {
            if (tip.indexOf("年费") > -1) {
                $('#amount_tips').html("<em>" + tips + "</em>").removeClass('help-normal-empty');
            }
        });


        $('#amount_tips').html("<em>" + tips + "</em>").removeClass('help-normal-empty');


    }

    var handler = function () {

        if (ipay.openListInfo && ipay.openListInfo.list) {
            var list = ipay.openListInfo.list;
            var phone_vip = ['sjclub', 'wdylc', 'shsq', 'ddclub', 'qqhyjd', "cjhyjd", "cjhymdo"],
                phone_vip_code = 'sjsjch',
                phone_vip_flag = false,
                phone_vip_code_flag = false,
                hasCJCLUBHZ = false,
                hasCJCLUBHZZ = false,
                hasLTMCLUB = false

            for (var i = 0, j = list.length; i < j; i++) {
                var _code = list[i].servicecode.toLowerCase();
                if ($.inArray(_code, phone_vip) > -1) {
                    phone_vip_flag = true;
                }
                if (phone_vip_code == _code) {
                    phone_vip_code_flag = true;
                }
                if (_code == "cjclubhz") {
                    hasCJCLUBHZ = true
                }
                if (_code == "cjclubhzz") {
                    hasCJCLUBHZZ = true
                }
                if (_code == "ltmclub") {
                    hasLTMCLUB = true
                }
            }

            if (hasLTMCLUB && hasCJCLUBHZZ) {

                setAmountTips('保持手机付费，开通QQ会员可续费超级会员')
            }

            if (hasCJCLUBHZ) {
                setAmountTips('已开通QQ会员，加10元/月即可成为超级会员')
            }

            if (!phone_vip_flag && phone_vip_code_flag) {//无手机会员,但是有sjsjch,此种情况一般是手机开通sjsjch后取消了手机会员
                setAmountTips('完成支付并<a href="http://vip.qq.com/cjclubguid" target="_blank">激活手机会员</a>，可升级超级会员');
            }

            if (phone_vip_flag) {//有手机会员
                setAmountTips('本次支付天数将保存在预存账户');
            }

            w._to_replace_service_code = (!phone_vip_flag && phone_vip_code_flag);
            /*LIB.cookie.set('data_cache_base', '', {});
             (!phone_vip_flag && phone_vip_code_flag) && !LIB.cookie.get('data_cache_base') && LIB.cookie.set('data_cache_base',LIB.JSON.stringify(ipay.data),{});
             //针对用户手机状态已冻结，但是曾经续费过sjsjch业务的情况
             if (!phone_vip_flag && phone_vip_code_flag) {
             ABTest.before(IPAY, 'submit', function(opts) {
             if (IPAY.data.code=='cjclub'||IPAY.data.code=='cjclubt') return [opts];

             if (IPAY.pay_for==='send') {
             IPAY.data = LIB.JSON.parse(LIB.cookie.get('data_cache_base'));
             } else {
             IPAY.data.code = 'sjsjch';
             IPAY.data.sid = 'sjsjch';
             IPAY.data.baseCode = 'sjsjch';
             IPAY.data.targetCode = 'sjsjch';
             }
             return [opts];
             });
             } else {
             LIB.cookie.get('data_cache_base') && (ipay.data = LIB.JSON.parse(LIB.cookie.get('data_cache_base')));
             }*/
        } else {

        }

    };

    if (IPAY.data.code == "ltmclub") {
        if (ipay.openListInfo) {
            handler();
        } else {
            LIB.ajax.getJSON('/cgi-bin/account/get_open_service_list.cgi?r=' + Math.random(), function (res) {
                ipay.openListInfo = res.resultinfo;
                handler();
            }, function () {
                handler();
            });
        }
    }


    function check() {
        if (IPAY.data.code == "ltmclub") {
            if (IPAY.pay_for !== 'self') {
                IPAY._checkAndShowFriendTips()
            }
            else {
                handler();

            }
        }
    }


    var midas

    function initMidasAPI() {
        var promise = $.Deferred()
        return function () {
            if (!midas) {

                if (window.MidasJSApi) {

                    midas = new MidasJSApi({
                        offerId: IPAY.data.appid,
                        uin: IPAY.uin,
                        skey: LIB.cookie.get('skey')
                    }, {
                        debug: IPAY.debug,
                        cgi: {
                            sandbox: IPAY.debug
                        }
                    })
                    promise.resolve(midas)
                }
                else {
                    $.getScript("../../../../../midas.gtimg.cn/h5pay/js/lib/midas.api.min.js"/*tpa=https://midas.gtimg.cn/h5pay/js/lib/midas.api.min.js*/)
                        .done(function (script, textStatus) {
                            midas = new MidasJSApi({
                                offerId: IPAY.data.appid,
                                uin: IPAY.uin,
                                skey: LIB.cookie.get('skey')
                            }, {
                                debug: IPAY.debug,
                                cgi: {
                                    sandbox: IPAY.debug
                                }
                            })
                            promise.resolve(midas)

                        })
                }

            }
            else {
                promise.resolve(midas)
            }
            return promise
        }
    }

    function checkWechatBind(provideUin, cb) {

        var getMidasInstance = initMidasAPI()
        getMidasInstance()
            .done(function (midas) {
                midas.qqClubBindStatus({
                    provideUin: provideUin
                }, function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        cb(result.qqClubBind == 1 || result.historyBind == 1)
                    }
                })
            })


    }

    ABTest.after(IPAY, 'selectService', function () {
        check()
        checkWechatBind(IPAY.target_uin, function (isBind) {
            if (isBind && IPAY.data.code=="ltmclub") {
                IPAY.alert("switch_prompt", 456, 150)
            }

        })

        qqSpeedOpen(aid,qqSpeedAid)
    });

    ABTest.after(IPAY, 'selectPayMode', function () {
        check()
        checkWechatBind(IPAY.target_uin, function (isBind) {
            if (isBind && IPAY.data.code=="ltmclub") {
                IPAY.alert("switch_prompt", 456, 150)
            }

        })
    });

    ABTest.after(IPAY, 'updateTargetUin', function (uin) {
        check()
        checkWechatBind(uin, function (isBind) {
            if (isBind && IPAY.data.code=="ltmclub") {
                IPAY.alert("switch_prompt", 456, 150)
            }
        })
        return [uin];
    });

    $('head').append('<link rel="stylesheet" href="../../css/pay/account.css"/*tpa=https://imgcache.qq.com/bossweb/ipay/css/pay/account.css*/ type="text/css" />');

    var switchCjclubDialog = '<div class="modal-dialog" id="switch_prompt" style="display: none;">\
                                <div class="modal-content">\
                                    <div class="modal-header">\
                                    </div>\
                                    <div class="modal-body">\
                                        <p class="txt">此号码已绑定微信，请开通超级会员</p>\
                                    </div>\
                                    <div class="modal-footer">\
                                        <div class="buttons">\
                                            <a href="javascript:;" class="btn-secondary-new" id="switch_account">换帐号</a>\
                                            <a href="javascript:;" class="btn-primary-new" id="switch_cjclub">开通超级会员</a>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>'


    $("body").append(switchCjclubDialog)
    $("#switch_account").on("click", function (event) {
        event.preventDefault()
        event.stopPropagation()
        $("#switch_prompt,#mybg").hide()

        $('a[data-action="show-friend-list"]').trigger("click")
        IPAY.report("swtich.account",true)
    })

    $("#switch_cjclub").on("click", function (event) {
        event.preventDefault()
        event.stopPropagation()
        $("#switch_prompt,#mybg").hide()
        var servieNameList = IPAY.getParam('c')
        var superService
        $.each(servieNameList, function (i, service) {
            if (service == "cjclub") {
                superService = service
            }
            if (service == "cjclubt") {
                superService = service
            }
        })
        if (superService) {
            IPAY.selectService(superService)
        }
        else {
            location.href = location.href.replace(/c=[^&]+/, "") + "&c=cjclub"
        }
        IPAY.report("switch.cjclub",true)
    })


    if (location.href.indexOf('&u=&') == -1) {
        checkWechatBind(IPAY.uin, function (isBind) {
            if (isBind && IPAY.data.code == "ltmclub") {
                IPAY.alert("switch_prompt", 456, 150)
            }

        })
    }

})(IPAY, LIB, INFO, ABTest, window);