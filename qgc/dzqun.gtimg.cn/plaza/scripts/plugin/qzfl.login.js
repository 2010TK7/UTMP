(function(window, document) {
    var box, qzfl = QZFL, dlg, ifrid, ptloginDefOpt, myDefOpt, extend = QZFL.object.extend, each = QZFL.object.each, format = QZFL.string.format;
    function init() {
        if(typeof(window.QZFL) != 'object'){
            throw (new Error('need QZFL'));
        }
        window.QZFL.widget = window.QZFL.widget || {};
        box = window.QZFL.widget.loginBox = {};
        box.show = function(daid, opt) {
//          if (dlg) {
//              return dlg.show();
//          }
            open(daid, opt);
        };
    }

    function open(daid, opt) {
        var fn, p = {};
        ptloginDefOpt = {
            domain: 'https://dzqun.gtimg.cn/plaza/scripts/plugin/qq.com',
            daid: daid || 0,
            f_url: 'https://qgc.qq.com/',
            link_target: 'blank',
            target: 'self',
            hide_title_bar: 1,
            hide_close_icon: 0,
            appid: '710044101',
            style: 13,
            callback: function() {location.reload();},
            onClose: function() {},
            mask: true,
            draggable: true,
            jump_url: '',
            width: 440,
            height: 246,
            title: '登陆',
            onBeforeLogin: function() {return true;},
            onResetLogin: function() {return true;},
            renderTo: null,
            onError: function() {},
            bottoms: [{txt: '官方群论坛', href: 'https://qgc.qq.com/102789'}, {txt: '下载最新QQ', href: 'https://im.qq.com/'}],
            qlogin_auto_login: '0'  // 自动登录标志
        };
        if (typeof opt == 'function') {
            opt = {
                callback: opt
            };
        }
        else if (typeof opt == 'string') {
            var surl = opt;
            opt = {
                callback: function(o) {
                    var h = location.href;
                    location.href = h + (h.indexOf('?') >= 0 ? '&': '?') + encodeURIComponent(surl);
                }
            };
        }
        opt = extend(ptloginDefOpt, opt || {});
        if ($(opt.renderTo)) {
            opt.target = 'top';
        }
        document.domain = opt.domain;
        render(opt);
    }

    function render(opt) {
        var ptparam = [], url = 'https://xui.ptlogin2.' + opt.domain + '/cgi-bin/xlogin', c, html, surl = 'https://{cdndomain}/ac/qzone/widget/login/succ.html';
        if (opt.jump_url) {
            surl += '&jump_url=' + opt.jump_url;
        }
        ifrid = ['ifr', +new Date].join('_');
        ptparam.push('appid=' + opt.appid);
        ptparam.push('s_url=' + encodeURIComponent(format(surl, {cdndomain: opt.cdnDomain || 'https://dzqun.gtimg.cn/plaza/scripts/plugin/ctc.qzs.qq.com'})));

        // https://platform.server.com/ptlogin/param.html
        each(['lang',
            'target',
            'link_target',
            'low_login',
            'qlogin_param',
            'qlogin_auto_login',
            'style',
            'hide_title_bar',
            'hide_close_icon',
            'bgcolor',
            'bgimage',
            'fontcolor',
            'title',
            'login_text',
            'reset_text',
            'login_img',
            'reset_img',
            'css',
            'uin',
            'hide_uin_tip',
            'daid',
            'self_regurl'], function (n) {
            if (c = opt[n]) {
                ptparam.push(n + '=' + c);
            }
        });

        url = url + '?' + ptparam.join('&');
        html = '<iframe id="' + ifrid + '" width="' + (opt.width - 2) + '" height="' + opt.height + '" frameborder="0" allowtransparency="yes" src="' + url + '"></iframe>';
        if (typeof opt.bottoms == 'string') {
            html += '<div style="border-top:1px solid #CCDAE2;margin:0 21px;padding:15px 2px;">' + opt.bottoms + '</div>';
        }
        else if ('length' in opt.bottoms) {
            html += '<div style="color: #CCDAE2;border-top:1px solid #CCDAE2;margin:0 21px;padding:15px 2px;text-align:center;">';
            var arHTML = [];
            for (var i = 0; i < opt.bottoms.length; i++) {
                arHTML.push('<a style="color:#097FD1;" onmouseover="this.style.textDecoration = \'underline\';this.style.color = \'#000\';" onmouseout="this.style.textDecoration = \'none\';this.style.color=\'#097FD1\';" target="_blank" href="' + opt.bottoms[i].href + '">' + opt.bottoms[i].txt + '</a>');
            }
            html += arHTML.join('&nbsp;&nbsp;|&nbsp;&nbsp;') + '</div>';
        }
        if ($(opt.renderTo)) {
            var tm = document.createElement('body');
            tm.innerHTML = html;
            $(opt.renderTo).appendChild(tm.firstChild);
            tm = null;
        }
        else {
            dlg = QZFL.dialog.create(opt.title, html, {
                width: opt.width || 402,
                height: opt.height || 246,
                onLoad: function() {
                    $(ifrid).callback = function(o) {
                        opt.callback (o);
                        dlg.unload();
                    }
                }
            });
            if (opt.mask) {
                var _z = dlg.getZIndex(); //获取对话框的zindex
                var _mId = QZFL.maskLayout.create(_z - 1); //创建蒙版层，并且返回蒙版的id
                dlg.onUnload = function(){
                    QZFL.maskLayout.remove(_mId); //去除蒙版
                }
            }
        }
    }
    //覆盖ptlogin2的onResize方法，以便在各种模式下调整弹出框的大小
    window.ptlogin2_onResize =  function(width, height) {
        QZFL.dom.setSize($(ifrid), 422, height);
        dlg.setSize(440, height + 50);
    };
    init();
}) (window, document);
