// 创建
async function createCourse() {
    // 创建实例
    const course = new Course({
        name: 'vue',
        author: 'simin',
        tags: ['frontend'],
        isPublished: true
    })

    // 存入
    const result = await course.save()
    console.log(result);

}

module.exports.createCourse = createCourse