import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count:0,
    params:''
  },
  mutations: {
    getParams(state,param){
      state.params=param
    },
    add(state){
      state.count++
    },
    addN(state,num){
      state.count+=num
    },
    sub(state){
      state.count--
    }
  },
  actions: {
    addsync(context){
      setTimeout(() => {
        context.commit('add')
      }, 5000);
    }
  },
  getters: {
    shouNum:state=>{
      return '当前count值：【'+state.count+'】'
    }
  }
})
