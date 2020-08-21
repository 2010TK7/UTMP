/**
 * Created by shaynegui on 2015/12/8.
 */
;(function (ABTest, IPAY, LIB) {

    function handle() {
        var actid = LIB.getUrlParam('actid') || "MP20150828175459916_01"

        if (actid == 'MP20150828175459916_01') {
            var globalPrice = {

                //"1": 20,
                "6": 68/6,
                "12": 128/12,
                //"12": 14,
                //"mid": "MP20151029161046338_01"
                totalPrice: {
                    "6": 68,
                    "12": 128
                }
            }
        }

        ABTest.before(IPAY, 'submit', function (opts) {

            opts = opts || {};
            opts.data = opts.data || {};
            if (IPAY.data.code == "qqmsfy" || IPAY.data.code == "qqmstw") {
                opts.data.mp_id = actid
            }

            return [opts];
        });

        ABTest.before(IPAY, 'updateAmount', function (_amount, notSetInput, neverAutoSelectOption) {
            setPriceByAmount(_amount)
        });

        function setPriceByAmount(amount) {
            if (IPAY.data.code !== 'qqacct_save') {
                if (IPAY.data.code == "qqmsfy" || IPAY.data.code == 'qqmstw') {
                    if (actid == 'MP20150828175459916_01') {
                        IPAY.data.price = (IPAY.pay_mode === 'upgrade' ? 4 : (globalPrice[amount] || 12))
                        if (IPAY.pay_mode == "upgrade") {
                            window.globalPrice = null
                            IPAY.fee = 4 * amount
                        }
                        else {
                            window.globalPrice = globalPrice
                            IPAY.fee = globalPrice.totalPrice[amount] || (12 * amount)
                        }
                        IPAY.data.mp_id = actid
                        //IPAY.fee = IPAY.pay_mode === 'upgrade' ? (4 * amount) : (globalPrice.totalPrice[amount] || (8 * amount))
                    }
                }

            } else {
                IPAY.data.price = 1;
            }


        }


        setTimeout(function () {
            setPriceByAmount(IPAY.amount)
            IPAY.onAmountChange(IPAY.amount)
        })

        IPAY.scene == "minipay" && $(".about-info").text("付费曲库完整试听，每月500首付费音乐下载。").show()
    }


    function updateTips(payMode) {
        $("#amount_input_field .controls .promotion-tips").remove()
        if (payMode != 'upgrade') {

            $("#amount_input_field .controls")
                .append('<div class="help-normal promotion-tips" style="display: block;">\
                    <i class="icon-mark-discount"></i>开通\
                        <span style="color:#F60">6</span>个月优惠价<span style="color:#F60">68</span>元，\
                        <span style="color:#F60">12</span>个月优惠价<span style="color:#F60">128</span>元\
                </div>')
        }
    }

    if (IPAY.data.code == "qqmsfy" || IPAY.data.code == "qqmstw") {
        handle()
    }

    ABTest.after(IPAY, 'selectService', function () {
        if (IPAY.data.code == "qqmsfy" || IPAY.data.code == "qqmstw") {
            handle()
        }
    });

    ABTest.after(IPAY, 'selectPayMode', function (mode) {
        if ((IPAY.data.code == "qqmsfy" && mode != "upgrade") || IPAY.data.code == "qqmstw") {
            handle()
        }

        updateTips(mode)
    });

    updateTips(IPAY.pay_mode)


})(ABTest, IPAY, LIB);