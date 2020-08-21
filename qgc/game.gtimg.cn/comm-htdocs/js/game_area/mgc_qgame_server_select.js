if(!MGC_QQGAME_ServerSelect)
{
    var MGC_QQGAME_ServerSelect={};
}

MGC_QQGAME_ServerSelect.create=function(select_array, ext_opt_array, opt_array)
{
    return new MultiSelect.create(select_array, opt_array||MGC_QQGAME_ServerSelect.STD_DATA, ext_opt_array||[]);
}

MGC_QQGAME_ServerSelect.STD_DATA= 
[
    {t:"QQ游戏大区",v:"30889", status:"1"}
,
     {t:"炫舞梦工厂",v:"888", status:"1"}

];


//////////////////////////////////////////////////////////////////////////////////////////////////////////
MGC_QQGAME_ServerSelect.showzone=function(select_array, ext_opt_array, opt_array)
{
	//显示停机
	var arrOpt = opt_array||MGC_QQGAME_ServerSelect.STD_DATA;
	if(arrOpt && arrOpt.length > 0){
                var tempArrOpt = [];
		for(var i = 0; i < arrOpt.length; i++)
		{
			var tempObj = {"t":arrOpt[i].t, "v":arrOpt[i].v, "opt_data_array":[]};
			for(var j = 0; j < arrOpt[i].opt_data_array.length; j++)
			{
                                if(arrOpt[i].opt_data_array[j].display * 1 === 0)
                                {
					continue;
				}
				
				if(arrOpt[i].opt_data_array[j].status * 1 === 0 && arrOpt[i].opt_data_array[j].t.indexOf('(停机)') < 0 )
				{
					arrOpt[i].opt_data_array[j].t += "(停机)";
				}
				tempObj.opt_data_array.push(arrOpt[i].opt_data_array[j]);
			}
			if(tempObj.opt_data_array.length > 0){
				tempArrOpt.push(tempObj);
			}
		}
		arrOpt = tempArrOpt;
	}
    return new MultiSelect.create(select_array, arrOpt, ext_opt_array||[]);
};

MGC_QQGAME_ServerSelect.showzone2=function(select_array, ext_opt_array, opt_array)
{
	//停机隐藏
	var arrOpt = opt_array||MGC_QQGAME_ServerSelect.STD_DATA;
	if(arrOpt && arrOpt.length > 0){
		var tempArrOpt = [];
		
		for(var i = 0; i < arrOpt.length; i++){
			var tempObj = {"t":arrOpt[i].t, "v":arrOpt[i].v, "opt_data_array":[]};
			for(var j = 0; j < arrOpt[i].opt_data_array.length; j++){
				if(arrOpt[i].opt_data_array[j].status * 1 != 0 && arrOpt[i].opt_data_array[j].display * 1 != 0){
					tempObj.opt_data_array.push(arrOpt[i].opt_data_array[j]);
				}
			}
			if(tempObj.opt_data_array.length > 0){
				tempArrOpt.push(tempObj);
			}
		}
		arrOpt = tempArrOpt;
	}
    return new MultiSelect.create(select_array, arrOpt, ext_opt_array||[]);
};

MGC_QQGAME_ServerSelect.showStatusByServerId = function(serverId){
	if(!serverId){
		return "";
	}	
	var arrOpt = MGC_QQGAME_ServerSelect.STD_DATA;
	if(arrOpt && arrOpt.length > 0){
		for(var i = 0; i < arrOpt.length; i++){
			for(var j = 0; j < arrOpt[i].opt_data_array.length; j++){
				if(serverId == arrOpt[i].opt_data_array[j].v){
					return (arrOpt[i].opt_data_array[j].status);
				}
			}
		}
	}
	return "";
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////


MGC_QQGAME_ServerSelect.zoneToName=function(ssn)
{
    var data=this.STD_DATA;
    var len=data.length;
    var result = "";
    for(var i=0;i<len;i++)
    {
        var sub_data = data[i].opt_data_array;
        var sub_len = sub_data.length;
        for (var j=0; j<sub_len; j++)
        {
        	if(sub_data[j].v==String(ssn))
            {
                result=sub_data[j].t;
                break;
            }
        }
        if (result != "") {
           	break;
        }
    }
    return result || "";
}

MGC_QQGAME_ServerSelect.ssn2desc=MGC_QQGAME_ServerSelect.zoneToName;


/*  |xGv00|a5ccfe964d88d271c1560e73bc50b17f */