function formatDomXSSParams(e,t){for(var n=new Array,i=0;i<e.length;i++)if("&"==e.charAt(i)){var o=[3,4,5,9],r=0;for(var a in o){var d=o[a];if(i+d<=e.length){var c=e.substr(i,d).toLowerCase();if(t[c]){n.push(t[c]),i=i+d-1,r=1;break}}}0==r&&n.push(e.charAt(i))}else n.push(e.charAt(i));return n.join("")}function antiDomXSS(e){for(var t=new Object,n="'<>()`script:daex/hml;bs64,",i=0;i<n.length;i++){for(var o=n.charAt(i),r=o.charCodeAt(),a=r,d=r.toString(16),c=0;c<7-r.toString().length;c++)a="0"+a;t["&#"+r+";"]=o,t["&#"+a]=o,t["&#x"+d]=o}t["&lt"]="<",t["&gt"]=">",t["&quot"]='"';var l=decodeURIComponent(formatDomXSSParams(e,t)),s=new RegExp("['<>()`]|script:|data:text/html;base64,");return s.test(l)}function browser_version(){var e=navigator.userAgent.toLowerCase();return e.match(/msie ([\d.]+)/)?1:e.match(/firefox\/([\d.]+)/)?3:e.match(/chrome\/([\d.]+)/)?5:e.match(/opera.([\d.]+)/)?9:e.match(/version\/([\d.]+).*safari/)?7:1}function isForeignPhone(e){return!/^00(86|852|853|886)/.test(e)}function isGanAoTaiPhone(e){return!!/^00(852|853|886)/.test(e)}function isRegValidPhone(e){return e+="",/(^1[0-9]{10}$)|(^00[1-9]{1}[0-9]{3,15}$)/.test(e)}function langSwitch(e){$.winName.set("type",""),window.location.href=window.location.pathname.split("/"+$GLOBALS.lang+"/")[0]+"/"+e+"/index.html"}function indexType2RegType(e){var t=__("_lang_cgi_regType",[1,2,3]);return t[e]}function feedBack(e){if("en"==$GLOBALS.lang)window.location.href="mailto:qqimail@tencent.com?subject=Feedback from English signup page";else{var t=($.cookie.get("sessionCookie"),$.cookie.get("machineCookie"),$.cookie.get("skey"),$.cookie.get("uin"),"https://support.qq.com/products/14802");window.open(t)}}function _DJB(e){if(!e)return"";for(var t=5381,n=0,i=e.length;n<i;++n)t+=(t<<5)+e.charAt(n).charCodeAt();return 2147483647&t}!function(){window.onerror=function(e,t,n){var i=document.createElement("img");t||(t=window.location.href),e+=window.index?"["+index.current_error_dom+"]":"[no index]";var o=encodeURIComponent(e+"|_|"+t+"|_|"+n+"|_|"+window.navigator.userAgent);i.src="http://badjs.qq.com/cgi-bin/js_report?bid=67&mid=195232&msg="+o,i=null}}(),document.caretRangeFromPoint=function(){};var Simple=window.Simple=window.$=function(e){return document.getElementById(e)};$.cookie={get:function(e){var t=document.cookie.match(new RegExp("(^| )"+e+"=([^;]*)(;|$)"));return t?decodeURIComponent(t[2]):""},set:function(e,t,n,i,o){var r=new Date;r.setTime(r.getTime()+(o?36e5*o:2592e6)),document.cookie=e+"="+t+"; expires="+r.toGMTString()+"; path="+(i?i:"/")+"; "+(n?"domain="+n+";":"")},setSessionCookie:function(e,t,n,i){document.cookie=e+"="+t+"; path="+(i?i:"/")+"; "+(n?"domain="+n+";":"")},del:function(e,t,n){document.cookie=e+"=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path="+(n?n:"/")+"; "+(t?"domain="+t+";":"")},clear:function(){var e=document.cookie.match(new RegExp("([^ ;][^;]*)(?=(=[^;]*)(;|$))","gi"));for(var t in e)document.cookie=e[t]+"=;expires=Mon, 26 Jul 1997 05:00:00 GMT; path=/; "},uin:function(){var e=$.cookie.get("uin");return e?parseInt(e.substring(1,e.length),10):null},getNewUin:function(){var e=$.winName.get("last_page");$.winName.set("last_page",0);var t=$.cookie.get("_new_uin");return t||(t=$.winName.get("_new_uin")),t&&"undefined"!=t||(1==e&&$.report.monitor("no_uin"),window.location.href="https://4.url.cn/zc/chs/js/20190923/error.html?ec=no"),$.html.encode(t)},getEmail:function(){var e=$.cookie.get("_email");return e||(e=$.winName.get("_email")),e||($.report.monitor("no_email"),window.location.href="https://4.url.cn/zc/chs/js/20190923/error.html?ec=no"),$.html.encode(e)}},$.http={getXHR:function(){var e;try{e=new XMLHttpRequest}catch(t){try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(n){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(i){e=!1}}}return e},ajax:function(url,para,cb,method,type,headers){var xhr=$.http.getXHR();if(xhr){xhr.open(method,url);for(var name in headers)headers.hasOwnProperty(name)&&xhr.setRequestHeader(name,headers[name]);xhr.onreadystatechange=function(){4==xhr.readyState?(xhr.status>=200&&xhr.status<300||304===xhr.status||1223===xhr.status||0===xhr.status)&&(cb("undefined"==typeof type?eval("("+xhr.responseText+")"):xhr.responseText),xhr.onreadystatechange=function(){},xhr=null):$.report.monitor("submit_crash_"+$GLOBALS.lang)},xhr.send(para)}},post:function(e,t,n,i){var o="";for(var r in t)o+=r+"="+t[r]+"&";$.http.ajax(e,o,n,"POST",i,{"Content-Type":"application/x-www-form-urlencoded"})},get:function(e,t,n,i){var o="";for(var r in t)o+=r+"="+t[r]+"&";e.indexOf("?")==-1&&(e+="?"),"&"!==e[e.length-1]&&(e+="&"),e+=o,$.http.ajax(e,null,n,"GET",i)},jsonp:function(e){var t=document.createElement("script");t.src=e,document.getElementsByTagName("head")[0].appendChild(t)},loadScript:function(e,t){var n=document.createElement("script");n.onload=n.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(t(),n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n))},n.src=e,document.getElementsByTagName("head")[0].appendChild(n)},preload:function(e){var t=document.createElement("img");t.src=e}},$.get=$.http.get,$.post=$.http.post,$.browser=function(e){if("undefined"==typeof $.browser.info){var t={type:""},n=navigator.userAgent.toLowerCase();/webkit/.test(n)?t={type:"webkit",version:/webkit[\/ ]([\w.]+)/}:/opera/.test(n)?t={type:"opera",version:/version/.test(n)?/version[\/ ]([\w.]+)/:/opera[\/ ]([\w.]+)/}:/msie/.test(n)?t={type:"msie",version:/msie ([\w.]+)/}:/mozilla/.test(n)&&!/compatible/.test(n)&&(t={type:"ff",version:/rv:([\w.]+)/}),t.version=(t.version&&t.version.exec(n)||[0,"0"])[1],$.browser.info=t}return $.browser.info[e]},$.e={_counter:0,_uid:function(){return"h"+$.e._counter++},add:function(e,t,n){if("object"!=typeof e&&(e=$(e)),document.addEventListener)e.addEventListener(t,n,!1);else if(document.attachEvent){if($.e._find(e,t,n)!=-1)return;var i=function(t){t||(t=window.event);var i={_event:t,type:t.type,target:t.srcElement,currentTarget:e,relatedTarget:t.fromElement?t.fromElement:t.toElement,eventPhase:t.srcElement==e?2:3,clientX:t.clientX,clientY:t.clientY,screenX:t.screenX,screenY:t.screenY,altKey:t.altKey,ctrlKey:t.ctrlKey,shiftKey:t.shiftKey,keyCode:t.keyCode,stopPropagation:function(){this._event.cancelBubble=!0},preventDefault:function(){this._event.returnValue=!1}};Function.prototype.call?n.call(e,i):(e._currentHandler=n,e._currentHandler(i),e._currentHandler=null)};e.attachEvent("on"+t,i);var o={element:e,eventType:t,handler:n,wrappedHandler:i},r=e.document||e,a=r.parentWindow,d=$.e._uid();a._allHandlers||(a._allHandlers={}),a._allHandlers[d]=o,e._handlers||(e._handlers=[]),e._handlers.push(d),a._onunloadHandlerRegistered||(a._onunloadHandlerRegistered=!0,a.attachEvent("onunload",$.e._removeAllHandlers))}},remove:function(e,t,n){if(document.addEventListener)e.removeEventListener(t,n,!1);else if(document.attachEvent){var i=$.e._find(e,t,n);if(i==-1)return;var o=e.document||e,r=o.parentWindow,a=e._handlers[i],d=r._allHandlers[a];e.detachEvent("on"+t,d.wrappedHandler),e._handlers.splice(i,1),delete r._allHandlers[a]}},_find:function(e,t,n){var i=e._handlers;if(!i)return-1;for(var o=e.document||e,r=o.parentWindow,a=i.length-1;a>=0;a--){var d=i[a],c=r._allHandlers[d];if(c.eventType==t&&c.handler==n)return a}return-1},_removeAllHandlers:function(){var e=this;for(id in e._allHandlers){var t=e._allHandlers[id];t.element.detachEvent("on"+t.eventType,t.wrappedHandler),delete e._allHandlers[id]}},src:function(e){return e?e.target:event.srcElement},stopPropagation:function(e){e?e.stopPropagation():event.cancelBubble=!0}},$.bom={query:function(e){var t=window.location.search.substr(1).match(new RegExp("(^|&)"+e+"=([^&]*)(&|$)"));return t?decodeURIComponent(t[2]):""},getHash:function(){}},$.dom={init:function(){window.screenLeft?($.dom.getWindowX=function(){return window.screenLeft},$.dom.getWindowY=function(){return window.screenTop}):window.screenX&&($.dom.getWindowX=function(){return window.screenX},$.dom.getWindowY=function(){return window.screenY}),window.innerWidth?($.dom.getViewportWidth=function(){return window.innerWidth},$.dom.getViewportHeight=function(){return window.innerHeight},$.dom.getHorizontalScroll=function(){return window.pageXOffset},$.dom.getVerticalScroll=function(){return window.pageYOffset}):document.documentElement&&document.documentElement.clientWidth&&($.dom.getViewportWidth=function(){return document.documentElement.clientWidth},$.dom.getViewportHeight=function(){return document.documentElement.clientHeight},$.dom.getHorizontalScroll=function(){return document.documentElement.scrollLeft},$.dom.getVerticalScroll=function(){return document.documentElement.scrollTop}),document.documentElement&&document.documentElemnet.scrollWidth?($.dom.getDocumentWidth=function(){return document.documentElement.scrollWidth},$.dom.getDocumentHeight=function(){return document.documentElement.scrollHeight}):document.body.scrollWidth&&($.dom.getDocumentWidth=function(){return document.body.scrollWidth},$.dom.getDocumentHeight=function(){return document.body.scrollHeight})},getFinalStyle:function(e,t){return window.getComputedStyle?window.getComputedStyle(e,null)[t]:e.currentStyle?e.currentStyle[t]:e.style[t]},height:function(e){if("none"!==this.getFinalStyle(e,"display"))return e.offsetHeight||e.clientHeight;e.style.display="block";var t=e.offsetHeight||e.clientHeight;return e.style.display="none",t},width:function(e){if("none"!==this.getFinalStyle(e,"display"))return e.offsetWidth||e.clientWidth;e.style.display="block";var t=e.offsetWidth||e.clientWidth;return e.style.display="none",t},getPageWidth:function(){return Math.max(document.documentElement.clientWidth,document.body.clientWidth,document.documentElement.scrollWidth,document.body.scrollWidth)},getPageHeight:function(){return Math.max(document.documentElement.clientHeight,document.body.clientHeight,document.documentElement.scrollHeight,document.body.scrollHeight)},getNode:function(e,t){var n=document.createElement(e),i={"class":function(){n.className=t["class"]},style:function(){n.style.cssText=t.style}};for(var o in t)i[o]?i[o]():n.setAttribute(o,t[o]);return n}},$.css={hasClass:function(e,t){var n=new RegExp("\\b"+t+"\\b");return e?n.test(e.className):(console&&console.warn&&console.error(e,t),!1)},addClass:function(e,t){this.hasClass(e,t)||(e?e.className=e.className+" "+t:console&&console.warn&&console.error(e,t))},removeClass:function(e,t){var n=new RegExp("\\b"+t+"\\b");e.className=e.className.replace(n,"")},getWidth:function(e){return $(e).offsetWidth},getHeight:function(e){return $(e).offsetHeight},show:function(e){$.css.removeClass(e,"hide")},hide:function(e){$.css.addClass(e,"hide")}},$.set=function(e,t,n){if(!n)return e.getAttribute(t)},$.winName={set:function(e,t){var n=window.name||"";n.match(new RegExp(";"+e+"=([^;]*)(;|$)"))?window.name=n.replace(new RegExp(";"+e+"=([^;]*)"),";"+e+"="+t):window.name=n+";"+e+"="+t},get:function(e){var t=window.name||"",n=t.match(new RegExp(";"+e+"=([^;]*)(;|$)"));return n?antiDomXSS(n[1])?"":n[1]:""},clear:function(e){var t=window.name||"";window.name=t.replace(new RegExp(";"+e+"=([^;]*)"),"")}},$.storage={setItem:function(e,t,n){var i=n===!0?JSON.stringify(t):t;try{i=localStorage.setItem(e,i)}catch(o){i=$.winName.set(e,i)}return i},getItem:function(e,t){var n;try{n=localStorage.getItem(e)}catch(i){n=$.winName.get(e)}return t===!0&&(n=JSON.parse(n)),n},removeItem:function(e){try{localStorage.removeItem(e)}catch(t){$.winName.clear(e)}}},$.str={getBytes:function(e){return e.replace(/[^\x00-\xff]/g,"xx").length}},$.html={encode:function(e){var t="";return e+="",0==e.length?"":t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/ /g,"&nbsp;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")},decode:function(e){var t="";return 0==e.length?"":t=e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&apos;/g,"'").replace(/&quot;/g,'"')}},$.oop={extend:function(e){var t,n=function(e){return e&&"[object HTMLDivElement]"!==String(e)&&e.constructor===Object||"[object Object]"===String(e)},i=function(e){return e&&"[object HTMLDivElement]"!==String(e)&&e.constructor===Array||"[object Array]"===Object.prototype.toString.call(e)},o=function(e){return e&&e.constructor===Function};1==arguments.length?(e=this,t=0):(e=arguments[0],t=1);var r=!0;for("boolean"==typeof arguments[arguments.length-1]&&(r=arguments[arguments.length-1]);t<arguments.length;){var a=arguments[t];for(p in a){var d=e[p],c=a[p];d!==c&&(r&&c&&n(c)&&!i(c)&&!c.nodeType&&!o(c)?(d=e[p]||{},e[p]=$.oop.extend(d,c||(null==c.length?{}:[]))):void 0!==c&&(e[p]=c))}t++}return e},Class:function(){var e=arguments.length,t=arguments[e-1];t.init=t.init||function(){};var n=function(){return this.init.apply(this,arguments)};if(2===e){var i=arguments[0].extend,o=function(){};o.prototype=i.prototype,n.superClass=i.prototype,n.callSuper=function(e,t){var i=Array.prototype.slice,o=i.call(arguments,2);t=n.superClass[t],t&&t.apply(e,o.concat(i.call(arguments)))},n.prototype=new o,n.prototype.constructor=n,$.oop.extend(n.prototype,t),n.prototype.init=function(){t.init.apply(this,arguments)}}else 1===e&&(n.prototype=t);return n},bind:function(e,t){var n=Array.prototype.slice,i=n.call(arguments,2);return function(){return e.apply(t,i.concat(n.call(arguments)))}},addObserver:function(e,t,n){if(n){t="on"+t,e._$events||(e._$events={}),t in e._$events?0==e._$events[t].length&&(e._$events[t]=[]):e._$events[t]=[];for(var i=e._$events[t],o=-1,r=0,a=i.length;r<a;r++)if(i[r]==n){o=r;break}o===-1&&i.push(n)}},notifyObservers:function(e,t,n){var i=!0;if(t="on"+t,e._$events&&e._$events[t]){for(var o=$.oop.extend([],e._$events[t]),r=0,a=o.length;r<a;r++){var d=o[r].apply(e,[n]);d===!1&&(i=!1)}o=null}return i},removeObserver:function(e,t,n){var i,o,r=!1,a=e._$events;if(n&&t){if(a&&(evts=a["on"+t]))for(i=0,o=evts.length;i<o;i++)if(evts[i]==n){evts[i]=null,evts.splice(i,1),r=!0;break}}else if(t){if(a&&(t="on"+t,evts=a[t])){for(o=evts.length,i=0;i<o;i++)evts[i]=null;delete a[t],r=!0}}else if(e&&a){for(i in a)delete a[i];delete e._$events,r=!0}return r}},g={searchValue:__("g_search_value","输入想要的4-10位数"),searchTip:__("g_search_tip","请输入4-10位数字"),cacheUrl:"",ver:__("_js_version",""),component:{},searchBlur:function(e){""==e.value&&(e.value=g.searchValue,e.style.color="#aaa")},searchFocus:function(e){e.value==g.searchValue&&(e.value="",e.style.color="#000")},phoneClick:function(e){e?($("quickReg").style.display="block",$("switcher").className="hover",$.report.monitor("phone_zc")):($("quickReg").style.display="none",$("switcher").className="normal")},formSubmit:function(e){var t=$("serch_ipt").value;return/^[0-9]{4,10}$/.test(t)?(window.open("http://haoma.qq.com/shop.html#num="+$("serch_ipt").value+"&from=zc"),$.report.monitor("search_qq"),!1):(alert(g.searchTip),!1)},init:function(){$("serch_ipt")&&($("serch_ipt").value=g.searchValue)},checkVersion:function(){var e=document.createElement("script");e.src="ver.js?v="+Math.random(),document.getElementsByTagName("head")[0].appendChild(e)},clearCache:function(e){var t=document.createElement("iframe");t.src="clearcache.html#"+e,t.style.display="none",document.body.appendChild(t)},cb:function(e){e!=g.ver&&g.clearCache(window.location+"")},getQQnum:function(){try{if(window.ActiveXObject){var e=new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2"),t=e.CreateTXSSOData();e.InitSSOFPTCtrl(0,t);var n=e.CreateTXSSOData(),i=e.DoOperation(2,n),o=i.GetArray("PTALIST"),r=o.GetSize();if(r>0)return r}else if(navigator.mimeTypes["application/nptxsso"]){var a=document.createElement("embed");a.type="application/nptxsso",a.style.width="0px",a.style.height="0px",document.body.appendChild(a);var d=a.InitPVANoST();if(d){var c=a.GetPVACount();if(c>0)return c}}}catch(l){return 0}return 0},openHaoma:function(e){switch(e){case 1:$.report.monitor("birthday_qq"),window.open("http://haoma.qq.com/shop.html#topic=date&from=zc");break;case 2:$.report.monitor("love_qq"),window.open("http://haoma.qq.com/shop.html#topic=love&from=zc");break;case 3:$.report.monitor("grade_qq"),window.open("http://haoma.qq.com/static/gno/grade/grade_index.html");break;case 4:$.report.monitor("year_qq"),window.open("http://haoma.qq.com/shop.html#topic=date&from=zc");break;case 5:$.report.monitor("mobile_qq"),window.open("http://haoma.qq.com/shop.html#topic=phone&from=zc");break;case 6:$.report.monitor("fine_qq"),window.open("http://haoma.qq.com/static/gno/mobile/mobile_index.html")}}},g.init(),g.checkVersion(),g.component.quickReg=!!$("quickReg"),$.e.add(window,"load",function(){g.component.quickReg&&($.e.add($("switcher"),"click",function(e){var t=$("quickReg").style.display;"none"!=t&&""!=t||(g.phoneClick(!0),e.stopPropagation())}),$.e.add($("quickReg"),"click",function(e){e.stopPropagation()}),$.e.add(document.body,"click",function(e){var t=$("quickReg").style.display;"none"!=t&&""!=t&&g.phoneClick(!1)}))}),String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")},$.report={id2attr:{submit:{id:173272,tag:"0xD001"},guard:{id:173273,tag:"0xD002"},sendToLocal:{id:173274},sendToEmail:{id:173275},numReg:{id:173276},phoneReg:{id:239277},QQMailReg:{id:173277},otherMailReg:{id:173278},pv:{id:173279},pv_all:{id:260714},pv_chs:{id:278037},pv_cht:{id:278038},pv_en:{id:278039},verifyChangeTel:{id:239278},verifyUpChangeTel:{id:239279},hasbindChangeTel:{id:239280},tianyiChangeTel:{id:239281},paopao:{id:239282},phoneRegSubmitBtn:{id:241143},phoneGetVerimaBtn:{id:241144},phoneGetVerimaAgainBtn:{id:241145},phoneSubmitVerimaBtn:{id:241146},phoneVerifyNowBtn:{id:241148},phoneVerifyAgainBtn:{id:241149},phoneVerifyUpSubmitLimit:{id:241150},phoneHasbindPage:{id:241152},phoneChangebindPage:{id:241153},phoneOKLogin:{id:241155},phoneSetGuard:{id:241156},qqGetVerimaBtn:{id:241157},qqSubmitVerimaBtn:{id:241158},qqVerifyBindPhone:{id:241159},qqVerifyNowBtn:{id:241160},qqVerifyUpBindPhone:{id:241161},qqHasbindPage:{id:241162},qqChangebindPage:{id:241163},a_qq:{id:173280,tag:"0xD011"},a_weibo:{id:173281,tag:"0xD012"},a_qzone:{id:173282,tag:"0xD013"},a_email:{id:173283,tag:"0xD0014"},a_game:{id:173284,tag:"0xD015"},a_pengyou:{id:173285,tag:"0xD016"},a_vip:{id:173286,tag:"0xD017"},b_phoneqq:{id:173292},b_vip:{id:173294},b_email:{id:173293},b_pengyou:{id:173295},b_qzone:{id:173296},b_qshow:{id:173297},b_music:{id:173298},b_pet:{id:173299},b_qlive:{id:173300},b_lol:{id:173301},b_x5:{id:173302},b_weibo:{id:173303},b_style:{id:173304},b_mq:{id:173305},b_dnf:{id:173306},b_qplus:{id:173307},b_tenpay:{id:173308},b_speed:{id:173309},b_qtalk:{id:173310},b_qqgame:{id:173311},ad_style:{id:173318},ad_pai:{id:173319},ad_guanjia_7x:{id:173320},404:{id:181790},500:{id:181791},no_uin:{id:181922},no_email:{id:181923},no_param:{id:181924},no_sessionCookie:{id:182166},no_uin_ie:{id:182855},no_uin_ff:{id:182856},no_uin_chrome:{id:182857},no_uin_opera:{id:182858},no_uin_safari:{id:182859},cookie_disable:{id:183612},search_qq:{id:182032},birthday_qq:{id:182033},love_qq:{id:182034},grade_qq:{id:182035},year_qq:{id:182036},mobile_qq:{id:182037},fine_qq:{id:182038},phone_zc:{id:182176},tianyi:{id:182177},resendLink:{id:183518},renewLink:{id:183517},helpFriend:{id:183617},weakPwd:{id:228591},midPwd:{id:228592},strongPwd:{id:228593},QQHuiyuan:{id:232857},noPhone:{id:249241},phone_to_number:{id:250660},phone_to_noPhone:{id:250661},phone_to_mail:{id:250662},phone_to_submit:{id:250663},phone_count:{id:250667},number_to_phone_wording:{id:250763},email_count:{id:252155},email_to_number:{id:252156},email_to_number_wording:{id:252194},email_to_phone:{id:252157},email_to_qqmail:{id:252158},email_to_submit:{id:252159},number_count:{id:252190},number_to_phone:{id:252191},number_to_mail:{id:252192},number_to_submit:{id:252193},cancleqqVerifyBindPhone:{id:254605},cancleqqVerifyUpBindPhone:{id:254606},init_number_to_submit:{id:256401},init_email_to_submit:{id:256402},init_phone_to_submit:{id:256403},qqtab_bind_email_bind:{id:259735},qqtab_bind_email_active:{id:259736},qqtab_bind_email_lose_login:{id:259737},qqtab_bind_phone_bind:{id:259738},qqtab_bind_phone_active:{id:259739},qqtab_bind_phone_send:{id:259740},qqtab_bind_phone_conflict:{id:259741},qqtab_bind_phone_vcode_error:{id:259742},bindPhone_test1:{id:265572},bindPhone_test2:{id:265573},bindPhone_test3:{id:265574},bindPhone_test4:{id:265575},bindPhone_test5:{id:265576},bindEmail_test1:{id:265577},bindEmail_test2:{id:265578},bindEmail_test3:{id:265579},bindEmail_test4:{id:265580},bindEmail_test5:{id:265581},sea_phone_pv:{id:312410},submit_crash_chs:{id:2167930},submit_crash_cht:{id:2167931},submit_crash_en:{id:2167933},submit_crash:{id:2168015},chk_pg:{id:2367543},reg_succ_pg:{id:2367544},reg_fail_pg:{id:2367545},capt_dwmsg:{id:2367546},capt_upmsg:{id:2367547},capt_dw_up_msg:{id:2367548},capt_reg_succ:{id:2367549},capt_dwmsg_succ:{id:2367550},capt_upmsg_succ:{id:2367551},capt_reg_fail:{id:2367552},capt_reg_fail_phone:{id:2367553},reg_phone_pv:{id:2367554},reg_phone_dwmsg:{id:2367555},reg_phone_upmsg:{id:2367556},reg_phone_dw_up_msg:{id:2367557},reg_phone_succ:{id:2367558},reg_phone_upmsg_succ:{id:2367559},reg_phone_fail:{id:2367560},reg_succ_call_qq:{id:2367561},reg_succ_down_qq:{id:2367562},index_reg_btn:{id:2367563},index_get_vcode_btn:{id:2367564},index_upmsg_btn:{id:2367565},capt_reg_btn:{id:2367566},capt_get_vcode_btn:{id:2367567},capt_upmsg_btn:{id:2367568},capt_ty_11:{id:2367569},capt_ty_12:{id:2367570},capt_ty_21:{id:2367571},capt_ty_41:{id:2367572},capt_ty_51:{id:2367573},capt_ty_52:{id:2367574},capt_ty_61:{id:2367575},pc_qq_reg_pg:{id:2393993},pc_qq_reg_pg_fail:{id:2393994}},transform:function(e){if(!e)return"";var t=[];for(var n in e)t.push(n),t.push("="),t.push(e[n]),t.push("&");return t.join("")},monitor:function(e,t){var n="/cgi-bin/common/attr?"+this.transform(this.id2attr[e])+this.transform(t)+"r="+Math.random();$.http.preload(n)},isd:function(e){var t=[1,3,4];if(!(Math.random()>.1)){for(var n="https:"===location.protocol?["https://huatuospeed.weiyun.com/cgi-bin/r.cgi?flag1=7817&flag2=2&flag3=2"]:["http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7817&flag2=2&flag3=2"],i=e[0],o=0,r=t.length;o<r;o++)n.push("&"),n.push(t[o]),n.push("="),n.push(e[o+1]-i);$.http.preload(n.join(""))}},isdPwdTime:function(e){for(var t=[1,2,3,4],n="https:"===location.protocol?["https://huatuospeed.weiyun.com/cgi-bin/r.cgi?flag1=7817&flag2=2&flag3=3"]:["http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7817&flag2=2&flag3=3"],i=0,o=t.length;i<o;i++)e[i]>0&&(n.push("&"),n.push(t[i]),n.push("="),n.push(e[i]));$.http.preload(n.join(""))}},"chs"===$GLOBALS.lang&&$.oop.extend($.report.id2attr,{l_pv:{id:459776},l_enter_a:{id:459795},l_enter_a_click:{id:459796},l_enter_b:{id:459797},l_enter_b_l_click:{id:459798},l_enter_b_f_click:{id:459799},l_f_pv:{id:459800},l_f_banner:{id:459801},l_index_pv:{id:459802},l_pic_show:{id:459803},l_pic_right:{id:459804},l_pic_close:{id:459805},l_stop_show:{id:459806},l_stop_to_f:{id:459807},l_getnum_err:{id:459809},l_getnum_err_to_f:{id:459810},l_phone_has_join:{id:459812},l_reg_fri_num:{id:459813},l_reg_change_num:{id:459814},l_reg_btn:{id:459815},l_reg_succ:{id:459816},l_reg_fail:{id:459817},l_reg_time_out:{id:459818},l_under_banner_link:{id:459820},l_rule_link:{id:459821},l_feature_link:{id:459822},l_succ_down_link:{id:459823},l_succ_sq_link:{id:459825},a_p_pv:{id:462972},a_p_banner:{id:462973},a_p_phone_pv:{id:462974},a_p_phone_banner:{id:462975},a_p_mail_pv:{id:462976},a_p_mail_banner:{id:462977},a_l_reg_num:{id:462978},a_p_reg_num:{id:462979},b_p_pv:{id:462980},b_p_banner:{id:462981},b_p_phone_pv:{id:462982},b_p_phone_banner:{id:462983},b_p_mail_pv:{id:462984},b_p_mail_banner:{id:462985},b_l_reg_num:{id:462986},b_p_reg_num:{id:462987},c_p_pv:{id:462988},c_p_banner:{id:462989},c_p_phone_pv:{id:462990},c_p_phone_banner:{id:462991},c_p_mail_pv:{id:462992},c_p_mail_banner:{id:462993},c_l_reg_num:{id:462994},c_p_reg_num:{id:462995},c_p:{id:462999},a_cover_close:{id:467987},num_with_phone:{id:623929},num_without_phone:{id:623930},mail_with_phone:{id:623931},mail_without_phone:{id:623932},num_with_phone_succ:{id:626507},mail_with_phone_succ:{id:626508},index_send_sms:{id:630744},index_send_sms_succ:{id:630745}}),function(){var e="nohost_guid",t="../../../../nohost_htdocs/js/SwitchHost.js"/*tpa=https://4.url.cn/nohost_htdocs/js/SwitchHost.js*/;""!=$.cookie.get(e)&&$.http.loadScript(t,function(){var e=window.SwitchHost&&window.SwitchHost.init;e&&e()})}(),$.e.add(window,"load",function(){$.report.monitor("pv_all"),"chs"==$GLOBALS.lang&&$.report.monitor("pv_chs"),"cht"==$GLOBALS.lang&&$.report.monitor("pv_cht"),"en"==$GLOBALS.lang&&$.report.monitor("pv_en"),$.report.monitor("pv")}),window.TCISD={},TCISD.pv=function(e,t,n){TCISD.pv.send(e,t,n)},TCISD.reportUrl=function(e){(new Image).src=e},TCISD.pv._urlSpliter=/[\?\#]/,TCISD.pv._cookieP=/(?:^|;+|\s+)pgv_pvid=([^;]*)/i,TCISD.pv._cookieSSID=/(?:^|;+|\s+)pgv_info=([^;]*)/i,TCISD.pv.config={webServerInterfaceURL:"https:"==location.protocol?"https://pingfore.qq.com/pingd":"http://pingfore.qq.com/pingd"},function(){var e=[],t=-1,n={send:function(i,o,r,a,d){e.push({dm:i,url:o,rdm:r||"",rurl:a||"",flashVersion:d}),t<0&&(t=setTimeout(n.doSend,150))},doSend:function(){if(clearTimeout(t),t=-1,e.length){for(var i,o=0;o<e.length&&(i=n.getUrl(e.slice(0,e.length-o)),!(i.length<2e3));o++);e=e.slice(Math.max(e.length-o,1)),o>0&&(t=setTimeout(n.doSend,150)),TCISD.reportUrl(i)}},getUrl:function(e){for(var t=e[0],t={dm:escape(t.dm),url:escape(t.url),rdm:escape(t.rdm),rurl:escape(t.rurl),flash:t.flashVersion,pgv_pvid:n.getId(),sds:Math.random()},i=[],o=null,r=1;r<e.length;r++)o=e[r],i.push([escape(o.dm),escape(o.url),escape(o.rdm),escape(o.rurl)].join(":"));i.length&&(t.ex_dm=i.join(";")),e=[];for(o in t)e.push(o+"="+t[o]);return[TCISD.pv.config.webServerInterfaceURL,"?cc=-&ct=-&java=1&lang=-&pf=-&scl=-&scr=-&tt=-&tz=8&vs=3.3&",e.join("&")].join("")},getId:function(){var e,t;return(e=document.cookie.match(TCISD.pv._cookieP))&&e.length&&e.length>1?e=e[1]:(e=Math.round(2147483647*Math.random())*(new Date).getUTCMilliseconds()%1e10,document.cookie="pgv_pvid="+e+"; path=/; domain=qq.com; expires=Sun, 18 Jan 2038 00:00:00 GMT;"),document.cookie.match(TCISD.pv._cookieSSID)||(t=Math.round(2147483647*Math.random())*(new Date).getUTCMilliseconds()%1e10,document.cookie="pgv_info=ssid=s"+t+"; path=/; domain=qq.com;"),e}};TCISD.pv.send=function(e,t,i){e=e||location.hostname||"-",t=t||location.pathname,i=i||{},i.referURL=i.referURL||document.referrer;var o,r;o=i.referURL.split(TCISD.pv._urlSpliter),o=o[0],o=o.split("/"),r=o[2]||"-",o="/"+o.slice(3).join("/"),i.referDomain=i.referDomain||r,i.referPath=i.referPath||o,n.send(e,t,i.referDomain,i.referPath,i.flashVersion||"")}}(),TCISD.hotClick=function(e,t,n,i){TCISD.hotClick.send(e,t,n,i)},TCISD.hotClick.send=function(e,t,n,i){var i=i||{},o=TCISD.hotClick,r=i.x||9999,a=i.y||9999,i=i.doc||document,i=i.parentWindow||i.defaultView,d=i._hotClick_params||{},n=n||d.url||i.location.pathname||"-",t=t||d.domain||i.location.hostname||"-",n=[o.config.webServerInterfaceURL,"?dm=",t+".hot","&url=",escape(n),"&tt=-","&hottag=",e,"&hotx=",r,"&hoty=",a,"&rand=",Math.random()];TCISD.reportUrl(n.join(""))},TCISD.hotClick.config={webServerInterfaceURL:"https:"==location.protocol?"https://pingfore.qq.com/pingd":"http://pinghot.qq.com/pingd",domain:null,url:null},TCISD.hotClick.setConfig=function(e){var e=e||{},t=e.doc||document,t=t.parentWindow||t.defaultView;e.domain&&(t._hotClick_params.domain=e.domain),e.url&&(t._hotClick_params.url=e.url)},$.TCSS=function(){var e=Array.prototype.shift,t=function(){var t=e.call(arguments);if(t){var n,i=arguments;return window.TCISD&&(n=TCISD[t])&&n.apply(null,i),n}};return{report:t}}();
//# sourceMappingURL=simple.js.map
