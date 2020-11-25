<template>
  <div>
    <h3>{{shouNum}}</h3>
    <button @click="addheader">+1</button>
    <button @click="addheader1">+N</button>
    <button @click="addheader2">+sync</button>
  </div>
</template>

<script type="text/ecmascript-6">
import{mapState,mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    data () {
      return {

      }
    },
    computed:{
      ...mapState(['count']),
      ...mapGetters(['shouNum'])
    },
    methods:{
      ...mapMutations(['add','addN']),
      ...mapActions(['addsync']),
      addheader(){
        this.add()
      },
      addheader1(){
        this.addN(2)
      },
      addheader2(){
        this.addsync()
      }
    }
  }
</script>

<style  scoped>


</style>
