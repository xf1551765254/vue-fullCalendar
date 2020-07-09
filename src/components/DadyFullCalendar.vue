
<template>
  <div class="content">
      <div class="header">
        <div class="deaderLeft">
          {{dayDate}} 日程
        </div>
      </div>
      <div class="contenter" v-if="activities.length>0">
        <div>
          <el-timeline >
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
                :color="activity.color"
              :timestamp="activity.content">
              {{activity.timestamp}}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="nostate" v-else><span>没有数据</span></div>
  </div>
</template>

<script>
export default {
  name: 'DadyFullCalendar',
  components: {},
  props: {
    dayEvents: {
        type: Array,
        default:()=> []
    },
    dayDate:{
      type: String,
      default:''
    }
  },
  data () {
    return {
       activities: []
    }
  },
  methods: {
    
  },
  mounted () {},
  watch:{
    
    dayEvents: {
      // eslint-disable-next-line no-unused-vars
      handler (val, old) {
        let arr = []
        // eslint-disable-next-line no-unused-vars
        val.forEach(item =>{
          let obj={}
          obj.content=item.title
          obj.color=item.color
          if(item.className){
            let startDate = new Date(item.start)
            let endDate = new Date(item.end)
            let sartTime = startDate.format('hh:mm')
            let endTime = endDate.format('hh:mm')
            obj.timestamp=`${sartTime}~${endTime}`
          }else{
            obj.timestamp="00:00~24:00"
          }
          arr.push(obj)
        })
        this.activities=arr
      },
      deep: true  
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  height:100%;
  display: flex;
  flex-direction: column;
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding:5px;
    .deaderLeft{
      font-size: 16px;  
    }
    background-color: #fff;
    border-bottom:1px solid #DCDFE6;  
  }
  .contenter{
    margin-top:10px;
  }
  .nostate{
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top:20px;
    line-height: 50px;
  }
}
</style>