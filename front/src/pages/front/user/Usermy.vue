<template>
<div class="page-user-my">
  <div class="user-head">
    <van-image
        round
        width="100"
        height="100"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <span>{{ userinfo.name }}</span>
  </div>
  <van-grid class="grid-sort" :border="false" :column-num="2">
    <van-grid-item icon="wap-home-o" text="首页" @click="toUrl('/userhome')"/>
    <van-grid-item icon="orders-o" text="订单" @click="toUrl('/userorder')" />
  </van-grid>
  <div class="user-detail">
    <van-cell title="余额" :value="userinfo.money" />
  </div>
  <van-button type="warning" class="logout-btn" style="width: 100%" @click="logout">退出登录</van-button>
</div>
</template>

<script>
import {Button,Image,Notify,Divider,Grid, GridItem,TabbarItem,Cell} from "vant";
import {logout} from "@/api/front/api";
import {getUser} from "@/util/user";
import {isEmpty} from "@/util/common";

export default {
  name: "Usermy",
  components:{
    [Button.name]:Button,
    [Cell.name]:Cell,
    [Image.name]:Image,
    [Divider.name]:Divider,
    [Grid.name]:Grid,
    [GridItem.name]:GridItem,
    [TabbarItem.name]:TabbarItem,
  },
  data() {
    return {
      userinfo: {}
    }
  },
  created() {
    const user = getUser()
    console.log(user)
    if (isEmpty(user)) {
      Notify('未登录，请重新登录')
      this.$router.push('/userlogin')
    }
    this.userinfo = user
  },
  methods:{
    toUrl(url) {
      this.$router.push(url)
    },
    logout(){
      logout().then(resp => {
        if (resp.data.code === 200) {
          localStorage.removeItem('userInfo')
          this.$router.push('/userlogin')
          this.$dialog.alert({
            message:"退出成功"
          })
        } else {
          this.$dialog.alert({
            message:resp.data.data
          })
        }
    })
  }
}
}
</script>

<style scoped>
.user-head {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(to right, rgb(255, 153, 0), rgb(255, 204, 51));
  border-bottom: 1px solid silver;
  color: red;
}
.logout-btn {
  position: absolute;
  bottom: 0;
}
.grid-sort {
  margin: 1rem;
}
.page-user-my {
  background: #e1e1e130;
  height: 100vh;
}
.user-detail {
  margin: 0 1rem;
}
</style>
