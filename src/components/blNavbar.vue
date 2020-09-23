<template>
  <div class="navBar">
    <div class="logo">
      <i class="iconfont Navbar_logo" @click="linktot"></i>
    </div>
    <div class="right">
        <i class="iconfont ic_search_tab"></i>
        <img v-if="isLogin == 1" src="../assets/login.png" @click="linkto">
        <img v-else :src="userImg" @click="linkto">
        <van-button>下载 App</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userImg: localStorage.getItem('img')
    }
  },
  methods: {
    linkto () {
      if (this.$route.path === '/' && localStorage.getItem('token')) {
        this.$router.push('/userinfo')
      } else if (this.$route.path === '/' && !localStorage.getItem('token')) {
        this.$router.push('/login')
      }
    },
    linktot () {
      if (this.$route.path === '/userinfo' && this.$store.state.showEdit === true) this.$store.commit('changeEditShow')
      if (this.$route.path !== '/') this.$router.push('/')
    }
  },
  computed: {
    isLogin () {
      return localStorage.id ? 0 : 1
    }
  }
}

</script>

<style lang="less">
.navBar {
  display: flex;
  justify-content: space-between;
  height: 11.667vw;
  background-color: #fff;
  div {
    flex: 1;
  }
  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 4.167vw;
    .Navbar_logo {
      color: #fb7299;
      font-size: 7.222vw;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    i {
      color: #ccc;
      font-size: 5.8vw;
    }
    img {
      width: 6.389vw;
      border-radius: 50%;
    }
    .van-button {
      background-color: #fb7299;
      color: #fff;
      height: 6.389vw;
      font-size: 3.472vw;
    }
  }
}
</style>
