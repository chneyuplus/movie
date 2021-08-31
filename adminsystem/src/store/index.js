import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      user: {},
      allData: [],//定义原始总数据
      menuData: [],//定义当前页显示的数据
      show: false,//控制弹框进行显示的
      totle: 0,//记录总条数的
   },
   mutations: {
      updateUser(state, info) {
         state.user = info;
      },
      updateAll(state, msg) {
         state.allData = msg;
         state.totle = state.allData.length;
      },
      updatemenuData(state, msg) {
         state.menuData = msg;
         state.totle = state.menuData.length;
      },
      changeShow(state, msg) {
         state.show = msg;
      },
      updatetotle(state, msg) {
         state.totle = msg;
      }
   },
   getters: {
      getUserInfo: state => {
         return state.user;
      },
      getMenuData: state => {
         return state.menuData;
      },
      getShow: state => {
         return state.show;
      },
      getTotle: state => {
         return state.totle;
      }
   },
   actions: {
      updateUserInfo({ commit }, prop) {
         commit('updateUser', prop);
      },
   },
})
