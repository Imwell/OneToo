<template>
  <div class="page-pay">
    <van-nav-bar
        title="订单支付"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-form ref="form">
      <van-field
          label="姓名"
          v-model="form.username"
          placeholder="请输入收货人姓名"
          :rules="[{ required: true,}]"
          name="name"
      />
      <van-field
          label="收货地址"
          v-model="form.address"
          placeholder="请输入收货地址"
          :rules="[{ required: true,}]"
          name="name"
      />
      <van-field
          label="联系电话"
          v-model="form.phone"
          placeholder="请输入收货人联系电话"
          :rules="[{ required: true,}]"
      />
      <van-radio-group v-model="form.payMethod" direction="horizontal">
        支付方式：
        <van-radio name="1">微信</van-radio>
        <van-radio name="2">支付宝</van-radio>
      </van-radio-group>
    </van-form>
    <div class="order-detail">
      <div class="order-detail-title">
        订单明细：
      </div>
      <div class="order-detail-body" v-for="cart in orderCarts" :key="cart.id">
        <img :src="cart.image" width="100" height="100">
        <div class="order-detail-right">
          <div class="order-detail-content">
            <span>{{ cart.name }}</span>
            <span style="margin-top: 30px;color: orange">￥{{ cart.price }}</span>
          </div>
          <div class="order-detail-number">
            <span style="color: red">x {{ cart.number }}</span>
          </div>
        </div>
      </div>
      <div class="order-detail-footer">
        <div style="color: #9d9d9d">总数量：{{ shopCount }}</div>
        <div style="margin-left: 200px;color: #9d9d9d">总价：￥ {{ sum }}</div>
      </div>
    </div>
    <van-field
        label="备注"
        v-model="form.remark"
        placeholder="备注信息"
    />
    <van-submit-bar :price="sum" button-text="提交订单" @submit="Paymemnt" />
  </div>

</template>

<script>
import {NavBar, Field, Radio, RadioGroup, DropdownMenu, DropdownItem, Button, Form, SubmitBar} from "vant";
import {mapState} from "vuex";
import axios from "axios";
import {addOrder, getName, showCart} from "@/api/front/api";

export default {
  name: "Pay",
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Button.name]: Button,
    [SubmitBar.name]: SubmitBar,
    [Form.name]: Form
  },
  data() {
    return {
      form: {
        remark: '',
        payMethod: '1',
        username: '',
        phone: '',
        address: '',
        number: '',
        amount: '',
        companyName: ''
      },
      orderCarts: [],
    }
  },
  computed: {
    ...mapState('shop', ['sum', 'shopCount'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      showCart({
        userId: (JSON.parse(localStorage.getItem('userInfo'))).id
      }).then(resp => {
        this.orderCarts = resp.data.data
      })
    },
    onClickLeft() {
      this.$router.push('/userhome')
    },
    Paymemnt() {
      if (this.form.companyName) {
        this.$refs.form.validate().then(() => {
          this.form.amount = this.sum
          this.form.number = this.shopCount
          addOrder().then(reps => {
            this.$dialog.alert({
              message: reps.data.data + "去订单查看"
            })
            this.$router.push('/userhome')
          })
        })
      } else {
        this.$dialog.alert({
          message: "请选择门店！"
        })
      }


    }

  }
}
</script>

<style scoped>
.van-radio-group.van-radio-group--horizontal {
  margin: 1rem;
}

.order-detail {
  margin: 0 1rem;
}

.order-detail-title {
  margin-bottom: 1rem;
}

.order-detail-body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  margin: .5rem 0;
}

.order-detail-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.order-detail-footer {
  display: flex;
  margin-top: 1rem;
}

.order-detail-right {
  display: flex;
  width: 70%;
  flex-direction: row;
  justify-content: space-around;
}
.page-pay {
  margin-bottom: 60px;
}
.pay-btn {

}
</style>
