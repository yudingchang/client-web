<template>
  <div class="paymentCHN">
    <ul class="paymentCHN-ul">
      <li v-for="(item,index) in payment" :key="index">
        <el-radio v-model="radio" :label="item.id"/>
        <template v-if="item.id == 2 ">
          <span class="lis1">
            <img src="/static/image/UnionPay.png" alt="">
            <span>Unionpay</span>
          </span>
        </template>
        <template v-if=" item.id == 1 ">
          <span class="lis2">
            <img src="/static/image/payment.png" alt="">
            <span>Alipay</span>
          </span>
        </template>
        <!-- <template v-if=" payment == 2 ">
                 <span class="lis3">
                     <span>测库月结</span>
                     <span>(你还有一份账单未结算)</span>
                 </span>
             </template>
             <template v-if=" payment == 3 ">
                 <span class="lis4">
                     <span>钱包</span>
                     <span>￥8989.89</span>
                     <span>充值</span>
                 </span>
             </template> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default{
  name: 'PaymentCHN',
  props: ['payment'],
  data() {
    return {
      radio: '',
      data: [
        {
          id: 1,
          name: 'alipayment'
        },
        {
          id: 2,
          name: 'unionpay'
        }
      ]

    }
  },
  watch: {
    // 监听页面按钮点击触发的事件
    radio(val) {
      this.radio = val
      this.$emit('receiveDateChn', this.radio)
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style rel="stylesheet" lang="scss" scoped>
.paymentCHN{
    height:100%;
    margin-bottom:24px;
    .paymentCHN-ul{
        li{
            height:80px;
            line-height: 80px;
            border-bottom:1px solid #C0C4CC;
            padding-left:55px;
        }
        .lis1{
            img{
                margin:0 75px 0 64px;
                vertical-align: middle;
            }
            span{
                font-size:18px;
                color:#50688C;
            }
        }
        .lis2{
            img{
                margin:0 40px 0 24px;
                vertical-align: middle;
            }
            span{
                font-size:18px;
                color:#50688C;
            }
        }
        .lis3{
            span:nth-child(1){
                margin-left:24px;
                font-size:18px;
                color:#50688C;
            }
            span:nth-child(2){
                font-size:18px;
                color:#606266;
            }
        }
        .lis4{
            span:nth-child(1){
                margin-left:24px;
                font-size:18px;
                color:#606266;
            }
            span:nth-child(2){
                margin:0 218px 0 32px;
                font-size:22px;
                color:#158BE4;
            }
            span:nth-child(3){
                width:100px;
                height:32px;
                display:inline-block;
                background:#67C23A;
                text-align: center;
                line-height: 32px;
                border-radius:4px;
                color:#fff;
                cursor:pointer;
            }
        }
    }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.paymentCHN{
  //取消单选按钮el-radio__label的样式
  .el-radio{
    .el-radio__input{
      .el-radio__inner{
        width:26px !important;
        height:26px !important;
      }
    }
    .el-radio__input.is-checked .el-radio__inner{
      background:#F5A623;
      border-color:#F5A623;
    }
    .el-radio__inner:hover{
      border-color:#F5A623;
    }
    .el-radio__inner::after{
      width:6px !important;
      height:6px !important;
    }
    .el-radio__label{
      display:none !important;
    }
  }
}

</style>

