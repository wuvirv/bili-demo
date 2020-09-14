<template>
  <div class="textbox">
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang="less" scoped>
.textbox {
  margin: 0 auto;
  width: 100vw;
  height: 11.111vw;
  background-color: #fff;
  display: flex;
  .text {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
}
</style>
