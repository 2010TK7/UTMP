/**
 * @author
 */
;
(function (ABTest, IPAY, LIB) {
    var actid = LIB.getUrlParam('actid')

    function handle(cb) {
        if (IPAY.openListInfo && IPAY.openListInfo.list) {
            cb(IPAY.openListInfo.list, +new Date())
        }
        else {
            $.getJSON("https://imgcache.qq.com/cgi-bin/account/get_open_service_list.cgi")
                .success(function (res) {
                    if (res.resultcode == 0) {
                        IPAY.openListInfo = res.resultinfo;
                        cb(res.resultinfo.list, +new Date(res.resultinfo.obj.now.substr(0, 10).replace(/\-/g, "/") + " 00:00:00+0800"))
                    }

                })
        }
    }

    handle(ifGoToLZFSSH)

    function ifGoToLZFSSH(servicelist, now) {
        var qqmseyEndtime,
            xxzxsjEndtime,
            xxzxyyEndtime,
            msOfMonth = (31 * 24 * 60 * 60 * 1000)

        $.each(servicelist, function (i, service) {
            if (service.servicecode.toLowerCase() == "qqmsey") {
                qqmseyEndtime = +new Date(service.closetime.substr(0, 10).replace(/\-/g, "/") + " 00:00:00+0800")
            }
            if (service.servicecode.toLowerCase() == "xxzxsj") {
                xxzxsjEndtime = +new Date(service.closetime.substr(0, 10).replace(/\-/g, "/") + " 00:00:00+0800")
            }
            if (service.servicecode.toLowerCase() == "xxzxyy") {
                xxzxyyEndtime = +new Date(service.closetime.substr(0, 10).replace(/\-/g, "/") + " 00:00:00+0800")
            }
        })

        if (qqmseyEndtime && qqmseyEndtime > now) {
            var baseTime = Math.max(now, xxzxsjEndtime || now)
            if (xxzxyyEndtime > now && ((xxzxyyEndtime - baseTime) / msOfMonth > 1)) {

            }
            else {
                if (!IPAY.getParam("u") && !IPAY.getParam("n-flag") && IPAY.getParam("u") !== "" && ((qqmseyEndtime-xxzxsjEndtime) / msOfMonth >=1)) {//赠送模式不支持付费音乐包升级

                    IPAY.load(["lzfssh"])
                }
            }

        }

        // if (qqmseyEndtime && xxzxsjEndtime && ((qqmseyEndtime - xxzxsjEndtime) / msOfMonth > 1) && !xxzxyyEndtime) {
        //     IPAY.load(["lzfssh"])
        // }
    }

    ABTest.before(IPAY, 'submit', function (opts) {
        if (actid != 'MP20150526174837229_01' && actid != "MP20150916163236209_01") {
            return;
        }
        opts = opts || {};
        opts.data = opts.data || {};
        if (IPAY.data.code !== 'qqacct_save') {
            if (actid == 'MP20150526174837229_01' || actid == "MP20150916163236209_01") {
                IPAY.data.price = (IPAY.pay_mode === 'upgrade' ? 3 : 13);
                opts.data.mp_id = actid;
                opts.data.noadjust = 'yes';
            }
            else {
                IPAY.data.price = (IPAY.pay_mode === 'upgrade' ? 5 : 15);
                opts.data.mp_id = '';
                opts.data.noadjust = '';
            }
        } else {
            IPAY.data.price = 1;
            opts.data.mp_id = '';
            opts.data.noadjust = '';
        }
        return [opts];
    });

    ABTest.before(IPAY, 'setCurrentChannel', function (args) {
        if (actid != 'MP20150526174837229_01' && actid != "MP20150916163236209_01") {
            return;
        }
        args = args || '';
        if (IPAY.data.code !== 'qqacct_save') {
            if (args != 'phonecard' && (actid == 'MP20150526174837229_01' || actid == "MP20150916163236209_01")) {
                IPAY.data.price = (IPAY.pay_mode === 'upgrade' ? 3 : 13);
            }
            else {
                IPAY.data.price = (IPAY.pay_mode === 'upgrade' ? 5 : 15);
            }
        } else {
            IPAY.data.price = 1;
        }
    });

    ABTest.before(IPAY, 'updateAmount', function (_amount, notSetInput, neverAutoSelectOption) {

        if ((actid == "MP20150916163236209_01" || actid == "MP20150526174837229_01") && IPAY.data.maxAmount > 36) {//此活动号最大升级月数值支持到36
            IPAY.data.maxAmount = IPAY.data.defaultAmount = 36;
        }

        if (actid != 'MP20150526174837229_01' && actid != "MP20150916163236209_01") {
            return;
        }
        if (IPAY.data.code !== 'qqacct_save') {
            if (actid == 'MP20150526174837229_01' || actid == "MP20150916163236209_01") {
                IPAY.data.price = (IPAY.pay_mode === 'upgrade' ? 3 : 13);
            }
            else {
                IPAY.data.price = (IPAY.pay_mode === 'upgrade' ? 5 : 15);
            }
        } else {
            IPAY.data.price = 1;
        }
    });

    function updateTips(code) {
        if (code == "xxzxsj" || code == "xxzxhh") {
            IPAY._clearAllTips()
            $("#amount_input_field .controls")
                .append('<div class="help-normal promotion-tips" style="display: block;">\
                    <i class="icon-mark-discount"></i>开绿钻豪华版\
                        <span style="color:#F60">立赠付费音乐包</span>\
                </div>')
        }
    }

    // ABTest.after(IPAY, "selectService", function (code) {
    //     if (code != "lzfssh") {
    //
    //         updateTips(code)
    //     }
    // })

    updateTips(IPAY.data.code)


})(ABTest, IPAY, LIB);
