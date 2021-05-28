<template>
  <div class="waring">
    <p class="title">当日天气</p>

    <mu-row class="weather" v-if="weatherData.has === 1">
      <mu-alert color="#ec407a" class="item">
        <mu-icon class="icon" value="filter_drama">
          <p class="content">{{ weatherData.city }}</p>
        </mu-icon>
      </mu-alert>

      <mu-alert color="#039be5" class="item">
        <mu-icon class="icon" value="wb_cloudy">
          <p class="content">{{ weatherData.type }}</p>
        </mu-icon>
      </mu-alert>

      <mu-alert color="#9c27b0" class="item">
        <mu-icon class="icon" value="toys">
          <p class="content">{{ weatherData.windPower }}</p>
        </mu-icon>
      </mu-alert>
      <mu-alert color="#ffca28" class="item">
        <mu-icon class="icon" value="wb_sunny">
          <p class="content">{{ weatherData.average }}</p>
        </mu-icon>
      </mu-alert>
      <mu-alert color="#4caf50" class="item">
        <mu-icon class="icon" value="network_check">
          <p class="content">{{ weatherData.low }}</p>
        </mu-icon>
      </mu-alert>

      <mu-alert color="#f44336" class="item">
        <mu-icon class="icon" value="flash_on">
          <p class="content">{{ weatherData.high }}</p>
        </mu-icon>
      </mu-alert>
    </mu-row>

    <mu-row v-else-if="weatherData.has === -1">
      <mu-alert color="error" class="alert">
        <mu-icon class="icon" value="warning"> </mu-icon>
        <p class="content">抱歉，当前位置获取失败，暂无数据</p>
      </mu-alert>
    </mu-row>

    <mu-row v-else-if="weatherData.has === 0" justify-content="center">
      <mu-circular-progress
        class="loading"
        color="primary"
        :stroke-width="7"
        :size="56"
      ></mu-circular-progress>
      <mu-circular-progress
        class="loading"
        color="secondary"
        :stroke-width="7"
        :size="56"
      ></mu-circular-progress>
      <mu-circular-progress
        class="loading"
        color="warning"
        :stroke-width="7"
        :size="56"
      ></mu-circular-progress>
    </mu-row>

    <p class="title">安全手册</p>
    <mu-row>
      <mu-col span="12" lg="4" sm="6">
        <mu-carousel transition="fade" interval="3000" class="carousel">
          <mu-icon value="navigate_before" slot="left"></mu-icon>
          <mu-icon value="navigate_next" slot="right"></mu-icon>

          <template slot="indicator" slot-scope="{ index, active }">
            <mu-button
              icon
              class="mu-carousel-indicator-button"
              :class="{ 'mu-carousel-indicator-button__active': active }"
              @click="changeActive(index)"
            >
              <span class="rect-indicator"></span>
            </mu-button>
          </template>
          <mu-carousel-item>
            <img :src="carouselImg1" class="img" />
          </mu-carousel-item>
          <mu-carousel-item>
            <img :src="carouselImg2" class="img" />
          </mu-carousel-item>
          <mu-carousel-item>
            <img :src="carouselImg3" class="img" />
          </mu-carousel-item>
        </mu-carousel>
      </mu-col>
    </mu-row>

    <p class="title">预警信息</p>
    <mu-row class="hint">
      <mu-sub-header class="sunHeader">预警程度</mu-sub-header>
      <mu-chip class="demo-chip" color="#4caf50">
        <mu-icon left vlaue="check_circle"></mu-icon>普通
      </mu-chip>
      <mu-chip class="demo-chip" color="#ffca28">
        <mu-icon left vlaue="priority_high"></mu-icon>警告
      </mu-chip>
      <mu-chip class="demo-chip" color="#f44336">
        <mu-icon left vlaue="warning"></mu-icon>严重
      </mu-chip>
    </mu-row>

    <mu-tabs
      :value.sync="sync"
      inverse
      color="secondary"
      text-color="rgba(0, 0, 0, .54)"
      center
      full-width
    >
      <mu-tab @click="changeTab">消息预警</mu-tab>
      <mu-tab @click="changeTab">传感器预警</mu-tab>
    </mu-tabs>

    <mu-row class="listWarp" v-if="sync === 0">
      <mu-col span="12" lg="4" sm="6">
        <mu-list textline="two-line" class="list">
          <mu-sub-header class="subHeader">消息预警</mu-sub-header>
          <MessageList
            v-for="(list, index) in lists"
            :key="index"
            :list="list"
          ></MessageList>
        </mu-list>

        <mu-container>
          <mu-flex justify-content="center">
            <mu-pagination
              :page-size="pageSize"
              raised
              circle
              :total="total"
              :current.sync="current"
              @change="changePage"
            ></mu-pagination>
          </mu-flex>
        </mu-container>
      </mu-col>
    </mu-row>

    <mu-row class="listWarp" v-if="sync === 1">
      <mu-col span="12" lg="4" sm="6">
        <mu-list textline="two-line" class="list">
          <mu-sub-header class="subHeader">传感器预警</mu-sub-header>
          <MessageList
            v-for="(list, index) in lists"
            :key="index"
            :list="list"
          ></MessageList>
        </mu-list>

        <mu-container>
          <mu-flex justify-content="center">
            <mu-pagination
              :page-size="pageSize"
              raised
              circle
              :total="total"
              :current.sync="current"
              @change="changePage"
            ></mu-pagination>
          </mu-flex>
        </mu-container>
      </mu-col>
    </mu-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { reqIP } from "../../api/index";
import moment from "moment";
import MessageList from "../../components/MessageList/MessageList.vue";
// 引入轮播图图片
import carouselImg1 from "./img/1.jpg";
import carouselImg2 from "./img/2.jpg";
import carouselImg3 from "./img/3.jpg";
@Component({
  components: {
    MessageList,
  },
})
export default class Warning extends Vue {
  // 轮播图的切换变量
  public active: number = 0;
  //本地天气数据
  public weatherData = {
    has: 0,
    city: "",
    type: "",
    windPower: "",
    average: "",
    high: "",
    low: "",
  };
  // 消息类型的切换
  public sync: number = 0;
  //当前页码
  public current: number = 1;
  // 页码总数
  public total: number = 1;
  // 每页数量,每次获取页面的条数
  public pageSize: number = 10;
  // 信息列表
  public lists: Array<any> = [];

  data() {
    return {
      carouselImg1,
      carouselImg2,
      carouselImg3,
    };
  }
  // 点击更改轮播图
  changeActive(index: number) {
    this.active = index;
  }

  //异步获取天气信息
  async getWeather() {
    let IPInfo = await reqIP();
    // 判断ip信息是否为空，或状态正常
    if (IPInfo && IPInfo.status === 200) {
      // 获取城市信息
      let city = IPInfo.data.cityInfo.split("-")[2];
      let data = { city: city };
      //  依据得到的城市信息获取对应城市的天气信息
      await this.$store.dispatch("getWeatherInfo", data);
      let weatherInfo = this.$store.state.weatherInfo;
      // 判断城市天气信息是否为空，或状态是否正常
      if (weatherInfo && weatherInfo.status === 1000) {
        // 使用异步获取的天气数据对本地天气数据进行赋值和运算
        this.weatherData.has = 1;

        //为啥没有和前面的data冲突，已经覆盖了？？？

        let data = weatherInfo.data;
        this.weatherData.city = data.city;
        this.weatherData.type = data.forecast[0].type;

        //计算风力.match匹配过滤数据，只留下0-9
        let windRank = data.forecast[0].fengli.match(/\d/);
        //风力显示格式：data.forecast[0].fengxiang（表示方向）+windRank（表示几级），如东南方4级
        this.weatherData.windPower =
          data.data.forecast[0].fengxiang + windRank + "级";
        // 平均温度
        this.weatherData.average = "平均" + data.wendu + "℃";
        this.weatherData.low = data.forecast[0].low;
        this.weatherData.high = data.forecast[0].high;
      } else {
        this.weatherData.has = -1;
      }
    } else {
      this.weatherData.has = -1;
    }
  }

  //异步获取预警信息列表
  async getMessageLists() {
    let data: any = {};
    // 判断预警种类,是消息预警还是传感器预警
    if (this.sync === 0) {
      data = {
        limit: 6,
        page: this.current,
        type: 0,
      };
    } else if (this.sync === 1) {
      data = {
        limit: 6,
        page: this.current,
        type: 1,
      };
    }
    await this.$store.dispatch("getMessageLists", data);
    let messageLists = this.$store.state.messageLists;
    this.total = messageLists.count;
    this.lists = messageLists.data;
    this.pageSize = data.limit;
  }

  //异步获取当前页面显示的预警信息，就是下方点击切换当前的显示预警信息
  async changePage() {
    // 定义参数
    let data: any = {};
    // 判断预警种类
    if (this.sync === 0) {
      data = {
        limit: 6,
        page: this.current,
        type: 0,
      };
    } else if (this.sync === 1) {
      data = {
        limit: 6,
        page: this.current,
        type: 1,
      };
    }

    await this.$store.dispatch("getMessageLists", data);
    let messageLists = this.$store.state.messageLists;
    this.lists = messageLists.data;
    this.pageSize = data.limit;
  }

  //点击切换显示不同的预警信息
  changeTab() {
    this.getMessageLists();
  }

  mounted() {
    this.getMessageLists();
    this.getWeather();
  }
}
</script>

<style lang="scss">
.warning {
  .title {
    margin: 80px 0;
    font-size: 80px;
    &::before {
      content: "";
      border-left: 20px #ff6f00 solid;
      padding-left: 30px;
    }
  }

  .weather {
    .item {
      width: 520px;
      height: 300px;
      margin: 20px auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .icon {
        margin: 20px auto;
      }
    }
  }

  .alert {
    width: 90%;
    margin: 0 auto;
    .icon {
      margin-right: 30px;
    }
    .content {
      font-size: 66px;
    }
  }

  .loading {
    margin: 10px 100px;
  }

  .carousel {
    height: 1000px;
    width: 100%;
    .item {
      .img {
        height: 1000px;
        width: 100%;
      }
    }
  }

  .hint {
    margin: 80px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .subHeader {
      font-size: 80px;
    }
    .demo-chip {
      margin: 8px auto;
      vertical-align: middle;
      font-size: 66px;
      height: 160px;
    }
  }

  .listWrap {
    margin: 60px 0;
    .list {
      .subHeader {
        font-size: 80px;
      }
    }
  }
}
</style>
