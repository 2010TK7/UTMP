//rule for xxjzghh
//@author xsbchen@tencent.com

;
(function (ABTest, IPAY) {
    if (IPAY.scene === 'pay') {
        // 黄钻豪华版特殊逻辑，检查个账余额，跳转到黄钻，其中xxjzghh=1参数忽略余额10~15跳黄钻的模块
        // (~~LIB.getUrlParam('xxjzghh') != 1) && IPAY.checkBalance(function (data) {
        //     var _balance = !~~data.resultcode ? (parseFloat(data.resultinfo.qb_balance) * 10 + parseFloat(data.resultinfo.qd_balance)) : 0;
        //     if (LIB.getUrlParam('c').toLowerCase() == 'xxjzghh,xxjzgw' && _balance >= 100 && _balance < 150) {
        //         location.href = location.href.replace('xxjzghh,xxjzgw', 'xxjzgw,xxjzghh');
        //     }
        // });

        // 黄钻豪华版增加索要按钮，跳到黄钻的索要页面
        ABTest.addRule({
            id: 'xxjzghh_ask',
            autoRun: true,
            condition: 'IPAY.data.code==="xxjzghh"',
            action: function () {
                $('#a_ask_link').attr('href', '//pay.qq.com/service/ask_v3.shtml?sid=xxjzgw&c=' + IPAY.getParam('c') + '&aid=ipay.qzone&ADTAG=pay.service.ipay.qzone').parent().show();
            }
        });

        // 选择业务前执行规则：黄钻豪华版增加索要按钮，跳到黄钻的索要页面
        ABTest.after(IPAY, 'selectService', function () {

            $("#yellowdiamond_autopay_tips").length == 0 && $("#qdqb_auto_checkbox").after("<p id='yellowdiamond_autopay_tips'><em>每成功自动续费1个月，即可获得100点黄钻成长值，每月自动到账</em></p>")

            ABTest.run('xxjzghh_ask');
        });
    }
    ABTest.before(IPAY, "selectChannel", function (channel, cb) {
        return [channel, function () {
            $("#yellowdiamond_autopay_tips").length == 0 && $("#qdqb_auto_checkbox").after("<p id='yellowdiamond_autopay_tips'><em>每成功自动续费1个月，即可获得100点黄钻成长值，每月自动到账</em></p>")

            cb && cb()
        }]
    })
})(ABTest, IPAY);