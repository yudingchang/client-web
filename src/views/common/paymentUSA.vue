<template>
  <div class="paymentUSA">
    <ul class="paymentUSA-ul">

      <li v-for="(item,index) in propDataUsa" :key="index">
        <el-radio v-model="radio" :label="item.id"/>
        <template v-if="item.id=='5'">
          <span class="lis1">
            <img src="/static/image/paypal.png" alt="">
            <span>PayPal</span>
          </span>
        </template>
        <template v-if="item.name=='visa'">
          <span class="lis2">
            <img src="/static/image/visa.png" alt="">
            <span>VISA</span>
          </span>
        </template>
        <template v-if="item.name=='mastercard'">
          <span class="lis3">
            <img src="/static/image/mastercard.png" alt="">
            <span>Mastercard</span>
          </span>
        </template>
        <!-- <template v-if="item.name=='wallet'">
                 <span class="lis4">
                     <span>钱包</span>
                     <span>$8989.89</span>
                     <span>充值</span>
                 </span>
             </template>
             <template v-if="item.name=='testcoopay'">
                 <span class="lis5">
                     <span>测库月结</span>
                     <span>(你还有一份账单未结算)</span>
                 </span>
             </template> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default{
  name: 'PaymentUSA',
  props: ['propDataUsa'],
  data() {
    return {
      radio: '',
      data: [
        {
          id: 1,
          name: 'paypal'
        },
        {
          id: 2,
          name: 'visa'
        },
        {
          id: 3,
          name: 'mastercard'
        }
      ]

    }
  },
  watch: {
    // 监听页面按钮点击触发的事件
    radio(val) {
      // console.log(val)
      this.radio = val
      this.$emit('receiveDateUsa', this.radio)
      console.log(val + '这是val')
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.paymentUSA{
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

<style rel="stylesheet" lang="scss" scoped>

.paymentUSA{
    height:100%;
    margin-bottom:24px;
    .paymentUSA-ul{
        li{
            height:80px;
            line-height: 80px;
            border-bottom:1px solid #C0C4CC;
            padding-left:55px;
        }
        .lis1{
            img{
                margin:0 31px 0 29px;
                vertical-align: middle;
            }
            span{
                font-size:18px;
                color:#50688C;
            }
        }
        .lis2{
            img{
                margin:0 44px 0 41px;
                vertical-align: middle;
            }
            span{
                font-size:18px;
                color:#50688C;
            }
        }
        .lis3{
            img{
                margin:0 70px 0 68px;
                vertical-align: middle;
            }
            span{
                font-size:18px;
                color:#50688C;
            }
        }
        .lis4{
            span:nth-child(1){
                margin-left:24px;
                font-size:18px;
                color:#606266;
            }
            span:nth-child(2){
                display:inline-block;
                margin:0 218px 0 32px;
                font-size:22px;
                color:#158BE4;
                line-height: 24px;
                height:24px;
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
        .lis5{
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
    }
}
</style>

