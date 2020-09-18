window.onload = function() {
    var regTel = /^1[3|4|5|7|8]\d{8}/;  //手机号码的正则表达式
    var regQQ = /^[1-9]\d{4,}$/  // qq号的正则表达式
    var regNc = /^[\u4e00-\u9fa5]{0,}$/ // 昵称的正则表达式
    var regMsg = /^\d{6}$/; // 短信验证码的正则表达式
    var regPwd = /^[a-z-Z0-9_-]{6,16}$/; // 密码的正则表达式

    // 获取元素
    var tel = document.querySelector('#tel'); 
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var surePwd = document.querySelector('#surepwd');
    
    // 调用
    regexp(tel,regTel); // 手机号码调用
    regexp(qq,regQQ); // qq号码调用
    regexp(nc,regNc); // 昵称的调用
    regexp(msg,regMsg); // 短信验证码的调用
    regexp(pwd,regPwd); // 密码的调用


    // 表单验证的函数    
    function regexp(ele,reg) { // ele 给哪一个元素进行验证， reg 正则表达式的值是什么。
        ele.onblur = function() {
            if(reg.test(this.value)) {
                // console.log('正确的');
                this.nextElementSibling.className = 'success'; 
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确'; // 提示正确的消息
            }else {
                // console.log('错误的');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请从新输入';
            }
        }
    
    };
    surePwd.onblur = function() {
        if(this.value == pwd.value) {
            this.nextElementSibling.className = 'success'; 
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 密码正确'; 
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码密码不正确，请从新输入';
        }
    }
}