<template>
  <mu-appbar style="width: 100%" color="primary" class="topBar">
    <mu-menu slot="left">
      <mu-button icon class="icon">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <mu-list slot="content">
        <mu-list-item button @click="goUserInfo">
          <mu-list-item-content>
            <mu-list-item-title>账号信息</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button @click="logout">
          <mu-list-item-content>
            <mu-list-item-title>退出登录</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-menu>

    <div slot="default" class="title">
      <div>{{ title }}</div>
      <div>{{ time }}</div>
    </div>
  </mu-appbar>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
//引入moment库
import moment from "moment";
@Component
export default class HeadTop extends Vue {
  @Prop(String) private title!: string;
  private time: string = "";

  // 点击退出,移除sessionstorage中存放的数据，路由到登录页面
  logout(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userInfo");
    this.$router.push("/");
  }

  //用户信息点击跳转到userinfo界面
  goUserInfo(): void {
    this.$router.push("/UserInfo");
  }

  // 对显示的日期进行格式化
  mounted() {
    setInterval(() => {
      this.time = moment().format("YYYY年M月D日");
    }, 100);
  }
}
</script>

<style lang="scss">
.topBar {
  .title {
    font-size: 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .icon {
    margin-top: 20px;
  }
}
</style>
