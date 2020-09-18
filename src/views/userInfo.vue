<template>
  <div class="userInfoRoot">
    <bl-navbar></bl-navbar>
    <bl-info :info="$store.state.userInfo"></bl-info>
    <bl-info-tabs></bl-info-tabs>
    <bl-edit-info :show="editShow" :info="$store.state.userInfo"></bl-edit-info>
    <!-- {{$store.state.userInfo}} -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      editShow: false
    }
  },
  methods: {
  },
  created () {
    this.$store.dispatch('getInfo')
  }
}
</script>

<style lang="less" scoped>
.edit {
  // background-color: transparent;
  margin: 10px 0 20px 0;
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding-left: 3.2vw;
    padding-right: 3.2vw;
    border-bottom: 1px solid #eee;
    div:first-child {
      color: #505050;
    }
    div:last-child {
      color: #999;
    }
    img {
      width: 12.5vw;
      border-radius: 50%;
    }
  }
  .cell:first-child {
    height: 65px;
  }
  .cell:nth-child(n+2) {
    height: 40px;
  }
}
</style>
