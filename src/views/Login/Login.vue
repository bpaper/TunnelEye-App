<template>
  <div class="login-container">
    <img src="../../assets/logo.png" alt="LoginLogo" class="logo" />
    <div class="title-container">
      <p>隧道环境及人员</p>
      <p>监测系统</p>
    </div>

    <mu-container>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-form-item
          icon="account_circle"
          prop="username"
          :rules="usernameRules"
        >
          <mu-text-field
            placeholder="用户名"
            v-model="validateForm.username"
            prop="username"
          >
          </mu-text-field>
          <!-- 三目运算符设置点击图片密码可见 -->
        </mu-form-item>
        <mu-form-item icon="locked" prop="password" :rules="passwordRules">
          <mu-text-field
            placeholder="密码"
            v-model="validateForm.password"
            prop="password"
            :action-icon="visibility ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility = !visibility)"
            :type="visibility ? 'text' : 'password'"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item icon="code" prop="captcha" :rules="captchaRules">
          <mu-text-field
            v-model="validateForm.captcha"
            placeholder="验证码"
          ></mu-text-field>
          <img
            class="captcha"
            :src="this.$store.state.captcha"
            alt="captcha"
            @click="changeCaptcha"
          />
        </mu-form-item>

        <mu-form-item>
          <mu-button color="indigo400" @click="submit" round full-width ripple
            >登录</mu-button
          >
        </mu-form-item>
      </mu-form>
    </mu-container>

    <mu-dialog title="提示" width="360" :open.sync="alert">
      <p class="alert">{{ alertText }}</p>
      <mu-button slot="actions" flat color="red800" @click="closeSimpleDialog"
        >关闭</mu-button
      >
    </mu-dialog>

    <div class="bio-container">
      <p>Copyright © paper</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validateForm } from "./constraint";
// 引入加密模块
import { encrypt } from "../../util/crypto";
@Component
export default class Login extends Vue {
  private validateForm: validateForm = {
    username: "admin",
    password: "123456",
    captcha: "",
  };
  private visibility = false;
  private alert = false;
  private alertText = "";

  data() {
    return {
      usernameRules: [
        {
          validate: (val: any) => !!val,
          message: "请填写用户名",
        },
        {
          validate: (val: any) => val.length >= 3,
          message: "用户名长度大于3",
        },
      ],
      passwordRules: [
        {
          validate: (val: any) => !!val,
          meseage: "请输入密码",
        },
        {
          validate: (val: any) => val.length >= 3 && val.length <= 10,
          message: "密码长度不大于3不小于10",
        },
      ],
      captchaRules: [
        {
          validate: (val: any) => !!val,
          message: "请填写验证码",
        },
      ],
    };
  }
  //  验证登录
  async submit() {
    if (
      this.validateForm.username !== "" &&
      this.validateForm.password !== "" &&
      this.validateForm.captcha !== ""
    ) {
      await this.$store.dispatch("getUserInfo", this.validateForm);
      // 比较store中从后台传入的数据定义的userinfo中的数据是否为空
      if (this.$store.state.userInfo) {
        //比较是否相同
        if (this.$store.state.userInfo.success === "true") {
          //  调用encrypto加密
          let token: string = encrypt(this.$store.state.userInfo.token);
          let userInfo: string = encrypt(
            JSON.stringify(this.$store.state.userInfo.user)
          );
          // 存入sessionStorage
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userInfo", userInfo);
          //正确跳转到init组件
          this.$router.replace("/Init");
        } else {
          // 不正确调用openSimpleDialog方法
          this.openSimpleDialog(this.$store.state.userInfo.msg);
        }
      } else {
        // 不正确调用openSimpleDialog方法
        this.openSimpleDialog("服务器错误!");
      }
    } else {
      // 不正确调用openSimpleDialog方法
      this.openSimpleDialog("信息不能为空!");
    }
  }

  // 获取验证码图片
  async changeCaptcha() {
    await this.$store.dispatch("getCaptcha");
  }
  // 验证码图片生命周期
  mounted() {
    this.changeCaptcha();
  }
  //打开提示框
  openSimpleDialog(alertText: string): void {
    this.alert = true;
    this.alertText = alertText;
  }
  // 关闭提示框
  closeSimpleDialog(): void {
    this.alert = false;
    this.alertText = "";
  }
}
</script>

<style lang="scss">
$font: #2d3a4b;
$bio: #2d3a4bcb;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $light_gray;
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .logo {
    width: 85px;
    height: 85px;
    margin: 50px auto 50px auto;
  }

  .title-container {
    font-size: 14px;
    color: $font;
    margin: 0px auto 18px auto;
    text-align: center;
    font-weight: bold;
  }

  .mu-demo-form {
    width: 90%;
    margin: 0 auto;
    position: relative;
    .captcha {
      position: absolute;
      bottom: 20px;
      right: -10px;
    }
  }

  .bio-container {
    font-size: 6px;
    color: $bio;
    position: absolute;
    bottom: 10px;
    right: 60px;
  }

  .alert {
    color: $font;
  }
}
</style>
