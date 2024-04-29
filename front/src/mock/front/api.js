const mock = require('mockjs')
const {getUserId} = require("@/util/user");

mock.setup({
  timeout: 400
})

mock.mock('/api/company/getNames', 'get', {
  code: 200,
  msg: 'success',
  data: [mock.Random.name()]
})

mock.mock('/api/order/add', 'post', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock(RegExp('/api/dish/selectbycategoryid' +'.*'), 'get', {
  code: 200,
  msg: 'success',
  'data|5-8': [
    {
      id: '@integer(1,100)',
      name: '@cname',
      categoryId: '@integer(1,100)',
      price: '@float(1, 100, 1, 2)',
      code: '@string(lower)',
      image: '@image(250x250)',
      description: '@string(pool,16)'
    }
  ]
})

mock.mock(RegExp('/api/category/displaycategory' + '.*'), 'get', {
  code: 200,
  msg: 'success',
  'data|5-8': [
    {
      id: '@integer(1,100)',
      name: '@cname',
    }
  ]
})

mock.mock('/api/shoppingCart/add', 'post', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock(RegExp('/api/shoppingCart/show' + '.*'), 'get', {
  code: 200,
  msg: 'success',
  'data|3-5': [
    {
      name: '@cname',
      image: '@image(100x100)',
      number: '@integer(1, 10)',
      price: '@integer(1, 4)',
    }
  ]
})

mock.mock('/api/shoppingCart/reduce', 'post', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock('/apishoppingCart/clearCart', 'get', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock('/api/member/logout', 'get', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock('/api/order/select', 'get', {
  code: 200,
  msg: 'success',
  'data|3-5': [
    {
      id: '@integer(1,100)',
      userId: getUserId(),
      number: '@integer(1,10)',
      status: '@integer(1,4)',
      orderTime: '@date("yyyy-MM-dd")',
      companyName: '@name',
      orderNo: 'sn' + '@integer(11)',
      amount: '@integer(1,100)'
    }
  ]
})

mock.mock(RegExp('/api/orderDetail/' + '*.'), 'get', {
  code: 200,
  msg: 'success',
  'data|5-8': [
    {
      id: '@integer(1,100)',
      userId: getUserId(),
      dishId: '@integer(1,100)',
      number: '@integer(1,100)',
      amount: '@integer(1,100)',
      name: '@cname',
      image: '@image(100x100)'
    }
  ]
})

mock.mock('/api/order/updateOrder', 'post', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock('/api/order/updateOrder', 'post', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock('/api/member/findpassword', 'post', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock('/api/member/register', 'get', {
  code: 200,
  msg: 'success',
  data: null
})

mock.mock('/api/member/login', 'post', {
  code: 200,
  msg: 'success',
  data: {
    id: '@integer(1, 100)',
    username: '@name',
    name: '@name',
    phone: '@integer(1, 16)',
    identity: 0,
    sex: '@character()',
    idNumber: '@integer()',
    money: '@integer(100, 500)',
  }
})
