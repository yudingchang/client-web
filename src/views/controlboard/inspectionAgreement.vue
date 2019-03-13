<template>
  <div class="inspectionAgreement">
    <el-row>
      <el-col :span="24">
        <p>验货协议</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'InspectionAgreement',
  data() {
    return {

    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.inspectionAgreement{
    p{
        height: 600px;
        width:100%;
        text-align: center;
        font-size:30px;
        color:rgba(255,165,0,1);
    }
}
</style>

