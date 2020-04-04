
$(function () {
    $('.input_sub').click(function (e) {
        var username = $('.input_txt').val().trim();
        var password = $('.input_pass').val().trim();
        e.preventDefault();
        if (username === '' || password === '') {
            alert('输密码');
            return;
        }

        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/user/login',
            type: 'post',
            data: {
                username,
                password
            },
            success: function (res) {
                if (res.code === 400) {
                    alert(res.msg);
                } else if (res.code === 200) {
                    // alert(res.msg)
                    window.localStorage.setItem('token', res.token);
                    window.location.href = './index.html';
                }

            }
        })
    })
})
