$(function(){
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 不添加 current类
    // 可以使用节流阀或者叫做互斥锁
    var  flag = true; // 这个flag这个值的正确与否决定要不要去执行
    // 1. 显示隐藏电梯导航
    var toolTop = $(".recommend").offset().top; // 拿到recommend 距离文档上面的距离
    toggleTool(); // 页面一加载就判断

    function toggleTool() {
        if($(document).scrollTop() >= toolTop) { // 页面被卷去的头部 大于等于 recommend 距离文档上面的距离
            $(".fixedtool").fadeIn();
         }else {
             $(".fixedtool").fadeOut();
         };
    }
    $(window).scroll(function(){ // 页面滚动
        toggleTool(); // 页面滚动再去调用一次
        
        // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if(flag) {  // 只有flag是正确的时候，才会执行下面函数
            $(".floor .w").each(function(i,ele){ // 使用each()拿到每个元素
                // 如果被卷去的头部大于等于内容区域里面每个模块的offset().top
                if($(document).scrollTop() >= $(ele).offset().top) {  // 说明就滑动到了当前这个大的区域
                    console.log(i); // 返回的是每个大的索引号
                    // 根据索引号i 把相应的小li选出来，给它添加 current 这个类
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    });
    // 2. 点击电梯导航页面可以滚动到相应的内容区域
    $(".fixedtool li").click(function(){ // 先给每一个li绑定事件
        flag = false; // 每次进行点击,会触发页面滚动事件，当它执行到3上面的代码时，此时的false已经是错误的，所以就不在去添加当前这个类
        console.log($(this).index()); //拿到当前点击的索引号
        // 当我们每次点击小li 就需要计算出页面要去往的位置
        // 选出对应索引号的内容区的盒子，计算它的.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top; // 每次点击要去往的位置
        // 页面动画滚动效果
        $("body,html").stop().animate({
            scrollTop: current
        },function(){ // 设置一个回调函数，等body,html滚动完了，才会执行
            flag = true; // 说明到了目标位置，将flag设置为true
        });
        // 点击之后,让当前的小li 添加current 类名，其他的兄弟移除current 类名
        $(this).addClass("current").siblings().removeClass();
    })
})