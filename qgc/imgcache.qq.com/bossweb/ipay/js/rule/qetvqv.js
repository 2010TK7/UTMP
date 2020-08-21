//rule for
//@author qqfan@tencent.com

;(function (IPAY, LIB, INFO, ABTest, w) {

    IPAY.params["actid"] = IPAY.params["actid"] || 'MP20170228153730674_01'

    ABTest.before(IPAY, 'updateAmount', function (_amount, notSetInput, neverAutoSelectOption) {
        //fix no balance and to recharge
        if (IPAY.data.code !== 'qqacct_save') {
            if (_amount == 3) {
                IPAY.data.price = 85 / 3;
            } else if (_amount == 12) {
                IPAY.data.price = 330 / 12
            } else {
                IPAY.data.price = 30;
            }
        } else {
            IPAY.data.price = 1;
        }
    });

    ABTest.before(IPAY, 'submit', function (opts) {
        opts = opts || {};
        opts.data = opts.data || {};
        if (IPAY.data.code !== 'qqacct_save') {
            if (IPAY.amount == 1 || IPAY.amount == 3 || IPAY.amount == 12) {
                IPAY.amount == 3 && (IPAY.data.price = 85 / 3);
                IPAY.amount == 12 && (IPAY.data.price = 330 / 12);
                opts.data.mp_id = 'MP20170228153730674_01';
                opts.data.noadjust = 'yes';
            }
            else {
                IPAY.data.price = 30;
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
        args = args || '';
        if (IPAY.data.code !== 'qqacct_save') {
            if (args != 'phonecard' && (IPAY.amount == 3 || IPAY.amount == 12)) {
                IPAY.amount == 3 && (IPAY.data.price = 85 / 3);
                IPAY.amount == 12 && (IPAY.data.price = 330 / 12);
            }
            else {
                IPAY.data.price = 30;
            }
        } else {
            IPAY.data.price = 1;
        }
    });

    $('#amount_input_field').find('a.radio-box').each(function (i, elem) {
        $(this).text($(this).text() + '个月');
    });

    $('#amount_tips').after('<div class="help-normal"><i class="icon-mark-discount"></i>1个月30元，3个月85元，12个月330元</div>');

})(IPAY, LIB, INFO, ABTest, window);