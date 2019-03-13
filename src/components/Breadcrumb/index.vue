<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <div class="content">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ generateTitle(item.meta.title) }}</span>
          <router-link v-else :to="item.redirect||item.path">{{ generateTitle(item.meta.title) }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </div>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      const { params } = this.$route
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
          var toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
      const first = matched[0]
      if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
        // matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
        matched = [{ path: '', meta: { title: 'Your location:' }}].concat(matched)
      }
      this.levelList = matched
      console.log(this.levelList)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    width: 100%;
    padding: 0 40px;
    // margin-left: 10px;
    // margin:0 40px;
    // .breadcrumb-start{
    //   height:50px;
    //   line-height:50px;
    //   font-size:14px;
    //   color:#303133;
    //   float:left;
    //   margin-right:10px;
    // }
    .content{
      width:100%;
      height: 50px;
      line-height: 50px;
      display: block;
      border-bottom: 1px solid #DFE3E9;
   }
    .no-redirect {
      color: rgba(255,168,0,1);
      cursor: text;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner{
      color:rgba(255,168,0,1);
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" >
//element-ui
.app-breadcrumb{
  .el-breadcrumb__item:last-child span:nth-child(1) a{
    color:rgba(255,168,0,1);
  }
}
</style>

