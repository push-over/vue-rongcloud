<template>
  <div>
    <div v-if="data.css === 'left'">
      <div class="message left">
        <van-image round
                   fit="cover"
                   width="2rem"
                   height="2rem"
                   :src="data.headImg" />
        <span>{{data.txt}}</span>
      </div>
    </div>
    <div v-if="data.css === 'right'">
      <div class="message right">
        <span>{{data.txt}}</span>
        <van-image round
                   fit="cover"
                   width="2rem"
                   height="2rem"
                   :src="data.headImg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="scss" scoped>
@import "~@/scss/utils";
.message {
  display: flex;
  align-items: center;
  padding: vw(10px);
}

.left {
  justify-content: flex-start;
  span {
    margin-left: vw(20px);
  }
}

.right {
  justify-content: flex-end;
  span {
    margin-right: vw(20px);
  }
}
</style>