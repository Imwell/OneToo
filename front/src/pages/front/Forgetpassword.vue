<template>
  <div>
    <van-nav-bar
        title="找回密码"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-form ref="form">
      <van-field
          v-model="form.password"
          label="密码"
          placeholder="请输入新密码"
          type="password"
          :rules="[{ required: true,}]"
      />
      <van-field
          v-model="repassword"
          label="确定密码"
          placeholder="请再次输入新密码"
          type="password"
          :rules="[{ required: true,}]"
          @blur="check2pwd"
      />
      <van-field
          v-model="form.phone"
          label="电话号码"
          placeholder="请输入电话号码"
          :rules="[{ required: true,}]"
      >
        <template #button>
          <!--        &lt;!&ndash; 这里有bug，使用<van-button>无法进行局部表单验证 &ndash;&gt;-->
          <!--        &lt;!&ndash; <van-button size="small" type="primary" @click="getCode">发送验证码</van-button> &ndash;&gt;-->
          <div class="button" @click="getCode">发送验证码</div>
        </template>
      </van-field>
      <van-field label="验证码" v-model="form.code" placeholder="请输入验证码" :rules="[{required: true,
                        message: '验证码不能为空',
                        trigger: 'onBlur'}]">
        <!-- 通过 button 插槽可以在输入框尾部插入按钮 -->

      </van-field>
      <van-button type="primary" style="width: 100%" @click="reset">重置</van-button>
      <van-button type="info" style="width: 100%" @click="submit">找回密码</van-button>

    </van-form>
  </div>
</template>

<script>
import {Button, NavBar, Field, CellGroup, Form, Dialog} from 'vant'
import axios from "axios";
import {forgetPwd} from "@/api/front/api";

export default {
  name: "Forgetpassword",
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
    [Dialog.Component.name]: Dialog.Component
  },
  data() {
    return {
      repassword: '',
      form: {
        password: '',
        phone: '',
        code: ''

      },
    }
  },

  methods: {
    onClickLeft() {
      this.$router.push('/userlogin')
    },
    check2pwd() {
      if (this.repassword != this.form.password) {
        this.TipDialog()
        this.repassword = ''
      }
    },
    getCode() {
      if (this.form.phone.length == 11) {
        var i = Math.random() * (999999 - 100000) + 100000;
        var j = parseInt(i, 10);
        this.form.code = j
      } else {
        // alert('电话号码不符合规范!')
        this.$dialog.alert({
          message: '电话号码不符合规范'
        })
      }
    },
    reset() {
      this.form.password = ''
      this.form.code = ''
      this.form.phone = ''
      this.repassword = ''
    },
    submit() {
      if (this.form.phone.length == 11) {
        this.$refs.form.validate().then(() => {
          forgetPwd(this.form).then(resp => {
            if (String(resp.data.code) === '1') {
              this.$dialog.alert({
                message: '修改密码成功!请重新登录'
              })
              this.$router.push('/userlogin')
            } else {
              this.$dialog.alert({
                message: '修改失败!' + resp.data.msg
              })
            }
          }).catch(() => {
            alert('b')
          })
        })
      } else {
        this.$dialog.alert({
          message: '电话号码必须是11位'
        })
      }

    },
  }
}
</script>

<style scoped>

</style>
