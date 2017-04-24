/**
 * Created by ZHUANGYI on 2017/4/6.
 */

//嘉福客服模块
var jfCustomerService = {

    init: function (service, token) {//初始化

        if (!$("#MEIQIA-PANEL-HOLDER").length > 0) {

            var isIosProduct = 0;                                                                                         //判断是不是可能出现位移的页面

            function jfServiceInit(visibility) {

                jfServiceSwitch(visibility);

                if (browser.os.iOS && $('html').hasClass('ovfHiden') && $('body').hasClass('ovfHiden')) {                    //解决ios10的在详情页聊天移位问题。
                    isIosProduct = 1;
                    $(document).scrollTop(0);
                }
            }

            function jfServiceSwitch(visibility) {

                if (visibility === 'visible') {

                    if (isIosProduct) {                                                                                   //解决ios10的在详情页聊天移位问题。
                        $('html').removeClass('ovfHiden');
                        $('body').removeClass('ovfHiden')
                    }

                    $('#MEIQIA-PANEL-HOLDER').show().removeClass('hide').addClass('show');
                    setTimeout(
                        function () {
                            $('#MEIQIA-PANEL-HOLDER').removeClass('show');
                        }
                        , 300);

                }

                else {
                    // 你可以根据自己的需求编写相应的代码
                    $('#MEIQIA-PANEL-HOLDER').addClass('hide').css('left', 0).css('z-index', 600);
                    setTimeout(
                        function () {
                            $('#MEIQIA-PANEL-HOLDER').hide();

                        }
                        , 300);

                    if (isIosProduct) {                                                                                   //解决ios10的在详情页聊天移位问题。
                        $('html').addClass('ovfHiden');
                        $('body').addClass('ovfHiden');
                        $(document).scrollTop(0);
                    }

                }
            }

            (function (m, ei, q, i, a, j, s) {
                m[i] = m[i] || function () {
                        (m[i].a = m[i].a || []).push(arguments)
                    };
                j = ei.createElement(q);
                s = ei.getElementsByTagName(q)[0];
                j.async = true;
                j.charset = 'UTF-8';
                j.src = '//static.meiqia.com/dist/meiqia.js';
                s.parentNode.insertBefore(j, s);
            })(window, document, 'script', '_MEIQIA');
            _MEIQIA('entId', '39750');

            // 在这里开启手动模式（必须紧跟美洽的嵌入代码）
            _MEIQIA('manualInit');


            // 你可以自己的代码中选择合适的时机来调用手动初始化
            _MEIQIA('withoutBtn');//不使用插件按钮
            _MEIQIA('allSet', jfServiceInit);//初始设置
            _MEIQIA('getPanelVisibility', jfServiceSwitch);//改变状态后设置
            _MEIQIA('init');//初始化

            //指定客服
            _MEIQIA('assign', {
                groupToken: token
            });
            //用户信息导入
            _MEIQIA('metadata', service);
        }
    },
    click: function () { //导入使用
        _MEIQIA('showPanel')
    }
};
//嘉福客服模块结束
jfCustomerService.init(
    {//用户信息
        name: 'new首页访客',// 名字
        email: '',// 邮箱
        tel: '1',// 电话
        '公司名称': '',
        '员工编号': '',
    },'b040d96757bf55ea302f9fbfb0ecd062'//客服组1
);


//判断是否为移动端 网页跳转

//判断浏览器和设备
var browser = {
    os: function () {
        var u = navigator.userAgent;
        return {// 操作系统
            linux: !!u.match(/\(X11;( U;)? Linux/i), // Linux
            windows: !!u.match(/Windows/i), // Windows
            android: !!u.match(/Android/i), // Android
            iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // iOS
        };
    }(),
    device: function () {
        var u = navigator.userAgent;
        return {// 设备
            mobile: !!u.match(/AppleWebKit/i), // mobile
            iPhone: !!u.match(/iPhone/i), // iPhone
            iPad: !!u.match(/iPad/i), // iPad
        };
    }(),
    supplier: function () {
        var u = navigator.userAgent;
        return {// 浏览器类型
            qq: !!u.match(/QQ\/\d+/i), // QQ
            wechat: !!u.match(/MicroMessenger/i), // WeChat
            weixin: u.match(/MicroMessenger/i) == 'MicroMessenger',
            ios: u.indexOf('_JFiOS') > -1,
            android: u.indexOf('_jfAndroid') > -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        };

    }(),
    
    //browser.supplier.wechat
};



