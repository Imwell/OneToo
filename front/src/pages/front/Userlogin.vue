<template>
  <div>
    <van-nav-bar
        title="欢迎登录"
    />
    <van-form ref="form">
      <van-field
          label="用户名"
          v-model="form.username"
          placeholder="请输入用户名"
          :rules="[{ required: true,}]"
          name="username"
      />
      <van-field
          v-model="form.password"
          label="密码"
          placeholder="请输入密码"
          type="password"
          :rules="[{ required: true,}]"
      >
        <template #button>
          <van-button type="primary" size="small" @click="forget">忘记密码</van-button>
        </template>
      </van-field>
      <van-button type="primary" style="width: 100%" @click="login">登录</van-button>
      <van-button type="info" style="width: 100%" @click="registermember">注册</van-button>
    </van-form>
  </div>
</template>

<script>
import {Button, NavBar, Field, CellGroup, Form, Notify} from 'vant'
import 'vant/lib/button/style';
import axios from "axios";
import {login} from "@/api/front/api";

export default {
  name: "Userlogin",
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Notify.name]: Notify,
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    login() {
      this.$refs.form.validate().then(() => {
        login(this.form).then(resp => {
          console.log(resp)
          if (resp.data.code === 200) {
            localStorage.setItem('userInfo', JSON.stringify(resp.data.data))
            this.$notify.success({
              message: '登录成功',
              duration: 1000,
              type: 'success'
            })
            this.$router.push('/user')
          } else {
            alert(resp.data.msg)
            this.loading = false
          }

        }).catch(() => {
          alert('b')
        })
      })

    },
    registermember() {
      this.$router.push('/register')
    },
    forget() {
      this.$router.push('/forgetpassword')
    }
  }
}
</script>

<style scoped>
.van-cell {
  align-items: center;
}
</style>
