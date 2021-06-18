const Mock = require('mockjs')
const Random = Mock.Random
const data = {
  'list|10': [
    // 生成10条数据
    {
      'third_biz_no|+666': 0, // id从0开始加1
      org_name: '杭州家有孟母教育有限责任公司', // 姓名
      saler_name: '黄青青', // 年龄
      amount: 100, //性别是数组中的一个，随机的
      work_order_type: ['广告费', '服务费'], // 邮箱
      ads_platform_account_name: '孟母艺塾', //工作是数组中的一个
      total_advertising_days: ['30', '90', '180'],
      advertising_start_at: '2014-12-24',
      advertising_end_at: '2014-12-24',
      work_order_status: '收集开户资料',
      channel_owner_name: '姚梦婷',
      ads_account_opener_name: '骆铭',
      ads_designer_name: '李依婷',
      recent_communication_date: '2014-12-24'
      // 'county': Random.county(true), // 随机地址  省市县
      // zip: Random.zip(), // 随机邮编
      // img: Random.image('200x100', Random.hex(), Random.first()), //随机获取图片
      // date: Random.now('yyyy-MM-dd HH:mm:ss SS') // 时间
    }
  ]
}

Mock.mock('/api/test', 'post', data)

export default Mock
