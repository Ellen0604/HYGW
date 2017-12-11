//导航栏滚动背景颜色效果
$(document).ready(function () {
    var topMain = 50;
    var topMain2 = 100;
    $(window).scroll(function () {
        if ($(window).scrollTop() > topMain) {
            $(".nav_bianse").css("background-color", "rgba(0%, 0%, 0%, 0.8)")
        }
        if ($(window).scrollTop() > topMain2) {
            $(".nav_bianse").css("background-color", "rgba(0%, 0%, 0%, 0.5)")
        } else {
            $(".nav_bianse").css("background-color", "rgba(0%, 0%, 0%, 0.0)")
        }
    })
});
// 导航栏菜单切换效果
$(".font-color li").hover(function () {
    $(this).css({'background-color':'#2562CC'}).find('a').css({"color":"#fff"})
},function () {
    $(this).css({'background-color':''})
})
$(".font-color li").click(function(event) {
    $(".font-color li").removeClass('active');
    $(this).addClass('active');
});

// var qyfl = document.getElementById("qyfl");
// var pc_fu = document.querySelectorAll(".pc_fu");
// var move_block = document.querySelectorAll(".move_block");
// move_block[0].style.display = "block";
// var lis = qyfl.children;
// for (var i = 0; i < lis.length; i++) {
//     lis[i].index = i;
//     lis[i].onmouseover = function () {
//         for (var i = 0; i < lis.length; i++) {
//             lis[i].classList.remove("current");
//             pc_fu[i].classList.add("hide");
//             move_block[i].style.display = "none"
//         }
//         this.classList.add("current");
//         pc_fu[this.index].classList.remove("hide");
//         move_block[this.index].style.display = "block"
//     }
// }
speed = 100;
var tab = document.getElementById("demo");
var tab1 = document.getElementById("demo1");
var tab2 = document.getElementById("demo2");
tab2.innerHTML = tab1.innerHTML;
tab.scrollTop = tab1.offsetHeight;
function Marquee() {
    if (tab.scrollTop >= tab1.offsetHeight) {
        tab.scrollTop -= tab2.offsetHeight
    } else {
        tab.scrollTop += 1
    }
}
var MyMar = null;
MyMar = setInterval(Marquee, speed);
tab1.onmouseover = function () {
    clearInterval(MyMar)
};
tab1.onmouseout = function () {
    MyMar = setInterval(Marquee, speed)
};
var weixin_log = document.querySelector(".weixin_log");
var hove_weixin = document.querySelector(".hove_weixin");
weixin_log.onmouseover = function () {
    hove_weixin.style.display = "block"
};
weixin_log.onmouseout = function () {
    hove_weixin.style.display = "none"
};
window.onscroll = function () {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if (t >= 2000) {
        $("#ante").addClass("animated bounceInLeft").css("display", "block");
        $("#timer_cl").countUp();
        return
    }
};
$(".header-bottom").find("ul>li").each(function () {
    $(this).hover(function () {
        $(this).find("a>span").css({"position": "relative", "top": "-15px", "transition": "all 1s"});
        $(this).find(".bottom-text>p").css("color", "#2562cc")
    }, function () {
        $(this).find("a>span").css({"position": "relative", "top": "0px"});
        $(this).find(".bottom-text>p").css("color", "#000")
    })
});
if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, "classList", {
        get: function () {
            var self = this;

            function update(fn) {
                return function (value) {
                    var classes = self.className.split(/\s+/g), index = classes.indexOf(value);
                    fn(classes, index, value);
                    self.className = classes.join(" ")
                }
            }

            return {
                add: update(function (classes, index, value) {
                    if (!~index) {
                        classes.push(value)
                    }
                }), remove: update(function (classes, index) {
                    if (~index) {
                        classes.splice(index, 1)
                    }
                }), toggle: update(function (classes, index, value) {
                    if (~index) {
                        classes.splice(index, 1)
                    } else {
                        classes.push(value)
                    }
                }), contains: function (value) {
                    return !!~self.className.split(/\s+/g).indexOf(value)
                }, item: function (i) {
                    return self.className.split(/\s+/g)[i] || null
                }
            }
        }
    })
}
;
//获取存储的cookie
function GetCookie(sName) {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
            return unescape(aCrumb[1])
        }
    }
    return null
}
// 将数据存储到cookie
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + "=" + value + ";expires=" + oDate
}
//首页咨询需要登录
function serverCon(target) {
    target.on('click',function () {
        setCookie('isCon','index')
        if(GetCookie('num')){
            window.open('http://kefu6.kuaishang.cn/bs/im.htm?cas=45849___498307&fi=49135&from=3')
        }else {
            $("#login_hide").show()
            $('#login').show()
            $('.mark').show()
            $('#zuce').hide()
            $('#forget').hide()
        }
        return false
    })
}
serverCon($("#adv_btn"))
serverCon($("#adv_index_btn"))
serverCon($("#adv_index_foot"))


if(GetCookie('fullName')){
    $("#suer_name").html(GetCookie('fullName'));
    $("#login_hide").hide();
}