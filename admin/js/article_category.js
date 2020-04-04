$(function () {
    function getCategoryData() {
        $.ajax({
            url: BigNew.category_list,
            success: function (res) {
                var html = template('cateTem', res);
                $('tbody').html(html);
                
            }
        })
    }
    
    //    获取数据
    getCategoryData();

    //点击新增分类
    $('.btn-primary').click(function () {
        var name = $('.cate-name').val();
        var slug = $('.cate-slug').val();

        $.ajax({
            url: BigNew.category_add,
            type: 'post',
            data: {
                name,
                slug
            },
            success: function (res) {
                // console.log(res.code);
                // return;
                
                if (res.code === 201) {
                    $('.cate-name').val('');
                    $('.cate-slug').val('');
                    $('#myModal').modal('hide');
                    getCategoryData();
                }
            }
        })
    })

    //  点击删除
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            data: {
                id
            },
            success: function (res) {
                if (res.code == 204) {
                    getCategoryData();
                }
            }
        });
    });
    //点击进入编辑状态
    $('tbody').on('click','.btn-info',function(){
        var id = $(this).next().attr('data-id');
        // console.log(id);
        

        $.ajax({
            url:BigNew.category_search,
            data:{
                id
            },
            success:function(res){
                //设置模态框数据
                $('.edit-name').val(res.data[0].name);
                $('.edit-slug').val(res.data[0].slug);
                $('.edit-id').val(res.data[0].id);
                $('#editModal').modal('show');
            }
        })
    });
    $('#editModal .btn-success').click(function(){
        var id = $('.edit-id').val();
        var name = $('.edit-name').val();
        var slug = $('.edit-slug').val();

        $.ajax({
            url:BigNew.category_edit,
            type:'post',
            data:{
                id,
                name,
                slug
            },
            success:function(res){
                if(res.code == 200){
                    $('#editModal').modal('hide');
                    // 重新获取数据
                    getCategoryData();
                }
            }
        });
    });
})
