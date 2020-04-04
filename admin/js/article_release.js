$(function () {
    //获取文件分类数据
    $.ajax({
        url: BigNew.category_list,
        success: function (backData) {
            var res = template('cateTem', backData);
            $('.category').html(res);
        }
    })

    // 初始化日期插件
    jeDate(".date", {
        // 年月日
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        isinitVal: true,
        zIndex: 999999
        // skinCell:'jedateblue'
    })

    // 初始化富文本编辑器
    var E = window.wangEditor
    var editor = new E('.editor')
    editor.create()

    // 本地图片预览
    $("#inputCover").change(function () {
        // 获取file
        var file = this.files[0];
        // 生成url
        var url = URL.createObjectURL(file);
        // 设置给img src
        $(this).prev('img').attr('src', url);
    })

    //发布文章逻辑
    function publishArticle(state) {
        var formData = new FormData($('form')[0]);
        formData.append('content', editor.txt.html());

        //追加状态为已发布
        formData.append('state', state);
        $.ajax({
            url: BigNew.article_publish,
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    alert(res.msg);
                    window.location.href = 'article_list.html';
                    // console.log(res.msg);

                }
            }
        });
    }

    //发布文章
    $('.btn-release').click(function () {
        publishArticle('已发布');
    })
    //发布为草稿
    $('.btn-draft').click(function () {
        publishArticle('草稿');
    })


})

