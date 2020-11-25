import { subset } from 'semver'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    count:0
  },
  mutations: {
    add(state){
      state.count++
    },
    addN(state,spet){
      state.count +=spet
    },
    sub(state){
      state.count--
    },
    subN(state,spet){
      state.count -=spet
    }
  },
  actions:{
    addsync(context){
      setTimeout(() => {
        context.commit('add')
      }, 2000);
    }
  },
  getters: {
    shouNum:state=>{
      return '当前count值：【'+state.count +'】'
    }
  }
})
