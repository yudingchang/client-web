<template>
  <el-scrollbar id="scrollbar-wrapper" wrap-class="scrollbar-wrapper" style="background:rgb(29, 37, 49)">
    <div class="logo">
      <span/>
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#1D2531"
      text-color="#bfcbd9"
      active-text-color="rgba(255,168,0,1)"
    >
      <sidebar-item v-for="(route,index) in permission_routers" :key="index" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

#scrollbar-wrapper{
  // width: 100px !important;
  .logo{
    padding: 30px 0 29px 25px;
    span{
      background: url("/static/image/logo.png") no-repeat;
      width: 130px;
      height: 20px;
      display: block;
    }
  }
}

</style>
