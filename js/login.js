var mark = document.querySelector(".mark");
var login_hide = document.querySelector("#login_hide");
var loginz_bit = document.querySelector(".loginz_bit");
var zuce_xuan = loginz_bit.children[1];
var login_xuan = loginz_bit.children[0];
var login = document.querySelector("#login");
var zuce = document.querySelector("#zuce");
//注册按钮
zuce_xuan.addEventListener("click", function () {
    login.style.display = "none";
    zuce.style.display = "block";
    login_xuan.classList.remove("active-btn");
    zuce_xuan.classList.add("active-btn")
});
//登录按钮
login_xuan.addEventListener("click", function () {
    login.style.display = "block";
    zuce.style.display = "none";
    forget.style.display = "none"
    login_xuan.classList.add("active-btn");
    zuce_xuan.classList.remove("active-btn");
});
var zuce_da_bit = document.querySelector("#zuce_da_bit");
zuce_da_bit.addEventListener("click", function () {
    login_hide.style.display = "block";
    login.style.display = "none";
    zuce.style.display = "block";
    mark.style.display = "block";
    forget.style.display = "none"
    login_xuan.classList.remove("active-btn");
    zuce_xuan.classList.add("active-btn")
});
var lenglu_da_bit = document.querySelector("#lenglu_da_bit");
lenglu_da_bit.addEventListener("click", function () {
    login_hide.style.display = "block";
    login.style.display = "block";
    zuce.style.display = "none";
    mark.style.display = "block";
    forget.style.display = "none"
    login_xuan.classList.add("active-btn");
    zuce_xuan.classList.remove("active-btn")
});
var forget_btn = document.querySelector("#forget-btn");
var forget = document.querySelector("#forget");
// 忘记密码
forget_btn.onclick = function () {
    forget.style.display = "block";
    login.style.display = "none";
    zuce.style.display = "none";
};
$(".close_forget").on("click", function () {
    $("#login").css("display", "block");
    $("#loginForm").css("display", "block");
    $("#forget").css("display", "none")
});
//存放cookie
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + "=" + value + ";expires=" + oDate
}

//enter键提交表单-->判断当前填写的表单页
$(document).keyup(function (event) {
    if (event.keyCode == 13) {
        if ($("#zuce").css("display") == "block") {
            $("#confirmreg").trigger("click");
        }
        if ($("#login").css("display") == "block") {
            $("#loginForm2").trigger("click");
        }
        if ($("#forget").css("display") == "block") {
            $("#fongetbtn").trigger("click");
        }
    }
});
// 弹窗提示窗
function mess_alert(mess) {
    $('#alert_box').show();
    $('#alt_mess').text(mess);
    $('#login_hide').hide()
    $('#alert_sure').click(function () {
        $('#alert_box').hide()
        $('#login_hide').show()
    })
}

//失去焦点验证表单数据
//登录框的正则验证--手机号、密码
var reg_loginPhone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
var reg_loginPassword = /^[a-zA-Z0-9]{6,16}$/;
$("#userphone").blur(function () {
    if ($(this).val() == "") {
        document.querySelector("#userinfo").innerText = "请输入手机号码";
        return false
    }
    else {
        if (!reg_loginPhone.test($(this).val())) {
            document.querySelector("#userinfo").innerText = "请输入正确的手机号码";
            return false
        } else {
            document.querySelector("#userinfo").innerText = ""
        }
    }
    //密码框失去焦点验证
    $("#password").blur(function () {
        if ($(this).val() == "") {
            document.querySelector("#pwdinfo").innerText = "请输入密码";
            return false
        }
        else {
            if (!reg_loginPassword.test($(this).val())) {
                document.querySelector("#pwdinfo").innerText = "请输入6-16位密码";
                return false
            } else {
                document.querySelector("#pwdinfo").innerText = ""
            }
        }
    })
})


//多次点击登录按钮提示正在登录，请稍候
var flag = false;
$("#loginForm2").on('click', function () {
    if (flag == true) {
        $('.mark').show()
        $('#alert_box').show();
        $('#login_hide').hide()
        $('.alt_bottom').hide()
        $('.alert_boxs .alt_top').css({'padding': '92px 0px 0px 0px'})
        $('#alt_mess').text("正在登录，请稍后");
        $('#alert_sure').click(function () {
            $('#alert_box').hide()
            $('.mark').hide()
        })
        return false;
    }
    flag = true;
    //验证表单
    var login_iphone = $("#userphone").val();
    var login_pas = $("#password").val();
    if (login_iphone == "") {
        document.querySelector("#userinfo").innerText = "请输入手机号码";
        flag = false
        return false
    }
    else {
        if (!reg_loginPhone.test(login_iphone)) {
            document.querySelector("#userinfo").innerText = "请输入正确的手机号码";
            flag = false
            return false
        } else {
            document.querySelector("#userinfo").innerText = ""
        }
    }
    if (login_pas == "") {
        document.querySelector("#pwdinfo").innerText = "请输入密码";
        flag = false
        return false
    }
    else{
        if (!reg_loginPassword.test(login_pas)) {
            flag = false
            document.querySelector("#pwdinfo").innerText = "请输入6-16位密码"
        } else {
            document.querySelector("#pwdinfo").innerText = ""
        }
    }
    if (GetCookie('isCon')) {
        var newTab = window.open('about:blank')
    }
    //验证通过的时候，发送ajax到后台验证
    $.ajax({
        url: "http://www.zhaodazhuang.com/zdzWebsitePC/common/login",
        type: "POST",
        data: {"phone": login_iphone, "password": login_pas},
        dataType: "json",
        success: function (data) {
            flag = false
            if (data.success == false) {
                //如果是点击咨询的登录后弹窗咨询窗口
                if (GetCookie('isCon')) {
                    newTab.close();
                }
                mess_alert(data.msg)
                return false;
            } else {
                //将用户的id、num编号、登录token存储到cookie
                setCookie("num", data.content.id, 1);
                setCookie("id", data.content.clientId, 1)
                setCookie('loginNum', data.content.loginNum, 1)
                //判断是不是会员用户
                if (data.content.isEnterprise != 1) {
                    if (GetCookie('isCon') == 'index') {
                        $("#login_hide").hide();
                        $(".mark").hide();
                        newTab.location.href = 'http://kefu6.kuaishang.cn/bs/im.htm?cas=45849___498307&fi=49135&from=3';
                    }
                    else if (GetCookie('isCon') == 'invest') {
                        $("#login_hide").hide();
                        $(".mark").hide();
                        newTab.location.href = 'https://hztk5.kuaishang.cn/bs/im.htm?cas=72041___507385&fi=81602';
                    }
                    else {
                        location.href = "UserCenter.html#/TUserCenter";
                    }
                } else {
                    if (GetCookie('isCon') == 'index') {
                        $("#login_hide").hide();
                        $(".mark").hide();
                        newTab.location.href = 'http://kefu6.kuaishang.cn/bs/im.htm?cas=45849___498307&fi=49135&from=3';
                    }
                    else if (GetCookie('isCon') == 'invest') {
                        $("#login_hide").hide();
                        $(".mark").hide();
                        newTab.location.href = 'https://hztk5.kuaishang.cn/bs/im.htm?cas=72041___507385&fi=81602';
                    }
                    else {
                        location.href = "UserCenter.html#/UserCenter"
                    }
                }
                $(".log_zuce_but").hide();
                $(".suer_name").html(data.content.fullname);
                setCookie('fullName', data.content.fullname)
                $("#name_wrap").show();
            }
        },
        error: function () {
            flag = false
        }
    })
});


//发送验证码
$("#btn1").click(function () {
    $.ajax({
        url: 'http://www.zhaodazhuang.com/zdzWebsiteMobile/common/beforeRegister',
        type: 'post',
        data: {
            'phone': $('#regtel').val()
        },
        success: function (data) {
            if (data.msg == '该账号已注册!') {
                mess_alert(data.msg)
                return false;
            }
            else {
                var regtel = $("#regtel").val();
                var reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
                if (regtel == "") {
                    document.querySelector("#regtelinfo").innerText = "请输入手机号码";
                    return false
                } else {
                    if (!reg.test(regtel)) {
                        document.querySelector("#regtelinfo").innerText = "请输入正确的手机号码";
                        return false
                    } else {
                        document.querySelector("#regtelinfo").innerText = ""
                    }
                }
                $.ajax({
                    url: "http://www.zhaodazhuang.com/zdzWebsitePC/common/smscode",
                    type: "POST",
                    data: {tel: regtel},
                    dataType: "json",
                    success: function (data) {
                        if (data.msg == "手机号码不能为空") {
                            return
                        } else {
                            var countdown = 60;
                            var timer = setInterval(function () {
                                countdown--;
                                if (countdown > 0) {
                                    $("#btn1").attr("disabled", "disabled");
                                    $("#btn1").html(countdown + "秒后可重发")
                                } else {
                                    clearInterval(timer);
                                    $("#btn1").html("重新发送");
                                    $("#btn1").removeAttr("disabled")
                                }
                            }, 1000)
                        }
                    },
                    error: function () {
                        mess_alert("验证码获取失败")
                    }
                })
            }
        },
    })

});

//注册失去焦点验证
var reg_regPhone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
var reg_regPwd = /^[a-zA-Z0-9]{6,16}$/;
//注册框手机号
$("#regtel").blur(function () {
    if ($(this).val() == "") {
        document.querySelector("#regtelinfo").innerText = "请输入手机号码";
        return false
    } else {
        if (!reg_regPhone.test($(this).val())) {
            document.querySelector("#regtelinfo").innerText = "请输入正确的手机号码";
            return false
        } else {
            document.querySelector("#regtelinfo").innerText = ""
        }
    }
    //注册框验证码
    $("#regverifyCode").blur(function () {
        if ($(this).val() == "") {
            document.querySelector("#regcodeinfo").innerText = "验证码不能为空";
            return false
        } else {
            document.querySelector("#regcodeinfo").innerText = ""
        }
        //注册框密码
        $("#regpwd").blur(function () {
            if ($(this).val()== "") {
                document.querySelector("#regpwdinfo").innerText = "请输入密码";
                return false
            }
            if (!reg_regPwd.test($(this).val())) {
                document.querySelector("#regpwdinfo").innerText = "请输入6-16位数字或英文组成的密码";
                return false
            }
            else {
                if ($(this).val().length < 6) {
                    document.querySelector("#regpwdinfo").innerText = "请输入6-16位数字或英文新密码";
                    return false
                } else {
                    if ($(this).val().length > 12) {
                        document.querySelector("#regpwdinfo").innerText = "请输入6-16位数字或英文新密码";
                        return false
                    } else {
                        document.querySelector("#regpwdinfo").innerText = ""
                    }
                }
            }
            //再次输入密码验证
            $("#regpwd2").blur(function () {
                if ($(this).val() != $("#regpwd").val()) {
                    document.querySelector("#regpwdinfo2").innerText = "两次密码输入不一致";
                    return false
                } else {
                    document.querySelector("#regpwdinfo2").innerText = ""
                }
            })
        })
    })

})

//注册新用户提交按钮事件
$("#confirmreg").click(function () {
    var regtel = $("#regtel").val();
    var regpwd = $("#regpwd").val();
    var regpwd2 = $("#regpwd2").val();
    var regverifyCode = $("#regverifyCode").val();
    //验证表单
    if (regtel == "") {
        document.querySelector("#regtelinfo").innerText = "请输入手机号码";
        return false
    } else {
        if (!reg_regPhone.test(regtel)) {
            document.querySelector("#regtelinfo").innerText = "请输入正确的手机号码";
            return false
        } else {
            document.querySelector("#regtelinfo").innerText = ""
        }
    }
    if (regverifyCode == "") {
        document.querySelector("#regcodeinfo").innerText = "验证码不能为空";
        return false
    } else {
        document.querySelector("#regcodeinfo").innerText = ""
    }
    if (regpwd == "") {
        document.querySelector("#regpwdinfo").innerText = "请输入密码";
        return false
    }
    if (!reg_regPwd.test(regpwd)) {
        document.querySelector("#regpwdinfo").innerText = "请输入6-16位数字或英文组成的密码";
        return false
    }
    else {
        if (regpwd.length < 6) {
            document.querySelector("#regpwdinfo").innerText = "请输入6-16位数字或英文新密码";
            return false
        } else {
            if (regpwd.length > 12) {
                document.querySelector("#regpwdinfo").innerText = "请输入6-16位数字或英文新密码";
                return false
            } else {
                document.querySelector("#regpwdinfo").innerText = ""
            }
        }
    }
    if (regpwd2 != regpwd) {
        document.querySelector("#regpwdinfo2").innerText = "两次密码输入不一致";
        return false
    } else {
        document.querySelector("#regpwdinfo2").innerText = ""
    }
    $.ajax({
        url: "http://www.zhaodazhuang.com/zdzWebsitePC/common/register",
        type: "POST",
        data: {phone: regtel, password: regpwd, twoPassword: regpwd2, smscode: regverifyCode},
        dataType: "json",
        success: function (data) {
            if (data.success == true) {
                $('#alert_box').show();
                $('#alt_mess').text(data.msg);
                $('#login_hide').hide()
                $('#alert_sure').click(function () {
                    $('#alert_box').hide()
                    $("#login_hide").show()
                    $('#login').show()
                    $('.mark').show()
                    $('#zuce').hide()
                    $('#forget').hide()
                })
                return false
            } else {
                $('#alert_box').show();
                $('#alt_mess').text(data.msg);
                $('#login_hide').hide()
                $('#alert_sure').click(function () {
                    $('#alert_box').hide()
                    $('#login_hide').show()
                })
                return false
            }
        },
        error: function (data) {
            mess_alert(data.msg)
        }
    })
    return false;
});


var reg_fotgetPhone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
var reg_forgetPwd = /^[a-zA-Z0-9]{6,16}$/;
$("#forgettel").blur(function () {
    if ($(this).val() == "") {
        document.querySelector("#fortelinfo").innerText = "请输入手机号码";
        return false
    } else {
        if (!reg_fotgetPhone.test($(this).val())) {
            document.querySelector("#fortelinfo").innerText = "请输入正确的手机号码";
            return false
        } else {
            document.querySelector("#fortelinfo").innerText = ""
        }
    }
    $("#forgetverifyCode").blur(function () {
        if ($(this).val() == "") {
            document.querySelector("#forcodeinfo").innerText = "请输入验证码";
            return false
        } else {
            document.querySelector("#forcodeinfo").innerText = ""
        }
        $("#forgetpwd").blur(function () {
            if ($(this).val() == "") {
                document.querySelector("#fornewinfo").innerText = "请输入密码";
                return false
            }
            else if (!reg_forgetPwd.test($(this).val())) {
                document.querySelector("#fornewinfo").innerText = "请输入6-12位数字或是英文新密码";
                return false;
            }
            else {
                if ($(this).val().length < 6) {
                    document.querySelector("#fornewinfo").innerText = "请至少输入6位密码";
                    return false
                } else {
                    if ($(this).val().length > 12) {
                        document.querySelector("#fornewinfo").innerText = "请输入6-12位数字或是英文新密码";
                        return false
                    } else {
                        document.querySelector("#fornewinfo").innerText = ""
                    }
                }
            }
            $("#password_old").blur(function () {
                if ($(this).val() == "") {
                    document.querySelector("#forg_pass_old").innerText = "请输入密码";
                    return false
                } else {
                    if ($(this).val() != $("#forgetpwd").val()) {
                        document.querySelector("#forg_pass_old").innerText = "两次密码不一致";
                        return false
                    } else {
                        document.querySelector("#forg_pass_old").innerText = ""
                    }
                }
            })
        })
    })
})


//发送验证码
$("#btn2").click(function () {
    var forgettel = $("#forgettel").val();
    if (forgettel == "") {
        document.querySelector("#fortelinfo").innerText = "请输入手机号码";
        return false
    } else {
        if (!reg_fotgetPhone.test(forgettel)) {
            document.querySelector("#fortelinfo").innerText = "请输入正确的手机号码";
            return false
        } else {
            document.querySelector("#fortelinfo").innerText = ""
        }
    }
    $.ajax({
        url: 'http://www.zhaodazhuang.com/zdzWebsiteMobile/common/beforeRegister',
        type: 'post',
        data: {
            'phone': $('#forgettel').val()
        },
        success: function (data) {
            if (data.msg == '该账号已注册!') {
                $.ajax({
                    url: "http://www.zhaodazhuang.com/zdzWebsitePC/common/smscode",
                    type: "POST",
                    data: {'tel': forgettel},
                    dataType: "json",
                    success: function (data) {
                        if (data.msg == "手机号码不能为空") {
                            return
                        } else {
                            var countdown = 60;
                            var timer = setInterval(function () {
                                countdown--;
                                if (countdown > 0) {
                                    $("#btn2").attr("disabled", "disabled");
                                    $("#btn2").html(countdown + "秒后可重发")
                                } else {
                                    clearInterval(timer);
                                    $("#btn2").html("重新发送");
                                    $("#btn2").removeAttr("disabled")
                                }
                            }, 1000)
                        }
                    },
                    error: function () {

                    }
                })
                return false;
            } else {
                mess_alert('不存在该用户')
            }
        },
        error: function (data) {
            mess_alert(data.msg)
        }
    })

});
//忘记密码提交按钮
$("#fongetbtn").click(function () {
    var forgettel = $("#forgettel").val();
    var forgetverifyCode = $("#forgetverifyCode").val();
    var forgetpwd = $("#forgetpwd").val();
    var password_old = $("#password_old").val();
    if (forgettel == "") {
        document.querySelector("#fortelinfo").innerText = "请输入手机号码";
        return false
    } else {
        if (!reg_fotgetPhone.test(forgettel)) {
            document.querySelector("#fortelinfo").innerText = "请输入正确的手机号码";
            return false
        } else {
            document.querySelector("#fortelinfo").innerText = ""
        }
    }
    if (forgetverifyCode == "") {
        document.querySelector("#forcodeinfo").innerText = "请输入验证码";
        return false
    } else {
        document.querySelector("#forcodeinfo").innerText = ""
    }
    if (forgetpwd == "") {
        document.querySelector("#fornewinfo").innerText = "请输入密码";
        return false
    }

    else if (!reg_forgetPwd.test(forgetpwd)) {
        document.querySelector("#fornewinfo").innerText = "请输入6-12位数字或是英文新密码";
        return false;
    }
    else if (!reg_forgetPwd.test(password_old)) {
        document.querySelector("#forg_pass_old").innerText = "请输入6-12位数字或是英文新密码";
        return false;
    }
    else {
        if (forgetpwd.length < 6) {
            document.querySelector("#fornewinfo").innerText = "请至少输入6位密码";
            return false
        } else {
            if (forgetpwd.length > 12) {
                document.querySelector("#fornewinfo").innerText = "请输入6-12位数字或是英文新密码";
                return false
            } else {
                document.querySelector("#fornewinfo").innerText = ""
            }
        }
    }
    if (password_old == "") {
        document.querySelector("#forg_pass_old").innerText = "请输入密码";
        return false
    } else {
        if (password_old != forgetpwd) {
            document.querySelector("#forg_pass_old").innerText = "两次密码不一致";
            return false
        } else {
            document.querySelector("#forg_pass_old").innerText = ""
        }
    }
    $.ajax({
        url: "http://www.zhaodazhuang.com/zdzWebsitePC/common/forgetPassword",
        type: "POST",
        data: {phone: forgettel, password: forgetpwd, twoPassword: password_old, smscode: forgetverifyCode},
        dataType: "json",
        success: function (data) {
            if (data.msg == "验证码不正确,请重新输入") {
                $("#forget").css("display", "block");
                $('#alert_box').show();
                $('#alt_mess').text(data.msg);
                $('#login_hide').hide()
                $('#login').hide()
                $('#alert_sure').click(function () {
                    $('#alert_box').hide()
                    $('#login').hide()
                    $('#login_hide').show()
                })
                return
            }
            else {
                $('#alert_box').show();
                $('#alt_mess').text(data.msg);
                $('#login_hide').hide()
                $('#alert_sure').click(function () {
                    $('#alert_box').hide()
                    $("#forget").css("display", "none");
                    $("#login_hide").css("display", "block");
                    $('#login').show()
                })

            }
        },
        error: function () {

        }
    })
});
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
if (GetCookie("num") != "" && GetCookie("num") != null) {
    document.querySelector("#name_wrap").style.display = "block";
    document.querySelector("#log_zuce_but").style.display = "none";
    document.querySelector("#suer_name").innerText = GetCookie("fullname")
}
function enter_UserCenter() {
    if (GetCookie("unbuy") == "/TUserCenter") {
        location.href = "UserCenter.html#/TUserCenter"
    } else {
        location.href = "UserCenter.html#/UserCenter"
    }
}
//退出登录函数
function exit() {
    $('.mark').show()
    $('#cancel_box').show();
    $('.alert_boxs>.alt_top').css({'padding': '68px 0px 0px 88px'})
    $('#cancel_sure').click(function () {
        $('.mark').hide()
        $('#cancel_box').hide();
        $('.alert_boxs>.alt_top').css({'padding': '68px 0px 0px 116px'})
        $.ajax({
            url: "http://www.zhaodazhuang.com/zdzWebsitePC/common/logout",
            data: {"num": GetCookie("num")},
            type: "GET",
            success: function () {
                function clearCookie() {
                    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                    if (keys) {
                        for (var i = keys.length; i--;) {
                            document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString()
                        }
                    }
                }

                clearCookie();
                location.href = 'index.html'
            }
        })
        return false
    })
    $('#alert_cancel').click(function () {
        $('#cancel_box').hide();
        $('.mark').hide()
        $('.alert_boxs>.alt_top').css({'padding': '68px 0px 0px 116px'})
    })
};