!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";function o(e,t){var n,o=document.head||document.getElementsByTagName("head")[0]||document.documentElement;n=document.createElement("script"),n.async="async",n.src=e,n.onload=n.onreadystatechange=function(e,r){(r||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,o&&n.parentNode&&o.removeChild(n),n=void 0,r||t&&t())},o.insertBefore(n,o.firstChild)}function r(e){var t=window.location.href;t=t.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;");var n=new RegExp("(\\?|#|&)"+e+"=([^&^#]*)(#|&|$)"),o=t.match(n);return o?o[2]:""}function i(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)?"wx":-1}function c(){var e="0";return/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?e=15:/(Android)/i.test(navigator.userAgent)&&(e=14),e}function a(e){for(var t={},n=location.search.substring(1),o=n.split("&"),r=0;r<o.length;r++){var i=o[r].indexOf("=");if(-1!=i){var c=o[r].substring(0,i),a=o[r].substring(i+1);a=decodeURIComponent(a),!0===e&&(a=a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")),t[c]=a}}return t}function s(e,t,n){var o=objName+"="+escape(objValue);if(o+="https://kf.qq.com/touch/newindex/dist/;domain=kf.qq.com",objHours>0){var r=new Date,i=3600*objHours*1e3;r.setTime(r.getTime()+i),o+=";expires="+r.toGMTString()}document.cookie=o}function l(e){var t;return function(e){if(!e)return e;for(;e!=unescape(e);)e=unescape(e);for(var t=["<",">","'",'"',"%3c","%3e","%27","%22","%253c","%253e","%2527","%2522"],n=["&#x3c;","&#x3e;","&#x27;","&#x22;","%26%23x3c%3B","%26%23x3e%3B","%26%23x27%3B","%26%23x22%3B","%2526%2523x3c%253B","%2526%2523x3e%253B","%2526%2523x27%253B","%2526%2523x22%253B"],o=0;o<t.length;o++)e=e.replace(new RegExp(t[o],"gi"),n[o]);return e}((t=document.cookie.match(RegExp("(^|;\\s*)"+e+"=([^;]*)(;|$)")))?unescape(t[2]):null)}function u(e){l(e)&&(document.cookie=e+"=; expires=Thu, 01-Jan-70 00:00:01 GMT")}function p(e){return e=e.replace(/&/g,"&amp;"),e=e.replace(/>/g,"&gt;"),e=e.replace(/</g,"&lt;"),e=e.replace(/"/g,"&quot;"),e=e.replace(/'/g,"&#39;"),e=e.replace(/=/g,"&#61;"),e=e.replace(/`/g,"&#96;")}function d(e){return e=e.replace(/&amp;/gi,"&"),e=e.replace(/&quot;/gi,'"'),e=e.replace(/&#039;/gi,"'"),e=e.replace(/\\n/gi,"<br>"),e=e.replace(/&lt;([\/]?(a|p|img|span|strong|br|h\d|div|table|tbody|thead|tfoot|tr|th|td|dd|dt|dl|ul|li|ol|b|em|u|title|small|pre|i|section))/gi,"<$1"),e=e.replace(/&gt;/gi,">"),e=e.replace(/<img [^>]*src=['"]?([^'" ]+)[^>]*>/gi,function(e,t){return"<img src="+t+">"})}function f(e){var t=navigator.userAgent.toLowerCase();return"qqlivebrowser"==t.match(/QQLiveBrowser/i)||"qqlivehdbrowser"==t.match(/QQLiveBrowser/i)?"phone":"qqlivehdbrowser"==t.match(/QQLiveHDBrowser/i)?"pad":-1}function m(e){return!!/^[\u4E00-\u9FA5]{1,6}$/.test(e)}function g(e){return!!/[\u4e00-\u9fa5]/g.test(e)}function h(e){return!!/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test(e)}function _(e){return!!/^[0-9]{5,10}$/.test(e)}function v(e){return!!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e)}function k(e){var e,t,n,o,r,i=new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!"),c={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"xinjiang",71:"台湾",81:"香港",82:"澳门",91:"国外"},a=new Array;if(a=e.split(""),null==c[parseInt(e.substr(0,2))])return i[4];switch(e.length){case 15:return(parseInt(e.substr(6,2))+1900)%4==0||(parseInt(e.substr(6,2))+1900)%100==0&&(parseInt(e.substr(6,2))+1900)%4==0?ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/:ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/,ereg.test(e)?i[0]:i[2];case 18:return parseInt(e.substr(6,4))%4==0||parseInt(e.substr(6,4))%100==0&&parseInt(e.substr(6,4))%4==0?ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/:ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/,ereg.test(e)?(o=7*(parseInt(a[0])+parseInt(a[10]))+9*(parseInt(a[1])+parseInt(a[11]))+10*(parseInt(a[2])+parseInt(a[12]))+5*(parseInt(a[3])+parseInt(a[13]))+8*(parseInt(a[4])+parseInt(a[14]))+4*(parseInt(a[5])+parseInt(a[15]))+2*(parseInt(a[6])+parseInt(a[16]))+1*parseInt(a[7])+6*parseInt(a[8])+3*parseInt(a[9]),t=o%11,r="F",n="10X98765432",r=n.substr(t,1),r==a[17]?i[0]:i[3]):i[2];default:return i[1]}}function y(e){return!!/^[0-9]{4}$/.test(e)}t.__esModule=!0,t.loadScript=o,t.getUrlParam=r,t.IsWeixin=i,t.check_platform=c,t.getUrlArgs=a,t.addCookie=s,t.getCookie=l,t.delCookie=u,t.HtmlAttributeEncode=p,t.htmlCharDecode=d,t.getPhoneType=f,t.isChinaName=m,t.noChinaName=g,t.checkMoney=h,t.Isqq=_,t.Isphone=v,t.Isid=k,t.Iscard=y,t.getProductInfo=[{icon:"../../pro/tool/20170308084010_853.png"/*tpa=https://kf.qq.com/touch/pro/tool/20170308084010_853.png*/,name:"微信支付",url:"https://kf.qq.com/touch/weixin/pay_commen_problem.html?from=wap"},{icon:"../../pro/tool/20151210185246_237.png"/*tpa=https://kf.qq.com/touch/pro/tool/20151210185246_237.png*/,name:"王者荣耀",url:"https://kf.qq.com/touch/scene_product.html?scene_id=kf5699"},{icon:"../../pro/tool/20190508051328_981.png"/*tpa=https://kf.qq.com/touch/pro/tool/20190508051328_981.png*/,name:"和平精英",url:"https://kf.qq.com/touch/scene_product.html?scene_id=kf6607"},{icon:"../../pro/tool/20170803035123_991.png"/*tpa=https://kf.qq.com/touch/pro/tool/20170803035123_991.png*/,name:"腾讯视频",url:"https://kf.qq.com/touch/scene_product.html?scene_id=kf5703"},{icon:"../../pro/tool/20170803063711_210.png"/*tpa=https://kf.qq.com/touch/pro/tool/20170803063711_210.png*/,name:"DNF地下城与勇士",url:"https://kf.qq.com/touch/scene_product.html?scene_id=kf5700"}]},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(e){var t=document.createElement("script"),n=document.getElementsByTagName("script")[0];"https:"==window.location.protocol?t.src="https://pingjs.qq.com/tcss.ping.https.js":t.src="../../../../pingjs.qq.com/tcss.ping-1.js"/*tpa=http://pingjs.qq.com/tcss.ping.js*/,t.type="text/javascript",t.onload=t.onerror=t.onreadystatechange=function(){/loaded|complete|undefined/.test(t.readyState)&&function(){t.onload=t.onerror=t.onreadystatechange=null,t.parentNode.removeChild(t),t=void 0,void 0===e?pgvMain():pgvMain(e)}()},n.parentNode.insertBefore(t,n),u.reportPV()}function i(e){return e&&e.nodeType&&(1===e.nodeType||11===e.nodeType)}function c(e){var t;t=i(e)?$(e).data("tag"):e,t=s.tag_prefix+t,"function"==typeof pgvSendClick&&pgvSendClick({hottag:t}),u.sendTrace(t)}t.__esModule=!0,t.initTcss=r,t.tagClick=c;var a=n(4),s=o(a),l=n(5),u=o(l)},function(e,t,n){"use strict";function o(e){$.ajax({type:"POST",url:"/cgi-bin/common?rand="+Math.random(),data:"rand="+Math.random()+"&channel=flow&command="+encodeURIComponent("command=F10254&procode=nono_sence"),dataType:"json",timeout:5e3,success:function(t){if("function"==typeof e){var n=t.resultinfo.list[0];e(0==t.resultcode&&0==n.result&&1==n.isjump&&n.linkurl?n.linkurl:"")}},error:function(t){"function"==typeof e&&e("")}})}t.__esModule=!0,t.getGoWxDl=o},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var r=n(1),i=o(r),c=n(6),a=o(c),s=n(0),l=(o(s),n(2)),u=(o(l),$("#source_type").val());i.initTcss(),"index"==u?a.cartHtml():"products"==u&&a.getProductList();var p=new Date;$("#copyright").text("Copyright& 1998-"+p.getFullYear()+" Tencent. All Rights Reserved.")},function(e,t,n){"use strict";t.__esModule=!0,t.domain="https://kf.qq.com/touch/newindex/dist/kf.qq.com",t.scheme="https://",t.tag_prefix="KF.TOUCH.INDEX."},function(e,t,n){"use strict";function o(){var e=-1;"undefined"!=typeof _speedMark&&(e=new Date-_speedMark);var t=document.referrer,n="";return n=l.getCookie("uin"),n=i(n),"uin="+encodeURIComponent(n)+"&source_url="+encodeURIComponent(t)+"&oper_time="+encodeURIComponent(e)+"&rand="+Math.random()}function r(e){var t="/touch/ping.html?"+e;$.ajax({type:"GET",url:t,dataType:"json",timeout:5e3,success:function(e){}})}function i(e){if(null==e||""==e)return"";if(/o+\d{5,12}$/.test(e)){var t=/o0+|^o/;e=e.replace(t,"")}else e="";return e}function c(){r(o())}function a(e){var t="&tag_name="+encodeURIComponent(e);r(o()+t)}t.__esModule=!0,t.reportPV=c,t.sendTrace=a;var s=n(0),l=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(s)},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(){c(),$("#protal_list li").click(function(){m.tagClick($(this).attr("name")),location.href=$(this).attr("rel")})}function i(){"wx"==v.IsWeixin()&&l(),v.getUrlParam("t")&&"guanjia"==v.getUrlParam("t")&&$("#pop_bottom").hide(),d.loadScript("../../js/static/index_product_list.js"/*tpa=https://kf.qq.com/touch/js/static/index_product_list.js*/,function(){datalist&&($.each(datalist,function(e,t){t.list&&t.list.length>0&&(0==t.type?k=t.list:1==t.type?y=t.list:2==t.type?x=t.list:3==t.type&&$.each(t.list,function(e,t){w.push(t)}))}),a("ten_pay"),$("#tab_list li").click(function(){$("#tab_list li").attr("class","nav-item"),$(this).attr("class","nav-item active"),m.tagClick("TABLIST_"+$(this).attr("name")),a($(this).attr("name"))}))})}function c(){"wx"==v.IsWeixin()&&l();var e="";$.each(v.getProductInfo,function(t,n){e+='<li class="line-item" rel="'+n.url+'" ><img src="'+n.icon+'" alt="">',e+='<p class="item-tt">'+n.name+'</p><i class="icon-v-right"></i></li>'}),e+='<li class="line-item" name="more"><i class="icon icon-more"></i>',e+='<p class="item-tt">更多产品</p><i class="icon-v-right"></i></li>',$("#product_list").html(e),$("#product_list li").click(function(){s("more"==$(this).attr("name")?"https://kf.qq.com/touch/index_products.html":$(this).attr("rel"))}),$("#close_layer").click(function(){m.tagClick("INDEX_CLOSELAYER"),$("#pop_bottom").hide()}),$("#home_goto_wx,#phone_goto_wx").unbind("click").click(function(){if("wx"==v.IsWeixin())m.tagClick("HOME_GOTOWX_WX"),u();else{if(1==C)return T?location.href=decodeURIComponent(T):alert('请关注微信公众号"腾讯客服"'),!1;m.tagClick("HOME_GOTOWX_OTHER"),h.getGoWxDl(function(e){e?(C=1,T=e,location.href=decodeURIComponent(e)):(C=0,alert('请关注微信公众号"腾讯客服"'))})}}),$("#footer_ul li").unbind("click").click(function(){var e=$(this).attr("name");m.tagClick("FOOTER_"+e),"kf_tel"==e?$("#pop_full").show():"kf_support"==e?window.location="https://support.qq.com/product/22692":"kf_pc"==e&&(window.location="https://kf.qq.com/?mobile")}),$("#cross_close").unbind("click").click(function(){m.tagClick("FOOTER_HIDE"),$("#pop_full").hide()}),$("#call_phone li").unbind("click").click(function(){var e=$(this).attr("rel");m.tagClick("CALL_"+e),location.href="tel:"+e})}function a(e){var t=[];"ten_pay"==e?t=k:"mob_game"==e?t=y:"pc_game"==e?t=x:"other"==e&&(t=w);var n="";$.each(t,function(e,t){n+='<li class="cell-item" name="'+t.pro_name+'" >',n+='<img src="'+t.icon+'" alt=""><p>'+t.name+"</p></li>"}),$("#mod_list").html(n),$("#close_layer").click(function(){m.tagClick("PRODUCT_CLOSELAYER"),$("#pop_bottom").hide()}),$("#goto_wx").unbind("click").click(function(){if("wx"==v.IsWeixin())m.tagClick("PRODUCT_GOTOWX_WX"),u();else{if(1==b)return O?location.href=decodeURIComponent(O):alert('请关注微信公众号"腾讯客服"'),!1;b=1,m.tagClick("PRODUCT_GOTOWX_OTHER"),h.getGoWxDl(function(e){e?(O=e,b=1,location.href=decodeURIComponent(e)):(b=0,alert('请关注微信公众号"腾讯客服"'))})}}),$("#mod_list li").click(function(){m.tagClick("PRODUCT_GOTOPRODUCT_"+$(this).attr("name")),s("/touch/product/"+$(this).attr("name")+".html")})}function s(e){if("javascript:;"!==(e=$.trim(e))){var t=location.search;t.length>0&&(e.indexOf("?")>0?e=e+"&"+t.substring(1):e+=t),location.href=e}}function l(){d.loadScript("../../../../res.wx.qq.com/open/js/jweixin-1.2.0.js"/*tpa=https://res.wx.qq.com/open/js/jweixin-1.2.0.js*/,function(){var e=window.location.href,t=encodeURIComponent(e),n="command=WX10001&formid=wechat_authorization&url="+t;$.ajax({type:"POST",url:"/cgi-bin/common",contentType:"application/x-www-form-urlencoded; charset=UTF-8",data:"rand="+Math.random()+"&channel=flow&command="+encodeURIComponent(n),dataType:"json",timeout:5e3,async:!1,success:function(e){"0"==e.resultinfo.list[0].result&&(I.nonceStr=e.resultinfo.list[0].nonceStr,I.signature=e.resultinfo.list[0].signature,I.timestamp=e.resultinfo.list[0].time,I.appId=e.resultinfo.list[0].appid,I.username=e.resultinfo.list[0].username),I.signature&&(wx.config({debug:!1,beta:!0,appId:I.appId,timestamp:I.timestamp,nonceStr:I.nonceStr,signature:I.signature,jsApiList:["startTempSession"]}),wx.ready(function(){I.configReady=1,wx.hideOptionMenu(),1==I.isClick&&u()}))},error:function(e){setTimeout(function(){},100)}}),document.addEventListener("visibilitychange",function(){wx.closeWindow()})})}function u(e){1==I.configReady?wx.invoke("startTempSession",{sessionId:I.username,sessionFrom:I.sessionFrom},function(e){"startTempSession:ok"!=e.err_msg&&(1==I.isClick?(alert("请稍后再试或通过微信关注“腾讯客服”公众号在线咨询"),location.reload()):(I.isClick=1,wx_create_config()))}):(alert("请稍后再试或通过微信关注“腾讯客服”公众号在线咨询"),setTimeout(function(){location.reload()},800))}t.__esModule=!0,t.cartHtml=r,t.getProductList=i;var p=n(7),d=o(p),f=n(1),m=o(f),g=n(2),h=o(g),_=n(0),v=o(_),k=[],y=[],x=[],w=[],I={};I.t_config={},I.appId="",I.timestamp="",I.nonceStr="",I.signature="",I.username="",I.sessionFrom="faq_1000000_kfwap",I.openid="",I.sessionid="",I.cofingok=0,I.configReady=0,I.isClick=0,I.imgServerId="",I.getAppOpenid="";var C=0,b=0,T="",O=""},function(e,t,n){"use strict";function o(e,t){var n,o=document.head||document.getElementsByTagName("head")[0]||document.documentElement;n=document.createElement("script"),n.async="async",n.src=e,n.onload=n.onreadystatechange=function(e,r){(r||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,o&&n.parentNode&&o.removeChild(n),n=void 0,r||t&&t())},o.insertBefore(n,o.firstChild)}t.__esModule=!0,t.loadScript=o}]);