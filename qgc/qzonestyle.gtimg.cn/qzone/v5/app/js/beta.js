
var _T={listEntries:'<li class="bg2">\
   <div class="cover_box">\
    <a href="https://qzonestyle.gtimg.cn/qzone/v5/app/js/detail.htm?aid={{appId}}">{{appIconAttr}}</a><br />\
    {{appBtn}}\
   </div>\
   <div class="bd">\
    <h2><a href="https://qzonestyle.gtimg.cn/qzone/v5/app/js/detail.htm?aid={{appId}}" class="c_tx">{{appAlias}}</a></h2>\
    <p class="dev none">开发者：<a href="#" class="c_tx">Boyaa</a></p>\
    <p>{{appComm}} <a href="https://qzonestyle.gtimg.cn/qzone/v5/app/js/detail.htm?aid={{appId}}" class="c_tx">详细</a></p>\
   </div>\
   <div class="op"><a href="javascript:;" onclick="" class="c_tx none">要提意见</a><a href="#" onclick="return goQA(this, {{appId}});" target="_blank" class="c_tx{{noQA}}">咨询投诉</a></div>\
  </li>'};var _G={uin:0,wfstr:"",openId:"",openKey:""};var _QAMap={"401":"http://qzone.boyaa.com/pet/qzone/feedback.php"};function goQA(a,aid){var u=_QAMap[aid];if(u&&u.length){a.href=u+(u.indexOf("?")>-1?("&"):("?"))+"qz_uid="+_G.openId+"&qz_skey="+_G.openKey;return true;}else{return false;}}
function main(){var c=QZONE.FP.getQzoneConfig();_G.wfstr=c.wide?"margin:14px 6px 0;":"margin:14px 13px 0;";_G.uin=c.loginUin;QZONE.appPlatform.getOpenId(function(op){if(op.openid&&op.openkey&&op.openid.length>10&&op.openkey.length>10){_G.openId=op.openid;_G.openKey=op.openkey;getBetaApps(getDataBack);}else{showError();}},showError);}
function showError(){QZFL.widget.msgbox.show("尊敬的用户，对不起，服务器繁忙，请稍后再试",2,1500);}
function showInstallPanel(aid,type,params){QZONE.FP.popupDialog("添加应用",{src:"/qzone/v5/app/beta/install.htm?type=home&aid="+aid
+(params?params.replace(/^\?/,"&"):"")},446,244);}
function getBetaApps(cb){var t=new QZONE.JSONGetter("http://base.qzone.qq.com/cgi-bin/qzapp/appinfo_allapp_info.cgi","getBetaApps",{uin:_G.uin,type:4,hat:1},"utf-8");t.addOnSuccess(cb);t.addOnError(function(args){alert(args);});t.send("_Callback");}
function gotoApp(aname,sw){if(sw){QZONE.FP._t.QZONE.space.toApp("/"+aname);}else{}}
function getDataBack(o){if(!o){alert("error");return;}
var n=parseInt(o.ret);if(isNaN(n)){alert("error NaN");return;}
if(n==0){var sb=new StringBuilder(),cnt=0,aid,icurl,l=o.items,betaData={},installed=QZONE.appPlatform.getListUserInstalled();for(var i=0,len=l.length;i<len;++i){if(!(l[i].app_setupflag&_Filter.beta)){continue;}
aid=l[i].app_id;icurl=l[i].app_iconurl;sb.append(_T.listEntries.replace(/\{\{(\w+)\}\}/g,function(a,b){switch(b){case"appBtn":return installed[aid]?('<button class="bt_tx4" onclick="QZONE.FP.toApp(\'/myhome/'+aid+'\');">立即体验</button>'):('<button class="bt_tx4" onclick="showInstallPanel('+aid+');">我要开通</button>');case"appId":return l[i].app_id;case"noQA":return _QAMap[aid]?"":" none";case"appAlias":return l[i].app_alias;case"appComm":return QZFL.string.cut(descriptionFix(nl2br(escHTML(l[i].app_comm))),120,"...");case"appName":return l[i].app_name;case"appIconAttr":return QZONE.appPlatform.getIconHtml(icurl,aid,64).replace(/src=\"/,'class="app_cover bor2" style="margin-bottom:25px;width:64px;height:64px;" onerror="errImg(this);" src="');}}));betaData[aid]=l[i];cnt++;}
$("_app_list").innerHTML=sb.toString();QZONE.FP.dataSave("_betaAppInfo",betaData);}else{switch(n){case-1:;default:;}}}
function errImg(im){im.onerror=null;im.src="../../../../ac/b.gif"/*tpa=https://qzonestyle.gtimg.cn/ac/b.gif*/;}
function closeTips(){var d=$('_beta_tipsArea');d.style.visibility="hidden";d.style.height="0";d.style.margin="0";d.style.padding="0";}
QZONE.pageEvents.pageBaseInit();QZONE.pageEvents.onloadRegister(main);/*  |xGv00|b2d1303ce04e3e6b5c66d59ce3d7fc24 */