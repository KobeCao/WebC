// var that; // 声明一个全局变量
class Tab {
    constructor(id) { // constructor可以接收传递过来的参数
       // 获取相应的元素
       // that = this; // 赋值给全局变量that
       this.main = document.querySelector(id); //将最大盒子的id拿过来,里面有四个功能
       this.add = this.main.querySelector(".tabadd");
       // li的父元素
       this.ul = this.main.querySelector(".fisrstnav ul:first-child"); //ul:first-child选取ul的第一个孩子
       // section 的父元素
       this.fsection = this.main.querySelector(".tabscon");
       this.init(); // 只要new了tab元素,就会自动调用constructor,
    }
    init() { // 页面一加载，给所有的元素绑定事件
        this.updateNode(); // 页面一调用就去调用我们updateNode()这个方法。
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab.bind(this.add,this); 
        for(var i = 0; i < this.lis.length;i++) {
            this.lis[i].index = i; // 给每一个小li都添加一个属性index,这个属性里面存着我当前小li里面的索引号
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i],this);  // this.lis[i] 当前的这个li 里面的this没有改变指向
            // 把constructor里面的this当做一个实参传递给了我们函数，这个函数接收过来之后里面存的就是constructor里面的this。
            // 给每一个删除按钮都要绑定一个点击事件
            this.remove[i].onclick = this.removeTab.bind(this.lis[i],this); //调用函数之后，拿到当前的索引号。当前remove[i]没有索引号，但是它的爸爸有
            this.spans[i].ondblclick = this.editTab; // 给每一个span添加一个双击事件
            this.sections[i].ondblclick = this.editTab; // 给每一个sections绑定一个双击事件

        }
    }  
    // 因为我们动态添加元素 需要从新获取对应的元素
    updateNode() {
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll('section');
        // 将(删除按钮)x号获取过来，将remove写到updateNode()里面，就能和li个数保持一致
        this.remove = this.main.querySelectorAll(".icon-guanbi"); // 因为updateNode()会更新，只要新增一个关闭按钮，就会重新获取一次
        // 获取所有Li里面的span
        this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child");
    }
    // 1. 具有切换功能
    toggleTab(that) { // 里面的that存的就是constructor 里面的this
        // console.log(this.index); // 这里的this让lis[i]调用了
        that.clearClass(); // 不能使用this是因为toggleTab()里面的this指向的是lis[i],每个小li不能直接调用这个类，而是实例对象调用这个方法。
        this.className = 'liactive'; //点击谁谁就添加这个liactive类
        // 因为这里的this指向的是lis[i],lis[i]没有这个sections属性,
        // 所以 sections应该指向的是constructor 里面的this,不是toggleTab()里面的this。
        // 可以利用提前声明的that,因为that里面声明的是constructor里面的this
        that.sections[this.index].className = 'conactive'; 
    }
    // 清除所有li 和section 的类
    clearClass() { 
        // clearClass()是that来调用的，而that是我们constructor里面的this,所以clearClass里面的this没有问题
        for(var i = 0;i < this.lis.length;i++) {
            this.lis[i].className = ''; // 清除类
            this.sections[i].className = '';
        }
    }
    // 2. 具有添加功能
    addTab(that) {
        that.clearClass(); // 调用clearClass()函数，在每次生成新的时候，将以前的所有li和section清除
        // (1) 创建Li元素和section元素
        var random = Math.random(); // 生成随机数 
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        // 创建section元素
        var section = '<section class="conactive">测试'+ random+'</section>';
        // (2) 把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend',li); // insertAdjacentHTML就是 将li这个字符串追加到我们父元素的最后面
        that.fsection.insertAdjacentHTML('beforeend',section);
        that.init(); 
        // 在最后再去调用init()->去上面寻找 init()方法 -> 然后第一句话就是 this.updateNode();先获取所有的Li -> 
        // 然后给这四个小li再绑定一个点击事件。解决后面添加的元素没有点击事件的问题。

    }
    // 3. 具有删除功能
    removeTab(that,e) { // 给函数添加事件对象
        e.stopPropagation(); // 阻止冒泡 防止触发li 的切换点击事件
        var index = this.parentNode.index; // 拿到这个关闭按钮的parentNode(爸爸)的索引号
        console.log(index);
        // 根据索引号删除对应的Li 和section
        that.lis[index].remove();  // remove()方法可以直接删除指定的元素
        that.sections[index].remove();
        that.init(); // 重新获取删除完剩下的最新的个数
        // 当我们删除的不是选中状态的li 的时候，原来的选中状态保持不变
        if(document.querySelector('.liactive')) return; // 如果剩下的li有处于选中状态 直接return
        // 当我们删除了选定状态的这个li 的时候，让它的前一个li 处于选定状态
        index--;
        // 手动调用我们的点击事件 不需要鼠标触发
        that.lis[index] && that.lis[index].click(); // 当index变成-1的时候，没有删除按钮了，假的就不在执行点击事件了
    }
    // 4.  具有修改功能
    editTab() {
        var str = this.innerHTML; // 在双击之前先获取之前的文字
       // 双击禁止选中文字
       window.getSelection ? window.getSelection().removeAllRanges() : document.Selection.empty();
       // 双击生成一个文本框
       this.innerHTML = '<input type="text" />';
       var input = this.children[0]; // 拿到input
       input.value = str; //将原先span里面的文字再赋值给我们这些文本框
       input.select(); // 让文本框里面的文字处于选定状态
       // 当我们离开文本框就把文本框里面的值给span
       input.onblur = function() {
           // this.value = 文本框的值
           this.parentNode.innerHTML = this.value; //将表单里面最新的值给到span
       };
       // 按下回车也可以把文本框里面的值给span
       input.onkeyup = function(e) {
           if(e.keyCode === 13) {
               this.blur(); // 手动调用表单失去焦点事件  不需要鼠标离开操作
           }
       }
    }
}
new Tab('#tab');
