const mongoose = require('mongoose')

// 链接数据库
// mongoose.connect('mongodb://localhost/mongo-exercise1', { useNewUrlParser: true })
//     .then(() => { console.log('数据库已连接') })
//     .catch(err => { console.log('连接失败' + err) })

// // 创建schema 
// const courseSchema = new mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [String],
//     date: { type: Date, default: Date.now() },
//     isPublished: Boolean,
//     price: Number,
// })

// // 对象的原型 Model 数据库对象
// const Course = mongoose.model('Course', courseSc hema)

// 查找
async function findCourse() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1})
        .select({ name: 1, author: 1})
}

module.exports.findCourse = findCourse


