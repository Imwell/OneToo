import axios from "axios";
import qs from "qs";

export const getName = () => axios({
  method: 'get',
  url: '/company/getNames'
})

export const addOrder = () => axios({
  method: 'post',
  url: '/order/add',
  data: this.form,
})

export const selectByCategoryId = (params) => axios({
  url: '/dish/selectbycategoryid',
  method: 'get',
  params: params
})

export const displayCategory = () => axios({
  url: '/category/displaycategory',
  method: 'get'
})

export const addCart = (dish) => axios({
  method: 'post',
  url: '/shoppingCart/add',
  data: dish
})

export const showCart = (params) => axios({
  method: 'get',
  url: '/shoppingCart/show',
  params: params
})

export const reduceCart = (cart) => axios({
  method: 'post',
  url: '/shoppingCart/reduce',
  data: cart
})

export const clearCart = (params) => axios({
  method:'get',
  url:'shoppingCart/clearCart',
  params: params
})

export const logout = () => axios({
  url: '/member/logout',
  method: 'get',
})

export const getOrder = () => axios({
  method:'get',
  url:'/order/select'
})

export const getOrderDetail = (params) => axios({
  method:'get',
  url:'/orderDetail/select',
  params: params,
  paramsSerializer: params => {
    return qs.stringify(params, {indices: false})
  }
})

export const receiptOrder = (order) => axios({
  method: 'post',
  url: '/order/updateOrder',
  data: order
})

export const cancelOrder = (order) => axios({
  method: 'post',
  url: '/order/updateOrder',
  data: order
})

export const forgetPwd = (form) => axios({
  url: '/member/findpassword',
  method: 'post',
  data: form
})

export const register = (data) => axios({
  url: '/member/register',
  method:'post',
  data: data
})

export const login = (data) => axios({
  url: '/member/login',
  method: 'post',
  data: data
})
