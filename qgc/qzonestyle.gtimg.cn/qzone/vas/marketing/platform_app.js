
QZONE.appMarketing=(function(){var m_appid,m_container,m_pid;function _loadDataCb(ret){if(!ret.ret&&(!ret.data||!ret.cfg)){return;}
if(!ret.data.length){return;}
var html=['<div class="mod_wrap_ad_side">','<div class="fn_app_ad_side">','<ul>'];for(var i=0,one;i<3&&(one=ret.data[i]);i++){var olink=GDT.getOrderLink(m_pid,one.cl);html.push('<li id="gdtappad_'+one.cl+'">','<a class="app_ad_img" '+olink+'><img src="',one.img,'" alt=""></a>','<p class="app_ad_intro c_tx3"><a class="c_tx3" '+olink+'>',one.txt||'','</a></p>','</li>');}
html.push('</ul>','</div>','</div>');GDT.viewpos(m_pid);m_container.innerHTML=html.join('');for(i=0,one;i<3&&(one=ret.data[i]);i++){GDT.renderExt(m_pid,one.cl,QZFL.dom.get('gdtappad_'+one.cl),{});}}
function _loadJsCb(){m_pid='72343472179107023';GDT.get(m_pid,null,1,false,_loadDataCb,{adposcount:1,count:3,siteset:1,appid:window.QZONE&&QZONE.FrontPage&&QZONE.FrontPage.getCurrApp&&QZONE.FrontPage.getCurrApp()[0]});}
function bootstrap(containerId,appid){m_appid=appid;m_container=$(containerId);if(m_appid&&m_container){var siDomain=window.siDomain||'https://qzonestyle.gtimg.cn/qzone/vas/marketing/qzonestyle.gtimg.cn';QZFL.imports('http://'+(siDomain)+'/qzone/biz/comm/js/qbs.js',_loadJsCb);QZFL.css.insertCSSLink('http://'+siDomain+'/qzone_v6/fn_app_ad.css');}}
return{bootstrap:bootstrap};})();/*  |xGv00|f24dc726a51e4ff130f95fc73a78d014 */