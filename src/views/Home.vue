<template>
  <div>
    <bl-navbar></bl-navbar>
    <van-tabs sticky v-model="active" @click="selectActive" swipeable color="#fb7299" title-active-color="#fb7299" title-inactive-color="#505050" line-width="6.944vw">
      <van-tab :key="index" v-for="(item, index) in category" :title="item.title" :title-style="{fontSize: '3.75vw', padding: '0 15px'}">
        <div class="videoList-box">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="video-content">
              <router-link :to="'/article/' + item.id" :key="index" v-for="(item, index) in item.list">
                <div class="video-box">
                  <div style="position: relative;">
                  <img :src="item.img">
                  <div class="text">
                    <span><i class="iconfont icon_shipin_bofangshu"></i>29万</span>
                    <span><i class="iconfont icon_shipin_danmushu"></i>1.4万</span>
                  </div>
                  </div>
                  <p>{{item.name}}</p>
                </div>
              </router-link>
            </div>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <div class="flexd" :style="{display: showFlexd}">
      <i class="iconfont Navbar_logo"></i>
      <span>打开App，看更多精彩视频</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: [],
      active: 0,
      showFlexd: 'none'
    }
  },
  methods: {
    onLoad () {
      this.category[this.active].page += 1
      this.selectActive(this.active)
      // if(this.category[this.active].list >= )
    },
    async getCategory () {
      const { data: res } = await this.$http.get('/category')
      res.forEach(item => {
        item.list = []
        item.page = 0
        item.pagesize = 8
        item.loading = false
        item.finished = false
      })
      this.category = res
      console.log(res)
      this.selectActive(this.active)
    },
    async selectActive (index) {
      const { data: res } = await this.$http.get('detail/' + this.category[index]._id, {
        params: { page: this.category[index].page, pagesize: this.category[index].pagesize }
      })
      this.category[index].list.push(...res)
      if (res.length === 0) {
        this.category[this.active].finished = true
      }
      this.category[this.active].loading = false
      console.log(res)
    },
    handleScroll () {
      window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        if (scrollTop + windowHeight / 2 >= scrollHeight / 2) {
          this.showFlexd = 'block'
        } else {
          this.showFlexd = 'none'
        }
      })
    }
  },
  created () {
    this.getCategory()
  },
  mounted () {
    this.handleScroll()
  }
}
</script>

<style lang="less" scoped>
.videoList-box {
  padding: 0 5px;
  height: 100%;
  .video-content {
    display: flex;
    flex-wrap: wrap;
    a {
      box-sizing: border-box;
      width: 50%;
      padding: 2.13333vw 1.33333vw;
      .video-box {
        position: relative;
        img {
          width: 100%;
          height: 25.972vw;
        }
        .text {
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          width: 100%;
          font-size: 3.611vw;
          padding: 1.389vw 1.667vw;
          color: #fff;
          display: flex;
          justify-content: space-between;
          vertical-align: top;
          background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
          i {
            margin-right: 1.389vw;
            font-size: 3.611vw;
          }
        }
        p {
          font-size: 3.333vw;
          color: #212121;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
.showCategory {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(2.3vw);
  background-color: #fff;
  i {
    color: #aaa;
    font-size: 5.278vw;
    margin: 0 2.222vw;
  }
}
.van-tabs--line /deep/ .van-tabs__wrap{
  height: 10vw;
}
.flexd {
  position: fixed;
  bottom: 8.333vw;
  right: 50%;
  transform: translateX(50%);
  width: 90%;
  height: 9.722vw;
  font-size: 3.75vw;
  border-radius: 4.861vw;
  text-align: center;
  line-height: 9.722vw;
  color: #fff;
  background-color: #fb7299;
  box-shadow: 0 0.53333vw 2.66667vw rgba(0,0,0,.2);
  span {
    margin-left: 4.167vw;
  }
}
</style>
