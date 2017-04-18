<template>
  <div class="document">
    <h1>{{title}}</h1>
    <div class="link-tab">
      <div class="float-left" v-bind:class="{'is-selected':tap==1}" @click="switchTap(1)"><a href="#">省市区联动</a></div>
      <div class="float-left" v-bind:class="{'is-selected':tap==2}" @click="switchTap(2)"><a href="#/time">时间联动</a></div>
    </div>
    <router-view keep-alive transition transition-mode="out-in">
    </router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'vue三级联动测试',
      tap:location.href.indexOf('/time')>-1?2:1
    }
  },
  components:{},
  methods:{
    switchTap(tap){
      this.tap = tap;
    }
  }
}
</script>
<style lang="scss">
@import "./common/style";
</style>
