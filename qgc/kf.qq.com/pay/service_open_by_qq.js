var 	show = [],
		ajax_options="&fromtype=wss&fromtoolid=wss207",
		tplData = {
			list : []
		},
		tplNoneData = {
				list : []
		};
$(function() {
	if (KF.com.user.uin === "") {
		KF.com.login('https://kf.qq.com/pay/pay_qq/index.html');
		return false;
	} else {
		get_content();
	}
});
$("#change_hint").on("click",function(){
	$("#change_pay_popshade,#change_pay_popshade").show();
});
$(".hide_change_hint").on("click",function(){
	$("#change_pay_popshade,#change_pay_popshade").hide();
});
$("input[name='relieve']").on("click",function(){
	if ($("input[name='relieve']:checked").val() == 3){
		$('#other_msg').show();
	}else{
		$('#other_msg').hide();
	}
});
function get_biz_icon(biz_code){
	return "icon_"+biz_code.toLowerCase();
}
//时间分隔
function time_split(a){
   if (a=='')
	   return;
   var s =  a.split(' ');
   return s[0];
}
function render_open_time(start,end,just_start){
	var time_str="";
	time_str=time_split(start)+" 至 "+time_split(end);
	if(just_start && just_start==1){
		if(end=="1970-01-01 08:00:00"){
			time_str=time_split(start)+" 至今";
		}else{
			time_str=time_split(start)+" 至 "+time_split(end);
		}
	}else{
		time_str=time_split(start);
	}
	if(strtotime(start) > strtotime(end)){
		time_str=time_split(start)+" 至今";
	}
	return time_str;
}

function render_not_open_service_list(code,selected){
	var _biz_code="",
	 	_service="",
	 	source = $("#none_biz_tpl").html(),
	 	dataHtml="";
	for( _biz_code in code){
		 _service=code[_biz_code];
		 if($.inArray(_service['code'],selected)===-1){	
			 _service.biz_icon=get_biz_icon(_biz_code);
			 tplNoneData.list.push(_service);
	    	_biz_code++;
		}
	}
	if(_biz_code===0){
		$("#services,#closegroup").hide();
		return ;
	}
	dataHtml = txTpl(source, tplNoneData); // 模版数据
	$("#close").html(dataHtml);
}
function hide_already_open_list(){
	   $("#opengroup").hide();
	   $("#opengroups").hide();
	   $("#services").html("请选择需要开通的包月服务");
}
function toggle_close_hint(biz_code) {
	var self=$("#close_"+biz_code);
	if(self.css("display")==="none"){
		self.show();
	}else{
		self.hide();
	}
	
}
function toggle_close_hint_new(biz_code) {
    $("#change_pay_mobilekt_shade,#change_pay_mobilekt").show();
}
$("#new_change_pay_close").on("click", function () {
    $("#change_pay_mobilekt_shade,#change_pay_mobilekt").hide();
});
//取代码
function get_content(){
	 $.ajax({ 
		type: "GET",  
		url : "/cgi-bin/common?rand="+Math.random()+ "&command="+encodeURIComponent("command=C00002&input1=byqq&input2=&input3=&input4=wss&input5=&input6="+ajax_options+"\r\n"), 
		dataType:'json',
		success: function(json){
		    var biz_list = (json.resultinfo.list[0].output20==undefined||json.resultinfo.list[0].output20 =='')?[]:eval("("+json.resultinfo.list[0].output20+")"),
				 selected = [],
				 block_count=0,//冻结业务个数
				 biz_item =0,
				 source = $("#biz_tpl").html(),
				dataHtml ="",// 开通模版数据
				_res=[],
				tmp_obj={};
			$("#open").html("");
			$("#close").html("");
			for(biz_item =0;biz_item<biz_list.length;biz_item++){
				tmp_obj={};
				 _res =biz_list[biz_item];
				_res[4]=+_res[4];
				tmp_obj.biz_code=_res[1];//主业务代码
				tmp_obj.simple_name=_res[2];//业务的中文名称
				tmp_obj._status=_res[3];//业务状态
				tmp_obj.pay_method=_res[4];//支付方式
				tmp_obj.time_open=_res[5];//开通时间
				tmp_obj.time_close=_res[6];//关闭时间
				tmp_obj.cmd_close=_res[7];//关闭指令
				tmp_obj.cmd_close_num=_res[8];//关闭指令接入号
				tmp_obj.bind_qq=_res[12];//绑定的QQ号码
				tmp_obj.bind_mobile=_res[13];//付费手机号码
				tmp_obj.biz_sub_code=_res[14];//子业务代码
				tmp_obj.is_auto_prepaid=+_res[17];//是否自动续费,0，无自动续费；其他，自动续费
				tmp_obj.biz_icon=get_biz_icon(_res[1]);//业务icon
				tmp_obj.bind_mobile_hint=_res[13].replace(/(\d{3})(\d{4})(\d{3,})/,"$1****$3");//显示的手机号码
				
				tmp_obj.open_method_name="";//开通方式,表格使用
				tmp_obj.status_name="";//服务状态,表格使用
				tmp_obj.start_end_time="";//起至时间,表格使用
				tmp_obj.block_reason="";//冻结原因,表格使用
				tmp_obj.is_moblie=true;//开通状态下，判断是否通过手机支付
			     switch(_res[3]){
			            case 'Y': //开通
								if($.inArray(_res[4],[0,2,3,5,6,7,8])!==-1){	
								tmp_obj.is_moblie=false;
								tmp_obj.start_end_time=render_open_time(_res[5],_res[6],_res[4] ===0?1:0);
								tmp_obj.status_name="正常使用";
							    if($.inArray(_res[4],[0,2,7,8])>=-1){
							    	tmp_obj.open_method_name="预付费支付";
							    }else{
							    	tmp_obj.open_method_name=(_res[4] == '3')?'宽带支付':'网银支付';
							    }
							}else if ($.inArray(_res[4],[1,4,9])!==-1){//手机
								 tmp_obj.open_method_name=tmp_obj.bind_mobile_hint+" ";
								 if(_res[4] ===9){//手机伪码不展示伪码信息
									 tmp_obj.open_method_name="";
								 }
								if(_res[4] ===1){
									tmp_obj.open_method_name+="手机支付";
								 }else if(_res[4] ===4){
									 tmp_obj.open_method_name+="小灵通支付";
								 }else{
									 tmp_obj.open_method_name+="移动手机话费";
								 }
								tmp_obj.is_moblie=true;
								tmp_obj.start_end_time=render_open_time(_res[5],_res[6],1);
								tmp_obj.status_name="正常使用";
							}
							selected.push(_res[1]);
							tplData.list.push(tmp_obj);
							break;
						case 'A': //冻结业务（公司冻结）	
							block_count++;
							tmp_obj.start_end_time=render_open_time(_res[5],_res[6],1);
							tmp_obj.status_name="冻结";
							tmp_obj.block_reason="支付手机扣费异常";
							tmp_obj.open_method_name=tmp_obj.bind_mobile_hint+" 手机支付";
							
							selected.push(_res[1]);
							tplData.list.push(tmp_obj);
							break;
						case 'B': //冻结业务（运营商冻结）
							block_count++;
							tmp_obj.start_end_time=render_open_time(_res[5],_res[6],1);
							tmp_obj.status_name="冻结";
							tmp_obj.block_reason="运营商冻结";
							tmp_obj.open_method_name=tmp_obj.bind_mobile_hint+" 手机支付";

							selected.push(_res[1]);
							tplData.list.push(tmp_obj);
							break;
						case 'C': //冻结业务（预付费冻结）
							block_count++;
							
							tmp_obj.start_end_time=render_open_time(_res[5],_res[6],1);
							tmp_obj.status_name="冻结";
							tmp_obj.block_reason="预付费冻结";
							tmp_obj.open_method_name=" 预付费支付";
							selected.push(_res[1]);
							tplData.list.push(tmp_obj);
						    break;
				        default:
						    alert('异常的业务');
				}
			     window.console && console.log(tmp_obj);
			}//END FOR		
			if(biz_item===0){
				hide_already_open_list();
			}
			 dataHtml = txTpl(source, tplData); // 模版数据
			$("#open").html(dataHtml);
			if(block_count===0){
				$("td.block_reason").hide();
			}else{
				$("#f_reason").show();
			}
			render_not_open_service_list(code,selected);//显示未选择开通业务的列表
		}
	 });
}