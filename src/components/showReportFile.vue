<template>
  <div>
    <ul class="fileList">
      <li v-for="(item,index) in fileList" :key="index">
        <div>
          <svg-icon :icon-class="item.extension" class-name="file-icon"/>
        </div>
        <p class="bottom">{{ item.name }}</p>
        <span v-if="canDownLoad == true" class="bgcover">
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
    fileList: {
      type: Array,
      required: true
    },
    canDownLoad: {
      type: Boolean,
      required: true
    }
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

  },
  mounted() {
    // console.log(this.$route.fullPath)
  },
  methods: {
    getFileExtensions(url) {
      console.log(url)
      console.log(prettyFileIcons.getIcon(url) + '99999999999999999999999999999999')
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
    // overflow: hidden;
    display:table;
    text-align: center;
    margin:0 auto;
    >li:hover .bgcover{
        display: block;
    }
    >li{
        width: 120px;
        float:left;
        cursor:pointer;
        // height: 120px;
        margin-left: 16px;
        position: relative;
        >img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .file-icon {
            font-size: 40px;
            margin-top:22px;
            text-align: center;
            display:block;
            margin: 0 auto;
        }
        .bottom{
            width: 120px;
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow:hidden;
            // position: absolute;
            background: #FFFFFF;
            opacity: 0.8;
            bottom: 0;
            left: 0;
            height: 21px;
            text-align: center;
            line-height: 21px;
            color: #164061;
            margin-top:6px;
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
            transition: opacity .3s;
            i{
                line-height: 67px;
            }
        }
    }
    >li:first-child{
        margin-left: 0;
    }

}
</style>

