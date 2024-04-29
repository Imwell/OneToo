<template>
  <div>
    <van-nav-bar
        title="我的订单"
    />
    <div class="order-list" v-for="order in orderList" :key="order.id">
      <div v-if="GetUserId(order.userId)">
        <div class="order-content-inline">
          <div>
            订单号：{{ order.orderNo }}
          </div>
          <div class="order-status">
            {{ getOrderStatus(order) }}
          </div>
        </div>
        <div class="order-detail">
          <van-grid :column-num="orderDetail.length" :gutter="5">
            <van-grid-item v-for="detail in orderDetail" :key="detail.id">
              <img :src="detail.image" width="80" height="80"/>
              <van-row class="w100 order-detail-detail">
                <van-col span="16" class="order-detail-content">{{ detail.name }}</van-col>
                <van-col span="8" class="order-detail-content-amount">x {{ detail.amount }}</van-col>
              </van-row>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="order-content-inline">
          <span class="order-detail-content">下单时间：{{ order.orderTime }}</span>
          <span class="order-detail-amount">￥{{ order.amount }}  共{{ order.number }}件</span>
        </div>
        <div class="order-footer-btn">
          <van-button class="order-btn" size="small" color="linear-gradient(to right, #ff9900, #ffcc33)" @click="receipt(order)">
            确定收货
          </van-button>
          <van-button class="order-btn" size="small" color="red" @click="cancel(order)">
            取消订单
          </van-button>
        </div>
      </div>
      <van-divider/>
    </div>

  </div>
</template>

<script>
import {NavBar, Button, Dialog, Divider, Grid, GridItem, Image, Col, Row} from "vant";
import {cancelOrder, getOrder, getOrderDetail, receiptOrder} from "@/api/front/api";

export default {
  name: "Userorder",
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Divider.name]: Divider,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [Col.name]: Col,
    [Row.name]: Row,
  },
  data() {
    return {
      orderDetail: [],
      orderList: [],
      orderIds: [],
      orderDetailOne: {}
    }
  },
  computed: {},
  mounted() {
    this.initOrder()

  },
  methods: {
    GetUserId(orderId) {
      if ((JSON.parse(localStorage.getItem('userInfo'))).id === orderId)
        return true
      else return false

    },
    initOrder() {
      getOrder().then(resp => {
        this.orderList = resp.data.data
        this.orderList.forEach((order) => {
          this.orderIds.push(order.id)
        })
        this.initOrderDetail()
      })
    },
    initOrderDetail() {
      getOrderDetail({
        ids: this.orderIds,
      }).then(resp => {
        this.orderDetail = resp.data.data
      }).catch(() => {
        this.$dialog.alert({
          message: '访问出错了！'
        })
      })
    },
    getimage(image) {
      return image
    },
    receipt(order) {
      if (order.status === 3) {
        order.status = 5
        receiptOrder(order).then(resp => {
          this.$dialog.alert({
            message: resp.data.data
          })
        })
      } else {
        this.$dialog.alert({
          message: "操作失败"
        })
      }
    },
    cancel(order) {
      if (order.status === 1) {
        order.status = 6
        Dialog.confirm({
          title: '取消订单',
          message: '确定取消订单吗？'
        }).then(() => {
          cancelOrder(order).then(() => {
            this.$dialog.alert({
              message: "订单取消成功"
            })
          })
        })
      } else {
        this.$dialog.alert({
          message: "操作失败"
        })
      }
    },
    getOrderStatus(order) {
      switch(order.status) {
        case 1:
          return '商家准备中'
        case 2:
          return '待派送'
        case 3:
          return '派送中'
        case 4:
          return '已派送'
        case 5:
          return '交易完成'
        case 6:
          return '交易取消'
        default:
          return '未知'
      }
    }
  }


}
</script>

<style scoped>
.order-list {
  display: flex;
  flex-direction: column;
}

.order-detail {
  margin-top: 10px;
  justify-content: space-around;
}

.order-content-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .5rem;
}
.order-detail-detail {
  margin-top: .5rem;
  height: 1.3rem;
  line-height: 1.3rem;
}
.order-footer-btn {
  text-align: right;
}
.order-status {
  color: #737373;
  font-size: 14px;
}
.order-btn {
  border-radius: 30px;
  margin-right: 1rem;
}
.order-detail-content {
  font-size: 14px;
}
.order-detail-amount {
  font-size: 14px;
}
.order-detail-content-amount {
  color: #cccccc;
  font-size: 12px;
}
.van-grid-item__content {
  padding: 1rem;
}
.van-grid {
  overflow: scroll;
  flex-wrap: nowrap;
}
</style>
