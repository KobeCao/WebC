$(function(){ 
    // 1. 全选 全不选功能
    $(".checkall").change(function(){
        console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked",$(this).prop("checked"));
        if($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        }else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2. 当我们每次点击小的复选框按钮，就来判断：如果小复选框被选中的个数等于3就应该把全选按钮选上，否则全选按钮不选 
    $(".j-checkbox").change(function(){
        // console.log($(".j-checkbox:checked").length); 被选中的复选框个数
        // console.log($(".j-checkbox").length); 这个是所有小复选框的个数
        if($(".j-checkbox:checked").length === $(".j-checkbox").length){
            $(".checkall").prop("checked",true);
        } else {
            $(".checkall").prop("checked",false);
        }
        if($(this).prop("checked")) {
           $(this).parents(".cart-item").addClass("check-cart-item");
        }else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    // 3. 增减商品数量模块
    $(".increment").click(function(){
        var n = $(this).siblings(".itxt").val(); // 得到当前兄弟文本框的值
        n++;
        $(this).siblings(".itxt").val(n); // 将加完之后的值给当前的兄弟文本框
        // 4. 修改商品小计 文本框的值 乘以 当前商品的价格 就是 商品的小计
        // parents(".p-num") 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html(); //拿到当前的商品价格
        // console.log(p);
        p = p.substr(1); // 去掉前面的符号
        // console.log(p);
        // 小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2)); //toFixed(2)保留两位小数
        getSum();
    });
    
    // 减号
    $(".decrement").click(function(){
        var n = $(this).siblings(".itxt").val();
        if(n == 1){
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // var p = $(this).parent().parent().siblings(".p-price").html(); //拿到当前的商品价格
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1); // 去掉前面的符号
        // console.log(p);
        // 小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2)); 
        getSum();
    });
    // 5. 用户修改文本框的值 计算 小计模块
    $(".itxt").change(function(){
        // 先得到文本框里面的值 乘以 当前商品的单价
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1); // 去掉前面的符号
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2)); 
        getSum();
    });
    // 5. 计算总计和总额模块
    getSum();
    function getSum(){
        var count = 0; // 计算总价钱
        var money = 0; // 计算总金额
        $(".itxt").each(function(i,ele){
            // 每个元素里面的值相加
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function(i,ele){
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 6. 删除商品模块
    // 商品后面的删除按钮
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // 删除选中的商品
    $(".remove-batch").click(function() {
       $(".j-checkbox:checked").parents(".cart-item").remove();
       getSum();
    });
    // 清理购物车 删除全部商品
    $(".clear-all").click(function() {
       $(".cart-item").remove();
       getSum();
    })
}) 