<template>
  <div class="home-container">
    <div class="home-header">
      <HomeHeader />
    </div>
    <div class="home-main">
      <router-view />
    </div>
  </div>
</template>

<script>
import HomeHeader from '@components/home/HomeHeader.vue'
export default {
  name: 'Home',
  components: {
    HomeHeader
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.home-header {
  width: 100%;
  height: 60px;
  overflow: hidden;
}
</style>
