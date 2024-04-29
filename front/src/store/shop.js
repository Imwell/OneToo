import axios from "axios";

export default {
  namespaced: true,
  getters: {
    getActive(state) {
      return state.active
    }
  },
  actions: {
    async initShowCart(context) {
      await axios({
        method: 'get',
        url: '/shoppingCart/show',
        params: {
          userId: (JSON.parse(localStorage.getItem('userInfo'))).id
        }
      }).then(resp => {
        context.commit('INITS', resp.data.date)
      })
    },

  },
  mutations: {
    DISHDETAIL(state, value) {
      state.shopDetail = value
    },
    SHOW(state, value) {
      state.show1 = value
    },
    ORDERCARTS(state, value) {
      state.orderCarts = value
    },
    SHOPALL(state, value) {
      state.sum = value.sum
      state.shopCount = value.shopCount
    },
    SET_ACTIVE(state, value) {
      state.active = value
    }
  },
  state: {
    active: undefined,
    show1: false,
    changeimg: false,
    shopCount: 0,
    sum: 0,
    freesum: 20,
    shopDetail: [],
    orderCarts: []
  },


}
