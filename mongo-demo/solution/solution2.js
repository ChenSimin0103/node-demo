// const mongoose = require('mongoose')
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
// const Course = mongoose.model('Course', courseSchema)

// 需求：在所有的frontend和backend课程中，以价格降序排列，展示课程名和作者
async function getCoursesByPrice() {
    console.log('done');
    return await Course
        .find({ tags: { $in: ['frontend', 'backend'] } }) // 注意这个或的条件怎么写
        .sort({ price: -1 })
        .select({ author: 1, name: 1, price: 1, tags: 1 })
}

module.exports = { getCoursesByPrice }