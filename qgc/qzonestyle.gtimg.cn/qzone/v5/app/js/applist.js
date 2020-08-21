
var _T={listEntries:'<li class="list_li bor2" title="{{appAlias}}" onclick="gotoApp(\'{{appName}}\', {{sw}});return false;">\
   <a href="javascript:;">\
    <i class="appicon_{{appId}}"></i>\
    <span class="c_tx3 textoverflow">{{appAlias}}</span>\
   </a>\
  </li>'};var _G={wfstr:""};function main(){var c=QZONE.FP.getQzoneConfig();_G.wfstr=c.wide?"margin:14px 6px 0;":"margin:14px 13px 0;";QZONE.appPlatform.getUserAppList(getDataBack);if(c.isOwner){}}
function gotoApp(aname,sw){QZONE.FP._t.TCISD.hotClick("more."+aname,"https://qzonestyle.gtimg.cn/qzone/v5/app/js/user.qzone.qq.com");if(sw){QZONE.FP._t.QZONE.space.toApp("/"+aname);}else{}
return false;}
function getDataBack(o){if(!o){alert("error");return;}
var n=parseInt(o.code);if(isNaN(n)){alert("error NaN");return;}
if(n==0){var sb=new StringBuilder(),cnt=0,aid,icurl,l=(parent.g_version<6)?o.items:[];if(parent.g_version>5){l=l.concat(o.data.defaultapp).concat(o.data.topapp).concat(o.data.commapp);}
for(var i=0,len=l.length;i<len;++i){if(typeof l[i]==="undefined"){continue;}
if((l[i].app_id==905)&&(QZONE.FP._t.g_iUin!=QZONE.FP._t.g_iLoginUin)){continue;}
if(l[i].app_id==219){continue;}
if(!(l[i].app_setupflag&_Filter.guest)){continue;}
if(!(l[i].app_setupflag&_Filter.gp)){continue;}
if(l[i].app_id==337){continue;}
if(l[i].app_id==3){l[i].app_alias="访客";}
aid=l[i].app_id;icurl=l[i].app_iconurl;sb.append(_T.listEntries.replace(/\{\{(\w+)\}\}/g,function(a,b){switch(b){case"widthFix":return _G.wfstr;case"appId":return l[i].app_id;case"appAlias":return l[i].app_alias;case"appComm":return descriptionFix(nl2br(escHTML(l[i].app_comm)));case"appName":return l[i].app_name;case"sw":return!!(l[i].app_setupflag&_Filter.gp);case"appIconAttr":return QZONE.appPlatform.getIconHtml(icurl,aid,32);}}));cnt++;}
$("_app_list").innerHTML=sb.toString();$("_app_count").innerHTML="("+cnt+")";QZFL.event.delegate($("_app_list"),"li","mouseover",function(){var nodeI=this.getElementsByTagName("i")[0],nodeSpan=this.getElementsByTagName("span")[0];QZONE.css.addClassName(this,"list_li_hover bg2");QZONE.css.addClassName(nodeI,"i_hover");QZONE.css.addClassName(nodeSpan,"span_hover");});QZFL.event.delegate($("_app_list"),"li","mouseout",function(){var nodeI=this.getElementsByTagName("i")[0],nodeSpan=this.getElementsByTagName("span")[0];QZONE.css.removeClassName(this,"list_li_hover bg2");QZONE.css.removeClassName(nodeI,"i_hover");QZONE.css.removeClassName(nodeSpan,"span_hover");});}else{switch(n){case-1:;default:;}}}
QZONE.pageEvents.pageBaseInit();QZONE.pageEvents.onloadRegister(main);/*  |xGv00|0e0df72cfb4bd732833afbf4d32fc665 */