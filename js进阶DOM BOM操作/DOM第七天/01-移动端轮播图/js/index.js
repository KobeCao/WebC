window.addEventListener('load', function() {
    // 1. 获取元素 
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    // 获得focus 的宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    // 2. 利用定时器自动轮播图图片
    var index = 0; // 相当于一个计时器，轮播一张图片index加1
    var timer = setInterval(function() {
        index++;
        // 移动距离
        var translatex = -index * w;
        // 给ul添加一个过渡效果，使用css3属性transition
        ul.style.transition = 'all .3s';
        // 将ul的css属性transform 里面的值替换为 ul 的移动距离
        ul.style.transform = 'translateX(' + translatex + 'px)'; //translate不用加移动
     }, 2000)
    // 等着图片滚动完毕再去判断， 监听过渡完成的事件 transitionend ul 做过渡效果
    ul.addEventListener('transitionend',function(){
        // 无缝滚动 判断条件：如果索引号等于3说明走到了最后，此时索引号要复原为0
        if(index >= 3){
           index = 0; // 复原索引号
           ul.style.transition = 'none'; // 去掉过渡效果，这样让我们的ul 快速的跳到目标位置
           var translatex = -index * w; //因为图片还要继续滚动，按照最新的索引号去滚动图片，所以重新计算移动距离
           ul.style.transform = 'translateX(' + translatex + 'px)'; 
        }else if(index < 0){ // 如果索引号小于0，说明是倒着走的
           index = 2;
           index = 0; // 复原索引号
           ul.style.transition = 'none'; // 去掉过渡效果，这样让我们的ul 快速的跳到目标位置
           var translatex = -index * w; //因为图片还要继续滚动，按照最新的索引号去滚动图片，所以重新计算移动距离
           ul.style.transform = 'translateX(' + translatex + 'px)'; 
        } 

        // 3. 小圆点跟随图片变化
        // 先把ol里面li带有current类名的选出来去掉类名 remove
           ol.querySelector('.current').classList.remove('remove');
        // 让当前索引号的小li 加上 current add 
        ol.children[index].classList.add('current') // index就是当前的张数
    });

    // 4. 手指滑动轮播图
    //  触摸元素 touchstart: 获取手指的初始坐标，
    var startX = 0; //获取手指的初始x坐标
    var moveX = 0; // 手指移动的距离
    var flag = false; // 当用户没有实现拖动效果，就不需要设置别的属性
    ul.addEventListener('touchstart',function(e){
        // 手指的初始坐标
        startX = e.targetTouches[0].pageX; // e.targetTouches 正在触摸当前DOM元素上的手指的一个列表
        // 手指触摸就停止定时器
        clearInterval(timer);              
    });

    //  移动手指 touchmove: 计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove',function(e){
        // 计算手指的移动距离 = 手指移动之后的坐标 — 手指初始坐标
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子：盒子应该走到的位置 = 盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + moveX; //盒子要移动的位置
        // 手指拖动的时候不需要动画效果，所以要取消过渡效果
        ul.style.transition = 'none';
        // 移动
        ul.style.transform = 'translateX(' + translatex + 'px)'; 
        flag = true; // 如果用户手指移动过我们再去判断否则不做判断效果
        e.preventDefault(); // 阻止滚动屏幕默认行为
    });
    // 手指离开 根据移动距离去判断是回弹还是播放上一张下一张
    ul.addEventListener('touchend',function(e){
       if(flag){
            // 如果移动距离大于50像素我们就播放上一张或者下一张
        if(Math.abs(moveX) > 50){
            //如果是右划就是 播放上一张 moveX是正值
            
            if(moveX > 0){
                index--;
            }else{
                //如果是左划就是 播放下一张 moveX是负值
                index++;
            }
            // 移动距离
            var translatex = -index * w; // 应该要移动的距离
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)'; 
        }else {
           //  如果移动距离小于50像素,就回弹
           var translatex = -index * w; 
           ul.style.transition = 'all .1s';
           ul.style.transform = 'translateX(' + translatex + 'px)'; 
        }
       }
        // 手指离开的时候就重新开启定时器
        clearInterval(timer); // 开启之前先清除定时器，这样就能保障我们整个页面就只有一个定时器
        timer = setInterval(function(){
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)'; 
        },2000)
    });
    // 返回顶部模块
    var goBock = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll',function() {
        if(window.pageYOffset >= nav.offsetTop){ // 距离顶部的距离
            goBock.style.display = 'block';
        } else {
            goBock.style.display = 'none';
        }
    });
    goBock.addEventListener('click',function() {
        window.scroll(0,0);//返回顶部
    })
})