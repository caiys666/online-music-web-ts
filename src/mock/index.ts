const Mock = require('mockjs')
const data = {
  id: '@guid',
  name: '@cname'
}

Mock.mock('/api/test', 'post', data)

export default Mock
