<template>
  <div class="page-user-home">
    <div class="information">
      <div class="canteen-introduction">
        <div class="canteen-name">连锁餐厅</div>
        <van-divider/>
        <div class="canteen-desc">简介: 中餐厅是外卖点餐的独立的品牌，定位“大众
          化的美食外送餐饮”，旨为顾客打造专业美食。
        </div>
      </div>
    </div>
    <div class="goods">
      <div class="goods-category">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item :title="category.name" v-for="category in categoryList" :key="category.id"
                            @click="onChange(category.id)"/>
        </van-sidebar>
      </div>
      <div class="goods-list">
        <van-card
            v-for="dish in dishDate"
            :key="dish.id"
            :price="dish.price"
            :desc="dish.description"
            :title="dish.name"
            :thumb="dish.image"

        >
          <template #footer>
            <van-button size="small" @click="add(dish)">+</van-button>
          </template>
        </van-card>
      </div>
    </div>
    <van-popup
        v-model="show1"
        position="bottom"
        style="bottom: 110px"
        :style="{ height: '30%' }"
    >
      <div>
        <div>
          <span>购物车</span>
          <van-icon name="close" style="float: right" @click="closeShow1"/>
          <span style="float: right;font-weight: 10;font-size: 10px" @click="clearCart">清空</span>
        </div>

        <div style="display: flex;margin-top: 20px;height: 70px" v-for="cart in carts" :key="cart.id">
          <img :src="getimage(cart.image)" style="width: 30%;">
          <div style="display: flex;flex-direction: column;width: 40%;margin-left: 5px">
            <span>{{ cart.name }}</span>
            <span style="margin-top: 30px;color: orange">￥{{ cart.number * cart.price }}</span>
          </div>
          <div style="margin-top: 40px;margin-left: 40px">
            <van-button size="small" @click="reduce(cart)">-</van-button>
            <span style="color: red">{{ cart.number }}</span>
            <van-button size="small" @click="add(cart)">+</van-button>
          </div>
        </div>


      </div>

    </van-popup>

    <van-loading v-show="loading" type="spinner" class="van-loading"/>
  </div>
</template>

<script>
import {Loading, Image, Sidebar, SidebarItem, Notify, Card, Button, Tag, Popup, Icon, Dialog, Divider} from 'vant'
import Shopcart from "@/pages/front/user/Shopcart";
import Dishdetail from "@/pages/front/user/Dishdetail";
import {mapState} from "vuex";
import {addCart, clearCart, displayCategory, reduceCart, selectByCategoryId, showCart} from "@/api/front/api";

export default {
  name: "Userhome",
  components: {
    [Loading.name]: Loading,
    [Image.name]: Image,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Notify.name]: Notify,
    [Card.name]: Card,
    [Button.name]: Button,
    [Tag.name]: Tag,
    Shopcart,
    [Popup.name]: Popup,
    Dishdetail,
    [Icon.name]: Icon,
    [Divider.name]: Divider,
    [Dialog.name]: Dialog

  },
  data() {
    return {
      activeKey: '',
      categoryList: [],
      categoryName: '',
      dishDate: [],
      loading: false,
      //要加入到购物车的dish
      dishCart: {},
      //加入购物车后返回的数据
      cartOne: {},
      carts: [],
      //给购物车传数据
      value: {
        shopCount: 0,
        sum: 0
      }
    }
  },
  created() {


  },
  computed: {
    ...mapState('shop', ['show1', 'sum', 'shopCount']),
  },
  mounted() {
    this.showCarta()
    this.init()
  },
  methods: {
    onChange(id) {
      selectByCategoryId({
        id
      }).then((resp) => {
        this.dishDate = resp.data.data
      }).catch(() => {
        this.$dialog.alert({
          message: '访问出错了'
        })
      })

    },
    getimage(image) {
      return image
    },
    init() {
      displayCategory().then((resp) => {
        this.categoryList = [
          {
            id: 0,
            name: '全部'
          }
        ]
        this.categoryList.push(...resp.data.data)
        this.onChange(this.categoryList[0].id)
      }).catch(() => {
        this.$dialog.alert({
          message: '访问出错了'
        })
      })
    },
    add(dish) {
      addCart(dish).then(resp => {
        this.cartOne = resp.data.data
        this.showCarta()
      })
    },

    showCarta() {
      showCart({
        userId: (JSON.parse(localStorage.getItem('userInfo'))).id
      }).then(resp => {
        this.carts = resp.data.data
        this.changeCart()
        this.OrderCarts()
      })
    },
    OrderCarts() {
      this.$store.commit('shop/ORDERCARTS', this.carts)
    },

    reduce(cart) {
      reduceCart(cart).then(resp => {
        this.showCarta()
      })
    },
    changeCart() {
      this.value.sum = 0
      this.value.shopCount = 0
      this.carts.forEach(cart => {
        this.value.sum += cart.price * cart.number
        this.value.shopCount += cart.number
      })
      this.$store.commit('shop/SHOPALL', this.value)
    },
    closeShow1() {
      var value = false

      this.$store.commit('shop/SHOW', value)
    },
    clearCart() {
      var userId = (JSON.parse(localStorage.getItem('userInfo'))).id
      Dialog.confirm({
        title: '清空购物车',
        message: '确定清空吗？'
      }).then(() => {
        clearCart({
          id: userId
        }).then(resp => {
          this.$dialog.alert({
            message: resp.data.data
          })
          this.showCarta()
          this.closeShow1()
        })
      }).catch(() => {
        // on cancel
      });
    }
  },


}
</script>

<style scoped>
.information {
  position: relative;
  height: 120px;
  background: linear-gradient(to right, rgb(255, 153, 0), rgb(255, 204, 51));
}

.canteen-introduction {
  position: absolute;
  z-index: 2;
  top: 1rem;
  left: 1rem;
  right: 1rem;
}

.canteen-name {
  color: #3c763d;
}

.canteen-desc {
  font-size: 12px;
  color: #a67e9c;
}

.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -15px;
}

.van-divider {
  margin: 8px 0;
}

.goods-category {
  width: 25%;
  position: sticky;
  top: 0;
  display: inline-block;
  vertical-align: top;
}

.goods-list {
  width: 75%;
  display: inline-block;
  margin-top: 5px;
}

.goods {}
</style>
