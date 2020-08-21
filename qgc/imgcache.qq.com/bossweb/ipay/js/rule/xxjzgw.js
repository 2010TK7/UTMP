/**
 * Created by shaynegui on 2016/11/23.
 */
//rule for xxjzgw
//@author xsbchen@tencent.com

/*
 ABTest.addRule({
 id: 'xxjzgw',
 condition: '1',
 action: function() {
 console.log('on ABTest Rule xxjzgw');
 }
 }).run('xxjzgw');
 */
;(function (ABTest, IPAY) {
    ABTest.before(IPAY, "selectChannel", function (channel, cb) {
        return [channel, function () {

            $("#yellowdiamond_autopay_tips").length == 0 && $("#qdqb_auto_checkbox").after("<p id='yellowdiamond_autopay_tips'><em>每成功自动续费1个月，即可额外获得1天黄钻奖励，每月自动到账</em></p>")

            cb && cb()
        }]
    })

    ABTest.after(IPAY, 'selectService', function () {

        $("#yellowdiamond_autopay_tips").length == 0 && $("#qdqb_auto_checkbox").after("<p id='yellowdiamond_autopay_tips'><em>每成功自动续费1个月，即可额外获得1天黄钻奖励，每月自动到账</em></p>")

    });

})(ABTest, IPAY);