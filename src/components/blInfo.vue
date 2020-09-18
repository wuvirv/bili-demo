<template>
  <div class="info">
    <div class="banner"></div>
    <div class="part1">
      <div class="face">
        <img :src="info.user_img">
      </div>
      <div class="relation">
        <div class="count">
          <span class="fans">
            <span>8</span>
            <span>粉丝</span>
          </span>
          <i></i>
          <span class="follow">
            <span>8</span>
            <span>关注</span>
          </span>
          <i></i>
          <span class="likes">
            <span>99</span>
            <span>获赞</span>
          </span>
        </div>
        <div class="follow-btn">
          <van-button @click="$store.commit('changeEditShow')">编辑资料</van-button>
        </div>
      </div>
    </div>
    <div class="part2">
      <div class="base">
        <span class="name" v-cloak>{{info.name}}</span>
        <span class="level">
          <i class="iconfont ic_userlevel_5" style="color: rgb(255, 108, 0);"></i>
        </span>
      </div>
      <div class="desc">
        <span class="content">{{info.user_desc ? info.user_desc : '这个人懒死了，什么都没有写(´・_・｀)'}}</span>
        <span class="spread-btn" @click="tags = !tags">{{tags ? '收起' : '展开'}}</span>
      </div>
      <div class="tags" v-if="tags">
        <span>uid:{{info.id}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  },
  data () {
    return {
      tags: false
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  .banner {
    width: 100vw;
    height: 24vw;
    background: url(../assets/banner.png) no-repeat 50%;
    background-size: cover;
  }
  .part1 {
    display: flex;
    .face {
      flex: 2;
      img {
        width: 22.222vw;
        height: 22.222vw;
        border-radius: 50%;
        transform: translateY(-1.389vw) translateX(2.778vw);
      }
    }
    .relation {
      flex: 3;
      display: flex;
      flex-direction: column;
      margin-right: 2.778vw;
      .count {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 4.167vw;
        .fans, .follow, .likes {
          display: flex;
          flex-direction: column;
          align-items: center;
          // height: 29.999px;
          font-size: 12px;
          span:first-child {
            font-size: 15px;
            color: #212121;
          }
          span:last-child {
            color: #999;
          }
        }
        i {
          display: inline-block;
          height: 4.167vw;
          border-right: 1px solid #e7e7e7;
        }
      }
      .follow-btn {
        .van-button {
          height: 8.333vw;
          width: 100%;
          border: 1px solid #fb7299;
          color: #fb7299;
          border-radius: 5px;
          font-size: 4.167vw;
        }
      }
    }
  }
  .part2 {
    margin-left: 2.778vw;
    .name {
      color: #212121;
      max-width: 62.66667vw;
      overflow: hidden;
      font-size: 4.8vw;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .level {
      margin-left: 1.6vw;
      i {
        font-size: 6.4vw;
      }
    }
    .desc {
      margin-top: 2.778vw;
      span {
        display: inline-block;
        font-size: 3.472vw;
        overflow: hidden;
        margin-bottom: 1.389vw;
      }
      .content {
        width: 87.5vw;
        color: #999;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .spread-btn {
        display: inline-block;
        color: #1389bf;
      }
    }
    .tags {
      span {
        transform: translateY(-2.222vw);
        display: inline-block;
        font-size: 3.333vw;
        border-radius: 0.833vw;
        background: #f4f4f4;
        color: #505050;
        padding: 0.278vw 0.833vw;
      }
    }
  }
}
</style>
