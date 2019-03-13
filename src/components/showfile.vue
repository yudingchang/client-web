<template>
  <div>
    <ul class="fileList">
      <li v-for="(item,index) in fileList" :key="index">
        <img v-if="item.extension == 'jpg'" :src="item.url" alt="" class="fileList_img">
        <!-- <svg-icon :icon-class="item.extension" class-name="file-icon" v-else/> -->
        <svg-icon v-if="item.extension != 'jpg'" :icon-class="getFileExtensions('_.'+item.extension)" class-name="file-icon"/>
        <p class="bottom">{{ item.name }}</p>
        <span class="bgcover">
          <i class="el-icon-download" @click="download(item.url)"/>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import prettyFileIcons from 'pretty-file-icons'
export default {
  name: '',
  components: { },
  props: {
    fileList: Array,
    required: true
  },
  computed: {
    // cachedViews() {
    //   return this.$store.state.tagsView.cachedViews
    // },
    // key() {
    //   return this.$route.fullPath
    // }
  },
  created() {
    //   console.log('this.fileList')
    //   console.log(this.fileList)
    //   console.log('this.fileList')
  },
  mounted() {
    // console.log(this.$route.fullPath)
  },
  methods: {
    getFileExtensions(url) {
      console.log(url)
      return prettyFileIcons.getIcon(url)
    },
    download(row) {
      window.location.href = row
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.fileList{
    overflow: hidden;
    >li:hover .bgcover{
        display: block;
    }
    >li{
        float: left;
        width: 120px;
        height: 120px;
        margin-left: 16px;
        margin-bottom:16px;
        position: relative;
        cursor:pointer;
        >.file-icon{
            display: block;
            width: 100%;
            height: 100%;
        }
        .fileList_img{
            width:100%;
            height: 100%;
        }
        .bottom{
            width: 120px;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
            position: absolute;
            background: #FFFFFF;
            opacity: 0.8;
            bottom: 0;
            left: 0;
            height: 24px;
            text-align: center;
            line-height: 24px;
            color: #164061;
        }
        .bgcover{
            display: none;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            left: 0;
            top: 0;
            cursor: pointer;
            text-align: center;
            color: #fff;
            /* opacity: 0; */
            font-size: 20px;
            background-color: rgba(0,0,0,.5);
            transition: opacity .8s;
            i{
                font-size:30px;
                line-height: 120px;
            }
        }
    }
    li:nth-child(9){
        margin-left:0;
    }
    >li:first-child{
        margin-left: 0;
    }
}
</style>

