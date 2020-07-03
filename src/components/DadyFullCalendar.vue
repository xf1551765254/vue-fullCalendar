<template>
  <div class="content">
      <div class="header">
        <div class="deaderLeft">
          今日日程
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
  data () {
    return {
       activities: [
        {
        content: '活动按期开始',
        timestamp: '00:00~12:30',
        color:'#61B1FF'
      }, {
        content: '通过审核',
        timestamp: '00:00~12:30',
        color:'#E880D8'
      }, {
        content: '创建成功',
        timestamp: '00:00~12:30',
        color:'#F71701'
      }
      ]
    }
},
  methods: {
   
  },
  mounted () {
   
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