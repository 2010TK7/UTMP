(function(global,doc){
	var setHeightLight =  function(heightLight){
		var dom = doc.getElementById("hint-user");
		var currentuin = LIB.cookie.get("uin").substring(1);
		var flag = LIB.cookie.get("jhjj_flag_"+currentuin);
		if(flag=="1") return;//have clicked
		if(dom){
			var className = heightLight?"hint-user":"";
			dom.setAttribute("class",className);
			dom.setAttribute("className",className);
		}
		if(heightLight){
			setMyaccount();
		}
	};
	var LIB = LIB || {};
	LIB.cookie = {
		get : function(name) {
			var ret = document.cookie.match(new RegExp("(?:^|;\\s)" + name + "=(.*?)(?:;\\s|$)"));
			return ret ? ret[1] : "";
		},
		set : function(key, value, opt) {
			var _date = new Date(), _domain = opt.domain || "https://pay.qq.com/js/pay.qq.com", _path = opt.path || "/", _time_gap = opt.time || 10 * 365 * 24 * 3600 * 1000;
			_date.setTime(_date.getTime() + _time_gap);
			document.cookie = key + "=" + value + "; path=" + _path + "; domain=" + _domain + "; expires=" + _date.toUTCString();
		},
		del : function(key, opt) {
			var _opt = opt || {};
			opt.time = -new Date();
			LIB.cookie.set(key, '', opt);
		}
	};
	var  cacheJHJJStatus = (function(){
        var currentuin = LIB.cookie.get("uin").substring(1);
        if(currentuin){
            return LIB.cookie.get("jhjj"+currentuin);
        }
        return "0";//no login,default is 0
    })();
    var setMyaccount = function(){
    	var dom = doc.getElementById("nav-myaccount");
		if(dom){
			var href = dom.getAttribute("href").split("#");
			href[1] = "userloan"
			dom.setAttribute("href",href.join("#"));
		}
    };
    var setJHJJStatus = function(value){
    	var currentuin = LIB.cookie.get("uin").substring(1);
   		LIB.cookie.set("jhjj"+currentuin,(currentuin?value:0),{time:24 * 3600 * 1000});//default set 0
    };
    //江湖救急小红点要撤下
 //    (function(){
 //    	var handle = function(){
 //    		location.href = "http://my.pay.qq.com/account/index.shtml?aid=pay.index.header.acct&ADTAG=pay.index.header.acct#userloan";
 //    	};
 //    	if(typeof $!="undefined"&&$.bind){
 //    		$("#hint-user").bind("click",handle);
 //    	}else{
 //    		var elem = doc.getElementById("hint-user");
 //    		if(elem.addEventListener){  
 //                elem.addEventListener("click",handle,false); // jQuery绑定的事件默认都是起泡阶段捕获  
 //            }else if(elem.attachEvent){  
 //                elem.attachEvent("onclick",handle); // IE事件模型中没有2级DOM事件模型具有的事件捕捉的概念，只有起泡阶段  
 //            }
 //    	}
 //    })();
 //    var hasLogin = document.getElementById("flag").value || '0';
 //    if(hasLogin != '0'){
	// 	if(cacheJHJJStatus==""){//don't cache
	// 		var getJson = typeof $!="undefined"&&$.getJSON?$.getJSON:(typeof Util!="undefined"&&Util.ajax)?function(url,cb){
	// 			Util.ajax.request({url: url,success: cb});
	// 		}:null;
	// 		if(getJson){
	// 			getJson('/cgi-bin/personal/query_creditcard.cgi?cmd=getbalance&t='+Math.random(), function(res) {
	// 		        if (res.resultcode == 0) {//白名单并且登陆，江湖救急应该show
	// 		        	setJHJJStatus(1);
	// 		        	var accountInfo = res.resultinfo?(res.resultinfo.obj||{}):{};
	// 		        	global.JHJJLoan ={
	// 		        		integral:parseFloat(accountInfo.integral)/100,
	// 		        		balance:parseFloat(accountInfo.balance)/100,
	// 		        		credit_limit:parseFloat(accountInfo.credit_limit)/100,
	// 		        		left:(parseFloat(accountInfo.credit_limit)/100) - (parseFloat(accountInfo.balance)/100)
	// 		        	};
	// 		        	setHeightLight(true);
	// 		            /*var accountInfo = res.resultinfo?(res.resultinfo.obj||{}):{};
	// 		            if(parseFloat(accountInfo.credit_limit) > parseFloat(accountInfo.balance)){
	// 		                setHeightLight(true);
	// 		            }*/
	// 		        }else{
	// 		        	setJHJJStatus(0);
	// 		        }
	// 		    });
	// 		}
	// 	}else{
	// 		setHeightLight(cacheJHJJStatus=="1");
	// 	}
	// }
})(window,document);