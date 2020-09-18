<template>
  <div>
    <van-popup
      v-model="$store.state.showEdit"
      position="right"
      :style="{ height: '100%', width: '100%', transform: 'none', top: '11.667vw', backgroundColor: 'transparent' }"
      :overlay-style="{ backgroundColor: '#f4f4f4', top: '11.667vw' }"
    >
    <div class="edit">
      <div class="cell" @click="imgShow = !imgShow">
        <div>头像</div>
        <div><img :src="info.user_img ? info.user_img : 'http://i1.hdslb.com/bfs/face/7e257b201f18852adfdf6ed0876143e082dba048.jpg'"></div>
        <div class="upimg">
          <van-uploader :after-read="afterRead">
            <van-button icon="plus" type="primary">上传文件</van-button>
          </van-uploader>
        </div>
      </div>
      <div class="cell" @click="nameShow = true">
        <div>昵称</div>
        <div>{{info.name}}</div>
      </div>
      <div class="cell">
        <div>UID</div>
        <div>{{info.id}}</div>
      </div>
      <div class="cell" @click="genderShow = true">
        <div>性别</div>
        <div>{{info.gender  == '0' ? '女' : '男'}}</div>
      </div>
      <div class="cell" @click="descShow = true">
        <div>个性签名</div>
        <div :style="{ width: '61.111vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }">{{ info.user_desc ? info.user_desc : '这个人懒死了，什么都没有写(´・_・｀)'}}</div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <span @click="loginOut">退出登录</span>
      <span @click="$store.commit('changeEditShow')">返回空间</span>
    </div>
    </van-popup>
    <!-- 弹出框 -->
    <van-dialog v-model="nameShow" title="昵称" show-cancel-button @confirm="confirmCell()">
      <van-cell-group>
        <van-field v-model="info.name" placeholder="请输入新昵称" />
      </van-cell-group>
    </van-dialog>
    <van-dialog v-model="descShow" title="个性签名" show-cancel-button @confirm="confirmCell()">
      <van-cell-group>
        <van-field v-model="info.user_desc" placeholder="请输入新个性签名" />
      </van-cell-group>
    </van-dialog>
    <van-action-sheet cancel-text="取消" v-model="genderShow" :actions="genderList" @select="genderSelect" />
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  },
  data () {
    return {
      imgShow: false,
      nameShow: false,
      genderShow: false,
      descShow: false,
      genderList: [{ name: '男', val: 1 }, { name: '女', val: 0 }],
      userUpdate: this.info
    }
  },
  methods: {
    confirmCell () {
      this.updateUser()
    },
    genderSelect (val) {
      this.info.gender = val.val
      this.updateUser()
      this.genderShow = false
    },
    loginOut () {
      localStorage.clear()
      this.$router.push('/login')
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      const fromdata = new FormData()
      fromdata.append('file', file.file)
      const { data: res } = await this.$http.post('upload', fromdata)
      this.info.user_img = res.url
      this.updateUser()
    },
    async updateUser () {
      const { data: res } = await this.$http.post('update/' + this.info.id, this.info)
      console.log(res)
      if (res.code !== 200) return this.$toast('更新失败！')
      this.$toast('更新成功！')
    }
  }
}
</script>

<style lang="less" scoped>
.upimg {
  position: absolute;
  width: 100%;
  height: 18.056vw;
  overflow: hidden;
  opacity: 0;
  .van-button {
    width: 100vw;
    height: 18.056vw;
  }
}
.edit {
  margin: 2.778vw 0 5.556vw 0;
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
    height: 18.056vw;
  }
  .cell:nth-child(n+2) {
    height: 11.111vw;
  }
}
.btn {
  background-color: #fff;
  span {
    display: block;
    height: 9.722vw;
    width: 100%;
    text-align: center;
    line-height: 9.722vw;
    padding-left: 3.2vw;
    padding-right: 3.2vw;
    font-size: 3.611vw;
    color: #505050;
  }
  span:first-child {
    border-bottom: 1px solid #eee;
  }
}
</style>
