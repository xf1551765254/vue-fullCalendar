<template>
  <div class="content">
      <div class="header">
        <div class="deaderLeft">
          日程目录
        </div>
        <el-button type="primary" round size="mini" @click="search">搜索</el-button>
      </div>
      <div class="contenter">
        <div>
        <el-form ref="form" :model="formData" size="mini" label-width="70px">
            <el-form-item label="关键字">
                <el-input v-model="formData.name" style="width:100%" placeholder="关键字搜索"></el-input>
            </el-form-item>   
            <el-form-item label="开始日期">
                <el-date-picker
                  style="width:100%"
                  v-model="formData.startDate"
                  format="yyyy - MM - dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>  
            <el-form-item label="结束日期">
                <el-date-picker
                  style="width:100%"
                  v-model="formData.endDate"
                  format="yyyy - MM - dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item> 
             <el-form-item label="日程类型">
                  <el-select v-model="formData.type" placeholder="请选择">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="个人" value="1"></el-option>
                    <el-option label="工作" value="2"></el-option>
                    <el-option label="生日" value="3"></el-option>
                  </el-select>
            </el-form-item> 
             <el-form-item label="重要性">
                  <el-select v-model="formData.important" placeholder="请选择">
                    <el-option label="普通" value="0"></el-option>
                    <el-option label="重要" value="1"></el-option>
                  </el-select>
            </el-form-item> 
        </el-form>
        </div>
      </div>
      <div class="footerTitle">查询结果</div>
      <div class="footer">
        <div class="footerContent" v-if="activeState.length>0">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="i.title" :name="index" class="footerList" v-for="(i,index) in activeState" :key="i.id">
              <el-timeline v-if="i.childen">
                <el-timeline-item
                  v-for="(activity, index) in i.childen"
                  :key="index"
                   :color="activity.color"
                  :timestamp="activity.content">
                  {{activity.timestamp}}
                </el-timeline-item>
              </el-timeline>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="nostate" v-else><span>没有数据</span></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'FullCalendarSeach',
  components: {},
  data () {
    return {
      formData:{},
      activeNames: ['1'],
      activeState:[
        {
          id:'1',
          title:'2018-2-12',
          childen:[
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
        },
        {
          id:'2',
          title:'2018-2-12',
          childen:[
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
      ]
     
    }
  },
  methods: {
    handleChange(val) {
        console.log(val);
    },
    // 日程搜索
    search(){
      //let self = this;
      let data = this.formData;
      console.log(data)  
    }
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
      margin:10px;
      font-size: 14px;
      margin-top:10px;
      .el-form-item--mini.el-form-item{
        margin-bottom:10px;
      }
    }
    .footerTitle{
      padding:5px;
      font-size: 14px;
      line-height: 25px;
      margin-bottom:10px;
       background-color:#DCDFE6;
    }
    .footer{
        padding:5px;
        overflow-y: scroll;
       .footerContent{
         padding-left:5px;
       }
      .footerList{
        .el-collapse-item__header{
        }
        
      }
      .nostate{
        display: flex;
        justify-content: center;
        align-content: center;
        margin-top:20px;
        line-height: 50px;
      }
    }
    .footer::-webkit-scrollbar {
        display: none;
    }
    
}
</style>
<style lang="less">
    .footerList{
        .el-collapse-item__header{
           height:30px;
        }
        .el-collapse-item__content{
          background-color:#F2F6FC;
          padding-top:10px;
          padding-bottom:10px;
        }
        .el-timeline-item{
          padding-bottom:10px;
        }
        //background-color:
      }
</style>
