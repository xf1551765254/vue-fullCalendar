<template>
  <div class="home">
     <!-- 头部区域 -->
    <!-- <el-header>
      <div>
        <span>日程表</span>
      </div> -->
      <!-- <el-button type="info">退出</el-button> -->
    <!-- </el-header> -->
    <el-container>
      <!-- 侧边栏 -->
      <!-- <el-aside >
      </el-aside> -->
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <!-- <router-view></router-view> -->
        <FullCalendar/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import FullCalendar from '@/components/fullCalendar.vue'

export default {
  name: 'Home',
  components: {
    FullCalendar
  }
}
</script>
<style lang="less" scoped>
.home{
  height: 100%;
  width: 100%;
    .el-header {
      background-color: #373d41;
      display: flex;
      justify-content: space-between;
      padding-left: 0;
      align-items: center;
      color: #fff;
      font-size: 20px;
      > div {
        display: flex;
        align-items: center;
        span {
          margin-left: 15px;
        }
      }
    }
    .el-container{
       height: 100%;
      .el-main {
          background-color: #f6f7f8;
          padding:5px;
          padding-left:15px;
          height: 100%;
          width: 100%;
        }
    }
}
</style>
