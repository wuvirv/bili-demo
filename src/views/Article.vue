<template>
  <div>
    <bl-navbar></bl-navbar>
    <video id="myVideo" class="video-js vjs-default-skin vjs-fluid">
    </video>
    <div class="down">
      <span>打开App，流畅又高清</span>
    </div>
    <div class="video-info" v-if="video">
      <div class="title">
        <a href="#/">
          <i class="iconfont ic_popular"></i>
          <span>{{video.category.title}}</span>
        </a>
        <span class="name">{{video.name}}</span>
      </div>
      <div class="up">
        <div>
          <i class="iconfont ic_up"></i>
          <span v-if="video.userinfo"> {{video.userinfo.name}}</span>
        </div>
        <div>
          <span>98.5万观看</span>
          <span>4773弹幕</span>
          <span>{{video.date}}</span>
        </div>
      </div>
      <div class="toolbar">
        <div>
          <span class="left">
            <i class="iconfont dianzan"></i>
            <span> 点赞</span>
          </span>
          <span class="left">
            <i class="iconfont icon_fav"></i>
            <span> 收藏</span>
          </span>
          <span class="left">
            <i class="iconfont huancun"></i>
            <span> 缓存</span>
          </span>
        </div>
        <div>
          <i class="iconfont qingxidu"></i>
          <span>清晰度</span>
        </div>
      </div>
    </div>
    <van-tabs v-if="comment && commendList" v-model="active" color="#fb7299" title-active-color="#fb7299" title-inactive-color="#505050" line-height="0.556vw" line-width="16.667vw">
      <van-tab title="相关推荐" :title-style="{fontSize: '3.75vw'}">
        <div class="video-content">
          <router-link :to="'/article/' + item.id" :key="index" v-for="(item, index) in commendList">
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
      </van-tab>
      <van-tab :title="'评论 ' + comment.length" :title-style="{fontSize: '3.75vw'}">
        <div class="comment-list" v-if="comment">
          <ul>
            <li :key="index" v-for="(item, index) in comment.slice(0, 10)">
              <div class="comment-header">
                  <img :src="item.userinfo.user_img === null ? 'http://i1.hdslb.com/bfs/face/7e257b201f18852adfdf6ed0876143e082dba048.jpg' : item.userinfo.user_img">
                <div class="top">
                  <span>{{item.userinfo.name}}</span>
                  <span>{{item.comment_date}}</span>
                </div>
                <div class="rihgt">
                  <i class="iconfont like2"></i>
                  <span>{{item.comment_id}}</span>
                </div>
              </div>
              <div class="comment-content">
                <p>{{item.comment_content}}</p>
              </div>
              <div class="comment-foot" v-if="item.child.length != 0">
                <p :key="index" v-for="(item, index) in item.child.slice(0, 3)">
                    <a>{{item.userinfo.name}}：</a>
                  <span>{{item.comment_content}}</span>
                </p>
                <p class="more">
                  <a>共{{item.child.length}}条回复</a>
                  <i class="iconfont gengduo1"></i>
                </p>
              </div>
            </li>
          </ul>
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
      video: null,
      play: null,
      active: 0,
      commendList: null,
      showFlexd: 'none',
      comment: null
    }
  },
  methods: {
    async getVideo () {
      const { data: res } = await this.$http.get('article/' + this.$route.params.id)
      console.log(res[0])
      this.video = res[0]
      this.initVideo()
    },
    initVideo () {
      console.log(this.video.content)
      this.play = this.$video('myVideo', {
        sources: {
          src: this.video.content,
          type: 'video/mp4'
        },
        controls: true,
        poster: this.video.img
      })
    },
    async commendData () {
      const { data: res } = await this.$http.get('commend')
      this.commendList = res
      console.log(res)
    },
    async getComment () {
      const { data: res } = await this.$http.get('comment/' + this.$route.params.id)
      this.comment = this.editComment(res)
      console.log(this.comment)
    },
    editComment (res) {
      function fn (data) {
        const arr = []
        for (var i = 0; i < res.length; i++) {
          if (res[i].parent_id === data) {
            arr.push(res[i])
            res[i].child = fn(res[i].comment_id.toString())
          }
        }
        return arr
      }
      return fn(null)
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
    this.getVideo()
    this.commendData()
    this.getComment()
  },
  mounted () {
    this.handleScroll()
  },
  destroyed () {
    this.play.dispose()
  }
}
</script>

<style lang="less" scoped>
.video-js /deep/ .vjs-big-play-button {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.down {
  height: 9.583vw;
  width: 93.6vw;
  background: #fb7299;
  line-height: 9.6vw;
  border-radius: 4.8vw;
  color: #fff;
  font-size: 3.73333vw;
  text-align: center;
  margin: 4.167vw 2.778vw;
}
.video-info {
  padding: 0 4.167vw;
  .title {
    font-size: 3.194vw;
    a {
      text-align: center;
      padding: 0.556vw 1.389vw;
      display: inline-block;
      height: 5.556vw;
      // font-size: 3.194vw;
      color: #fb7299;
      border-radius: 2.778vw;
      background-color: #eee;
      span {
        vertical-align: top;
      }
    }
    .name {
      margin-left: 2.778vw;
    }
  }
  .up {
    margin-top: 2.778vw;
    display: flex;
    align-items: center;
    font-size: 3.194vw;
    div:first-child {
      i {
      vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
      margin-right: 5.556vw;
    }
    div:last-child {
      span {
        margin-right: 2.778vw;
        color: #999;
      }
    }
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    padding: 2.778vw 0;
    border-bottom: 1px solid #eee;
    i {
      font-size: 5.33333vw;
      color: #757575;
      vertical-align: middle;
    }
    .left {
      margin-right: 5.556vw;
    }
    span {
      font-size: 2.639vw;
      color: #999;
      vertical-align: middle;
    }
  }
}
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
.van-tabs--line /deep/ .van-tabs__wrap{
  height: 10vw;
}
/deep/ .van-tab span {
  line-height: 100%;
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
.comment-list {
  li {
    border-bottom: 0.278vw solid #eee;
    padding: 4.167vw;
  }
  li:last-child {
    border-bottom: none;
  }
  .comment-header {
    display: flex;
    align-items: center;
    color: #757575;
    font-size: 3.194vw;
    img {
      width: 8.333vw;
      height: 8.333vw;
      border-radius: 4.167vw;
    }
    .top {
      display: flex;
      flex-direction: column;
      margin-left: 2.778vw;
      span:first-child {
        margin-bottom: 1.389vw;
        font-size: 3.611vw;
      }
    }
    .rihgt {
      margin-left: auto;
      span {
        margin-left: 1.389vw;
      }
    }
  }
  .comment-content {
    margin: 2.778vw 11.111vw;
    color: #212121;
    font-size: 3.611vw;
  }
  .comment-foot {
    margin-left: 11.111vw;
    background-color: #f4f4f4;
    padding: 2.778vw;
    border-radius: 1.389vw;
    font-size: 3.611vw;
    a {
      color: #5090cc;
    }
    p {
      margin: 1.6vw 0 0 0;
      color: #212121;
    }
    .more {
      i {
        color: #5090cc;
        vertical-align: middle;
      }
      a {
        vertical-align: middle;
      }
    }
  }
}
</style>
