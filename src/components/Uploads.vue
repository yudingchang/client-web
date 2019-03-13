<template>
  <div class="upload-container">
    <div v-for="file in lodash.filter(files, { detach: false })" :key="file.id" class="image-preview shadow-sm">
      <div class="image-preview-wrapper">
        <div>
          <svg-icon :icon-class="getFileExtensions('_.'+file.extension)" class-name="file-icon"/>
        </div>
        <div class="image-name">{{ file.name }}</div>
        <div class="image-preview-action">
          <a :href="file.url" target="_blank"><i class="el-icon-download"/></a>
          <i v-if="action" class="el-icon-delete" @click="handleRemove(file)"/>
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
      :show-file-list="false"
      :action="uploadUrl"
      :headers="uploadHeaders"
      drag
      multiple
      class="image-preview shadow-sm"
      list-type="picture-card">
      <i class="el-icon-plus"/>
    </el-upload>
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
    },
    mimes: {
      type: Array | null,
      default: null
    },
    size: {
      type: Number | null,
      default: null
    },
    url: {
      type: String | null,
      default: null
    }
  },
  data() {
    return {
      uploadingFiles: []
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
  methods: {
    getFileExtensions(url) {
      return prettyFileIcons.getIcon(url)
    },
    handleBeforeUpload(file) {
      if (this.mimes && !this.mimes.includes(file.type)) {
        this.$message.error(`上传图片只能是 ${this.mimes.join(',')} 格式!`)
        return false
      }
      if (this.size && file.size > this.size) {
        this.$message.error(`上传图片大小不能超过 ${this.lodash.round(this.size / 1024)} KB!`)
        return false
      }

      file.percent = 0
      this.uploadingFiles.push(file)
    },
    handleRemove(file) {
      if (file.detach === false) {
        this.$emit('remove', file, this.files)
      }
    },
    uploadOnProgress(e, file) {
      const index = this.uploadingFiles.findIndex(uploadingFile => uploadingFile.uid === file.uid)
      this.uploadingFiles[index].percent = Math.round(e.percent)
      this.$set(this.uploadingFiles, index, file)
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      const index = this.uploadingFiles.findIndex(uploadingFile => uploadingFile.uid === file.uid)
      this.uploadingFiles.splice(index, 1)
      if (response.code === 0) {
        this.$emit('upload', response.data, this.files)
      }
    }
  }
}
</script>
