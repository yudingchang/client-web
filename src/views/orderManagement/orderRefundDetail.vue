<template>
  <div class="orderRefundDetail">
    <el-row>
      <el-col :span="24">
        <div class="Refund-close">
          <p>订单号</p>
          <p>2018050310291584</p>
          <p>关闭退单</p>
        </div>
        <div class="Refund-result">
          <p>处理结果</p>
          <p>退单失败 （原因：跟客户沟通确认已经前往验货，不退单）</p>
          <p>退客户金额￥799.00</p>
        </div>
        <div class="Refund-progress">
          <p>退单进度</p>
          <p>
            <span>退单申请</span>
            <span>处理中</span>
            <span>退单失败</span>
          </p>
          <p class="refund-step">
            <el-steps :active="activeData">
              <el-step title="步骤 1" icon="iconfont icon-duihao"/>
              <el-step title="步骤 2" icon="iconfont icon-duihao"/>
              <el-step title="步骤 3" icon="iconfont icon-duihao"/>
            </el-steps>
          </p>
        </div>
        <div class="Refund-reason">
          <p>退单原因</p>
          <p>不要了</p>
        </div>
        <div class="Refund-remark">
          <p>备注信息</p>
          <p>下错了</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'OrderRefundDetail',
  data() {
    return {
      // 进度条进度active
      activeData: 3
    }
  },
  methods: {

  }

}
</script>

<style rel="stylesgeet/scss" lang="scss" scope>
//普通样式
.orderRefundDetail{
    padding:60px 0 0 100px;
    .Refund-close{
        height:40px;
        p{
            float:left;
        }
        p:nth-child(1){
            height:40px;
            font-size:16px;
            color:rgba(124,140,165,1);
            line-height:40px;
            margin-right:55px;
        }
        p:nth-child(2){
            height:40px;
            font-size:16px;
            color:rgba(80,104,140,1);
            line-height:40px;
            margin-right:40px;
        }
        p:nth-child(3){
            width:100px;
            height:40px;
            background:rgba(103,194,58,1);
            border-radius:4px;
            line-height: 40px;
            text-align: center;
            font-size:16px;
            color:rgba(255,255,255,1);
            cursor:pointer;
        }
    }
    .Refund-result{
        margin-top:24px;
        height:21px;
        p{
            float:left;
            height:21px;
            font-size:16px;
            color:rgba(80,104,140,1);
            line-height:21px;
            color:rgba(80,104,140,1);
        }
        p:nth-child(1){
            color:rgba(124,140,165,1);
            margin-right:40px;
        }
    }
    .Refund-progress{
        margin-top:32px;
        p:nth-child(1){
            height:24px;
            font-size:18px;
            color:rgba(80,104,140,1);
            line-height:24px;
            margin-bottom:25px;
        }
        p:nth-child(2){
            width:668px;
            height:21px;
            font-size:16px;
            color:rgba(124,140,165,1);
            line-height:21px;
            margin-bottom:9px;
            span{
                margin-right:241px;
            }
            span:nth-child(3){
                margin:0;
            }
        }
    }
    .Refund-reason{
        height:21px;
        margin-top:32px;
        p{
            float:left;
            height:21px;
            font-size:16px;
            color:rgba(124,140,165,1);
            line-height:21px;
        }
        p:nth-child(2){
            height:21px;
            font-size:16px;
            color:rgba(80,104,140,1);
            line-height:21px;
            margin-left:40px;
        }
    }
    .Refund-remark{
        height:21px;
        margin-top:25px;
        p{
            float:left;
            height:21px;
            font-size:16px;
            color:rgba(124,140,165,1);
            line-height:21px;
        }
        p:nth-child(2){
            height:21px;
            font-size:16px;
            color:rgba(80,104,140,1);
            line-height:21px;
            margin-left:40px;
        }
    }
}

</style>

<style rel="stylesgeet/scss" lang="scss">
//element-ui样式
.orderRefundDetail{
    //step进度条
    .refund-step{
        .el-steps--horizontal{
            width:668px;
            .el-step__head.is-process{
                color:rgba(223,227,233,1);
                line-height:24px;
                .el-step__line{
                    height:12px;
                    line-height:12px;
                    background:rgba(223,227,233,1);
                    top:6px;
                    // padding-left:2px;
                    left:10px;
                }
                .el-step__icon{
                    // background:none;
                    width:24px;
                    height:24px;
                    background:rgba(223,227,233,1);
                    border-radius:50%;
                    z-index: 2;
                    color:transparent;
                }
            }
            .el-step__head.is-finish{
                color:rgba(103,194,58,1);

                .el-step__line{
                    height:12px;
                    line-height:12px;
                    background:rgba(103,194,58,1);
                    top:6px;
                    margin-left:2px;
                    border:none;
                }
                .el-step__icon{
                    // background:none;
                    width:24px;
                    height:24px;
                    background:rgba(103,194,58,1);
                    border-radius:50%;
                    color:transparent;
                }
            }
            .el-step__head.is-wait{
                .el-step__line{
                    height:12px;
                    line-height:12px;
                    background:rgba(223,227,233,1);
                    top:6px;
                    left:3px;
                }
                .el-step__icon{
                    width:24px;
                    height:24px;
                    background:rgba(223,227,233,1);
                    border-radius:50%;
                    color:transparent;
                }
            }
        }
        .el-step__main{
            margin-top:9px;
            .el-step__title.is-finish{
                height:18px;
                font-size:16px;
                color:rgba(80,104,140,1);
                line-height:18px;
            }
            .el-step__title.is-process{
                height:18px;
                font-size:16px;
                color:rgba(80,104,140,1);
                line-height:18px;
                font-weight:100;
            }
            .el-step__title.is-wait{
                height:18px;
                font-size:16px;
                color:rgba(80,104,140,1);
                line-height:18px;
            }
        }
    }
}

</style>
