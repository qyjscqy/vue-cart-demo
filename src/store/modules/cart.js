import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    getList (state, obj) {
      state.list = obj
    },
    updateList (state, obj) {
      const goods = state.list.find(item => item.id === obj.id)
      goods.count = obj.newCount
    }
  },
  actions: {
    async getList (cxt) {
      // const res = await axios.get('http://localhost:3000/cart')
      // console.log(res)
      // todo 为什么不直接赋值   state.list = res.data
      // cxt.commit('getList', res.data)
    },
    async updateList (cxt, obj) {
      console.log(obj)
      const res = await axios.patch('http://localhost:3000/cart/' + obj.id, { count: obj.newCount })
      console.log(res)

      cxt.commit('updateList', obj)
    }

  },
  // 计算属性
  getters: {
    total (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    totalPrice (state) {
      console.log(state)
      return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
    }
  }

}
