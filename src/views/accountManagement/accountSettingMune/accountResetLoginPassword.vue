<template>
  <div class="accountResetLoginPassword">
    <el-row>
      <!-- 登录密码重置 -->
      <el-col :span="24" class="ResetLoginPassword-index">
        <div class="title">Please select a way to reset your login password:</div>
        <div class="ResetLoginPassword">
          <div>
            <p><i class="iconfont icon-denglumimazhongzhi1"/></p>
            <p>Reset via old password</p>
            <p @click="resetByPassword">reset</p>
          </div>
          <div>
            <p><i class="iconfont icon-dianziyouxiangzhongzhi1"/></p>
            <p>Reset via email</p>
            <p @click="resetByEmail">reset</p>
          </div>
          <!-- <div>
                        <p><i class="iconfont icon-hebingxingzhuang6"></i></p>
                        <p>通过手机号码重置</p>
                        <p  @click="resetByTelephone">立即重置</p>
                    </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AccountResetLoginPassword',
  data() {
    return {

    }
  },
  methods: {
    // resetByPassword通过登录密码重置
    resetByPassword() {
      this.$router.push({ path: 'resetByPassword' })
    },

    // resetByEmail通过电子邮箱重置
    resetByEmail() {
      this.$router.push({ path: 'resetByEmail' })
    },

    // resetByTelephone通过电话号码
    resetByTelephone() {
      this.$router.push({ path: 'resetByTelephone' })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//普通样式
.accountResetLoginPassword{
    .ResetLoginPassword-index{
        padding:100px 100px 0;
        .title{
            color:#50688C;
            font-size: 16px;
            margin: 0 0 25px 0;
        }
        .ResetLoginPassword{
            div{
                float:left;
                width:350px;
                height:300px;
                border:1px solid rgba(230,234,238,1);
                background-color:#FFFFFF;
                border-radius:8px;
                padding-top:62px;
                text-align: center;
                margin-right:120px;
                cursor:pointer;
                box-sizing: border-box;
                p:nth-child(1){
                    width:90px;
                    height:100px;
                    margin:0 auto 16px;
                    line-height: 90px;
                    i{
                        font-size:90px;
                        color:rgba(127,143,164,1);
                    }
                }
                p:nth-child(2){
                    // width:128px;
                    height:22px;
                    font-size:16px;
                    font-weight:500;
                    color:rgba(127,143,164,1);
                    line-height:22px;
                    margin:0 auto 25px;
                }
                p:nth-child(3){
                    width:136px;
                    height:40px;
                    // background:rgba(255,168,0,1);
                    border:1px solid rgba(127,143,164,1);
                    border-radius:4px;
                    line-height: 40px;
                    text-align: center;
                    margin:0 auto;
                    font-size:16px;
                    color:rgba(127,143,164,1);
                }
            }
            div:last-child{
                margin-right:0;
            }
            div:hover{
                border:1px solid rgba(255,168,0,1) !important;
                p:nth-child(1){
                    i{
                        color:rgba(255,168,0,1) !important;
                    }
                }
                p:nth-child(2){
                    color:rgba(255,168,0,1) !important;
                }
                p:nth-child(3){
                    background:rgba(255,168,0,1);
                    border:none !important;
                    color:rgba(255,255,255,1) !important;
                }
            }
        }
        .commonColor{
            border:2px solid rgba(255,168,0,1) !important;
            p:nth-child(1){
                i{
                    color:rgba(255,168,0,1) !important;
                }
            }
            p:nth-child(2){
                color:rgba(255,168,0,1) !important;
            }
            p:nth-child(3){
                background:rgba(255,168,0,1);
                border:none !important;
                color:rgba(255,255,255,1) !important;
            }
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//element-ui样式

</style>

