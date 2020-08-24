window.addEventListener('load', function () {  // 等页面加载完毕之后再执行我们js文件
    // 1. 获取元素
    var arrow_1 = document.querySelector('.arrow-l'); //左侧按钮
    var arrow_r = document.querySelector('.arrow-r'); // 右侧按钮
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth; //图片的宽度
    // 2.当鼠标经过focus盒子，显示左右两侧按钮
    focus.addEventListener('mouseenter', function () {
        arrow_1.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    })
    //当鼠标离开focus盒子，隐藏左右两侧按钮
    focus.addEventListener('mouseleave', function () {
        arrow_1.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    })
    // 3. 动态生成小圆圈，有几张图片，就生成几个小圆圈
    // 获取元素
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    //首先利用for得到 focus 里面 ul 里面图片的张数(也就是li的个数)，
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做(给每个li绑定一个自定义属性index，得到当前索引号)
        li.setAttribute('index', i),
            // 把循环后的li插入到 ol 里面，得到和 for 循环相应的结果，生成小圈圈 
            ol.appendChild(li);
        // 4. 小圆圈的排他思想，我们直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 先清除所有的ol里面小li的 current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 然后给当前小 li 设置 current 类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul
            // ul的移动距离 = 小圆圈的索引号 * 图片的宽度(图片往左走就是负值)
            // 当我们点击了某个小li 就拿到当前小 li 的索引号
            var index = this.getAttribute('index');
            //  当我们点击了某个小 li 就要把这个 li 的索引号给 num
            num = index;
            //  当我们点击了某个小 li 就要把这个 li 的索引号给 circle
            circle = index;
            // var focusWidth = focus.offsetWidth; //图片的宽度
            console.log(focusWidth); // 输出图片的宽度
            console.log(index); // 输出索引号
            animate(ul, -index * focusWidth); // 引用animate函数

        })
    }
    // 把 ol 里面的第一个小li 设置类名为 current(背景为白色)
    ol.children[0].className = 'current';
    // 6. 克隆第一张照片(li)放到ul 最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(li);
    // 7. 点击右侧按钮，图片滚动一张，控制的是图片下一张的播放
    var num = 0;
    // circle = 0; 控制小圆圈的播放
    var circle = 0;
    // 节流阀
    var flag = true;
    // 右侧按钮
    arrow_r.addEventListener('click', function () {
        if (flag = true) {
            flag = false; //关闭节流阀
            // 如果走到了最后的一张图片，此时，我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth,function(){
                flag = true;
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化，再声明一个变量控制小圆圈的播放 
            circle++;
            // 如果circle == 4 就说明走到我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 先清除其余小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前 的小圆圈的current类名
            ol.children[circle].className = 'current';
        }
    });

    // 左侧按钮
    arrow_1.addEventListener('click', function () {
        if (flag = true) {
            flag = false;
            // 如果走到了最后的一张图片，此时，我们的ul 要快速复原 left 改为 0
        if (num == ul.children.length - 1) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -num * focusWidth,function(){ 
            flag = true; // 打开节流阀
        });
        //  点击左侧按钮，小圆圈跟随一起变化，再声明一个变量控制小圆圈的播放 
        circle--;
        // 如果circle < 0,就说明第一张图片 则小圆圈要改为第四个小圆圈(3)
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        // 也可以将上面if()判断写成三元表达式 circle = circle < 0 ? ol.children.length - 1:circle
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前 的小圆圈的current类名
        ol.children[circle].className = 'current';
        }
    });
    //可以将相同的内容封装成一个函数 直接调用circleChange()
    // function circleChange(){
    //     for(var i = 0; i < ol.children.length;i++){
    //         ol.children[i].className = '';
    //     }
    //     // 留下当前 的小圆圈的current类名
    //     ol.children[circle].className = 'current'; 
    // }
    // 10. 自动播放轮播图
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
})