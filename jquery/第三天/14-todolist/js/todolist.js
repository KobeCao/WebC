$(function() {
    //  1. 按下回车键(利用ASCII码) 把完整数据 存储到本地存储里面
    // 存储数据格式: var todolist = [{title:'',done:false}]
    load(); //每次页面一加载，先将load()运行一次
    $("#title").on("keydown",function(event){ // 利用事件对象来判断按下那个键
        if(event.keyCode === 13){ // 因为回车键的ASCII码是13
            if($(this).val() === ""){
                alert("请输入您要的操作");
            }else {
                // 先读取本地原来的数据
                var local = getDate(); // 调用函数  将值 赋值给local
                // 把 local 数组进行更新数据 把最新的数据追加给local数组
                local.push({title: $(this).val(), done: false}); // 当用户按下回车键 把最新的数据追加给local数组
                // 把这个数组local 存储给本地存储
                saveDate(local); // 将局部变量local(实参) 传过来
    
                // 2. todoliat 本地存储数据渲染加载到页面
                load();
                $(this).value(""); //输出完清空value 
            }
        }
    });
    // 3. todolist 删除操作
    $("ol, ul").on("click","a",function() {
        // 先获取本地存储
        var data = getDate();
        // console.log(data);

        // 修改数据
        var index = $(this).attr("id"); // 使用attr()来获取自定义属性
        // console.log(index);
        data.splice(index,1);

        // 保存到本地存储
        saveDate(data);  //将删除完之后的数据放到本地存储里面,本地存储就完成了更新操作
        // 将完成了修改之后的本地存储重新渲染到页面
        load();
    });
    // 4. todolist 正在进行和已完成选项操作
    $("ol, ul").on("click","input",function(){
        // 先获取本地存储数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id") // 拿到id的索引号来获得点击了那个input
        data[index].done = $(this).prop("checked"); // 当前复选框里面的done属性修改为你这个复选框的选定状态
        // 保存到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    });
    // 读取本地的数据(封装函数)
    function getDate() {
        var data = localStorage.getItem("todolist"); // 先看本地存储里面有没有 todolist 这个数据,有的话  读取过来
        if(data !== null) {
            // 本地存储里面的数据是字符串格式的  但是我们需要的是对象格式
             return JSON.parse(data); // 转换为对象格式
        }else {
            return []; // 如果没有，返回一个空的数组
        }

    }
    // 保存本地存储数据
    function saveDate(data){
        localStorage.setItem("todolist",JSON.stringify(data)); // 数组实现更新的操作
    }
    // 渲染加载数据
    function load(){
        // 读取本地存储的数据 将其拿过来
        var data = getDate(); 
        // 遍历之前先要清空ol里面的元素内容,清空完成后再去遍历最新的数据
        $("ol, ul").empty();
        // 5. 个数的统计
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data,function(i,n){ // 回调函数里面的i:数组的索引号，n:想要的数据
            if(n.done) {
                // 将本地存储里面的数组添加到ol下面，并且将值渲染到页面中出来
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id="+ i +"></a></li>");  
                doneCount++;   
            }else {
                // 将本地存储里面的数组添加到ol下面，并且将值渲染到页面中出来
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id="+ i +"></a></li>");  
                todoCount++;
            }
           
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }

})