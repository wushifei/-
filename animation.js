/**
 * Created by Administrator on 2017/9/6.
 */
//获取元素封装
function $(ele) {
    var str = ele.charAt(0);
    if (str == '#') {
        return document.getElementById(ele.slice(1));
    } else if (str == '.') {
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(ele.slice(1));
        } else {
            var aa = document.getElementsByTagName("*");
            arr = [];
            for (var i = 0; i < aa.length; i++) {
                arr1 = aa[i].className.split(" ");
                for (var j = 0; j < arr1.length; j++) {
                    if (arr1[j] == ele.slice(1)) {
                        arr.push(aa[i]);
                        break;
                    }
                }
            }
            return arr;
        }
    } else {
        return document.getElementsByTagName(ele);
    }
}

//scroll
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    }
}

//client
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}

//匀速动画
function animate(dom, json, fn) {
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k == 'opacity') {
                var leader = Number(getStyle(dom, k));
                var step = 0.05;
                leader = leader > json[k] ? leader - step : leader + step;
                if (Math.abs(leader - json[k]) > step) {
                    flag = false;
                    dom.style[k] = leader;
                } else {
                    dom.style[k] = json[k];
                }
            } else if (k == 'zIndex') {
                dom.style[k] = k;
            } else if (k == 'backgroundColor') {
                var reg = /\d{1,3}/g;
                var leader = getStyle(dom, k).match(reg), step = 10;
                var bgTarget = json[k].match(reg);
                for (var i = 0; i < leader.length; i++) {
                    leader[i] = Number(leader[i]) > Number(bgTarget[i]) ? Number(leader[i]) - step : Number(leader[i]) + step;
                    if (Math.abs(leader[i] - Number(bgTarget[i])) > step) {
                        flag = false;
                        dom.style[k] = 'rgb(' + leader[0] + ',' + leader[1] + ',' + leader[2] + ')';
                    }
                }
            } else {
                var leader = parseInt(getStyle(dom, k));
                var step = 10;
                leader = leader > json[k] ? leader - step : leader + step;
                if (Math.abs(leader - json[k]) > step) {
                    flag = false;
                    dom.style[k] = leader + 'px';
                } else {
                    dom.style[k] = json[k] + 'px';
                }
            }
        }
        if (flag) {
            if (k == 'backgroundColor') {
                clearInterval(dom.timer);
                dom.style[k] = 'rgb(' + bgTarget[0] + ',' + bgTarget[1] + ',' + bgTarget[2] + ')';
                fn && fn();
            } else {
                clearInterval(dom.timer);
                fn && fn();
            }
        }
        console.log(1)
    }, 16)
}

//缓动动画
function animateSlow(dom, json, fn) {
    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
        dom.flag = true;
        for (var k in json) {
            if (k == "opacity") {
                var leader = Number(getStyle(dom, k) * 100),
                    step = (json[k] * 100 - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = (leader + step) / 100;
                if (leader != json[k]) {
                    dom.flag = false;
                }
                dom.style[k] = leader;
            } else if (k == "zIndex") {
                dom.style[k] = json[k];
            }
            else if (k == 'backgroundColor') {
                var reg = /\d{1,3}/g;
                var leader = getStyle(dom, k).match(reg);
                var step = [];
                var bgTarget = json[k].match(reg);
                for (var i = 0; i < leader.length; i++) {
                    step[i] = (bgTarget[i] - leader[i]) / 10;
                    step[i] = step[i] > 0 ? Math.ceil(step[i]) : Math.floor(step[i]);
                    leader[i] = Number(leader[i]) + Number(step[i]);
                    if (leader[i] != bgTarget[i])dom.flag = false;
                }
                dom.style[k] = 'rgb(' + leader[0] + ',' + leader[1] + ',' + leader[2] + ')';
            }
            else {
                var leader = parseInt(getStyle(dom, k)),
                    step = (json[k] - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                if (leader != json[k]) {
                    dom.flag = false;
                }
                dom.style[k] = leader + 'px';
            }
        }
        if (dom.flag) {
            clearInterval(dom.timer);
            fn && fn();
        }
        console.log(1)
    }, 16)
}

function getStyle(dom, attr) {
    return (window.getComputedStyle && window.getComputedStyle(dom)[attr]) || dom.currentStyle[attr];
}

//鼠标点击获取坐标
function eve() {
    var event = event || window.event;
    return {
        posPX: event.pageX || window.event.clientX + document.documentElement.scrollLeft,
        posPY: event.pageY || window.event.clientY + document.documentElement.scrollTop,
        posCX: event.clientX,
        posCY: event.clientY,
        posSX: event.screenX,
        posSY: event.screenY
    }
}
