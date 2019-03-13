<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <span class="phone">
          <span/>
        </span>
        <span class="news">
          <span/>
        </span>
        <span style="font-size:14px;color:#ffffff;">Welcome,</span>
        <span class="userName">{{ name }}</span>
        <span v-if="!avatar" class="gender">
          <span v-if="male" class="male"/>
          <span v-if="neuter" class="neuter"/>
          <span v-if="female" class="female"/>
        </span>
        <span v-if="avatar" class="personalImg">
          <img v-if="avatar" :src="avatar" alt="">
        </span>
        <span class="logout" @click="logout">Log out</span>

        <!-- <span class="news"></span> -->
        <!-- <error-log class="errLog-container right-menu-item"/>

        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select class="international right-menu-item"/>
        </el-tooltip> -->

        <lang-select class="international right-menu-item"/>

        <!-- <el-tooltip :content="$t('navbar.theme')" effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip> -->
      </template>

      <!-- <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
import store from '../../../store/'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  data() {
    return {
      userName: '张三',
      male: true,
      female: false,
      neuter: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  created() {
    console.log('avater')
    console.log(this.avatar)
    console.log('avater')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  background-color: #222C3C;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 20px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    .phone{
       display: inline-block;
       line-height: 60px;
       vertical-align: top;
      span{
        background: url("/static/image/phone.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 45px;
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .news{
       display: inline-block;
       line-height: 60px;
      //  margin: 0 29px 0 12px;
       vertical-align: top;
       width: 50px;

      span{
        background: url("/static/image/news.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 90px;
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .userName{
      font-size: 14px;
      color: #FFFFFF;
      display: inline-block;
      vertical-align: top;
    }
    .gender{
       display: inline-block;
       line-height: 60px;
       margin: 0 29px 0 12px;
       vertical-align: top;
       width: 4px;
       height: 40px;
       cursor: pointer;
      .male{
        background: url("/static/image/male.png") no-repeat;
        vertical-align: middle;
        // margin-right: 90px;
        background-size: 100% 100%;
        width: 36px;
        height: 36px;
        display: inline-block;
      }
      .neuter{
        background: url("/static/image/neuter.png") no-repeat;
        vertical-align: middle;
        // margin-right: 90px;
        background-size: 100% 100%;
        width: 36px;
        height: 36px;
        display: inline-block;
      }
      .female{
        background: url("/static/image/female.png") no-repeat;
        vertical-align: middle;
        // margin-right: 90px;
        background-size: 100% 100%;
        width: 36px;
        height: 36px;
        display: inline-block;
      }
    }
    .personalImg{
      cursor: pointer;
      display: inline-block;
      line-height: 60px;
      margin: 0 29px 0 12px;
      vertical-align: top;
      width: 4px;
      height: 40px;
      border-radius:50%;
      img{
      vertical-align: middle;
      width: 36px;
      height: 36px;
      display: inline-block;
      border-radius:50%;
      // z-index: 3;
      // background:#fff;
      }
    }
    .logout{
      color: #ffffff;
      margin: 0 10px;
      cursor: pointer;
      font-size: 14px;
      height:60px;
      display:inline-block;
    }
    .logout:hover{
      // opacity:0.8;
      background:rgba(49,61,79,1);
    }

    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 16px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" >
//
</style>

