
<template>
  <div class="app">
    <!-- 头部 -->
    <HeadTop :title="headTitle"></HeadTop>
    <!-- 显示不同的界面 -->
    <div>
      <router-view></router-view>
    </div>
    <!-- 占位用？？？ -->
    <div class="buttom"></div>

    <mu-row justify-content="center" class="footerGuide">
      <mu-col span="12">
        <mu-bottom-nav
          ripple
          :value.sync="shift"
          color="amber800"
          @change="getHead"
        >
          <mu-bottom-nav-item
            value="Location"
            title="人员定位"
            icon="accessibility_new"
            to="/Init/Location"
            replace
          ></mu-bottom-nav-item>
          <mu-bottom-nav-item
            value="PersonInfo"
            title="出勤信息"
            icon="assignment"
            to="/Init/PersonInfo"
            replace
          ></mu-bottom-nav-item>
          <mu-bottom-nav-item
            value="Analysis"
            title="环境监测"
            icon="assessment"
            to="/Init/Analysis"
            replace
          ></mu-bottom-nav-item>
          <mu-bottom-nav-item
            value="Warning"
            title="预警信息"
            icon="info"
            to="/Init/Warning"
            replace
          ></mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-col>
    </mu-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// 引入HeadTop组件
import HeadTop from "../../components/HeadTop/HeadTop.vue";
// 给实例注入HeadTop属性（就是把HeadTop映射成标签）
@Component({
  components: {
    HeadTop,
  },
})
export default class Init extends Vue {
  // 定义shift属性标记点击的什么图标，默认为Location
  private shift: String = "Location";
  //定义传给HeadTop的title属性值
  public headTitle: String = "";

  // @change="getHead"，改变点击的图标所对应的属性值， @change监听表单内容发生改变
  getHead() {
    if (this.shift === "Location") {
      this.headTitle = "人员定位";
    } else if (this.shift === "PersonInfo") {
      this.headTitle = "出勤信息";
    } else if (this.shift === "Analysis") {
      this.headTitle = "环境监测";
    } else if (this.shift === "Warning") {
      this.headTitle = "预警信息";
    }
  }
  //点击之后的值对应有一个路由路径，这个是一个异步的
  async redirectTab() {
    // $route.path.split获取当前路由地址，split字符转数组，使用/字符分割
    let values = this.$route.path.split("/");
    // 获取后台传入的数据将路径分割之后得到数组中最后一个的值，赋值给shift，shift是标记点击了什么图标
    this.shift = this.$route.path.split("/")[values.length - 1];
    // 同时把值也传给头部组件
    this.getHead();
  }

  mounted() {
    this.redirectTab();
  }
}
</script>

<style lang="scss">
.app {
  .bottom {
    width: 100%;
    height: 300px;
    background-color: #fafafa;
    z-index: 0;
  }
  .footGuide {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1000;
    background-color: #ffffff;
  }
}
</style>
