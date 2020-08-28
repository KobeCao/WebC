$(function () {
    // 1. 全选 全不选功能
    // 就是把全选按钮(checkall)的状态赋值给 三个小的按钮(j-checkbox )就可以了
    // 事件可以使用change  当元素的值发生改变时，会发生 change 事件。
    $(".checkall").change(function () {
        console.log($(this).prop("checked")); // 查看当前全选按钮是否选中  checked 选中状态
        // 跟着全选按钮,将拿到的状态赋值给三个小按钮，也将另一个全选按钮一块来发生变化
        $(".j-checkbox , .checkall").prop("checked", $(this).prop("checked")); // 把全选按钮状态赋值给3小复选框就可以了
        // 全选按钮的 checked 
        if($(this).prop("checked")) {  
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        }else{
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });

    // 2. 当我们每次点击小的复选框按钮，就来判断：如果小复选框被选中的个数等于3就应该把全选按钮选上，否则全选按钮不选 
    // :checked选择器  :checked查找被选中的表单元素
    $(".j-checkbox").change(function () {
        //   if(被选中的小的复选框的个数 === 整个小复选框的个数) {
        //        就要选中全选按钮
        //    }else {
        //        不要选中全选按钮
        //    }
        //$(".j-checkbox:checked").length); 这个的长度就是被选中的复选框的个数
        // $(".j-checkbox").length 这个是所有小复选框的个数
        if($(".j-checkbox:checked").length ===  $(".j-checkbox").length) {  
            $(".checkall").prop("checked",true);
        }else{
            $(".checkall").prop("checked",false);
        }
        // 点击单选按钮时
        if($(this).prop("checked")) {  
            // 让当前的商品添加 check-cart-item 类名
           $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    // 3. 增减商品数量
    // 核心思路：首先声明一个变量，当我们点击+号（increment），就让这个值++，然后复制给文本框
    // 只能增加本商品的值，就是当前+号的兄弟文本框(itxt)的值
    // 这个变量初始值应该是这个文本框的值，在这个值的基础上++, 获取表单的值
    $(".increment").click(function(){
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val(); 
        n++; // 每点击一次，就加一次
        $(this).siblings(".itxt").val(n); // 将加完之后的值给当前的兄弟文本框
    //  4. 修改商品小计 
    // 核心思路：每次点击+号或者-号，根据文本框的值 乘以 当前商品的价格 就是 商品的小计
    // 修改普通元素的内容是text();
    // 注意：只能增加本商品的小计(p-sum)，当前商品的价格，要把￥符号去掉再相乘 截取字符串 substr(1)
       //  当前商品的价格
       //  var p = $(this).parent().parent().siblings(".p-price").html();
       // parents(".p-num") 返回指定的祖先元素
       var p = $(this).parents(".p-num").siblings(".p-price").html(); //拿到价格 简便写法
       p = p.substr(1); // 给p重新赋值 从1开始截取 去掉前面的符号
       // 小计模块
       $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2)); //toFixed(2)保留两位小数
       getSum();
    });

    // 减号(decrement)思路也一样,但是如果文本框的值是1，就不能再减了
    $(".decrement").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        // console.log(n);
        n--;
        $(this).siblings(".itxt").val(n); // 将减完之后的值给当前的兄弟文本框
        //  当前商品的价格
       var p = $(this).parents(".p-num").siblings(".p-price").html(); // 拿到价格
       p = p.substr(1); // 从1开始截取
       // 小计模块
       $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
       getSum();
    });
    // 用户修改文本框的值 计算小计模块
    $(".itxt").change(function(){
        // 先得到文本框里面的值 乘以 当前商品的单价
        var n = $(this).val(); // 拿到文本框修改之后的值
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html(); // 拿到当前的价格
        p = p.substr(1); // 去掉人命币符号
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum(); // 当用户修改的时候，计算一下里面的小计
    });
    // 5. 计算总计和总额模块
    getSum(); // 先调用一次 
    function getSum() {
      var count = 0; // 计算总件数
      var money = 0; // 计算总价钱
       $(".itxt").each(function(i,ele) { // 使用each()遍历
           // 每个元素里面的值相加
           count += parseInt($(ele).val()); // 当前小元素的值
       });
       $(".amount-sum em").text(count);
       $(".p-sum").each(function(i,ele){
           money += parseFloat($(ele).text().substr(1));
       });
       $(".price-sum em").text("￥"+money.toFixed(2));
    }
    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function(){
        // 删除的是当前的商品 $(this)
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2)删除选中的商品
    $(".remove-batch").click(function() {
        //  判断小的复选框是否被选中
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3)清理购物车  删除全部商品
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        getSum();
    });
});
