
function openLogin(url)
{
  var url = "/include/login_box.html?url=" + url;

	login_wnd = document.getElementById("ptLogin_Div");

	login_wnd.style.display = "block";
  login_wnd.style.position = "absolute";
  login_wnd.style.top = "30%";
  login_wnd.style.left = "50%";
  login_wnd.style.marginTop = "-75px";
  login_wnd.style.marginLeft = "-150px";
	
	document.getElementById("ptLogin_Frame").src = url;

   mybg = document.getElementById("mybg");
	if (mybg == null)
	 {
	 mybg = document.createElement("div");
	 mybg.setAttribute("id","mybg");
     mybg.style.background = "#000";
     mybg.style.width = "100%";
     mybg.style.height = document.body.clientHeight;//"100%";
     mybg.style.position = "absolute";
     mybg.style.top = "0";
     mybg.style.left = "0";
     mybg.style.zIndex = "100";
     mybg.style.opacity = "0.3";
     mybg.MozOpacity = "0.3"; 
     mybg.KhtmlOpacity = "0.3"; 
     mybg.style.filter = "Alpha(opacity=30)";
     mybg.style.clear = "both";
     document.body.appendChild(mybg);
	 }
	 else
	 {
	 	 mybg.style.display = "block";
	 }
	 
	my_firefox_bg = document.getElementById("firefox_bg");
    
  if (my_firefox_bg == null)
	{
	    my_firefox_bg.style.display = "block";
	}
	else
	{
	    my_firefox_bg.style.display = "block";
	}

	 document.body.style.overflow = "hidden";
}


function ptlogin2_onResize(width, height)
{	
	login_wnd = document.getElementById("ptLogin_Div");
	if (login_wnd)
	{
		login_wnd.style.visibility = "hidden";
		login_wnd.style.width = width + "px";
		login_wnd.style.height = height + "px";		
		login_wnd.style.visibility = "visible";
	}
}

function ptlogin2_onClose()
{
	login_wnd = document.getElementById("ptLogin_Div");	
	login_wnd.style.display="none"

	document.getElementById("mybg").style.display = "none";
	document.getElementById("firefox_bg").style.display = "none";
	document.body.style.overflow = '';
}

function setTopMenu(menuID)
{
	menuid="menu_"+menuID;
	document.getElementById(menuid).setAttribute("class","current");// for ff
	document.getElementById(menuid).setAttribute("className","current");//for ie
	//$("#menu_"+menuID).addClass("current");
}
function displayNotice(title, link)
{
	if (title == "")
	{
		return;
	}

	if (title.length > 30)
	{
	   title = title.substr(0, 30) + "...";
	}

	if (link == "")
	{
		document.getElementById("divnotice").innerHTML = "<span style='color:red;'>" + title + "</span>&nbsp;&nbsp;";
	}
	else
	{
		document.getElementById("divnotice").innerHTML = "<a style='text-decoration:none;color:red;' href='" + link + "' target='_blank' ><span style='color:red;'>" + title + "</span></a>&nbsp;&nbsp;";
	}
}