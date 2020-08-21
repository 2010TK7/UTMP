//rule for 体验会员基础版
//@author qqfan@tencent.com

;(function (IPAY, LIB, INFO, ABTest, w) {
    var ipay = IPAY;

    var handler = function () {
        if (ipay.openListInfo && ipay.openListInfo.list) {
            var list = ipay.openListInfo.list;
            var tynbatips = function () {
                    $('#copyright_tips').after('<div id="nba_tips" class="float" style="display: none;"><div class="float-header"><h3><span>温馨提示</span></h3></div><div class="float-content"><div class="confirm attent"><i class="icon-confirm"></i><div class="confirm-cont"><h5>您已开通更高级的NBA会员，无需重复开通。</h5></div></div></div><div class="float-footer"><div style="vertical-align:middle;margin-top:6px;text-align: center;"><button id="tyvipReturnBtn" type="button" class="btn-primary-small"><span>返回</span></button></div></div></div>');
                    IPAY.alert('nba_tips', 275, 125);
                    $('#tyvipReturnBtn').click(function () {
                        window.open('https://vip.sports.qq.com/');
                        w['cashier'] && ('function' == typeof w['cashier'].close) && w['cashier'].close();
                    });
                }, tynbateamtips = function () {
                    $('#copyright_tips').after('<div id="nba_team_tips" class="float" style="display: none;"><div class="float-header"><h3><span>温馨提示</span></h3></div><div class="float-content"><div class="confirm attent"><i class="icon-confirm"></i><div class="confirm-cont"><h5>您可免费选择一支球队。</h5></div></div></div><div class="float-footer"><div style="vertical-align:middle;margin-top:6px;text-align: center;"><button type="button" class="btn-primary-small" onclick=" location.href = location.href.replace(\'txtypcby\',\'tynba\'); "><span>选择球队</span></button></div></div></div>');
                    IPAY.alert('nba_team_tips', 300, 125);
                }, vip_base_code = 'txtypcby', vip_union_code = 'tynbalpqq', team_vip = ['tynbaysqq', 'tynbaqsqq', 'tynbahrqq', 'tynbahjqq', 'tynbakcqq', 'tynbamcqq', 'tynbaltqq', 'tynbarhqq', 'tynbabxqq', 'tynbahxqq', 'tynbaxnqq', 'tynbankqq', 'tynbagnqq', 'tynbalwqq', 'tynbaktqq', 'tynbakeqq', 'tynbaslqq', 'tynbagwqq', 'tynbamsqq', 'tynbajsqq', 'tynbajjqq', 'tynbatyqq', 'tynbalyqq', 'tynbahsqq', 'tynbahfqq', 'tynbaxlqq', 'tynbamlqq', 'tynbathqq', 'tynbaqcqq', 'tynba76qq'],
                vip_team_flag = false, vip_base_flag = false, vip_union_flag = false;

            for (var i = 0, j = list.length; i < j; i++) {

                var _code = list[i].servicecode.toLowerCase();

                if ($.inArray(_code, team_vip) > -1) {
                    vip_team_flag = true;
                }

                if (vip_base_code == _code) {
                    vip_base_flag = true;
                }

                if (vip_union_code == _code) {
                    vip_union_flag = true;
                }

            }

            if (vip_union_flag) {//有联盟通
                tynbatips();
                return;
            }

            if (vip_team_flag) {//有球队通
                tynbatips();
                return;
            }

            if (vip_base_flag) {//有基础版，引导去选球队
                tynbateamtips();
            }

        } else {

        }

    }, scanWeixinQrCode = function () {

        /*var url = location.protocol+"//pay.qq.com/h5/index.shtml?m=buy&c=txtypcby&direct=1&style=wechat&wechat=1&n="+(IPAY.amount||1)+"&u=" + IPAY.target_uin + "&showwxpaytitle=1&pf=vip_m-" + (IPAY.scene === 'pay' ? 2001 : 2002) + "-html5" + (IPAY.debug ? "&sandbox=1" : "") + (IPAY._uuid ? '&uuid=' + IPAY._uuid + '&pt=NodeJS' : '') + (aid ? ("&aid=" + aid) : "");
         setTimeout(function(){
         $('#wxpay1 .img-rwm img').attr("src", _u1 = location.protocol+'//pay.qq.com/cgi-bin/account/get_qr_image.cgi?size=100&url=' + encodeURIComponent(url))
         },0);*/

    };

    if (IPAY.data.code == 'txtypcby') {
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
        $('#amount_input_field').before('<div class="control-group"><span class="control-label">开通套餐：</span><div class="controls"><div class="controls-option"><label class="selected"><a class="radio-box" href="javascript:void(0);">腾讯体育会员<i class="icon-check"></i></a></label></div><div class="help-normal">可看一支NBA球队全部比赛和其它付费比赛</div></div></div><div class="control-group"><span class="control-label">开通球队：</span><div class="controls"><div class="controls-option"><label class="selected"><a class="radio-box" href="javascript:void(0);">暂不选<i class="icon-check"></i></a></label></div></div></div>');

        /*ABTest.after(IPAY, 'updateTargetUin', function (args) {
         if (IPAY.current_channel == "weixin") {
         scanWeixinQrCode();
         }
         });

         ABTest.after(IPAY, 'updateAmount', function (amount) {
         if (IPAY.current_channel == "weixin") {
         scanWeixinQrCode();
         }
         });*/
    }

    function getDiscountPrice(amount) {
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
    }

    ABTest.before(IPAY, 'updateAmount', function (_amount, notSetInput, neverAutoSelectOption) {
        //fix no balance and to recharge
        if (IPAY.data.code !== 'qqacct_save') {
            IPAY.data.price = getDiscountPrice(_amount)
        } else {
            IPAY.data.price = 1;
        }
    });

    ABTest.before(IPAY, 'submit', function (opts) {
        opts = opts || {};
        opts.data = opts.data || {};
        if (IPAY.data.code !== 'qqacct_save') {

            IPAY.data.price = getDiscountPrice(IPAY.amount)
            opts.data.mp_id = 'MP20160918203441815_01';
            opts.data.noadjust = 'yes';

        } else {
            IPAY.data.price = 1;
            opts.data.mp_id = '';
            opts.data.noadjust = '';
        }
        return [opts];
    });

    ABTest.before(IPAY, "loadChannelJs", function (channel, cb) {
        return [channel, function () {
            cb && cb()
            ABTest.before(IPAY, "onAmountChange", function (amount) {
                IPAY.data.price = getDiscountPrice(amount)
            })
        }]
    })

    ABTest.before(IPAY, 'setCurrentChannel', function (args) {
        args = args || '';
        if (IPAY.data.code !== 'qqacct_save') {
            if (args != 'phonecard') {
                // IPAY.amount == 3 && (IPAY.data.price = 72/3);
                // IPAY.amount == 12 && (IPAY.data.price = 264/12);
                IPAY.data.price = getDiscountPrice(IPAY.amount)
            }
            else {
                IPAY.data.price = 30;
            }
        } else {
            IPAY.data.price = 1;
        }
    });

    $('#amount_tips').after('<div class="help-normal"><i class="icon-mark-discount"></i>1个月30元，3个月72元，12个月264元，其它月份享受阶梯折扣</div>');

})(IPAY, LIB, INFO, ABTest, window);