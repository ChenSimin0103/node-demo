const mongoose = require('mongoose')

// 引入方法函数
// const findCourse = require('./solution/solution1')
// const solution2 = require('./solution/solution2')
// const getCoursesByPrice = solution2.getCoursesByPrice
// const solution3 = require('./solution/solution3')
// const getCoursesByBy = solution3.getCoursesByBy

// 连接到mongodb数据库
mongoose.connect('mongodb://localhost/mongo-exercise1', { useNewUrlParser: true })
    .then(() => console.log('数据库已连接'))
    .catch((err => { console.error('连接不到数据库', err) }))

// 创建数据模式 schema 也就是数据规则； 1. 配置这个规则很重要 也就是构建时的校验
// 对于required，注意：mongodb doesn't care what the data should be，只有在mongoose中做校验
const courseSchema = new mongoose.Schema({
    // _id: String,
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        // match: /ss/
    },

    author: {
        type: String,
        // 2. 定制化的校验： 处理更多的校验规则
        validate: {
            // 3. 异步校验：可以实现不在本地做校验
            isAsync: true,
            validator: function (val, callback) {
                setTimeout(()=>{
                    const result = val.length > 3 && Math.random() > 0.5
                    callback(result)
                }, 4000)
                // 返回的是使得检验通过的条件
            },
            message: '长度应大于3'
        }
    },
    tags: {
        type: String,
        // 属性枚举值，指定枚举范围
        enum: [['node', 'front'], 'node', 'frontend', 'backend']
    },
    date: { type: Date, default: Date.now() },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            // 属性之间相互关联：price 与 isPublished 相关
            return this.isPublished
        }
    },
})

// 创建课程类
const Course = mongoose.model('Course', courseSchema)
async function createCourse() {
    const course = new Course({
        name: 'nodejs and mongoose',
        author: 'simin',
        tags: ['node'],
        isPublished: true,
        price: 777
    })
    // 在async函数中使用try-catch捕获异步操作的异常，相当于promise里的 .catch()
    try {
        // 注意：course.validate() 返回的是空的promise对象，所以校验成功的逻辑要放在回调函数中
        // console.log(course.validate());
        const result = await course.save()
        console.log(result);
    }
    catch (err) {
        // 对错误信息校验
        console.log(err.message);
    }
}

// update database
async function updateCourse(id) {
    // console.log(Course)
    // const course = await Course.findById(id)
    const result = await Course.findByIdAndUpdate({ _id: id }, {
        // update operateors
        $set: {
            author: 'simin0103',
            isPublished: false
        }
    }, { new: true })

    console.log(result);

    // const re = await Course
    // .find({ tags: 'backend' })
    // console.log(re);
}

// delate database
async function deleteCourse(id) {
    // const result = await Course.deleteOne({_id: id})
    const course = await Course.findByIdAndRemove(id)
    console.log(course);

}

async function run() {
    // const course = await findCourse()
    // console.log(course);
    // const course = await getCoursesByPrice()
    // console.log(course);
    // const course = await getCoursesByBy()
    // console.log(course);
    // updateCourse("5a68ff090c553064a218a547")
    // deleteCourse("5c17907e3fb9044f94eb78c1")

    createCourse()
}

run()




