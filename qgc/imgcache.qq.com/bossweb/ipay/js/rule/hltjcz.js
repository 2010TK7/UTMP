/**
 */
;(function() {
	 // 只在pay上显示成功充值后广告
    (IPAY.scene=='pay') && ABTest.after(IPAY, 'onComplete', function(type) {
           $('#result_ad_area').html('<div class="ad-place"><a href="https://action.tenpay.com/2014/nzjpdj/?ADTAG=AD.2014.NZPAY" target="_blank"><img src="../../../../../imgcache.gtimg.cn/bossweb/ipay/images/pic/pay_20141233.jpg"/*tpa=https://imgcache.gtimg.cn/bossweb/ipay/images/pic/pay_20141233.jpg*//></a></div>');
    });
})();