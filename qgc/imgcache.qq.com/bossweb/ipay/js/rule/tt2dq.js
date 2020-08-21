//rule for qqacct_save
//@author xsbchen@tencent.com

;(function(ABTest, IPAY, LIB) {
    ABTest.after(IPAY, 'onComplete', function(type) {
        if (this.data.code === '-tt2dq' && type === 'succeed') {
            var imgName,
                title,
                targetUrl;

            imgName = 'minipay_20141204.jpg'/*tpa=https://imgcache.qq.com/bossweb/ipay/js/rule/minipay_20141204.jpg*/;
            title = '';

            $('#success_wrapper').after(LIB.stringFormat('<div class="ad-place"><img alt="{0}" src="../../../../../imgcache.gtimg.cn/bossweb/ipay/images/pic/{1}"/*tpa=https://imgcache.gtimg.cn/bossweb/ipay/images/pic/{1}*//></div>', title, imgName));
        }
    });
})(ABTest, IPAY, LIB);