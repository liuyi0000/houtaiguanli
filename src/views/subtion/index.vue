<template>
  <div>
    <h3>当前count值:{{count}}</h3>
    <button @click="sunheader">-1</button>
    <button @click="sunheader1">-N</button>

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
      ...mapState(['count'])
    },
    methods:{
      ...mapMutations(['sub','subN']),
      sunheader(){
        this.sub()
      },
      sunheader1(){
        this.subN(2)
      }
    }
  }
</script>

<style  scoped>


</style>
