<template>
  <div class="upload-container min-upload">
    <div v-for="(file,index) in files" :key="file.id" :class="{'successBorder':isSuccess,'image-preview':true,'shadow-sm':true}">
      <div class="image-preview-wrapper">
        <div class="image-preview-wrapperCh">
          <img v-if="file.extension == 'jpg'" :src="file.url" alt="" class="imageShow">
          <svg-icon v-if="file.extension != 'jpg'" :icon-class="getFileExtensions(file.url)" class-name="file-icon"/>
        </div>
        <div class="image-name">{{ file.name }}</div>
        <div class="image-preview-action">
          <i v-if="file.extension == 'jpg'" class="el-icon-zoom-in" @click="handlePictureCardPreview(file)"/>
          <i v-if="file.extension != 'jpg'" class="el-icon-download" @click="handleDownload(file)"/>
          <i class="el-icon-delete" @click="handleRemove(file,index)"/>
        </div>
      </div>
    </div>
    <div v-for="(uploadingFile, index) in uploadingFiles" :key="index" class="image-preview shadow-sm">
      <div class="image-preview-wrapper">
        <svg-icon :icon-class="getFileExtensions(uploadingFile.name)" class-name="file-icon"/>
        <div class="image-uploading-action">
          <el-progress :percentage="uploadingFile.percent" :width="88" type="circle" class="tc-progress"/>
        </div>
      </div>
    </div>
    <el-upload
      v-if="action"
      :on-remove="handleRemove"
      :on-progress="uploadOnProgress"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
      :on-preview="handlePictureCardPreview"
      :show-file-list="false"
      :action="uploadUrl"
      :headers="uploadHeaders"
      drag
      multiple
      class="image-preview shadow-sm"
      list-type="picture-card">
      <i class="iconfont icon-IconCopy1"/>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import prettyFileIcons from 'pretty-file-icons'
import { getToken } from '@/utils/auth'
export default {
  name: 'Upload',
  props: {
    files: {
      type: Array,
      default: () => {
        return []
      }
    },
    action: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      uploadingFiles: [],
      isSuccess: true,
      ImageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,

      fileName: [], // 集合名字

      isrepeat: ''
    }
  },
  computed: {
    uploadUrl() {
      return process.env.BASE_API + 'v1/upload'
    },
    uploadHeaders() {
      return { Authorization: 'Bearer ' + getToken() }
    }
  },
  created() {

  },
  methods: {
    getFileExtensions(url) {
      console.log(url)
      // console.log('url++++++++++++++++')
      // if( prettyFileIcons.getIcon(url)){
      //   this.$message({
      //     message: '你上传的文件内容异常',
      //     type:'warning'
      //   })
      //   return false;
      // }
      // console.log(prettyFileIcons.getIcon(url))
      // return prettyFileIcons.getIcon(url)
      console.log(url.substring(url.lastIndexOf('.') + 1, url.length))
      return url.substring(url.lastIndexOf('.') + 1, url.length)
    },

    // is_repeat(file){
    //   for(var i = 0; i <this.fileName.length; i++) {
    //       if(file.name == this.fileName[i]) {
    //           this.isrepeat = true;
    //       }
    //   }
    //   if( this.isrepeat == true){
    //     this.$message({
    //       message: '注意! 上传的附件名字重复',
    //       type: 'warning'
    //     });
    //     return false;
    //   }else{
    //     this.fileName.push(file.name)
    //   }
    //   console.log('this.fileName')
    //   console.log(this.fileName)
    //   console.log('this.fileName')
    // },

    handleBeforeUpload(file) {
      console.log(file)

      // this.is_repeat(file)
      for (var i = 0; i < this.fileName.length; i++) {
        if (file.name == this.fileName[i]) {
          this.isrepeat = true
        }
      }
      if (this.isrepeat == true) {
        this.$message({
          message: '注意! 附件中文件或文件名存在重复，请重新确认',
          type: 'warning'
        })
        this.isrepeat = ''
        return false
      } else {
        this.fileName.push(file.name)
      }

      console.log('this.fileName')
      console.log(this.fileName)
      console.log('this.fileName')
      // console.log('file.type999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')
      // console.log()
      // console.log('file.typetype999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999')
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'xls'
      const extension2 = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'xlsx'
      const extension3 = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'doc'
      const extension4 = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'docx'
      const extension5 = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'ppt'
      const extension6 = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'pptx'
      const extension7 = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'jpg'
      const extension8 = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'jpeg'
      const extension9 = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'pdf'
      const isLt2M = file.size / 1024 / 1024 < 30
      if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 && !extension7 && !extension8 && !extension9) {
        this.$message({
          message: '上传附件只能是 xls、xlsx、doc、docx 、ppt、pptx、jpg、jpeg、pdf格式!',
          type: 'warning'
        })
        return false
      }
      if (!isLt2M) {
        this.$message({
          message: '上传单个附件大小不能超过 30MB!',
          type: 'warning'
        })
        return false
      }

      file.percent = 0
      this.uploadingFiles.push(file)
      // console.log(this.files)
      return extension || extension2 || extension3 || extension4 || extension5 || extension6 || extension7 || extension8 || extension9 && isLt2M
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // handleRemove(index, file, fileList) {
    //   // console.log(index)
    //   this.uploadingFiles[index].image = [];
    //   //   console.log(file, fileList);
    // },
    handleRemove(file, index) {
      // console.log(file)
      if (file.detach === false) {
        // console.log(this.uploadingFiles)
        // this.uploadingFiles[index].image = [];
        this.files.splice(index, 1)
        this.fileName.splice(index, 1)
        // console.log(this.files)
      }
    },
    uploadOnProgress(e, file) {
      //  console.log( this.uploadingFiles)
      const index = this.uploadingFiles.findIndex(uploadingFile => uploadingFile.uid === file.uid)
      this.uploadingFiles[index].percent = Math.round(e.percent)
      // console.log(this.uploadingFiles)
      this.$set(this.uploadingFiles, index, file)
    },
    handleSuccess(response, file, fileList) {
      // console.log(response)
      const index = this.uploadingFiles.findIndex(uploadingFile => uploadingFile.uid === file.uid)
      this.uploadingFiles.splice(index, 1)
      // console.log(response.code)
      if (response.code === 0) {
        this.files.push(response.data)
        // console.log(this.files)
        this.isSuccess = true
        // console.log(response.data)
        this.ImageUrl = response.data.url
        // console.log(this.ImageUrl)
      }
    },

    // handleDownload
    handleDownload(file) {
      console.log(file)
      window.location.href = file.url
    }
  }
}
</script>
<style lang="scss">
  .min-upload{
    .el-upload-dragger{
      border: none;
      height:120px !important;
    }
    .el-upload--picture-card{
      border: none;
      height:120px;
      line-height:118px;
      i{
        color: #FFA800;
      }
    }
    .successBorder{
      border: 1px solid #CFCFCF !important;
    }
    .el-progress-circle{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -60px;
      margin-left: -45px;
    }
    .el-progress--circle .el-progress__text{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -10px;
      margin-top:-15px;
      // /* margin-top: -44px;
      // /* margin-left: -44px; */
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.min-upload {
  width: 100%;
  position: relative;
  margin-top: .8em;
  @include clearfix;
  .file-icon {
    font-size: 120px;
  }
  .image-uploader {
      width: 60%;
      float: left;
  }

  .image-preview {
    position: relative;
    border: 2px dashed #e1e1e1;
    border-radius: 7px;
    float: left;
    width: 120px;
    height: 120px;
    margin-left: 10px;
    margin-bottom: 15px;
    text-align: center;
    overflow: hidden;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      .image-preview-wrapperCh{
        width:118px;
        height:115px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .imageShow{
        width:118px;
        height:115px;
      }
    }
    .image-name {
      width:120px;
      position:absolute;
      bottom:0;
      padding: 2px 5px 0;
      line-height: 1.3em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-top:1px solid #CFCFCF;
      background:rgba(255,255,255,1);
      opacity:0.8;
      color:#164061;
      // margin-top: 10px;
    }

    .image-uploading-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, .7);
      text-align: center;
      line-height: 140px;
    }
    .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        background-color: rgba(0, 0, 0, .7);
        transition: opacity .2s;
        font-size: 28px;
        text-align: center;
        line-height: 120px;
        i {
          cursor: pointer;
          &:hover {
            color: #409EFF;
          }
        }
    }
    &:hover {
      .image-preview-action {
          opacity: 1;
      }
    }
  }
}
</style>

