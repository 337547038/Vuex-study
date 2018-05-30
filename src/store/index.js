/**
 * Created by 337547038 on 2018/5/30.
 */
import Vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import dialog_store from '../components/dialog_store'
Vue.use(vuex);
export default new vuex.Store({
    state:{
        show:false
    },
    getters,
    mutations,
    actions,
    modules:{
        dialog: dialog_store
    }
})
