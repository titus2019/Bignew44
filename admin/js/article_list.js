$(function () {
    //每一页数据10条
    var perpage = 15;

    //调用接口 获取文章分类数据
    $.ajax({
        url: BigNew.category_list,
        success: function (res) {
            var result = template('cateTem', res);
            $('#selCategory').html(result);
        }
    });

    // 获取文章列表数据
    $.ajax({
        url: BigNew.article_query,
        data: {
            //每一页数据
            perpage
        },
        success: function (res) {
            // console.log(res);
            var result = template('articleTem', res);
            //tbody
            $('.article-tbody').html(result);

            //调用分页插件
            $('#pagination-demo').twbsPagination({
                totalPages: res.data.totalPage,
                visiblePages: 7,
                first: "首页",
                last: "尾页",
                prev: "上一页",
                next: "下一页",


                onPageClick: function (e, page) {
                    // console.log(p);
                    //分页依旧保持筛选状态，获取id，状态
                    var type = $('#selCategory').val();
                    var state = $('#selStatus').val();
                    // console.log(e, p);

                    // console.log(res.data);


                    //获取每一页对应数据
                    $.ajax({
                        url: BigNew.article_query,
                        data: {
                            page: page,
                            perpage,
                            type,
                            state
                        },
                        success: function (res) {
                            var result = template('articleTem', res);
                            $('.article-tbody').html(result);
                        }
                    })
                }
            })
        }
    });

    //筛选
    $('#btnSearch').click(function (e) {
        e.preventDefault();
        var type = $('#selCategory').val();
        var state = $('#selStatus').val();

        $.ajax({
            url: BigNew.article_query,
            data: {
                type,
                state,
                perpage
            },
            success: function (backData) {
                console.log(backData);
                
                
                // return;
                if (backData.data.totalPage !== 0) {
                    var res = template('articleTem', backData);
                    $('.article-tbody').html(res);
                    $('#pagination-demo').twbsPagination('changeTotalPages', backData.data.totalPage, 1);
                }else{
                    $('.article-tbody').html('');
                    $('.page-item').hide();

                }
            }
        
        })
})
});
