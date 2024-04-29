<template>
  <div>
    <router-view />
    <Shopcart style="position: fixed;bottom: 50px" v-if="scart"/>
    <van-tabbar v-show="active !== 2" route v-model="active" @change="onChange" class="userbottom">
      <van-tabbar-item replace to="/userhome" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/userorder" icon="orders-o">订单</van-tabbar-item>
      <van-tabbar-item replace to="/usermy" icon="manager-o">个人</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
import {Tabbar, TabbarItem} from 'vant'
import Shopcart from "@/pages/front/user/Shopcart";
import {isEmpty} from "@/util/common";

export default {
  name: 'user',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    Shopcart,
  },
  data() {
    return {
      active: 0,
      scart: 'true'
    }
  },
  watch: {
    $route: {
      handler(v) {
        if (!isEmpty(v.meta?.active)) {
          this.onChange(v.meta.active)
        }
      }
    }
  },
  mounted() {
    this.onChange(this.$route.meta.active)
  },
  methods: {
    onChange(index) {
      console.log(index)
      this.active = index
      this.$store.commit('shop/SET_ACTIVE', index)
      if (index === 0) {
        this.scart = true
      } else {
        this.scart = false
      }
    }
  }

}
</script>

<style scoped>
.userbottom {
  position: fixed;
  bottom: 0px;
}
</style>
