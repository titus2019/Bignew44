$(function () {

    // 一.获取文章分类数据
    $.ajax({
        url: BigNew.category_list,
        success: function (backData) {
            console.log(backData);
            // 调用方法
            var res = template('cateTem', backData);
            // 渲染到页面上
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

    // 获取并解析id
    function formatData() {
        // 去?
        var dataStr = window.location.search.slice(1);
        // 切割为`key=value`的数组
        var dataArr = dataStr.split('&');
        // 生成数据对象
        var searchData = {};
        for (var i = 0; i < dataArr.length; i++) {
            // 获取每一项
            var eachData = dataArr[i].split('=');
            // console.log(eachData);
            // 添加到对象中
            searchData[eachData[0]] = eachData[1];
        }
        return searchData
    }

    var searchData = formatData();
    // console.log(searchData);


    // 根据id获取id对应的文章数据
    $.ajax({
        url: BigNew.article_search,
        // 通过对象获取id
        data: { id: searchData.id },
        success: function (backData) {
            // console.log(backData)
            // 挨个的设置
            // 标题是
            $(".title").val(backData.data.title);
            // 封面
            $(".article_cover").attr('src', backData.data.cover);
            // 分类
            $('.category').val(backData.data.categoryId);
            // 日期 data(数据) date(日期)
            $('.date').val(backData.data.date);
            // 富文本
            editor.txt.html(backData.data.content);
            // id通过隐藏域保存
            $('.article_id').val(backData.data.id);

        }
    })

    // 点击修改按钮 提交数据
    $(".btn-edit").click(function (e) {
        e.preventDefault()
        // 创建formData
        var formData = new FormData($('form')[0]);
        // 追加数据
        formData.append('content',editor.txt.html());
        formData.append('state','已发布');

        // ajax
        $.ajax({
            url:BigNew.article_edit,
            type:'post',
            data:formData,
            processData:false,
            contentType:false,
            success:function(backData){
                console.log(backData);
                window.location.href = 'article_list.html';

            }
        })
    })
})
