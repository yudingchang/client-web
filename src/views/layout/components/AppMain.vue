<template>
  <section class="app-main">
    <Breadcrumb v-if="key!='/dashboard'" class="breadcrumb-container"/>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: { Breadcrumb },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  mounted() {
    console.log(this.$route.fullPath)
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 60px);
  width: 100%;
  background: #F3F6F9;
  position: relative;
  overflow: hidden;
}
</style>

