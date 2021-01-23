const Mock = require('mockjs')
const Random = Mock.Random
const data = {
  'list|10': [
    // 生成10条数据
    {
      'id|+1': 0, // id从0开始加1
      name: '@cname', // 姓名
      'age|18-28': 20, // 年龄
      'sex|1': ['男', '女'], //性别是数组中的一个，随机的
      email: '@email', // 邮箱
      'job|1': ['web', 'UI', 'python', 'php', 'java'], //工作是数组中的一个
      county: Random.county(true), // 随机地址  省市县
      zip: Random.zip(), // 随机邮编
      img: Random.image('200x100', Random.hex(), Random.first()), //随机获取图片
      date: Random.now('yyyy-MM-dd HH:mm:ss SS') // 时间
    }
  ]
}

Mock.mock('/api/test', 'post', data)

export default Mock
