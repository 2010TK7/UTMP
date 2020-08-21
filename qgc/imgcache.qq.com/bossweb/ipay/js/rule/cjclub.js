/**
 * @author cherryma
 */
;
(function (ABTest, IPAY, LIB, W, INFO) {

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
    var _checkFlag = function () {

        var handle = function () {

            var flag = false;//标记初始化为非会员，非超级会员
            var _data = {},
                phone_vip_arr = ['sjclub', 'wdylc', 'shsq', 'ddclub', 'qqhyjd'],
                phone_vip = [/* 'sjclub', 'wdylc', 'shsq', 'ddclub', 'qqhyjd', */'sjsjch'],
                phone_postPayCode = ["cjhyjd", "cjhymdo"],
                aid = LIB.getUrlParam('aid'),
                phone_vip_code = 'sjsjch',
                phone_vip_flag = false,
                phone_vip_tips = false,
                phone_vip_sign = false,
                hasPostPayCode = false,
                hasCJCLUBH = false;

            if (ipay.openListInfo && ipay.openListInfo.list) {
                var list = ipay.openListInfo.list;

                for (var i = 0, j = list.length; i < j; i++) {
                    var _code = list[i].servicecode.toLowerCase(), v = ipay.data;
                    //TODO: 先灰度续费用户，新开用户暂时屏蔽
                    //先对aid在白名单中的请求进行灰度
                    if ($.inArray(_code, phone_vip) > -1) {
                        phone_vip_flag = true;
                    }
                    if($.inArray(_code,phone_postPayCode)>-1){
                        hasPostPayCode = true
                    }
                    if (phone_vip_code == _code) {
                        phone_vip_tips = true;
                    }
                    if ($.inArray(_code, phone_vip_arr) > -1) {
                        phone_vip_sign = true;
                    }
                    if (_code == "cjclubhz" || _code == "cjclubhzz") {
                        hasCJCLUBH = true
                    }
                    if (v.baseCode == _code || v.targetCode == _code) {
                        flag = true; //会员或者超级会员
                    }
                }
            }


            if (!phone_vip_sign && phone_vip_flag) {//无手机会员,但是有sjsjch,此种情况一般是手机开通sjsjch后取消了手机会员

                //changeServiceTipsAndCode('手机服务冻结，预付费到期，请<a href="http://vip.qq.com/cjclubguid" target="_blank">重新激活</a>',"cjclubt")
                setAmountTips('手机服务冻结，预付费到期，请<a href="http://vip.qq.com/cjclubguid" target="_blank">重新激活</a>')

                return

                //location.href = 'http://pay.qq.com/ipay/' + (IPAY.scene === 'minipay' ? 'mini.shtml?s=minipay&' : 'index.shtml?') + 'c=ltmclub&n=' + IPAY.getParam('n', '') + '&aid=' + IPAY.getParam('aid', '');
            }

            if (phone_vip_sign || phone_vip_flag) {
                ipay.getUniphoneCode = function (code) {//给话费渠道开通预付费的sjsjch使用
                    if (code == "cjclub" || code == "cjclubt") {
                        return "sjsjch"
                    }
                }

                // IPAY.channels = $.grep(IPAY.channels, function (channel, i) {
                //     return channel.toLowerCase() != "uniphone"
                // })
                // IPAY.rebuildChannelList()
            }

            //TODO:
            LIB.cookie.set('data_cache', '', {});
            !LIB.cookie.get('data_cache') && LIB.cookie.set('data_cache', LIB.JSON.stringify(ipay.data), {});

            function changeServiceTipsAndCode(tips, servicecode) {
                //$('#pay_mode_field').hide();
                //ipay.selectPayMode('month');
                ipay.data.params = {};
                ipay.data.price = 10;
                ipay.onAmountChange(IPAY.amount)
                ipay.data.targetCode = servicecode

                ABTest.before(IPAY, 'submit', function (opts) {
                    if (IPAY.data.code == 'ltmclub') return [opts];

                    if (IPAY.pay_for === 'send') {
                        IPAY.data = LIB.JSON.parse(LIB.cookie.get('data_cache'));
                        if (IPAY.data.type == 'upgrade') {
                            IPAY.data.params = {
                                service_code: 'CJCLUBT',
                                open_detail: 'LTMCLUB_{0},CJCLUB_{1}'
                            }
                        }
                    } else {
                        IPAY.data.price = 10;
                        IPAY.data.code = servicecode;
                        IPAY.data.sid = servicecode;
                        IPAY.data.baseCode = servicecode;
                        IPAY.data.targetCode = servicecode;
                        IPAY.data.params = {};
                    }
                    return [opts];
                });

            }

            function setAmountTips(tips) {

                if (IPAY.pay_for !== "self") {
                    IPAY._clearAmountTips()
                    return
                }


                $('#amount_tips').html("<em>" + tips + "</em>").removeClass('help-normal-empty');


            }

            if (hasCJCLUBH) {//有超Q转会员
                changeServiceTipsAndCode('保持手机付费，加10元/月即可升级超级会员', 'ltmclub')
                setAmountTips('保持手机付费，加10元/月即可升级超级会员')

            }
            else if (phone_vip_flag) {

                changeServiceTipsAndCode('保持手机付费，加10元/月即可续费超级会员', 'sjsjch')
                setAmountTips('保持手机付费，加10元/月即可续费超级会员')

                /*ABTest.after(IPAY, 'submit', function(opts){
                 IPAY.data = LIB.JSON.parse(LIB.cookie.get('data_cache'));
                 return [opts];
                 });*/

            }
            else if (phone_vip_sign) {//只有手机会员,无sjsjch
                changeServiceTipsAndCode('保持手机付费，加<em>10</em>元/月即可升级超级会员', 'sjsjch')
                setAmountTips('保持手机付费，加<em>10</em>元/月即可升级超级会员')

            }
            else if (hasPostPayCode) {
                setAmountTips('本次支付天数将保存在预存账户')
            }
            else {
                $('#pay_mode_field').show();
                //$('#amount_tips').html('');
                LIB.cookie.get('data_cache') && (ipay.data = LIB.JSON.parse(LIB.cookie.get('data_cache')));
            }
            //该用户有资格，但并非会员或者超级会员增加显示手机渠道
            if (!flag && !_hasUniphone()) {
                //判断渠道是否为固定，固定渠道中是否有手机渠道
                if (!ipay._showOtherChannels) {
                    var _chArr = ipay.getParam('ch'), n = 0;
                    for (var i = 0; i < _chArr.length; i++) {
                        if (_chArr[i] != 'uniphone') {
                            n++;
                        }
                    }
                    //固定渠道有手机渠道
                    if (n != _chArr.length) {
                        INFO.services[ipay.data.code].channels.pay.self.push("uniphone");
                        INFO.services[ipay.data.code].channels.minipay.self.push("uniphone");
                        hasUniphone = true;
                        //重新渲染渠道
                        ipay.rebuildChannelList();
                    }
                } else {
                    //增加显示手机渠道
                    INFO.services[ipay.data.code].channels.pay.self.push("uniphone");
                    INFO.services[ipay.data.code].channels.minipay.self.push("uniphone");
                    hasUniphone = true;
                    //重新渲染渠道
                    ipay.rebuildChannelList();
                }
            }
        };

        var ipay = IPAY;

        //检验当前状态，用户是会员或者是超级会员展示预付费渠道，否增加显示手机渠道
        if (ipay.openListInfo) {
            handle();

        } else {

            var success = function (res) {
                ipay.openListInfo = res.resultinfo;
                handle();
            };
            var error = function () {
                handle();
            };

            var url = "/cgi-bin/account/get_open_service_list.cgi?r=" + Math.random();
            LIB.ajax.getJSON(url, success, error);

        }

    };

    var _hasUniphone = function () {

        var ipay = IPAY;
        //判断channels中是否已经存在手机渠道
        var arr = INFO.services[ipay.data.code].channels.pay.self;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == 'uniphone') return true;
        }
        return false;
    };

    if (IPAY.data.code === 'cjclub' || IPAY.data.code === 'cjclubt') {
        _checkFlag();
    }

    ABTest.after(IPAY, 'selectPayMode', function () {
        check()
    });

    ABTest.after(IPAY, 'selectService', function () {
        check()
    });

    ABTest.after(IPAY, 'updateTargetUin', function (opts) {
        check()
        return [opts];
    });

    ABTest.before(IPAY, 'selectChannel', function (channel,cb) {
        if(channel=="weixin" && IPAY.pay_for=="send"){
            IPAY.data.targetCode = "cjclubt"
        }

    });
    function check() {
        if (IPAY.data.code === 'cjclub' || IPAY.data.code === 'cjclubt') {
            if (IPAY.pay_for != 'self') {
                IPAY._checkAndShowFriendTips()
                IPAY.data.targetCode = "cjclubt"
            } else {
                _checkFlag();

            }
        }
    }

    function qqSpeedOpen(aid,qqSpeedAid){
        if ($.inArray(aid, qqSpeedAid) > -1) {
            $(".box-entry").hide()
            if ($("#qqspeed_tips").length == 0) {
                $("#left_sidebar")
                    .append('<div id="qqspeed_tips" style=" color:#666;float: left;margin-top: 10px;margin-left: 5px;">\
                        <p style="color: orange;">由于业务调整,QQ旋风将于2017.9.6停止运营。届时<span class="code_name">' + IPAY.data.name + '</span>将无法使用旋风相关特权。</p>\
                    <p style="color:black;margin-top: 5px;"><span class="code_name">' + IPAY.data.name + '</span>仍享80余项尊贵特权</p>\
                    <p><a target="_blank" href="http://vip.qq.com/">查看特权！</a></p>\
                </div>')
            }
            else {
                $("#qqspeed_tips").show().find(".code_name").text(IPAY.data.name)

            }
            var disableOpenDialog ='<div id="disable_cjclub" class="float">' +
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
                '<li>QQ等级最高3倍加速</li>'+
                '<li>免费创建2000人群</li>'+
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

            if($("#disable_ltmclub").length==0){
                $("body").append(disableOpenDialog)
                IPAY.alert("disable_cjclub",400,240)
            }
        }
    }

    qqSpeedOpen(aid,qqSpeedAid)

    /*ABTest.after(IPAY, '_doChannelCallback', function(){
     if (IPAY.scene === 'minipay') {
     if ($('#result_success>.ad-place')[0]) {
     $('#result_success>.ad-place').html('<a href="http://film.qq.com//act/openvip/qqvip.html?ptag=qqvip.svip" target="_blank"><img src="../../../../../imgcache.gtimg.cn/bossweb/ipay/images/pic/minipay_20140904.jpg"/*tpa=http://imgcache.gtimg.cn/bossweb/ipay/images/pic/minipay_20140904.jpg*//></a>');
     } else {
     $('#result_success').append('<div class="ad-place"><a href="http://film.qq.com//act/openvip/qqvip.html?ptag=qqvip.svip" target="_blank"><img src="../../../../../imgcache.gtimg.cn/bossweb/ipay/images/pic/minipay_20140904.jpg"/*tpa=http://imgcache.gtimg.cn/bossweb/ipay/images/pic/minipay_20140904.jpg*//></a></div>');
     }
     } else {
     $('#result_ad_area').html('<div class="ad-place"><a target="_blank" href="http://film.qq.com//act/openvip/qqvip.html?ptag=qqvip.svip"><img src="../../../../../imgcache.gtimg.cn/bossweb/ipay/images/pic/pay_20140904.jpg"/*tpa=http://imgcache.gtimg.cn/bossweb/ipay/images/pic/pay_20140904.jpg*//></a></div>');
     }
     LIB.loader('http://qzs.qq.com/tencentvideo_v1/js/report.webboss.min.js?r='+Math.random(),function(){
     'function'=== typeof report_webboss && report_webboss({"sPageId":'svip'});
     });
     });*/
})(ABTest, IPAY, LIB, window, INFO);
