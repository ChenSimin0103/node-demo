const mongoose = require('mongoose')
// 创建schema 
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    price: Number,
})

// 对象的原型 Model 数据库对象
const Course = mongoose.model('Course', courseSchema)

// 需求：找出所有课程：价格大于等于15，名字里有by (大小写通配)
async function getCoursesByBy() {
    return await Course
        .find({name: /.*by.*/i, price: {$gte: 12}})
}

module.exports = {getCoursesByBy}