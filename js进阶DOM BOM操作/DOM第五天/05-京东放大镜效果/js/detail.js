// 1. 鼠标经过小图片小盒子，黄色的遮挡层 和 大图片盒子显示。离开隐藏2个盒子功能
window.addEventListener('load',function(){ //等页面加载完毕之后再执行js文件
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 当我们鼠标经过 preview_img 就 显示 和隐藏 mask 遮挡层 和 big 大盒子
    preview_img.addEventListener('mousemove',function(){ //鼠标进过显示
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout',function(){ // 鼠标离开就隐藏
        mask.style.display = 'none';
        big.style.display = 'none';
    })
// 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来移动
    preview_img.addEventListener('mousemove',function(e){
        // 先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft; //鼠标的坐标减去preview_img的坐标得到 x 的坐标
        var y = e.pageY - this.offsetTop;
        // 将计算出的坐标给黄色的遮挡层
        //让盒子向上走高度的一半，往左走宽度的一半，就能让鼠标的位置移到中间、
        // 我们 mask 移动的距离
        var maskX = x -mask.offsetWidth / 2;
        var maskY = y -mask.offsetHeight / 2 ;

        // 如果x 坐标小于了0 就让他停在 0 的位置 左边的是0
        var maskMax =  preview_img.offsetWidth- mask.offsetWidth; //移动距离
        if(maskX <= 0){
            maskX = 0;
        }else if(maskX >= maskMax ){ // 遮挡层的最大移动距离
            maskX = maskMax;
        }
        // 上下
        if(maskY <= 0){
            maskY = 0;
        }else if(maskY >= maskMax){
            maskY = maskMax;
        } 
        // 得到最终的maskX 和 maskY ，并且将值给 mask
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px'; 

        // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        // 大图
        var bigIMg = document.querySelector('.bigImg');
        // 大图片的最大移动距离
        var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离 X Y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';
    })
})