
$('.level01:eq(1)').click(function () {
    $(this).next('.level02').slideToggle();
})

$('.level01').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('ul li').removeClass('active');
})

$('ul li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.level01').removeClass('active');
    $('.level01:eq(1)').addClass('active');
})

//获取用户信息
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/user/info',
    headers: {
        Authorization: window.localStorage.getItem('token')
    },
    success: function (res) {
        //左侧
        $('.user_info img').attr('src', res.data.userPic);
        $('.user_info span').text('欢迎 ' + res.data.nickname);
        //右侧
        $('.user_center_link img').attr('src', res.data.userPic);
        // console.log(res);

    }

})

//登出
$('.logout').click(function () {
    window.localStorage.removeItem('token');
    window.location.href = 'login.html';
})
