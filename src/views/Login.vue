<template>
  <div>
    <bl-text text="登录bilibili" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="loginForm.username"
        name="账号"
        label="账号"
        placeholder="请输入你的账号"
        :rules="[{ required: true, message: '' }, { pattern: usernameReg, message:'' }]"
        class="margin-top"
        label-width="16.667vw"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '' }, { pattern: passwordReg, message: '' }]"
        label-width="16.667vw"
      />
      <p class="forget">忘记密码</p>
      <div style="margin: 4.444vw;">
        <div class="btn">
          <van-button round plain @click="$router.push('/register')">注册</van-button>
          <van-button round type="info" native-type="submit">登录</van-button>
        </div>
      </div>
    </van-form>
    <p>
      登录即代表你同意<span>用户协议</span>和<span>隐私政策</span>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      usernameReg: /^[0-9a-zA-Z]{4,15}$/,
      passwordReg: /^[0-9a-zA-Z]{6,15}$/
    }
  },
  methods: {
    async onSubmit () {
      const { data: res } = await this.$http.post('login', this.loginForm)
      console.log(res)
      if (res.code !== 200) return this.$notify({ type: 'danger', message: '用户名或密码错误' })
      this.$notify({ type: 'success', message: '登录成功' })
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.margin-top {
  margin-top: 4.167vw;
}
.btn {
  display: flex;
  justify-content: center;
  .van-button {
    flex: 1;
    margin: 0 1.389vw;
    height: 11.667vw;
    font-size: 4.444vw;
    border-radius: 1.389vw;
  }
  .van-button:first-child {
    border: 1px solid #fb7299;
    background-color: #F4F4F4;
    color: #fb7299;
  }
  .van-button:last-child {
    border: 1px solid #ff9db5;
    background-color: #ff9db5;
  }
}
.van-field {
  line-height: 6.944vw;
  font-size: 4.444vw;
}
.van-field /deep/ .van-field__label {
  color: black;
}
p {
  font-size: 2.778vw;
  text-align: center;
  color: #757575;
  span {
    color: #fb7299;
  }
}
.forget {
  color: #fb7299;
  text-align: right;
  margin: 2.778vw 2.778vw 6.944vw 0;
}
</style>
