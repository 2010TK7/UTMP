/**
 * Created by shaynegui on 2016/5/25.
 */
(function (ABTest, ipay) {
    /**
     *需求背景
     由于qq音乐侧想弱化“普通绿钻”
     需求详情
     根据接口返回，如果要灰度，则隐藏掉普通绿钻的续费入口，传入的xxzxyy业务代码全部引导为开通豪华绿钻xxzxhh
     当前为10元绿钻    只可新开15元绿钻 或 （存量≥31天）升级为15元绿钻
     当前为15元绿钻    只可续费15元绿钻
     当前为8元付费包   只可新开15元绿钻 或 （存量≥31天）升级为15元绿钻
     当前为12元付费包  只可新开15元绿钻
     无绿钻或付费包    只可新开15元绿钻
     以上均不满足      只可新开15元绿钻
     */
    function disableXXZXYY() {

        var prefix = ipay.getReportActionPrefix();
        ipay.report(prefix + 'disapper.xxzxyy.page.pv', true);

        location.href = location.href.replace(/xxzxyy/gi, "xxzxsj")
        ipay.report(prefix + 'disapper.xxzxyy.gray.success', true);
    }


    function handle(disable) {
        if (ipay.openListInfo && ipay.openListInfo.list) {
            disable(ipay.openListInfo.list)
        }
        else {
            $.getJSON("https://imgcache.qq.com/cgi-bin/account/get_open_service_list.cgi")
                .success(function (res) {
                    if (res.resultcode == 0) {
                        ipay.openListInfo = res.resultinfo;
                        disable(res.resultinfo.list)
                    }

                })
        }
    }

    handle(disableXXZXYY)


})(ABTest, IPAY);