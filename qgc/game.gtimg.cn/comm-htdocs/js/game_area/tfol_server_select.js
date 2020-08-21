
if(!TFOLServerSelect)
{
    var TFOLServerSelect={};
}

TFOLServerSelect.create=function(select_array, ext_opt_array, opt_array)
{
    return new MultiSelect.create(select_array, opt_array||TFOLServerSelect.DATA, ext_opt_array||[]);
}

TFOLServerSelect.STD_DATA= 
[

    {t:"Èû²®Ì¹",v:"1", status:"1"}

];


//////////////////////////////////////////////////////////////////////////////////////////////////////////
TFOLServerSelect.showzone=function(select_array, ext_opt_array, opt_array)
{
	//ÏÔÊ¾Í£»ú
	var arrOpt = opt_array||TFOLServerSelect.STD_DATA;
	
	if(arrOpt && arrOpt.length > 0){
		for(var i = 0; i < arrOpt.length; i++){
			if(arrOpt[i].status * 1 === 0){
				if(arrOpt[i].t.indexOf('(Í£»ú)') >= 0){
					continue;
				}
				arrOpt[i].t += "(Í£»ú)";
			}
		}
	}
    return new MultiSelect.create(select_array, arrOpt, ext_opt_array||[]);
}

TFOLServerSelect.showzone2=function(select_array, ext_opt_array, opt_array)
{
	//Í£»úÒþ²Ø
	var arrOpt = opt_array||TFOLServerSelect.STD_DATA;
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

TFOLServerSelect.showStatusByServerId = function(serverId){
	if(!serverId){
		return "";
	}	
	var arrOpt = TFOLServerSelect.STD_DATA;
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


TFOLServerSelect.zoneToName=function(ssn)
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

TFOLServerSelect.ssn2desc=TFOLServerSelect.zoneToName;
/*  |xGv00|9503a3371b302b58d62a9bf626f70b38 */
