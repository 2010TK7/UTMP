
(function(ABTest,ipay,LIB,W,INFO,$){var CHXBXB={}
function parseStringToDate(str){return new Date(Date.parse(str.replace(/-/g,'/')));}
function getMonthDiff(date1,date2){date1=new Date(date1.toString().replace(/-/g,'/'))
date2=new Date(date2.toString().replace(/-/g,'/'))
return Math.floor(Math.abs(date1-date2)/86400000/31);}
function checkUpgrade(serviceData,payMode){var mode=ipay.pay_mode
if(ipay.openListInfo&&ipay.openListInfo.list){mode=handler(ipay.openListInfo.list,serviceData,payMode)}
else{$.getJSON("https://imgcache.qq.com/cgi-bin/account/get_open_service_list.cgi").success(function(res){if(res.resultcode==0){ipay.openListInfo=res.resultinfo;mode=handler(res.resultinfo.list,serviceData,payMode)}})}
return mode}
function handler(openServicesList,serviceData,payMode){var bannedServices=["LZIOS","LZIAP","HZIOS"]
var hasBannedService=false,baseService,price=0,greenDiamondService,yellowDiamondService,tips,upgradeAmount
if(ipay.target_uin==ipay.uin){$.each(openServicesList,function(i,service){if($.inArray(service.groupcode.toUpperCase(),bannedServices)>-1){hasBannedService=true
tips="很抱歉,您已开通黄钻或绿钻IOS服务,不支持开通星钻"
return false}
if(service.groupcode.toUpperCase()=="XXZXYY"){if(service.payway!=0){hasBannedService=true
tips="很抱歉,您已开通绿钻后付费服务,不支持开通星钻"
return false}
else if(service.servicecode.toUpperCase()=="XXZXYY"){greenDiamondService=service}}
if(service.groupcode.toUpperCase()=="XXJZGW"){if(service.payway!=0){hasBannedService=true
tips="很抱歉,您已开通黄钻后付费服务,不支持开通星钻"
return false}
else if(service.servicecode.toUpperCase()=="XXJZGW"){yellowDiamondService=service}}})}
if(hasBannedService&&payMode=="upgrade"){IPAY.lockForm(true)
setTimeout(function(){$("#amount_input_field").addClass("warning").find("#amount_warning").append('<i class="icon-help"></i>'+tips)},0)
return ipay.pay_mode;}
if(greenDiamondService&&yellowDiamondService){if(parseStringToDate(yellowDiamondService.closetime)-parseStringToDate(greenDiamondService.closetime)>0){baseService=greenDiamondService}
else{baseService=yellowDiamondService}
upgradeAmount=getMonthDiff(yellowDiamondService.closetime,greenDiamondService.closetime)}
else{if(yellowDiamondService){baseService=$.extend(yellowDiamondService,{servicecode:"XXZXYY",groupcode:"XXZXYY"})
if(parseStringToDate(yellowDiamondService.closetime)>new Date()){upgradeAmount=getMonthDiff(yellowDiamondService.closetime,new Date())}}
if(greenDiamondService){baseService=$.extend(greenDiamondService,{servicecode:"XXJZGW",groupcode:"XXJZGW"})
if(parseStringToDate(greenDiamondService.closetime)>new Date()){upgradeAmount=getMonthDiff(greenDiamondService.closetime,new Date())}}}
if(upgradeAmount>=1){$('#mode_select_list').find('label[_value="upgrade"]').show();if(payMode=="upgrade"){CHXBXB.baseService=baseService
serviceData.maxAmount=upgradeAmount
serviceData.defaultAmount=((ipay._defaultAmount<=upgradeAmount&&ipay._defaultAmount>0)?ipay._defaultAmount:upgradeAmount)
IPAY.langs.form.amount_max_warning="升级时长不能大于您目前的黄/绿单钻时长"
ipay._setAmountTips(LIB.stringFormat('根据您的'+baseService.servicename+'剩余有效期，最多可升级<em>{0}</em>个月的'+serviceData.name+'。',serviceData.maxAmount));serviceData.price=10;return payMode}}
else if(payMode=="upgrade"){return"month"}
if(payMode=='month'||payMode=='year'){price=INFO.services[serviceData.baseCode].orgPrice
serviceData.price=price;ipay._clearAmountTips();serviceData.maxAmount=999;serviceData.defaultAmount=3;return payMode}}
ipay._checkUpgrade=checkUpgrade
var defaultPayMode
switch(ipay.getParam("nt")){case"year":defaultPayMode="year"
break;case"month":defaultPayMode="month"
break;default:defaultPayMode="upgrade"}
ipay.selectPayMode(defaultPayMode)
ABTest.before(ipay,"updateTargetUin",function(uin){if(ipay.uin!=uin){$('#mode_select_list').find('label[_value="upgrade"]').hide();this.selectPayMode('month')}
else{ipay.selectPayMode("upgrade")}})
ABTest.before(ipay,"submit",function(_opts){if(ipay.pay_mode=="upgrade"){var XXZXYYFlag=0,XXJZGWFlag=0
if(CHXBXB.baseService.servicecode.toUpperCase()=="XXZXYY"){XXZXYYFlag=1}
else if(CHXBXB.baseService.servicecode.toUpperCase()=="XXJZGW"){XXJZGWFlag=1}
_opts.data["open_detail"]="XXZXYY_"+ipay.amount*31*XXZXYYFlag+",XXJZGW_"+ipay.amount*31*XXJZGWFlag}
return _opts;});ABTest.before(ipay,"_doChannelCallback",function(res){if(res.error_code_list=="20048-0-0"){res.result_info="很抱歉,您的升级时长校验失效或已开通相关后付费服务"}
return res;});})(ABTest,IPAY,LIB,window,INFO,$);/*  |xGv00|87bb914f8cd9912de29945380229860e */