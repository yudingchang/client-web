<template>
  <div class="checkoutSuccess">
    <!-- <p class="t1"><span>您的订单提交成功等待报价</span><a href="javascript:;">查看订单详情</a> </p>
      <div class="checkoutSuccess-content">
          <div>
              <img src="/static/image/success.png" alt="">
          </div>
          <p>倒计时 <span>23：59：50</span></p>
          <p>测库的工作人员将在24小时内给您报价，请耐心等待</p>
      </div> -->
    <el-row>
      <el-col :span="24" class="checkoutSuccess-prompt">
        <p class="Success-prompt-detail">
          <span>You’ve submitted your order successfully, please wait for your quotation.·</span><span @click="promptCheckout">View detail</span>
        </p>
        <div class="Success-prompt-continue">
          <p>
            <i class="iconfont icon-duihao1"/>
          </p>
          <p>
            <!-- <span>倒计时</span>
                      <span>23</span>
                      <span>:</span>
                      <span>59</span>
                      <span>:</span>
                      <span>50</span> -->
            <!-- <time :endTime="1490761620" :callback="callback" :endText="已经结束了"></time> -->
          </p>
          <p>
            We will contact you within 24 hours, please be waiting, thanks for your trust!
          </p>
          <p @click="ContinueOrder">
            Order Again
          </p>
          <p @click="HomePage">
            Back to homepage
          </p>
          <ul>
            <li>Service Content</li>
            <li>The total number of products, the number of containers and the number of finished products</li>
            <li>Package type, identification, label, etc</li>
            <li>Check whether the product is in conformity with the product</li>
            <li>Sampling test according to specified test item details</li>
            <li>Inspect the appearance process according to the defect details</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="24" class="checkoutSuccess-otherService">
        <div>
          <ul>
            <li>
              <i class="iconfont icon-hebingxingzhuang1"/>
              <span>Factory Audit</span>
              <i class="iconfont icon-hebingxingzhuang1"/>
            </li>
            <li>
              <i class="iconfont icon-FillCopy"/>
              <span>Loading Supervision</span>
              <i class="iconfont icon-FillCopy"/>
            </li>
            <li>
              <i class="iconfont icon-hebingxingzhuang2"/>
              <span>Sampling Service</span>
              <i class="iconfont icon-hebingxingzhuang2"/>
            </li>
          </ul>
        </div>
        <!-- <p>其他业务下单</p> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Time from '../common/Time'
export default {
  name: 'CheckoutSuccess',
  components: { Time },
  data() {
    return {

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
  mounted() {
    // console.log(this.$route.fullPath)
  },
  methods: {
    promptCheckout() { // 查看订单详情
    //   console.log(this.$route.query)
      this.$router.push({ path: '/orderManagement/orderDetails', query: { orderId: this.$route.query.orderId }})
    },

    ContinueOrder() { // 继续下单
      this.$router.push({ path: 'index' })
    },

    HomePage() { // 返回首页
      this.$router.push({ path: 'dashboard' })
    },

    callback(val) {
      console.log(val)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.checkoutSuccess {
    margin:0 40px;
    .checkoutSuccess-prompt{
        padding:58px 0 60px 0;
        .Success-prompt-detail{
            height:31px;
            line-height:31px;
            margin-bottom:63px;
            span:nth-child(1){
                font-size:18px;
                font-family:MicrosoftYaHei;
                color:rgba(80,104,140,1);
                margin:0 20px;
            }
            span:nth-child(2){
                font-size:18px;
                font-family:MicrosoftYaHei;
                color:rgba(255,168,0,1);
                text-decoration:underline;
                cursor: pointer;
            }
        }
        .Success-prompt-continue{
            text-align: center;
            p:nth-child(1){
                width:160px;
                height:160px;
                margin:0 auto;
                text-align: center;
                line-height: 160px;
                margin-bottom:24px;
                vertical-align: middle;
                // background:rgba(103,194,58,1);
                border-radius:50%;
                i{
                    font-size:161px;
                    color:rgba(103,194,58,1);
                    border-radius:50%;
                }
            }
            p:nth-child(2){
                height:31px;
                line-height: 31px;
                margin-bottom: 20px;
                span:nth-child(1){
                    font-size:24px;
                    font-family:MicrosoftYaHei;
                    color:rgba(80,104,140,1);
                    margin-right:24px;
                }
                span:nth-child(2),span:nth-child(3),span:nth-child(4),span:nth-child(5),span:nth-child(6){
                    font-size:24px;
                    font-family:MicrosoftYaHei;
                    color:rgba(21,139,228,1);
                }
            }
            p:nth-child(3){
                height:26px;
                font-size:16px;
                font-family:MicrosoftYaHei;
                color:rgba(80,104,140,1);
                line-height:26px;
                font-weight:300;
                margin-bottom:40px;
            }
            P:nth-child(4){
                width:240px;
                height:50px;
                background:rgba(255,168,0,1);
                border-radius:4px;
                margin:0 auto 20px;
                line-height: 50px;
                text-align: center;
                font-size:16px;
                font-family:PingFang-SC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                cursor: pointer;
            }
            p:nth-child(5){
                width:240px;
                height:50px;
                border-radius:4px;
                border:1px solid rgba(144,147,153,1);
                margin:0 auto 36px;
                line-height: 50px;
                text-align: center;
                font-size:16px;
                font-family:MicrosoftYaHei;
                color:rgba(144,147,153,1);
                cursor: pointer;
            }
            ul{
                width:615px;
                // height:366px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                border:1px solid rgba(230,234,238,1);
                margin:0 auto;
                li{
                    // height:60px;
                    // line-height: 60px;
                    padding:15px 40px;
                    border-bottom:1px solid rgba(230,234,238,1);
                    font-size:16px;
                    font-family:MicrosoftYaHei;
                    color:rgba(80,104,140,1);
                }
                li:nth-child(1){
                    background:rgba(125,200,85,1);
                    color:rgba(255,255,255,1);
                }
                li:last-child{
                    border-bottom:none;
                }
            }
        }
    }
    .checkoutSuccess-otherService{
        margin:0 0 77px 0;
        border-top:2px solid rgba(223,227,233,1);
        div{
            width:1150px;
            height:170px;
            margin:0 auto 24px;
            ul{
                height:170px;
                padding-top:50px;
                li{
                    float:left;
                    width:370px;
                    height:120px;
                    border-radius:4px;
                    margin-right:20px;
                    cursor: pointer;
                    line-height: 120px;
                }
                li:nth-child(1){      //其他业务 模块样式
                    background:linear-gradient(131deg,rgba(234,124,97,1) 0%,rgba(254,113,151,1) 100%);
                    position:relative;
                    overflow: hidden;
                    i:nth-child(1){
                        margin-left:24px;
                        color:rgba(255,255,255,1);
                        font-size:30px;
                    }
                    span{
                        margin-left:17px;
                        color:rgba(255,255,255,1);
                        font-size:28px;
                    }
                    i:nth-child(3){
                        margin-left:92px;
                        color:rgba(255,255,255,1);
                        font-size:130px;
                        position:absolute;
                        top:30px;
                        right:15px;
                        opacity:0.2;
                    }
                }
                li:nth-child(2){
                    background:linear-gradient(135deg,rgba(98,178,255,1) 0%,rgba(134,162,253,1) 100%);
                    position:relative;
                    overflow: hidden;
                    i:nth-child(1){
                        margin-left:24px;
                        color:rgba(255,255,255,1);
                        font-size:30px;
                    }
                    span{
                        margin-left:17px;
                        color:rgba(255,255,255,1);
                        font-size:28px;
                    }
                    i:nth-child(3){
                        margin-left:92px;
                        color:rgba(255,255,255,1);
                        font-size:130px;
                        position:absolute;
                        top:30px;
                        right:15px;
                        opacity:0.2;
                    }
                }
                li:nth-child(3){
                    background:linear-gradient(136deg,rgba(54,200,196,1) 0%,rgba(22,161,207,1) 100%);
                    margin:0;
                    position:relative;
                    overflow: hidden;
                    i:nth-child(1){
                        margin-left:24px;
                        color:rgba(255,255,255,1);
                        font-size:30px;
                    }
                    span{
                        margin-left:17px;
                        color:rgba(255,255,255,1);
                        font-size:28px;
                    }
                    i:nth-child(3){
                        margin-left:92px;
                        color:rgba(255,255,255,1);
                        font-size:130px;
                        position:absolute;
                        top:30px;
                        right:15px;
                        opacity:0.2;
                    }
                }
            }
        }
        p{
            height:40px;
            font-size:26px;
            font-family:MicrosoftYaHei;
            color:rgba(80,104,140,1);
            line-height:40px;
            text-align: center;
        }

    }
}
</style>

