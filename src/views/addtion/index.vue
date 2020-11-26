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
        num:'默认',
        mm:'改变了'
      }
    },
    computed:{
      ...mapState(['count']),
      ...mapGetters(['shouNum'])
    },
    methods:{
      ...mapMutations(['add','addN','getParams']),
      ...mapActions(['addsync']),
      addheader(){
        this.add()
        let dddddd =this.mm
        this.$store.commit('getParams',dddddd)
      },
      addheader1(){
        this.addN(2)
      },
      addheader2(){
        this.addsync()
      }
    },
    mounted(){
      let param=this.num
        this.$store.commit('getParams',param)
    }
  }
</script>

<style  scoped>


</style>
