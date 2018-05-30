<template>
    <div class="demo">
        <h1>在vue-cli中使用vuex学习笔记</h1>
        <div>
            <p>示例以一个对话框为例子，首先新增dialog.vue组件，代码如下</p>
            <pre>&lt;template>
    &lt;div class="dialog" v-if="show">dialog content&lt;/div>
&lt;/template>
&lt;script>
    export default {
        data () {
            return {}
        },
        props: ['show'],
    }
&lt;/script></pre>
            <p>很简单的一个例子，通过参数show来显示或隐藏</p>
            <p>正常情况我们都这么使用：</p>
            <pre>&lt;dialog :show="showDialog">&lt;/dialog>
&lt;a href="javascript:;" @click="showDialog=true">点击显示&lt;/a></pre>
            <p>点击a标签是就能够显示了</p>
            <vDialog :show="showDialog"></vDialog>
            <p><a href="javascript:;" @click="showDialog=true">点击显示</a></p>
        </div>
        <div>
            <h2>安装、使用vuex</h2>
            <p>首先是在开发环境中安装vuex</p>
            <pre>npm install vuex --save</pre>
            <p>根据官方推荐的写法，当然也是为了团队成员和便于日后的维护，更容易让团队成员看清楚明白。</p>
            <p>2.在src下新建文件夹store，然后分别新建文件index.js，getters.js，mutations.js，mutation-types.js，action.js；</p>
            <p>3.index.js作为入口，代码如下：</p>
        <pre>import Vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
Vue.use(vuex);
export default new vuex.Store({
    state:{
        show:false//定义一个变量
    },
    getters,
    mutations,
    actions
})</pre>
            <p>相应的，在实例化Vue对象时加入store对象，将main.js里的代码修改2个地方如下：</p>
        <pre>import store from './store' //1.import进来
new Vue({
  el: '#app',
  router,
  store,//2.使用store
  template: '&lt;App/>',
  components: { App }
})</pre>
            <p>完成以上步骤，就可以在页面中通过 $store.state.show （要使用双大括号）输入前面设置的show了，值为：{{$store.state.show}}</p>
            <pre>{ { $store.state.show } }</pre>
            <p>或者是在mounted里使用 this.$store.state.show 输出</p>
        <pre>
            mounted(){
            console.log(this.$store.state.show);
            }</pre>
            <p>到这里为止，已经能够设置和输出相对应的值了，如果我们要将show的值修改成true，那该怎么办？这个时候就该到mutations出场了。</p>
        </div>
        <div>
            <h2>Mutations</h2>
            <p>官方文档是这么说的：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type)
                和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数</p>
            <p>1.在mutations.js加入如下代码</p>
            <pre>switch_dialog(state){//这里的state对应着上面index.js里的state
        state.show = !state.show;
        //你还可以在这里执行其他的操作改变state
    }</pre>
            <p>使用 $store.commit('switch_dialog') 来触发 mutations 中的 switch_dialog 方法。</p>
            <p>将示例修改如下：</p>
            <pre>&lt;vDialog :show="$store.state.show">&lt;/vDialog>
&lt;a href="javascript:;" @click="$store.commit('switch_dialog')">点击显示&lt;/a></pre>
            <p><a href="javascript:;" @click="$store.commit('switch_dialog')">点击显示/隐藏</a></p>
            <vDialog :show="$store.state.show"></vDialog>
            <p>这里需要注意的是：</p>
            <p>mutations 中的方法是不分组件的，$store.commit('switch_dialog') 会执行所有的 switch_dialog 方法</p>
            <h3>使用常量替代 Mutation 事件类型</h3>
            <p>官方文档这么说：</p>
            <p>使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的
                mutation 一目了然。用不用常量取决于你——在需要多人协作的大型项目中，这会很有帮助。但如果你不喜欢，你完全可以不这样做</p>
            <p>mutation-types.js加入代码：</p>
            <pre>export const SWITCH_DIALOG = 'switch_dialog'
export const SOME_MUTATION = 'SOME_MUTATION'</pre>
            <p>mutation中引入mutation-types后，原来mutation中的switch_dialog方法就可以修改成</p>
            <pre>[SWITCH_DIALOG](state){//这里的state对应着上面这个state
        state.show = !state.show;
        //你还可以在这里执行其他的操作改变state
    }</pre>
        </div>
        <div>
            <h2>Action</h2>
            <p>Action 类似于 mutation，不同在于：</p>
            <p>1.Action 提交的是 mutation，而不是直接变更状态。</p>
            <p>2.Action 可以包含任意异步操作。</p>
            <p>在action.js中加入如下代码：</p>
            <pre>switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
        context.commit('switch_dialog');
        //你还可以在这里触发其他的mutations方法
    }</pre>
            <p>使用 $store.dispatch('switch_dialog') 来触发 action 中的 switch_dialog 方法</p>
            <p><a href="javascript:;" @click="$store.dispatch('switch_dialog')">点击显示/隐藏</a></p>
        </div>
        <div>
            <h2>Getters</h2>
            <p>getters 和 vue 中的 computed 类似 , 都是用来计算 state 然后生成新的数据 ( 状态 ) 的。</p>
            <p>假如我们需要一个与状态 show 刚好相反的状态 , 使用 vue 中的 computed 可以这样算出来：</p>
            <pre>computed(){
    hide(){
        return !this.$store.state.show;
    }
}</pre>
            <p>换成getters，我们可以这么写，在getters.js中写入如下代码：</p>
            <pre>hide(state){//这里的state对应着上面这个state
        return !state.show;
    }</pre>
            <p>我们在组件中使用 $store.state.show 来获得状态 show , 类似的 , 我们可以使用 $store.getters.hide 来获得状态 hide
                。值为：{{$store.getters.hide}}</p>
            <p>注意 : $store.getters.hide 的值是不能直接修改的 , 需要对应的 state 发生变化才能修改。</p>
        </div>
        <div>
            <h2>Modules</h2>
            <p>
                前面我们在index.js里设置的show，无论是在哪个组件都是可以使用到$store.state.show，如果组件多了，状态也多了；这么一来所有的状态都在store文件下的index.js不好维护怎么办？</p>
            <p>我们可以使用 vuex 的 modules , 将组件的store分开来，如新建一个文件dialog_store.js</p>
            <pre>export default {
    state:{
        show:false
    }
}</pre>
            <p>然后在index.js里引入，添加modules内容</p>
            <pre>export default new vuex.Store({
    modules: {
        dialog: dialog_store
    }
})</pre>
            <p>完成以上修改时，我们将之前我们使用的 $store.state.show 改为 $store.state.dialog.show 即可。值为：{{$store.state.dialog.show}}</p>
        </div>
        <div>
            <h2>mapState、mapGetters、mapActions</h2>
            <p>很多时候 , $store.state.dialog.show 、$store.dispatch('switch_dialog') 这种写法又长又臭 , 很不方便 , 我们没使用 vuex 的时候 , 获取一个状态只需要 this.show , 执行一个方法只需要 this.switch_dialog 就行了 , 使用 vuex 使写法变复杂了 ?</p>
            <p>使用 mapState、mapGetters、mapActions 就不会这么复杂了。</p>
            <pre>import {mapState} from 'vuex';
export default {
  computed:{
    //这里的三点叫做 : 扩展运算符
    ...mapState({
      show:state=>state.dialog.show
    }),
  }
}</pre>
            <p>相当于：</p>
            <pre>import {mapState} from 'vuex';
export default {
  computed:{
    show(){
        return this.$store.state.dialog.show;
    }
  }
}</pre>
            <p>mapGetters、mapActions 和 mapState 类似 , mapGetters 一般也写在 computed 中 , mapActions 一般写在 methods 中</p>
        </div>
    </div>
</template>
<script>
    import vDialog from './dialog.vue'
    export default {
        name: 'HelloWorld',
        data () {
            return {
                showDialog: false
            }
        },
        components: {vDialog}
    }
</script>
<style>
    body{ font-size: 16px; line-height: 30px; color: #333 }
    h1{ text-align: center; }
    .demo{ margin: 0 30px; }
    h2{ font-size: 20px; border-bottom: 1px solid #ddd; }
    h3{ font-size: 18px; }
    pre{ background: #F6F6F6; padding: 5px 10px }
</style>