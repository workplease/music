<template>
  <div class="login_backgroud">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/images/logo.jpg" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="iconfont icon-mobilephone_fill"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码"
          prefix-icon="iconfont icon-lock_fill" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        phone: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 电话
        phone: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur', validator: this.checkPhone }
        ],
        // 密码
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {},
  beforeDestroy () {},
  methods: {
    // 点击重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) { }
        const { data: res } = await this.$http.get('/login/cellphone', {
          params: {
            phone: this.loginForm.phone,
            password: this.loginForm.password
          },
          withCredentials: true
        })
        if (res.code !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // token 保存到客户端的 sessionStorage 中
        console.log(res)
        window.sessionStorage.setItem('token', res.token)
        // 跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    },
    checkPhone(rule, value, callback) {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_backgroud {
  background: url("../assets/images/login_back.jpg") no-repeat center center;
  height: 100%;
  background-size: cover;
}

.login_box {
  width: 550px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.9;
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form{
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
</style>
