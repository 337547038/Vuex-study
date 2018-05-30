/**
 * Created by 337547038 on 2018/5/30.
 */
import {SWITCH_DIALOG,SOME_MUTATION} from './mutation-types'
export default {
    /*switch_dialog(state){//这里的state对应着上面这个state
        state.show = !state.show;
        //你还可以在这里执行其他的操作改变state
    }*/
    //引入mutation-types后，上面的方法就可以修改成
    [SWITCH_DIALOG](state){//这里的state对应着上面这个state
        state.show = !state.show;
        //你还可以在这里执行其他的操作改变state
    }
}