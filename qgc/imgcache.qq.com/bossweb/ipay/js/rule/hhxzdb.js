/**
 * Created by shaynegui on 2016/7/14.
 */
(function (ABTest, ipay, LIB, W, INFO, $) {
    /**
     //直接看代码是看不懂的，请参考算法思路: <最大可升级月数的算法>
     ////tapd.oa.com/pay/wikis/view/%2525E8%2525B6%252585%2525E7%2525BA%2525A7%2525E6%252598%25259F%2525E9%252592%2525BB%2525E5%25258D%252587%2525E7%2525BA%2525A7%2525E7%2525AE%252597%2525E6%2525B3%252595

     @param {Object} list 各个服务的截至时间，没有的就不写
     {
        "XXZXYY": {
            "endtime": "1515030739000"
        },
        "XXZXSJ": {
            "endtime": "1506741180000"
        },
        "XXJZGW": {
            "endtime": "1476666170000"
        },
        "QQMSEY": {
            "endtime": "1514361505000"
        }
    }
     @param {Timestamp} now 当前时间的时间戳，精确到毫秒。如1468496048000
     */
    function maxUpgradeAmount(list, now) {

        var codes = {
            "XXZXYY": {
                upgrade: "XXZXSJ"
            },
            "XXJZGW": {
                upgrade: "XXJZSJ"
            }
        };

        //先将普通版和豪华版分拣出来
        /**
         * {
	 	"XXZXYY" : {
	 		endtime : ""
	 	},
	 	"XXJZGW" : {
	 		endtime : ""
	 	}
	 }
         */
        var baseObjs = [];

        /**
         * {
	 	"XXZXSJ" : {
	 		endtime : ""
	 	},
	 	"XXZXSJ" : {
	 		endtime : ""
	 	}
	 }
         */
        var upgradeObjs = [];

        for (var baseCode in codes) {
            var upgradeCode = codes[baseCode].upgrade;

            baseObjs.push({
                code: baseCode,
                endDay: list[baseCode] ? _toDay(list[baseCode].endtime) : _toDay(now)
            });

            upgradeObjs.push({
                code: upgradeCode,
                endDay: list[upgradeCode] ? _toDay(list[upgradeCode].endtime) : _toDay(now)
            });
        }

        //基础业务排序
        baseObjs.sort(function (obj1, obj2) {
            return obj1.endDay - obj2.endDay;
        });

        //升级业务排序
        upgradeObjs.sort(function (obj1, obj2) {
            return obj1.endDay - obj2.endDay;
        });


        //找到时间最久的那个基础版业务A
        var maxBaseObj = baseObjs[baseObjs.length - 1];
        //时间最久的那个基础版业务A的到期时间
        var L1 = maxBaseObj.endDay;

        //找到时间最短的那个升级版业务
        var minUpgradeObj = upgradeObjs[0];
        //时间最短的那个升级版业务的到期时间
        var L4 = minUpgradeObj.endDay;

        //时间最久的那个基础版对应的升级版的业务代码B
        var CodeB = codes[maxBaseObj.code].upgrade;

        //时间最久的那个基础版对应的升级版的到期时间LB
        var LB = list[CodeB] ? _toDay(list[CodeB].endtime) : _toDay(now);

        //时间最久的那个基础版对应的升级版补齐后的时间点
        var L2 = L1 - (L1 - LB) % 31;

        return Math.floor((L2 - L4) / 31);

        function _toDay(timestamp) {
            return Math.ceil((timestamp + 8 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000));
        }
    }


    //得到某个时间该天最后一秒的时间戳
    function getLastSecondsDateTime(unixtimer) {
        var date = new Date(unixtimer)
        var year = date.getFullYear().toString()
        var month = (date.getMonth() + 1).toString()
        var day = date.getDate().toString()
        var retDate = new Date(year + "/" + month + "/" + day + " 23:59:59+0800")
        return retDate.getTime()
    }

    function getUpgradeMonths(upgradeMonth, now, services) {
        var xxzxyy = services["xxzxyy".toUpperCase()],
            xxzxsj = services["xxzxsj".toUpperCase()],
            xxjzgw = services["xxjzgw".toUpperCase()],
            xxjzsj = services["xxjzsj".toUpperCase()],
            qqmsey = services["qqmsey".toUpperCase()],
            baseTime, hhxzlhUpgradeEndtime,
            xxzxyyUpgradeMonth, xxzxsjUpgradeMonth, xxjzgwUpgradeMonth, xxjzsjUpgradeMonth,
            qqmseyDiscountMonth = 0, monthOfMilliseconds = 31 * 24 * 60 * 60 * 1000

        for (var service in services) {
            services[service].endtime = getLastSecondsDateTime(services[service].endtime)
        }

        if (!xxzxsj || !xxjzsj) {//不存在豪华版,说明当前状态不是豪华星钻
            baseTime = now
        }
        else {
            baseTime = Math.min(xxjzsj.endtime, xxzxsj.endtime)
        }

        //得到用户输入升级月份后计算的豪华星钻到期时间
        hhxzlhUpgradeEndtime = baseTime + upgradeMonth * monthOfMilliseconds

        //计算绿钻豪华版
        if (xxzxsj) {
            xxzxsjUpgradeMonth = Math.ceil((hhxzlhUpgradeEndtime - xxzxsj.endtime) / monthOfMilliseconds)
            xxzxsjUpgradeMonth = xxzxsjUpgradeMonth > 0 ? xxzxsjUpgradeMonth : 0
        }
        else {
            xxzxsjUpgradeMonth = upgradeMonth
        }

        //计算绿钻基础版
        if (xxzxyy) {
            //豪华版结束时间存在用豪华版作为计算基准,否则以当前时间为基准
            xxzxyyUpgradeMonth = Math.ceil(((xxzxsj ? xxzxsj.endtime : baseTime) - xxzxyy.endtime) / monthOfMilliseconds + xxzxsjUpgradeMonth)
            //豪华版必须有能开通的月份，基础版才可以开通
            xxzxyyUpgradeMonth = (xxzxyyUpgradeMonth > 0 && xxzxsjUpgradeMonth > 0) ? xxzxyyUpgradeMonth : 0

        }
        else {
            xxzxyyUpgradeMonth = upgradeMonth
        }

        //计算黄钻豪华版
        if (xxjzsj) {
            xxjzsjUpgradeMonth = Math.ceil((hhxzlhUpgradeEndtime - xxjzsj.endtime) / monthOfMilliseconds)
            xxjzsjUpgradeMonth = xxjzsjUpgradeMonth > 0 ? xxjzsjUpgradeMonth : 0
        }
        else {
            xxjzsjUpgradeMonth = upgradeMonth
        }

        //计算黄钻基础版
        if (xxjzgw) {
            xxjzgwUpgradeMonth = Math.ceil(((xxjzsj ? xxjzsj.endtime : baseTime) - xxjzgw.endtime) / monthOfMilliseconds + xxjzsjUpgradeMonth)
            xxjzgwUpgradeMonth = (xxjzgwUpgradeMonth > 0 && xxjzsjUpgradeMonth > 0) ? xxjzgwUpgradeMonth : 0
        }
        else {
            xxjzgwUpgradeMonth = upgradeMonth
        }

        //下面计算付费音乐包减免的月份
        if (qqmsey) {
            qqmseyDiscountMonth = ~~Math.min(Math.min(xxzxsjUpgradeMonth, xxzxyyUpgradeMonth), (qqmsey.endtime - (xxzxsj ? xxzxsj.endtime : now)) / monthOfMilliseconds)
            qqmseyDiscountMonth = (qqmseyDiscountMonth > 0 ? qqmseyDiscountMonth : 0)
        }

        return {
            "qqmseyDiscountMonth": qqmseyDiscountMonth,
            "xxzxyy": xxzxyyUpgradeMonth,
            "xxzxsj": xxzxsjUpgradeMonth,
            "xxjzgw": xxjzgwUpgradeMonth,
            "xxjzsj": xxjzsjUpgradeMonth
        }
    }

    /**
     * 计算升级open_detail
     * @param upgradeMonth  用户输入的月份
     * @param now           当前时间
     * @param services      用户开通的服务列表如
     *          {
 *              "xxzxyy": {
                    endtime: 1468468788708 unix时间戳，数字类型
                },
                "xxzxsj": {
                    endtime: xxzxsjEndtime
                },
                "xxjzgw": {
                    endtime: xxjzgwEndtime
                }
            }
     * @returns {{qqmseyDiscountMonth: number, open_detail: string}}
     */
    function getOpenDetail(upgradeMonth, now, services) {

        var upgradeMonth = getUpgradeMonths(upgradeMonth, now, services)
        return ["XXZXSJ_" + upgradeMonth.xxzxsj * 31, "XXZXYY_" + upgradeMonth.xxzxyy * 31, "XXJZGW_" + upgradeMonth.xxjzgw * 31, "XXJZSJ_" + upgradeMonth.xxjzsj * 31].join(",")

    }

    function getUpgradePrice(openDetail, now, services) {
        var openServices = openDetail.split(","),
            maxOpenDays = 0,
            service,
            passInUpgradeMonth = {},
            serviceOpenDays,
            upgradeMonth,
            qqmseyDiscountMonth,
            now = getLastSecondsDateTime(now),
            monthOfMilliseconds = 31 * 24 * 60 * 60 * 1000

        //找出opendetail里面开通的最大天数得到用户输入的月份数计算付费音乐包减免
        for (var i = 0; i < openServices.length; i++) {
            service = openServices[i].split("_")
            serviceOpenDays = +service[1]
            passInUpgradeMonth[service[0].toLowerCase()] = service[1] / 31

            if (serviceOpenDays > maxOpenDays) {
                maxOpenDays = serviceOpenDays
            }

        }
        //如果是整开
        if (passInUpgradeMonth.xxzxyy == passInUpgradeMonth.xxzxsj && passInUpgradeMonth.xxzxsj == passInUpgradeMonth.xxjzsj && passInUpgradeMonth.xxjzgw == passInUpgradeMonth.xxjzsj) {
            qqmseyDiscountMonth = ~~Math.min(passInUpgradeMonth.xxzxsj, (getLastSecondsDateTime(services["QQMSEY"].endtime) - (services["XXZXSJ"] ? getLastSecondsDateTime(services["XXZXSJ"].endtime) : now)) / monthOfMilliseconds)
            qqmseyDiscountMonth = (qqmseyDiscountMonth > 0 ? qqmseyDiscountMonth : 0)
        }
        else {
            qqmseyDiscountMonth = getUpgradeMonths(maxOpenDays / 31, now, services).qqmseyDiscountMonth
        }


        return passInUpgradeMonth.xxzxyy * 10 + passInUpgradeMonth.xxzxsj * 5 + passInUpgradeMonth.xxjzgw * 10 + passInUpgradeMonth.xxjzsj * 5 - qqmseyDiscountMonth * 8
    }


    function handler(servicesListInfo, serviceData, payMode) {
        var serviceObj = {},
            //获取当前0点为基准,时间格式为RFC2822 标准日期字符串
            now = +new Date(servicesListInfo.obj.now.substr(0, 10).replace(/\-/g, "/") + " 00:00:00+0800")
        $.each(servicesListInfo.list, function (i, service) {
            if (+new Date(service.closetime) > now) {//服务未过期

                switch (service.servicecode.toUpperCase()) {
                    case "XXZXYY":
                        serviceObj.XXZXYY = {
                            endtime: +new Date(service.closetime)
                        }
                        break;
                    case "XXZXSJ":
                        serviceObj.XXZXSJ = {
                            endtime: +new Date(service.closetime)
                        }
                        break;
                    case "XXJZGW":
                        serviceObj.XXJZGW = {
                            endtime: +new Date(service.closetime)
                        }
                        break;
                    case "XXJZSJ":
                        serviceObj.XXJZSJ = {
                            endtime: +new Date(service.closetime)
                        }
                        break;
                    case "QQMSEY":
                        serviceObj.QQMSEY = {
                            endtime: +new Date(service.closetime)
                        }
                }
            }
        })

        var maxUpgradeMonth = maxUpgradeAmount(serviceObj, now)
        //业务需求，让用户最大升级不能超过12个月
        maxUpgradeMonth = maxUpgradeMonth >= 12 ? 12 : maxUpgradeMonth

        ABTest.before(ipay, "updateAmount", function (amount) {
            var openDetail, totalPrice
            if (ipay.pay_mode == "upgrade") {
                openDetail = getOpenDetail(amount, now, serviceObj)
            }
            else {
                //整开
                openDetail = ["XXZXYY_" + amount * 31, "XXZXSJ_" + amount * 31, "XXJZGW_" + amount * 31, "XXJZSJ_" + amount * 31].join(",")
            }
            window.globalPrice.totalPrice[amount] = totalPrice = getUpgradePrice(openDetail, now, serviceObj)
            serviceData.price = totalPrice / amount
        });

        //提交的时候如果是生就修改open_detail
        ABTest.before(ipay, "submit", function (_opts) {
            if (ipay.pay_mode == "upgrade") {
                _opts.data["open_detail"] = getOpenDetail(ipay.amount, now, serviceObj)
            }
            return _opts;
        });

        if (maxUpgradeMonth > 0) {

            $('#mode_select_list').find('label[_value="upgrade"]').show();
            if (payMode == "upgrade") {

                serviceData.maxAmount = maxUpgradeMonth
                serviceData.defaultAmount = ((ipay._defaultAmount <= maxUpgradeMonth && ipay._defaultAmount > 0) ? ipay._defaultAmount : maxUpgradeMonth)
                ipay._setAmountTips(LIB.stringFormat('根据您当前包月服务状态，最多可优惠升级<em>{0}</em>个月的' + ipay.data.name + '，点击查看具体<a href="https://act.qzone.qq.com/meteor/pc/index.html?rid=1110" target="_blank">升级规则</a>', maxUpgradeMonth));

                serviceData.mode = "upgrade"
                return payMode
            }
        }
        else if (payMode == "upgrade") {//如果检查升级又不满足升级条件返回按月付费
            return "month"
        }

        if (payMode == 'month' || payMode == 'year') {
            //用户切换升级到按月或者是按年，修改单价到包月的价格

            serviceData.price = INFO.services[serviceData.baseCode].orgPrice;
            ipay._clearAmountTips();
            serviceData.maxAmount = 999;
            serviceData.defaultAmount = 3;
            serviceData.mode = "service"
            //_self.selectPayMode(mode);
            return payMode
        }


    }

    ipay._checkUpgrade = function (serviceData, payMode) {
        var mode
        if (ipay.openListInfo && ipay.openListInfo.list) {
            mode = handler(ipay.openListInfo, serviceData, payMode)
        }
        else {
            $.getJSON("https://imgcache.qq.com/cgi-bin/account/get_open_service_list.cgi")
                .success(function (res) {
                    if (res.resultcode == 0) {
                        ipay.openListInfo = res.resultinfo;
                        mode = handler(res.resultinfo, serviceData, payMode)
                    }

                })
        }

        return mode
    }

    //给他人赠送的时候屏蔽升级
    ABTest.before(ipay, "updateTargetUin", function (uin) {
        if (ipay.uin != uin) {
            $('#mode_select_list').find('label[_value="upgrade"]').hide();
            this.selectPayMode('month')
        }
        else {
            ipay.selectPayMode("upgrade")
        }
    })


    window.globalPrice = {
        totalPrice: {}
    }
    var defaultPayMode
    switch (ipay.getParam("nt")) {
        case "year":
            defaultPayMode = "year"
            break;
        case "month":
            defaultPayMode = "month"
            break;
        default :
            defaultPayMode = "upgrade"
    }

    ipay.selectPayMode(defaultPayMode)


})(ABTest, IPAY, LIB, window, INFO, $);

