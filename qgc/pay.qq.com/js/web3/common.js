function getUrlParam(name,_src) {
    var src = _src? _src.location.href:window.location.href;
    if (name && src) {
        var r = new RegExp("(\\?|#|&)" + name + "=([^&^#]*)(#|&|$)");
        var m = src.match(r);
        return !m ? "" : m[2];
    }
    return "";
}
function getTopUrlParam(paramName) {
    return getUrlParam(paramName,top.window);
}
function CheckUrlCredit(sUrl)
{
    return (/^(https?:\/\/)?[\w\-.]+\.(qq|paipai|soso|taotao|tenpay)\.com($|\/|\\)/i).test(sUrl)||(/^[\w][\w\/\.\-_%]+$/i).test(sUrl)||(/^[\/\\][^\/\\]/i).test(sUrl) ? true : false;
}
function refreshVerifyImage()
{
    document.getElementById("imgVerify").src = '//ptlogin2.qq.com/getimage?aid=11000101&'+ Math.random();
}

function refreshVerifyImageByCtrlID(ctrlID)
{
    document.getElementById(ctrlID).src = '//ptlogin2.qq.com/getimage?aid=11000101&'+ Math.random();
}
function getLoginUin()
{
    var objFlag = document.getElementById("flag");

    if ( objFlag == null )
    {
        objFlag	= parent.document.getElementById("flag");
        objUin	= parent.document.getElementById("loginUin");

        if ( objFlag == null || objUin == null)
        {
            return 0;
        }
        else
        {
            return objUin.value;
        }
    }
    else
    {
        return document.getElementById("loginUin").value;
    }
}
function checkLogin(URL)
{
    if(parent.document.getElementById("flag").value == 0)
        location.href = "https://pay.qq.com/minilogin.shtml?url="+encodeURIComponent(URL);
}
function accountLogin(URL)
{
    if(document.getElementById("flag").value == 0)
        location.href = "https://pay.qq.com/account/account_login.shtml?url="+encodeURIComponent(URL);
}
function getValue(userData,specName) {
    var rtnValue = "";
    var specIndex = userData.indexOf(specName + "=", 0);
    if(specIndex>=0) {
        var tempSingleStr;
        for(var i=specIndex+specName.length+1; i<userData.length; i++) {
            tempSingleStr = userData.charAt(i);
            if(tempSingleStr!="&")
                rtnValue += tempSingleStr;
            else
                break;
        }
    }
    if ( rtnValue.indexOf("#")>-1)
    {
        rtnValue	= rtnValue.replace("#", "");
    }
    return rtnValue;
}
function getCount()
{
    var count = 0;
    var count = getTopUrlParam("defaultqdcount");

    if (count == null || count == "")
    {
        count = 0;
    }
    count = parseInt(count, 10);
    return count;
}
function IV(id)
{
    if(document.getElementById(id))
        return document.getElementById(id).value;
    else
        return "";
}
function readCookie(b) {

    var filterXSS = function(e) {

        if (!e) return e;

        for (; e != unescape(e);) e = unescape(e);

        for (var r = ["<", ">", "'", '"', "%3c", "%3e", "%27", "%22", "%253c", "%253e", "%2527", "%2522"], n = ["&#x3c;", "&#x3e;", "&#x27;", "&#x22;", "%26%23x3c%3B", "%26%23x3e%3B", "%26%23x27%3B", "%26%23x22%3B", "%2526%2523x3c%253B", "%2526%2523x3e%253B", "%2526%2523x27%253B", "%2526%2523x22%253B"], a = 0; a < r.length; a++) e = e.replace(new RegExp(r[a], "gi"), n[a]);

        return e

    };

    var a;

    return filterXSS((a=document.cookie.match(RegExp("(^|;\\s*)"+b+"=([^;]*)(;|$)")))?unescape(a[2]):null)



}


function writeCookie(name, value, hours)

{
    var expire = "";
    var date=new Date();
    expire=hours;
    date.setTime(date.getTime()+expire* 3600000);
    var path="/";
    var domain="https://pay.qq.com/js/web3/pay.qq.com";

    document.cookie = name + "="+value
        + ";expires=" + date.toGMTString()
        + ( path    ? ";path=" + path : "" )
        + ( domain  ? ";domain=" + domain : "" );
}

