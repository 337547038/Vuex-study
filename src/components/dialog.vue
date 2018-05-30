<!--Created by 337547038 on 2018/5/30.-->
<template>
    <div class="dialog" v-if="show">dialog</div>
</template>
<script>
    export default {
        name: 'dia',
        data () {
            return {}
        },
        props: ['show'],
        components: {},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>
<style>
    .dialog{background: #f60;padding: 10px;}
</style>