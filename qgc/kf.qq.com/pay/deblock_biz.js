;(function(win,undefined) {
	function recording(code, recordtype) {
	    if (code != null) {
	        $.getJSON("/cgi-bin/common?rand=" + Math.random() + "&channel=other&command=" + encodeURIComponent("command=T10001&code=" + code + "&tool=" + recordtype), function (json) { });
	    }
	}
	/**
	 * 获取短信验证码失败
	 */
	var get_sms_command_failure=function(){
		$(".mobile_layer,#err_reopen_tips").show();
	};
	var 	f = {},
			inner_obj={},
			ajax_options="&fromtype=wss&fromtoolid=wss207";
	f.debug = 1;
	f.verify_reopen_codes = function() {
		$("#" + "verify_reopen")
				.html(
						"<img height="
								+ "53"
								+ " width="
								+ "130"
								+ " src='http://ptlogin2.qq.com/getimage?aid=12000101&rand="
								+ Math.random()
								+ "' alt='验证码' /><a class='change_img' href='javascript:;' onclick='deblock_biz.verify_reopen_codes()'>看不清楚，换一张</a>");
	};
	f.verify_reopen_codes_other = function() {
		$("#verify_reopen_other")
				.html(
						"<img height="
								+ "53"
								+ " width="
								+ "130"
								+ " src='http://ptlogin2.qq.com/getimage?aid=12000101&rand="
								+ Math.random()
								+ "' alt='验证码' /><a class='change_img' href='javascript:;' onclick='deblock_biz.verify_reopen_codes_other()'>看不清楚，换一张</a>");
	};	
	
	f.active_by_mobile = function(mobile, codes, service_name) {
		$("#service_code_hidden").val(service_name);
		pgvSendClick({
			hottag : "KF.SERVICE.PAY.ACTIVE_BY_MOBILE"
		});
		var url = "/cgi-bin/common?rand=" + Math.random() + "&command="
				+ encodeURIComponent("command=C00044&input1=GetActiveCode&input6=WSS&input5="+mobile);
		 $.getJSON(url, function(json) {
		}).done(
				function(rep) {
					var detail=rep.resultinfo.list[0];
					//detail.output1=1;
					$("#services").data("biz_code",codes);//将业务存到DOM
					if(typeof detail=="undefined" || detail.output1!=0){
						get_sms_command_failure();
						return;
					}
					$("#sms_command").html(detail.output2); 
					f.verify_reopen_codes();// 验证码
					$("#biz_mobile").html(mobile).attr("title",mobile);
					$(".mobile_layer,#deblock_form").show();
				}).fail(function() {
					get_sms_command_failure();
		});
	};
	f.close_mobile = function() {
		pgvSendClick({
			hottag : "KF.SERVICE.PAY.ACTIVE_BY_MOBILE.CLOSE"
		});
		window.location.reload();
	};
	f.submit_reopen = function() {
		var sms_command = $.trim($("#input_sms").val());
		if (sms_command === "") {
			$("#err_sms").html("<i class='icon icon_tip_warn'></i>请输入短信验证码！")
					.show();
			return false;
		} else {
			$("#err_sms").html("").hide();
		}
		var verify = $.trim($("#input_verify").val());
		if (verify === "") {
			$("#err_code").html("<i class='icon icon_tip_warn'></i>请输入验证码！")
					.show();
			return false;
		} else {
			$("#err_code").html("").hide();
		}

		f.deblock_biz(sms_command, verify);
	};
	f.deblock_biz = function(sms_command, check_code) {
		var serviceId=$.trim($("#services").data("biz_code"));
		var phone=$.trim($("#biz_mobile").attr("title"));
		if(typeof serviceId=="undefined" || serviceId=="" || typeof auth_code[serviceId]=="undefined" ){
			$("#err_code").html("<i class='icon icon_tip_warn'></i>获取业务代码出错,请重新刷新页面！").show();
		   return false;
		}
		pgvSendClick({
			hottag : "KF.SERVICE.PAY.ACTIVE_BY_MOBILE"
		});
		var url = "/cgi-bin/common?rand=" + Math.random() + "&command="
				+ encodeURIComponent("command=C00046&kbmsType=UserSelfActive&mobile="+phone+"&verifycode="+sms_command+"&serviceId="+auth_code[serviceId]+ajax_options )+"&check_code="+check_code;
		 $.getJSON(url, function(json) {
		}).success(
				function(rep) {
					window.console && console.warn && console.warn(rep, rep.resultcode);
					if(rep.resultcode=="-39996"){
						$("#input_verify").val("");
						$("#err_code").html("<i class='icon icon_tip_warn'></i>验证码错误！")
						.show();
						f.verify_reopen_codes();// 验证码
						return false;
					}else{
						$("#err_code").html("").hide();
					}
					$("#deblock_form").hide();
					
					var _rs=rep.resultinfo.list[0];
					var rs = _rs.result;
					if (rs == 0) {
						$("#deblock_suc_greeting").html(
								"恭喜您，亲爱的" + KF.com.user.nick_name);
						$("#deblock_suc_msg").html(
								"您的" + $("#service_code_hidden").val()
										+ "已解冻成功，您已申请更新冻结状态，24小时后系统将同步您的操作，谢谢！");
						$("#deblock_btns,#deblock_suc,#deblock_suc_btn")
								.show();
					} else {
						$("#deblock_err_greeting").html(
								"对不起，亲爱的" + KF.com.user.nick_name);
						//$("#deblock_err_msg").html(
						//		"您的" + $("#service_code_hidden").val()
						//				+ "解冻失败。");
						$("#deblock_err_msg").html("您的验证失败，请重新获取验证码进行解冻，谢谢");
						$("#deblock_btns,#deblock_fail,#deblock_fail_btn")
								.show();
					}
				}).error(function() {
			$("#deblock_form").hide();
			$("#err_reopen_tips").show();
		});
	};
	f.ipay=function(biz_codes){
		cashier.dialog.buy({
			type : 'service',
			codes : biz_codes,
			aid : 'kf.pay.' + biz_codes,
			source : '15200',
			channels : 'qdqb,kj',
			defaultChannel : '',
			amount : '1',
			amountType : 'month',
			target : 'self',
			context : '',
			onSuccess : function(opt) {
				window.console && console.log(opt, "success");
			},
			onError : function(opt) {
				window.console && console.log(opt, "error");
			},
			onClose : function(opt) {
				//$("#mobile_layer_popshade").hide();
				window.console && console.log(opt, "close");
                try{
                    show = [];
                    tplData = {
                        list : []
                    };
                    tplNoneData = {
                        list : []
                    };
                    get_content();
                }catch(e){
                    window.console && console.debug && console.debug(e);
                }
				//window.location.reload();
			},
			onNotify : function(opt) {
				window.console && console.log(opt, "notify");
			},
			actid : ''
		});
	};
	f.biz_reopen = function(biz_codes) {
		pgvSendClick({
			hottag : "KF.SERVICE.PAY.ACTIVE_REOPEN_BIZ"
		});
		$("#reopen_bubble").hide();//关闭气泡提示
		$("#mobile_layer_popshade").show();
		f.ipay(biz_codes);
	};
	f.open_with_ipay = function(biz_codes,method) {
		var pay_method="";
		if(method==1){
			pay_method="KAITONG";
		}else if(method==2){
			pay_method="XUFEI";
		}else{
			pay_method="JIECHUDONGJIE";
		}
		pgvSendClick({
			hottag : "KF.SERVICE.PAY."+pay_method
		});
		pgvSendClick({
			hottag : "KF.SERVICE.PAY."+pay_method+"_"+biz_codes
		});
		f.ipay(biz_codes);
	};
	f.close_reopen_bubble = function() {
		$("#reopen_bubble").hide();
	};
	f.deblock_method=function(mobile, codes, service_name,biz_codes){
		pgvSendClick({
			hottag : "KF.SERVICE.PAY.DEBLOCK_METHOD"
		});
		pgvSendClick({
			hottag : "KF.SERVICE.PAY.DEBLOCK_METHOD_"+biz_codes
		});
		$("#tmp_data")
		.data(
				"tmp",
				{
					mobile : mobile,
					codes : codes,
					service_name : service_name,
					biz_codes : biz_codes
				});// 存储数据
		$(".deblock_menthod_container").show();//显示三种解除方法
	};
	
	f.deblock_next=function(){
		var tmp_data= $("#tmp_data").data("tmp");
		var mobile=tmp_data.mobile;
		var codes=tmp_data.codes;
		var service_name=tmp_data.service_name;
		var biz_codes=tmp_data.biz_codes;
		
		var method=+$("dd[class='on']").find("input").val();
		if(method===3){
			$("#other_msg").show();
		}else{
			$("#other_msg").hide();
		}
		f.deblock_close();//先隐藏
		if(method===1){//原手机激活
			pgvSendClick({
				hottag : "KF.SERVICE.PAY.DEBLOCK_BY_ORIGINAL_MOBILE"
			});
		    //接入数据仓库
			recording(codes, "yuanshoujijihuo");
	        f.active_by_mobile(mobile, codes, service_name);
		}else if(method===2){//重新开通
			pgvSendClick({
				hottag : "KF.SERVICE.PAY.DEBLOCK_BY_IPAY"
			});
            //接入数据仓库
			recording(codes, "chongxinkaitong");
            f.biz_reopen( biz_codes);
		}else{//其他手机解冻
			pgvSendClick({
				hottag : "KF.SERVICE.PAY.DEBLOCK_BY_OTHER_MOBILE"
			});
			recording(codes, "qitashoujijihuo");
			f.other_phone_show();
		}
	};
	f.other_phone_show=function(){
		$(".other_phone").show();
	};
	f.other_phone_hide=function(){
		$(".other_phone").hide();
	};
	f.deblock_close=function(){
		$(".deblock_menthod_container").hide();//隐藏三种解除方法
	};
	
	f.method_change=function(self){
		$("dd").attr("class","");
		$("input[name='relieve']").each(function(){
			$(this).prop("checked",false);
		});
		$(self).attr("class","on").find("input").prop("checked",true);
	};
	
	f.input_other_phone=function(){
		var mobile=$.trim($("#input_other_phone").val());
		if(mobile===""){
			$("#err_phone").show();
			return false;
		}else{
			$("#err_phone").hide();
		}
		var tmp_data= $("#tmp_data").data("tmp");
		var codes=tmp_data.codes;
		var service_name=tmp_data.service_name;
		$(".other_phone").hide();
		$("#ori_phone_e").html("其他手机激活");
		$("#ori_phone").html("您输入的手机");
		$("#wxts_p").html("1、目前<span class=\"font_red\">仅支持移动用户和联通用户</span>，请输入准确的手机号码。</br>2、使用“其它手机关闭冻结状态”<span class=\"font_red\">仅解除您业务的冻结状态</span>，无法恢复您的业务，如需开通该业务，请选择“重新开通”。");
		f.active_by_mobile(mobile, codes, service_name);
		return false;
	};
	f.close_biz=function(service_name,close_command,close_entrance,mobile,codes){
		pgvSendClick({
			hottag : "KF.SERVICE.PAY.CLOSE_BY_MOBILE_IN_ACCOUNT"
		});
		pgvSendClick({
			hottag : "KF.SERVICE.PAY.CLOSE_BY_MOBILE_IN_ACCOUNT_"+codes
		});
		$("#close_command").html(close_command);
		$("#close_entrance").html(close_entrance); 
		$("#close_ori_mobile").html(
				mobile
						.replace(/(\d{3})(\d{4})(\d{3,})/,
								"$1****$3"));// 手机号码
	    //增加将数据写入Jquery.Data
		$("#tmp_data").data("closedtmp",
            {
                service_name: service_name,
                close_command:close_command,
                close_entrance:close_entrance,
                mobile: mobile
            });// 存储数据
		$(".close_biz_container").show();
	};
	f.close_biz_confirm = function () {
	    var tmp_data = $("#tmp_data").data("closedtmp");
	    recording(tmp_data.codes, "guanbizhiling");
	    window.location.reload();
	};
	f.close_biz_cancel=function(){
		$("#close_command,#close_entrance,#close_ori_mobile").html("");
		$(".close_biz_container").hide();
	};

f.close_auto_prepaid=function(biz_sub_code,simple_name,time_close){
	$(".prepaid_close_date").html(time_close);
	$(".prepaid_biz").html(simple_name);
	$("#prepaid_sure_btn").data("biz_sub_code",biz_sub_code);
	$("#prepaid_popshade,#prepaid_auto_pay").show();
	
	pgvSendClick({
		hottag : "KF.SERVICE.PAY.CLOSE_AUTO_PAY"
	});
	pgvSendClick({
		hottag : "KF.SERVICE.PAY.CLOSE_AUTO_PAY_"+biz_sub_code
	});
	
};
f.cancle_auto_prepaid=function(){
	$("#prepaid_popshade,#prepaid_auto_pay").hide();
};
$("#prepaid_sure_btn").on("click",function(){
	var biz_sub_code=$("#prepaid_sure_btn").data("biz_sub_code");
	$("#prepaid_popshade,#prepaid_auto_pay").hide();
	$("#close_by_prepaid_popshade").show();
	inner_obj.yufei_request(biz_sub_code);
});
f.close_auto_popshade=function(){
	location.reload();
};
/**
 * 预付费关闭请求
 */
inner_obj.yufei_request=function (biz_sub_code){
	var cmd = 'command=C00079&input1=CloseAutoPay&input5=string&input6=WSS&input8='+biz_sub_code+'&input9=mini&input10='+encodeURIComponent("用户自行取消该业务的自动续费")+ajax_options;
	var search_status=$.ajax({
		url : "/cgi-bin/common?rand=" + Math.random(),
		data : "command=" + encodeURIComponent(cmd)
	});
	search_status.done(inner_obj.yufei_request_done);
	//search_status.fail(inner_obj.err_request);
};
/**
 * 预付费请求完成
 * @param rep
 */
inner_obj.yufei_request_done=function(rep){
	rep = eval("(" + rep + ")");
	if(+rep.resultcode!==0){
		inner_obj.system_busy();
		return false;
	}
	var _detail = rep.resultinfo.list[0];
	var _api_suc=+_detail.output1,_close_suc=+_detail.output2;
	if(_api_suc!==0){//接口没有正常返回
		inner_obj.system_busy();
		return false;
	}	
	if(_close_suc===0){
		$("#close_by_prepaid_suc").show();
	}else{
		inner_obj.system_busy();
	}
};
inner_obj.system_busy=function(){
	$(".relieve_methods_pop").hide();
	$("#close_by_prepaid_fail").show();
};
$(".reload_page").on("click",function(){
	location.reload();
});
	win.deblock_biz = f;
})(window);
