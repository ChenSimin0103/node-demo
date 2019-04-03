const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => { console.log('mongodb 已连接') })
    .catch(err => { console.log('mongodb 连接失败') + err })

// 定义数据模型
const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    boi: String,
    website: String
}))
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String
}))

// 定义操作动作
async function createAuthor(name, boi, website) {
    const author = new Author(name, boi, website)
    const result = await author.save()
    console.log(result);
}
async function createCourse(name) {
    const course = new Course(name)
    const result = await course.save()
    console.log(result);
}
async function listCourses() {
    const course = await Course.find().select('name')
    console.log(course);
}

// 使用
createAuthor('simin', 'my bio', 'my website')

// createCourse()

// listCourses()