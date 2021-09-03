<template>
  <div class="login_container">
    <div class="login_box">
      <!--   头像区域   -->
      <div class="avatar_min">
      <div class="avatar_box">
        <img src="../../assets/logo.png">
      </div>
      </div>
      <!-- 表单提交区域 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <el-form-item class="button_box">
          <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginLoading: false,
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 清空表单按钮
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.loginLoading = true
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return (this.loginLoading = false)
        }
        const { data: res } = await this.$http.post('login', this.loginForm)
        // console.log(res)
        if (res.meta.status !== 200) {
          this.loginLoading = false
          return this.$message.error('登录失败，账号或者密码错误')
        }
        this.$message.success('登录成功!')
        // 1. 将登录成功之后的 token,保存到客户端的 sessionStorage(会话机制/只在当前页面生效)中 localStorage(持久话机制/关闭页面也不会忘记数据)
        //   1.1 项目中除了登录之外的API接口,必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效, 所以将 token 保存在 sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式路由导航跳转到后台主页,路由地址是 /home
        this.$router.push('/home')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped>
.login_container {
  height: 100%;
  background: #5dbe8a;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.login_box {
  width: 450px;
  height: 300px;
  flex-direction: row;
  background-color: #fff;
  border-radius: 5px;
}

.login_form {
  box-sizing: border-box;
  padding: 0 20px;
  margin-top: -25px;
}

.avatar_min {
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  transform: translate(0, -50%);
}

.avatar_box {
  width: 130px;
  height: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}

.button_box {
  display: flex;
  justify-content: flex-end;
}

</style>
