<template>
  <div class="newDay">
    <el-dialog :visible.sync="visible" :show-close="false" :close-on-click-modal="false" @close="closeDialog('ruleForm')">
        <div slot="title" class="dialog-footer">
           <div class="title">新增日程</div>
        </div>
        <el-form :model="form" :rules="rules" label-width="80px" ref="ruleForm">
            <el-form-item label="日程名称" prop="name">
                <el-input v-model="form.name" size="small" placeholder="请输入日程" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="是否全天" prop="value">
               <el-switch v-model="form.value" size="small" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="开始日期" v-if="!form.value" :prop="!form.value?'startDate':''">
                <el-date-picker
                  size="small"
                  style="width:100%"
                  v-model="form.startDate"
                  format="yyyy - MM - dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>  
            <el-form-item label="结束日期" v-if="!form.value" :prop="!form.value?'endDate':''">
                <el-date-picker
                  size="small"
                  style="width:100%"
                  v-model="form.endDate"
                  format="yyyy - MM - dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item> 
            <el-form-item label="日程时间" v-if="form.value" :prop="form.value?'date':''">
                <el-date-picker
                  size="small"
                  style="width:100%"
                  v-model="form.date"
                  format="yyyy - MM - dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>  
            <el-form-item label="时间范围" v-if="form.value" :prop="form.value?'timeRange':''">
                <el-time-picker
                    style="width:100%"
                    is-range
                    v-model="form.timeRange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    format="HH:mm"
                    value-format="hh:mm"
                    placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item> 
            <el-form-item label="提醒时间" prop="time">
                <el-select v-model="form.time" placeholder="请选择" size="small" style="width:100%">
                    <el-option label="日程开始时" value="日程开始时"></el-option>
                    <el-option label="30分钟前" value="30分钟前"></el-option>
                    <el-option label="1天前" value="1天前"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日程类型" prop="colorType">
                <el-select v-model="form.colorType" placeholder="请选择" size="small" style="width:100%">
                    <el-option label="个人" value="#61B1FF"></el-option>
                    <el-option label="工作" value="#E880D8"></el-option>
                    <el-option label="生日" value="#F71701"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="重要性" prop="important">
                <el-select v-model="form.important" placeholder="请选择" size="small" style="width:100%">
                    <el-option label="普通" value="普通"></el-option>
                    <el-option label="重要" value="重要"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" >
                <el-input type="textarea" size="small" v-model="form.desc" style="width:100%"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div style="text-align:center">
                <el-button @click="subCancel('ruleForm')" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="handleSubmit('ruleForm')" >确 定</el-button>
            </div>
            
        </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'newDay',
  props: {
    visible: {
        type: Boolean,
        default: false
    }
  },
  components: {},
  data(){
      return {
          form:{
              value:false
          },
          rules:{
              name: [
                { required: true, message: '请输入日程内容', trigger: 'blur' }
              ],
              startDate: [
                 {  required: true, message: '请选择日期', trigger: 'change' }
              ],
              endDate: [
                 { required: true, message: '请选择日期', trigger: 'change' }
              ],
              date: [
                 {  required: true, message: '请选择日期', trigger: 'change' }
              ],
              timeRange: [
                 { required: true, message: '请选择时间范围', trigger: 'change' }
              ],
              time: [
                { required: true, message: '请选择提醒时间', trigger: 'change' }
              ],
              colorType: [
                { required: true, message: '请选择日程类型', trigger: 'change' }
              ],
              important: [
                { required: true, message: '请选择重要性', trigger: 'change' }
              ],
          },
          pickerOptions: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7
            }
          }
      }
  },
  computed:{
     disabledStartDate () {
         return new Date()
     }
  },
  methods:{
      closeDialog(formName){
          this.$refs[formName].resetFields();
      },
      subCancel (formName) {
        this.$refs[formName].resetFields();
        this.$emit('update:visible', false)
      },
      handleSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log('success',this.form)
            if(this.form.value){
              this.form.startTime=this.form.timeRange[0]
              this.form.endTime=this.form.timeRange[1]
              let newDate=this.form.date.split("-") 
              let year = newDate[0]
              let month =newDate[1]-1
              let day = newDate[2]
              let startTimeHours=this.form.startTime.split(':')[0]
              let startTimeMinutes=this.form.startTime.split(':')[1]
              let endTimeHours=this.form.endTime.split(':')[0]
              let endTimeMinutes=this.form.endTime.split(':')[1]
              console.log(year,month,day,startTimeHours,startTimeMinutes)
              this.form.startDateTime=new Date(year,month,day,startTimeHours,startTimeMinutes,0)
              this.form.endDateTime=new Date(year,month,day,endTimeHours,endTimeMinutes,0)
            }
            this.$emit('submit', this.form)
            this.$emit('update:visible', false)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       
      }

  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    visible (val, old) {
        if (val) {
            //this.disableEdit = true
        }
    }
 }
}
</script>
<style lang="less" scoped>
.newDay{
    .el-form-item{
        margin-bottom:15px;
    }
}
</style>
<style lang="less">
   .newDay{
       .el-dialog__header{
            background-color:#DCDFE6;
            padding: 15px 20px;
        }
   }
</style>
