if(!X52MGCServerSelect)
{
    var X52MGCServerSelect={};
}

X52MGCServerSelect.create=function(select_array, ext_opt_array, opt_array)
{
    return new MultiSelect.create(select_array, opt_array||X52MGCServerSelect.STD_DATA, ext_opt_array||[]);
}

X52MGCServerSelect.STD_DATA= 
[
    {t:"巨星舞台", v:"650", opt_data_array:[

        {t: "巨星舞台",v: "41101",status:"1", display:"1", opt_data_array:[]}

]}
,
    {t:"皇宫大殿", v:"651", opt_data_array:[

        {t: "皇宫大殿",v: "42201",status:"1", display:"1", opt_data_array:[]}

]}
,    {t:"奇舞飞扬", v:"652", opt_data_array:[

        {t: "奇舞飞扬",v: "43101",status:"1", display:"1", opt_data_array:[]}

]}
,    {t:"梦想家园", v:"653", opt_data_array:[

        {t: "梦想家园",v: "43102",status:"1", display:"1", opt_data_array:[]}

]}
,    {t:"新星时代", v:"654", opt_data_array:[

        {t: "新星时代",v: "43103",status:"1", display:"1", opt_data_array:[]}

]}
,    {t:"天空之城", v:"655", opt_data_array:[

        {t: "天空之城",v: "43104",status:"1", display:"1", opt_data_array:[]}

]}
,    {t:"王国之翼", v:"656", opt_data_array:[

        {t: "王国之翼",v: "43105",status:"1", display:"1", opt_data_array:[]}

]}
];


//////////////////////////////////////////////////////////////////////////////////////////////////////////
X52MGCServerSelect.showzone=function(select_array, ext_opt_array, opt_array)
{
	//显示停机
	var arrOpt = opt_array||X52MGCServerSelect.STD_DATA;
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

X52MGCServerSelect.showzone2=function(select_array, ext_opt_array, opt_array)
{
	//停机隐藏
	var arrOpt = opt_array||X52MGCServerSelect.STD_DATA;
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

X52MGCServerSelect.showStatusByServerId = function(serverId){
	if(!serverId){
		return "";
	}	
	var arrOpt = X52MGCServerSelect.STD_DATA;
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


X52MGCServerSelect.zoneToName=function(ssn)
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

X52MGCServerSelect.ssn2desc=X52MGCServerSelect.zoneToName;


/*  |xGv00|9c5598c4911e2a59847e2665c4d215dd */