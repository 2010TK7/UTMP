var _NET_BAND_TEST_URL           = "../../isdspeed.qq.com/cgi-bin/r-1.cgi.htm"/*tpa=http://isdspeed.qq.com/cgi-bin/r.cgi*/; //for operation
var _FREQUENCY                   = 0.5; //采样频率

var _FLAG1_PAY                   = 7713; //flag1=代表pay内部的业务ID，

var _FLAG2_PAY			         = 1;	//flag2=代表所进行测速的站点ID，PAY

var _FLAG3_INDEX				 = 1;	//flag3=代表所进行测速的页面ID，首页
var _FLAG3_INDEX_PAYCENTER		 = 2;	//flag3=代表所进行测速的页面ID，首页，帐户充值
var _FLAG3_INDEX_SERVICE		 = 3;	//flag3=代表所进行测速的页面ID，首页，开通服务
var _FLAG3_INDEX_SERVICE_QQVIP	 = 4;	//flag3=代表所进行测速的页面ID，首页，开通服务，QQ会员
var _FLAG3_INDEX_ACCOUNT		 = 5;	//flag3=代表所进行测速的页面ID，首页，帐户管理

//ary为采样时间点数组，其中0代表的是起始时间点，f为采样频率，如果没定义则取默认值(_FREQUENCY)
//obj,为添加额外的上报参数对
function _start_send(ary,obj,f){
  var _f  = _FREQUENCY;
  if(f>0&&f<=1) _f = f;
  
  if(Math.random()<_f && ary.length>1){//做抽样上报
       var _p =["?"];

     //加入pay的flag1 tag
	   _p.push("flag1="+_FLAG1_PAY+"&");

	   for (key in obj){
	    if(key !=null) _p.push(key+"="+obj[key]+"&");
	   }

      for(var i=1;i<ary.length;i++){
		if(!!ary[i]) _p.push((i)+"="+(ary[i]-ary[0])+"&");
	   }

//      alert(_NET_BAND_TEST_URL+_p.join(""));
      var sender=new Image();
      sender.src=_NET_BAND_TEST_URL+_p.join("");   
	}
};
function mkfunc(ary,obj,freq){ return function(){ _start_send(ary,obj,freq);};};
function send_stat_request(ary,obj,freq,delay){ setTimeout(mkfunc(ary,obj,freq),delay);};