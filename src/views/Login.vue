<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像logo区域 -->
      <div class="logo-box">
        <img src="@/assets/images/logo.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px">
        <!-- 登录输入框 -->
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password"> 
          <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import {getLogin} from '@/api/login.js'
export default {

  data() {
    return {
      //登录默认账号密码
      loginForm: {
        account: "admin",
        password: "123456",
      },
      //登录表单校验规则
      loginFormRules:{
        //用户校验
        account:[
          {required:true,message:'请输入登录账号',trigger:'blur'},
          {min:3,max:10,message:'长度3到10之间',trigger:'blur'}
        ],
        //密码校验
        password:[
          {required:true,message:'请输入登录密码',trigger:'blur'},
          {min:6,max:15,message:'长度6到15之间',trigger:'blur'}
        ]
      }
    };
  },
  //方法
  methods:{
    //登录按钮
    login(){
      console.log(this.$refs)
      this.$refs.loginFormRef.validate(async(valid) => {
        if(!valid)return;
        const {data:res} = await this.$http.post("/login", this.loginForm)
        console.log(res)
        if(res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        //传递一个token值
        window.sessionStorage.setItem('token',res.data[0].token)
        window.sessionStorage.setItem('username',res.data[0].username)
        //跳转至/home页面
        this.$router.push('/home')
      })
      
    }
  },
};
</script>

<style lang='less' scoped>
  .login-container{
    height: 100%;
    background-color: #2b4b6b;
    //登录盒子
    .login-box{
      width: 450px;
      height: 300px;
      background: #fff;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);

      //logo
      .logo-box{
        width: 150px;
        height: 150px;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd ;
        background-color: #fff;
        padding: 10px;
        position: absolute;
        transform: translate(-50%,-50%);
        left: 50%;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #eee;
        }
      }

      //表单
      .login-form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
      }
      .btns{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>