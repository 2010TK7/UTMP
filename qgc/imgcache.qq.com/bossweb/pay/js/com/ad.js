AD={
	data:{
		c:"pay",
		loc:"",
		wh:["",""],
		wrap:"wrap_ad"
	},
	init:function(data){
		for(var i in data){
			AD.data[i]=data[i];
		}
		var head=document.getElementsByTagName("head")[0];
		var ad=document.createElement("script");
		ad.type="text/javascript";
		ad.src='//l.qq.com/lview?c='+AD.data.c+'&loc='+AD.data.loc;
		head.appendChild(ad);
	}
};
var AD2={area:function(){
			var handle=function(d){
				var img=d.fodder[0]['resource_url'];
				var href=d.fodder[0]['link_to'];
				var str='<a href="'+href+'" target="_blank"><img src="'+img+'" width="'+AD.data.wh[0]+'" height="'+AD.data.wh[1]+'" border="0"/></a>';
				document.getElementById(AD.data.wrap).innerHTML=str;
				var p=new Image();
				p.src="//p.l.qq.com/p.jpg?oid="+d.oid+"&cid="+d.cid+"&loc="+AD.data.loc+"&t="+Math.random();
			};
			return handle;
	}};/*  |xGv00|ec4e099ef2642ddb6527dd0e709a1f12 */