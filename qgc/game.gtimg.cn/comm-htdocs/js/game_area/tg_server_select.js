
if(!TGServerSelect)
{
    var TGServerSelect={};
}

TGServerSelect.create=function(select_array, ext_opt_array, opt_array)
{
    return new MultiSelect.create(select_array, opt_array||TGServerSelect.DATA, ext_opt_array||[]);
}

TGServerSelect.STD_DATA= 
[

    {t:"电信",v:"1",status:"1"}
,
    {t:"网通",v:"2",status:"1"}

];


//////////////////////////////////////////////////////////////////////////////////////////////////////////
TGServerSelect.showzone=function(select_array, ext_opt_array, opt_array)
{
	//显示停机
	var arrOpt = opt_array||TGServerSelect.STD_DATA;
	
	if(arrOpt && arrOpt.length > 0){
		for(var i = 0; i < arrOpt.length; i++){
			if(arrOpt[i].status * 1 === 0){
				if(arrOpt[i].t.indexOf('(停机)') >= 0){
					continue;
				}
				arrOpt[i].t += "(停机)";
			}
		}
	}
    return new MultiSelect.create(select_array, arrOpt, ext_opt_array||[]);
}

TGServerSelect.showzone2=function(select_array, ext_opt_array, opt_array)
{
	//停机隐藏
	var arrOpt = opt_array||TGServerSelect.STD_DATA;
	if(arrOpt && arrOpt.length > 0){
		var tempArrOpt = [];
		for(var i = 0; i < arrOpt.length; i++){
			if(arrOpt[i].status * 1 != 0){
				tempArrOpt.push(arrOpt[i]);
			}
		}
		arrOpt = tempArrOpt;
	}
    return new MultiSelect.create(select_array, arrOpt, ext_opt_array||[]);
}

TGServerSelect.showStatusByServerId = function(serverId){
	if(!serverId){
		return "";
	}	
	var arrOpt = TGServerSelect.STD_DATA;
	if(arrOpt && arrOpt.length > 0){
		for(var i = 0; i < arrOpt.length; i++){
			if(serverId == arrOpt[i].v){
				return (arrOpt[i].status);
			}
		}
	}
	return "";
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////


TGServerSelect.zoneToName=function(ssn)
{
    var data=this.STD_DATA;
    var len=data.length;
    var result;
    for(var i=0;i<len;i++)
    {
        if(data[i].v==String(ssn))
        {
            result=data[i].t;
            break;
        }
    }
    return result || "";
}

TGServerSelect.ssn2desc=TGServerSelect.zoneToName;
/*  |xGv00|9503a3371b302b58d62a9bf626f70b38 */
