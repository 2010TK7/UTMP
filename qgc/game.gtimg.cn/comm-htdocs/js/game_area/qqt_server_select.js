
if(!QQTServerSelect)
{
    var QQTServerSelect={};
}

QQTServerSelect.create=function(select_array, ext_opt_array, opt_array)
{
    return new MultiSelect.create(select_array, opt_array||QQTServerSelect.STD_DATA, ext_opt_array||[]);
}

QQTServerSelect.STD_DATA= 
[

    {t:"1-100区", v:"743", opt_data_array:[

        {t: "双线2区",v: "2",status:"0", display:"1", opt_data_array:[]}
	,
        {t: "体验1区",v: "1",status:"0", display:"0", opt_data_array:[]}
	,
        {t: "双线3区",v: "3",status:"0", display:"1", opt_data_array:[]}

]}

];





//////////////////////////////////////////////////////////////////////////////////////////////////////////
QQTServerSelect.showzone=function(select_array, ext_opt_array, opt_array)
{
	//显示停机
	var arrOpt = opt_array||QQTServerSelect.STD_DATA;
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

QQTServerSelect.showzone2=function(select_array, ext_opt_array, opt_array)
{
	//停机隐藏
	var arrOpt = opt_array||QQTServerSelect.STD_DATA;
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

QQTServerSelect.showStatusByServerId = function(serverId){
	if(!serverId){
		return "";
	}	
	var arrOpt = QQTServerSelect.STD_DATA;
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


QQTServerSelect.zoneToName=function(ssn)
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

QQTServerSelect.ssn2desc=QQTServerSelect.zoneToName;


/*  |xGv00|c14f9d27de96b8dd5354abbb50a482ab */
