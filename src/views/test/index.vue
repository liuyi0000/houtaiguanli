<template>
  <div>
    <tableOne
      :tableConfig="tableConfig"
      :tableData="tableData"
    ></tableOne>
    <addtion></addtion>
    <subtion></subtion>
  </div>
</template>

<script type="text/ecmascript-6">
import tableOne from '../../components/TableOne'
import addtion from '../addtion/index'
import subtion from '../subtion/index'
  export default {
    components:{
      tableOne,
      addtion,
      subtion
    },
    data () {
      return {
        tableConfig:[{
          prop:'name',
          label:'书名',
          type:'text',
        },{
          prop:'age',
          label:'作者',
          type:'text'
        },{
          prop:'time',
          label:'时间',
          type:'text'
        },{
          prop:'moom',
          label:'详情',
          type:'route'
        }],
        tableData:[
          {name:'再别康桥',
          age:'徐志摩',
          time:'1980-9-11',
          moom:'详情'
          }
        ]
      }
    }
  }
</script>

<style  scoped>


</style>
