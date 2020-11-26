<template>
  <div>
    <h3>当前count值为：{{count}}{{params}}</h3>
    <button @click="subheader">-1</button>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState,mapMutations} from 'vuex'
  export default {
    data () {
      return {

      }
    },
    computed:{
      ...mapState(['count','params'])
    },
    methods:{
      ...mapMutations(['sub']),
      subheader(){
        this.sub()
      }
    }
  }
</script>

<style scoped>


</style>
