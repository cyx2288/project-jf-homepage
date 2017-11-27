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
    },'9534880d7044dfd02e5dc2c0edaa1ca8'//客服组2
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


var scrollBlockMove = {

    init: function (details) {//主要初始化

        var _this = this;

        _this.thisPosition = 0;//初始化现在在第几个页面

        _this.fn = details;//初始化配置

        _this.isXMove = 1;//是否需要移动

        _this.isIE = _this.isIe9(); //是不是ie浏览器

        if (_this.isIE) {

            _this.initPoint();//增加右侧导航


            //绑定鼠标滚动事件
            addEventListener('mousewheel', function (e) {//ie,chrome,

                 if (_this.isXMove) {

                     norXMove();

                    _this.changeScroll(e.wheelDelta)

                 }

            }, false);

           addEventListener('DOMMouseScroll', function (e) {//ff

                if (_this.isXMove) {

                    norXMove();

                    _this.changeScroll(0 - e.detail)

                }

            }, false);

        }
        //safari 1025添加

        // else if(navigator.userAgent.indexOf("Safari") > -1){
        //
        //     console.log('safari');
        //
        //     document.getElementById('homepage_scroll_move').style.overflow='auto'//safari 版本下做到可拖动
        //
        // }

        else{

            document.getElementById('homepage_scroll_move').style.overflow='auto'//ie版本下做到可拖动

        }

        //延迟在变化
        function norXMove() {

            _this.isXMove = 0;

            setTimeout(function () {

                _this.isXMove = 1;

            }, 300);

        }

    },

    initPoint: function () {//初始化右侧导航点


        //新建导航点元素
        var obj = document.createElement('div');

        obj.id = 'content_point';

        var thisNum = document.getElementById('content_scroll').getElementsByClassName('content_block').length;

        //通过有几个页面，设置几个导航点
        var thisInnerHtml = '<div>';

        for (var i = 0; i < thisNum; i++) {

            if (i == 0) {

                thisInnerHtml += '<span class="show"></span>';
            }

            else {

                thisInnerHtml += '<span></span>';

            }

        }

        thisInnerHtml += '</div>';

        obj.innerHTML = thisInnerHtml;

        //添加元素
        document.getElementById('homepage_scroll_move').appendChild(obj);

        //每个导航点添加监听
        var allPoint = document.getElementById('content_point').getElementsByTagName('span');

        for (var i = 0; i < allPoint.length; i++) {

            allPoint[i].addEventListener('click', this.clickPoint, false)

        }

    },

    clickPoint: function () {//绑定的点击事件

        var allPoint = document.getElementById('content_point').getElementsByTagName('div')[0].getElementsByTagName('span');

        //返回点击的是第几个元素
        for (var i = 0; i < allPoint.length; i++) {

            if (this == allPoint[i]) {

                break;

            }

        }

        var thisNeedMove = i + scrollBlockMove.thisPosition;//需要移动的位置

        //计算移动的绝对值
        if (thisNeedMove != 0) {

            for (var i = 0; i < Math.abs(thisNeedMove); i++) {

                scrollBlockMove.changeScroll(-thisNeedMove);

            }

        }

    },

    changeScroll: function (position) {//改变位置，参数正负为是否上下移动

        var pointBlock = document.getElementById('content_point');

        var changeBlock = document.getElementById('content_scroll');

        var _this = this;

        //如果向下滚动，则不能超过最大页面个数
        if (parseFloat(position) < 0) {

            var thisNum = document.getElementById('content_scroll').getElementsByClassName('content_block').length - 1;

            _this.thisPosition > -thisNum ? _this.thisPosition-- : _this.thisPosition = -thisNum;

        }

        //如果向上滚动，不能超过最上面
        else if (parseFloat(position) > 0) {

            _this.thisPosition < 0 ? _this.thisPosition++ : _this.thisPosition = 0;

        }

        _this.changeTransform(document.getElementById('content_scroll'), 100 * this.thisPosition + '%');//变化到指定位置

        //变化点的位置
        pointBlock.getElementsByClassName('show')[0].className = pointBlock.getElementsByClassName('show')[0].className.replace('show', '');

        pointBlock.getElementsByTagName('span')[-this.thisPosition].className += ' show';

        //变化页面的位置
        changeBlock.getElementsByClassName('content_show')[0].className = changeBlock.getElementsByClassName('content_show')[0].className.replace(' content_show', '');

        changeBlock.getElementsByClassName('content_block')[-this.thisPosition].className += ' content_show';

    },

    changeTransform: function (ele, num) {//位置变化的方法

        ele.style.transform = 'translateY(' + num + ')';

        ele.style.oTransform = 'translateY(' + num + ')';

        ele.style.mozTransform = 'translateY(' + num + ')';

        ele.style.webkitTransform = 'translateY(' + num + ')';

        ele.style.msTransform = 'translateY(' + num + ')'

    },

    isIe9: function () {

        {
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串

            var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器

            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器

            if (isIE) {

                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");

                reIE.test(userAgent);

                var fIEVersion = parseFloat(RegExp["$1"]);

                //判断是否版本小于ie9
                if (fIEVersion <= 9) {

                    return false;

                }
                else {

                    return true;
                }
            }
            else {

                return true;
            }

        }

    }


};

var jfMouseMove = {

    "v": {

        "isMove": false

    },

    init: function () {

        this.allEle=document.getElementsByClassName('jfMouseMove');//缓存所有元素

        addEventListener('mousemove', this.mouseMove.bind(this), false);

        this.isMove=1;//延迟执行

    },

    mouseMove: function (event) {
//事件兼容性

        var _this=this;
        //是否开启&&是否不是ie9以下
        if (this.v.isMove && scrollBlockMove.isIE && this.isMove==1) {

            this.isMove=0;

            setTimeout(function(){

                _this.isMove=1;

            },100);

            var event = window.event || event;

            //计算偏移值=屏幕中心点-鼠标位置
            var changeDistanceX = -event.pageX + document.body.clientWidth / 2;

            var changeDistanceY = -event.pageY + document.body.clientHeight / 2;



            //所有移动的元素
            var allMoveEle = this.allEle;

            //初始化移动的权重
            var distanceW = 1;

            //  console.log(1);

            for (var i = 0; i < allMoveEle.length; i++) {

                //获取当前元素权重
                distanceW = allMoveEle[i].getAttribute('data-distanceW');

                //设置偏移
                this.transformAll(allMoveEle[i], changeDistanceX / 70 * distanceW, changeDistanceY / 70 * distanceW);

                //初始化偏移
                distanceW = 1;

            }

        }

    },

    //通用变化兼容性
    transformAll: function (ele, disX, disY) {

        setTimeout(function(){
            ele.style.transform = 'translate(' + disX + 'px,' + disY + 'px)';

            ele.style.webkitTransform = 'translate(' + disX + 'px,' + disY + 'px)';

            ele.style.oTransform = 'translate(' + disX + 'px,' + disY + 'px)';

            ele.style.msTransform = 'translate(' + disX + 'px,' + disY + 'px)';

            ele.style.mozTransform = 'translate(' + disX + 'px,' + disY + 'px)';

        },200);
    }
};


var wave = (function () {
    var ctx;
    var waveImage;
    var canvasWidth;
    var canvasHeight;
    var needAnimate = false;

    function init (callback) {
        var wave = document.getElementById('wave');
        var canvas = document.createElement('canvas');
        if (!canvas.getContext) return;
        ctx = canvas.getContext('2d');
        canvasWidth = wave.offsetWidth;
        canvasHeight = wave.offsetHeight;
        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasHeight);
        wave.appendChild(canvas);
        waveImage = new Image();
        waveImage.onload = function () {
            waveImage.onload = null;
            callback();
        };
        waveImage.src = 'images/wave.png';
    }

    function animate () {
        var waveX = 0;
        var waveY = 0;
        var waveX_min = -203;
        var waveY_max = canvasHeight * 0.68;
        var requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60); };
        function loop () {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            if (!needAnimate) return;
            if (waveY < waveY_max) waveY += 1.5;
            if (waveX < waveX_min) waveX = 0; else waveX -= 3;

            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            ctx.arc(canvasWidth/2, canvasHeight/2, canvasHeight/2, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();

            ctx.globalCompositeOperation = 'source-in';
            ctx.drawImage(waveImage, waveX, canvasHeight - waveY);

            requestAnimationFrame(loop);
        }
        loop();
    }

    function start () {
        if (!ctx) return init(start);
        needAnimate = true;
        setTimeout(function () {
            if (needAnimate) animate();
        }, 3500);
    }
    function stop () {
        needAnimate = false;
    }
    return {start: start, stop: stop};
}());


function mobilePageJump() {


    if (browser.supplier.mobile) {

        window.location.href = "homepage_mobile.html";
    }

}
/*上拉以及下拉插件*/
/*2017/3/8
 * 谯丹*/
var jfFrameDrag = {

    dragEleshow: function (details) {/*出现方法*/

        var _this = this;

        _this.moveDistance = details.moveDistance || 0;//向上移动的距离

        _this.initDistance = details.initDistance || '100%';//初始状态的位置,默认向上-100%或者向下移动100%

        _this.targetButton = details.targetButton || 0;//点击的目标元素。ID选择器

        _this.targetDragName = details.targetDragName || 0;//出现的目标元素；calss选择器

        _this.hideButton = details.hideButton || 'check_btn';//关闭的按钮,class选择器

        _this.showFn = details.showFn || 0;//同时出现的函数

        _this.hideFn = details.hideFn || 0;//同时关闭的函数


        var $main = document.getElementsByClassName('frame-main')[0];//主体

        var $drag = document.getElementsByClassName('mask_drag')[0];//阴影


        if (_this.targetDragName) {//如果当前页面有多个上拉框，则选择器需要的哪个

            var $main = document.getElementsByClassName(_this.targetDragName)[0].getElementsByClassName('frame-main')[0];//主体

            var $drag = document.getElementsByClassName(_this.targetDragName)[0].getElementsByClassName('mask_drag')[0]; //阴影

        }

        /*出现的方法*/
        _this.run = function () {


            if ($main.style.display = "none") {//如果为隐藏，下拉框收起中

                document.getElementsByTagName("body")[0].className = "ovfHiden";//页面禁止滚动
                document.getElementsByTagName("html")[0].className = "ovfHiden";//页面禁止滚动

                $drag.style.display = "block";
                $main.style.display = 'block';

                setTimeout(function () {

                    $drag.style.opacity = "0.6";

                    $main.style.transform = "translate3d(0," + _this.moveDistance + ",0)";//到指定展现位置
                    $main.style.webkitTransform = "translate3d(0," + _this.moveDistance + ",0)";


                }, 10);


                if (_this.showFn) {
                    _this.showFn(); //执行 弹出时加入的函数参数
                }

            }

        };
        /*出现的方法*/
        _this.stop = function () {

            if ($main.style.display = "block") {

                $main.style.transform = "translate3d(0," + _this.initDistance + ",0)";//到达平滑过渡开始位置
                $main.style.webkitTransform = "translate3d(0," + _this.initDistance + ",0)";

                //阴影透明度变化之后再发生效果
                $drag.style.opacity = "0";


                document.getElementsByTagName("body")[0].className = "";//页面可以滚动
                document.getElementsByTagName("html")[0].className = "";//页面可以滚动


                if (_this.hideFn) {
                    _this.hideFn(); //执行 关闭时加入的函数参数
                }

            }

            $drag.addEventListener('webkitTransitionEnd', opacityChange, false);
            $drag.addEventListener('transitionend', opacityChange, false);

            function opacityChange() {

                $drag.style.display = "none";

                $drag.removeEventListener('webkitTransitionEnd', opacityChange, false);
                $drag.removeEventListener('transitionend', opacityChange, false); //取消平滑过渡后的绑定事件

            } //事件解绑


            $main.addEventListener('webkitTransitionEnd', listChange, false);
            $main.addEventListener('transitionend', listChange, false); //主体的过渡事件


            function listChange() {

                $main.style.display = "none";

                $main.removeEventListener('webkitTransitionEnd', listChange, false);
                $main.removeEventListener('transitionend', listChange, false); //事件解绑

            }
        };


        if (_this.targetButton) {//如果点击元素存在
            /*目标按钮点击出现*/
            document.getElementById(_this.targetButton).onclick = function () {

                _this.run();
            };
        }


        /*阴影点击关闭*/
        $drag.addEventListener("click", function () {
            _this.stop()
        }, false);

        /*关闭按钮点击关闭*/
        $main.getElementsByClassName(_this.hideButton)[0].onclick = function () {
            _this.stop()
        }
    }

};