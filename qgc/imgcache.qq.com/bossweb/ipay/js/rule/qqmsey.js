/**
 * Created by shaynegui on 2015/12/8.
 */
;(function (ABTest, IPAY, LIB) {

    function handle() {
        var actid = LIB.getUrlParam('actid') || "MP20150828110130557_01"

        window.globalPrice = {

            //"1": 20,
            "6": 5.63,
            "12": 7.33,
            //"12": 14,
            //"mid": "MP20151029161046338_01"
            totalPrice: {
                "6": 45,
                "12": 88
            }
        }

        ABTest.before(IPAY, 'submit', function (opts) {

            opts = opts || {};
            opts.data = opts.data || {};
            if (IPAY.data.code == "qqmsey") {
                opts.data.mp_id = actid
            }

            return [opts];
        });

        ABTest.before(IPAY, 'updateAmount', function (_amount, notSetInput, neverAutoSelectOption) {

            setPriceByAmount(_amount)
        });

        function setPriceByAmount(amount) {
            if (IPAY.data.code !== 'qqacct_save') {
                if (IPAY.data.code == "qqmsey") {
                    if (actid == 'MP20150828110130557_01') {
                        IPAY.data.price = (globalPrice.totalPrice[amount] / amount) || 8
                        IPAY.fee = globalPrice.totalPrice[amount] || (8 * amount)
                        IPAY.data.mp_id = actid
                    }
                }

                //else {
                //    IPAY.data.price = (IPAY.pay_mode === 'upgrade' ? 5 : 15);
                //}
            } else {
                IPAY.data.price = 1;
            }


        }

        $("#amount_input_field .controls .promotion-tips").remove()

        $("#amount_input_field .controls")
            .append('<div class="help-normal promotion-tips" style="display: block;">\
                    <i class="icon-mark-discount"></i>开通\
                        <span style="color:#F60">6</span>个月优惠价<span style="color:#F60">45</span>元，\
                        <span style="color:#F60">12</span>个月优惠价<span style="color:#F60">88</span>元\
                </div>')

        setTimeout(function () {
            setPriceByAmount(IPAY.amount)
            IPAY.onAmountChange(IPAY.amount)
        })

        IPAY.scene == "minipay" && $(".about-info").html('付费曲库完整试听，每月300首付费音乐下载。').show()
    }

    if (IPAY.data.code == "qqmsey") {
        handle()
    }

    ABTest.before(IPAY, 'selectService', function () {
        if (IPAY.data.code == "qqmsey") {
            handle()
        }
    });

    ABTest.before(IPAY, 'selectPayMode', function () {
        if (IPAY.data.code == "qqmsey") {
            handle()
        }
    });


})(ABTest, IPAY, LIB);