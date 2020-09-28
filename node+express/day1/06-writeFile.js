const fs = require('fs');

fs.writeFile('./demo.txt','写入的内容哈哈哈哈',err => {
    if(err != null) { // 不为空
        console.log(err);
        return;
    }
    
    console.log('文件内容写入成功');
})