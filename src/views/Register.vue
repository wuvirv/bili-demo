<template>
  <div>
    <bl-text text="注册bilibili" />
    <van-form @submit="onSubmit" ref="registerRef">
      <van-field
        v-model="registerForm.name"
        name="name"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '' }, { pattern: nameReg, message: '' }]"
        class="margin-top"
        label-width="16.667vw"
      />
      <van-field
        v-model="registerForm.username"
        name="账号"
        label="账号"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '' }, { pattern: usernameReg, message:'' }]"
        label-width="16.667vw"
      />
      <van-field
        v-model="registerForm.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="6～16个字符，区分大小写"
        :rules="[{ required: true, message: '' }, { pattern: passwordReg, message: '' }]"
        label-width="16.667vw"
      />
      <div style="margin: 4.444vw;">
        <div class="btn">
          <van-button round plain @click="$router.push('/login')">登录</van-button>
          <van-button round type="info" native-type="submit">同意并注册</van-button>
        </div>
      </div>
    </van-form>
    <p>
      完成注册即代表你同意<span>用户协议</span>和<span>隐私政策</span>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      registerForm: {
        name: '',
        username: '',
        password: ''
      },
      nameReg: /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,15}/,
      usernameReg: /^[0-9a-zA-Z]{4,15}$/,
      passwordReg: /^[0-9a-zA-Z]{6,15}$/
    }
  },
  methods: {
    async onSubmit () {
      const { data: res } = await this.$http.post('register', this.registerForm)
      if (res.code !== 200) return this.$notify({ type: 'danger', message: '注册失败' })
      this.$notify({ type: 'success', message: '注册成功' })
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.margin-top {
  margin: 4.167vw 0;
}
.btn {
  display: flex;
  justify-content: center;
  .van-button {
    // width: 45.278vw;
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
</style>
