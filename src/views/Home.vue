<template>
  <div class="home">
    <el-container class="home-container">
      <!-- 首页头部区域 -->
      <el-header>
        <div>
          <img src="@/assets/images/logo.jpg" alt="">
          <span>Ios社团文章管理</span>
        </div>
        <el-dropdown>
          <div>
            <img :src="meinfo.headImg" alt="">
            <span>{{meinfo.username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-button type="info" @click="logout">退出</el-button> -->
      </el-header>

      <!-- 中间内容区域 -->
      <el-container>

        <!-- 侧边栏区域 -->
        <el-aside :width="isFold ? '64px':'200px'">

          <!-- 切换折叠 -->
          <div class="toggle-button" @click="toggleFold">|||</div>

          <!-- 左侧菜单menu -->
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF"
          :router="true" :collapse= 'isFold' :collapse-transition= 'false' :default-active="$route.path">
            <!-- 一级菜单 -->
            <el-menu-item :index="'/'+item.path" v-for="(item,i) in menulist" :key="i" @click="saveNavState('/'+item.path,item.authName)">
              <i :class="'iconfont '+iconObj[item.id]"></i>
              <!-- 菜单标题 -->
              <span>{{item.authName}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 右侧主要内容-->
        <el-main>
          <!-- 路由占位符 -->
          <router-view :meinfo="meinfo"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
data(){
  return{
    //控制侧边栏缩放
    isFold :false,
    //菜单栏数据
    menulist:[],
    //菜单icon
    iconObj:{
      '1':'icon-gerenxinxi',
      '2':'icon-yonghuguanli',
      '3':'icon-wenzhangguanli',
      '4':'icon-fabu',
      '5':'icon-message',
      '6':'icon-fenleiguanli',
      '7':'icon-gonggao',
      '8':'icon-shuju'
    },
    //被点击的路径地址
    activePath:'',
    //被点击的菜单名
    authName:'',

    //个人信息
    meinfo:{},
    //加密token
    istoken:{
      token:window.sessionStorage.getItem('token')
    }
  }
},
//方法
methods:{
  // 退出按钮
  logout(){
    //清空token
    window.sessionStorage.clear()
    //跳转到登录页面
    this.$router.push('/login')
    this.$message.info("成功退出")
  },

  //控制侧边栏缩放
  toggleFold (){
    this.isFold  = !this.isFold 
  },

  //菜单栏数据
  async getMenuList(){
    const {data:res} = await this.$http.get('/menu')
    // console.log(res)
    if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
    this.menulist = res.data
    console.log(this.menulist)
  },

  //
  saveNavState(activePath,authName){
    window.sessionStorage.setItem('activePath',activePath)
    this.activePath = activePath
    window.sessionStorage.setItem('authName',authName)
    this.authName = authName
  },

  //获取用户信息
  async queryUserInfo(){
    const {data:res} = await this.$http.post('/login/de',this.istoken)
    // console.log(res)
    this.meinfo = res.data[0]
    console.log(this.meinfo)
  },
},
//挂载
created(){
  //菜单栏数据挂载
  this.getMenuList()
  this.activePath = window.sessionStorage.getItem('activePath')
  this.authName = window.sessionStorage.getItem('authName')
  //获取个人信息
  this.queryUserInfo()
},
}
</script>

<style lang='less' scoped>
.home{
  height: 100%;

  .home-container{
    height: 100%;
    // 首页头部
    .el-header{
      background: #373d41;
      display: flex;
      justify-content: space-between;
      padding:0 10px;
      align-items: center;
      color: #fff;
      font-size: 20px;

      >div{
        display: flex;
        align-items: center;
      }

      img{
        width: 50px;
        border-radius: 25px;
      }

      span{
        margin-left: 15px;
      }
      .el-dropdown{
        margin-right: 20px;
        color: #fff;
        cursor: pointer;
        >div{
          display: flex;
          align-items: center;
        }
        img{
          width: 50px;
          border-radius: 25px;
        }
      }
    }

    //侧边栏区域
    .el-aside{
      background: #333744;
      .el-menu{
        border: none;
      }
      .toggle-button{
        background: #4A5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
      }
    }

    //右边主要内容
    .el-main{
      background: #eaedf1;
    }
  }
}


</style>