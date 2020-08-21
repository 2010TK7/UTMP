;(function(){
    function f() {
        if (!document.body || document.getElementById('bnuwb')) { return };
        var self = document.getElementById('browser_upgrade');
        if (!self) { 
            console && console.warn && console.warn('请使引入 browser_upgrade/dist.js 的 script 标签 id 为 browser_upgrade');
            return;
        };
        var base = self.src.split('/').slice(0, -1).join('/') + '/';
        
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = base + 'style.css';
        document.body.appendChild(link);

        var html = '<div id="bnuwb" ><div class="c" ><div class="t" ><img src="' + base + 'turtle.jpg" alt="您使用的浏览器版本过低，无法正常浏览。建议立即升级浏览器!" ><p>您使用的浏览器版本过低，无法正常浏览。建议<a href="https://browser.qq.com/" target="_blank">立即升级浏览器</a>！</p ></div ><div class="d" ><i class="l l-l"></i ><span class="hint">推荐点击下载以下浏览器</span ><i class="l l-r"></i ></div ><div class="bs" ><a class="b" href="https://browser.qq.com/" target="_blank" ><img src="' + base + 'qqbrowser.jpg" alt="QQ浏览器" ><span>QQ浏览器</span ></a ><a class="b" href="https://www.google.cn/chrome/" target="_blank" ><img src="' + base + 'chrome.jpg" alt="谷歌浏览器" ><span>谷歌浏览器</span ></a ><a class="b" href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank" ><img src="' + base + 'ie.jpg" alt="最新版IE浏览器" ><span>最新版IE浏览器</span ></a ></div ></div ><div class="e"></div ></div>';
        var element = document.createElement('div');
        element.innerHTML = html;
        document.body.appendChild(element);
        element.firstChild.style.display = 'none';
    }
    if(window.attachEvent) {
        window.attachEvent("onload", f);
    } else {
        window.addEventListener("load", f);
    }
    f();
}())