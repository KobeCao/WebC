const mongoose = require('mongoose');
// 设定集学生集合合规则
const studentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 10,
        max: 25
    },
    sex: {
        type: String, 
    },
    email: String,
    hobbies: [String],
    collage: String,
    enterDate: {
        type: Date,
        default: Date.now
    }
});
//使用mongoose.model创建学生集合
const Student =  mongoose.model('Student',studentsSchema);

// 开放这个集合将学生信息集合导出
module.exports = Student;

