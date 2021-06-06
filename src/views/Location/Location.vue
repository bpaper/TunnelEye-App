<template>
  <div class="main">

    <div class="siteTitle">选择信息</div>
    <mu-row class="siteWrap">
      <mu-col span="12" lg="4" sm="6">
        <mu-select
          label="请选择下位机"
          v-model="nowAddress"
          full-width
          class="choose"
        >
          <mu-option
            v-for="(option, index) in machineAdd"
            :key="index"
            :label="option"
            :value="option"
          ></mu-option>
        </mu-select>
      </mu-col>
    </mu-row>

    <div class="subWrap">
      <div class="title">定位分布</div>
      <div class="choose">
        <div class="content">
          <p class="text">主控机</p>
        </div>
        <div class="chooseSite">
          <mu-button ref="button" icon >
            <mu-icon value="keyboard_arrow_down"></mu-icon>
          </mu-button>
          <mu-popover cover :open.sync="open" :trigger="trigger">
            <mu-list>
              <mu-list-item v-for="(val, index) in sysId" :key="index" button >
                <mu-list-item-title>主控机</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-popover>
        </div>
    </div>
  </div>
<!-- 定位分布选择显示部分 -->

<!-- 定位信息组件 -->
 <mu-row gutter justify-content="center">
      <mu-col span="12" class="list"> 
        <div class='title'>定位信息</div>

        <LocationInfo :locationInfo="locationInfo"></LocationInfo>

      </mu-col>
    </mu-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LocationInfo from "../../components/LocatingInfo/LocationInfo.vue";

import moment from "moment";
</script>

<style lang="scss">
.main {
  .siteTitle {
    margin-top: 80px;
    font-size: 80px;
    &::before {
      content: "";
      border-left: 20px #ff6f00 solid;
      padding-left: 30px;
    }
    margin-bottom: 80px;
  }

  .siteWrap {
    display: block;
    width: 90%;
    margin: 0 auto;
    .choose {
      font-size: 86px;
    }
  }

  .title {
    font-size: 70px;
    .site {
      float: left;
    }
    .status {
      float: right;
    }
  }

  .loading {
    margin: 10px 100px;
  }

  .text {
    color: #2d3a4b;
    text-align: center;
    margin: 10px 0;
  }

  .direct {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .base {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .area {
        width: 50px;
        height: 50px;
        background-color: rgb(255, 187, 198);
        border-radius: 50px;
        margin: 0 30px;
      }
      .square {
        width: 50px;
        height: 50px;
        background-color: #aa00ff;
        border-radius: 50px;
        margin: 0 30px;
      }
      .circle {
        width: 50px;
        height: 50px;
        background: red;
        border-radius: 50px;
        margin: 0 30px;
      }
    }
  }

  .subWrap {
    position: relative;
    margin-bottom: 80px;
    .title {
      font-size: 80px;
      &::before {
        content: "";
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
    }
    .choose {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      position: absolute;
      top: 0;
      right: 0;
      .content {
        font-size: 70px;
        margin-top: 35px;
      }
    }
  }

  .alert {
    width: 90%;
    margin: 30px auto;
    .icon {
      margin-right: 30px;
    }
    .content {
      font-size: 66px;
    }
  }

  .update {
    position: absolute;
    right: 65px;
    bottom: 0;
    width: 10%;
    height: 10%;
  }

  .list {
    margin-top: 50px;
    .title {
      color: black;
      font-size: 80px;
      margin-bottom: 30px;
      &::before {
        content: "";
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
    }
  }

  .subTitle {
    margin-top: 80px;
    font-size: 80px;
    &::before {
      content: "";
      border-left: 20px #ff6f00 solid;
      padding-left: 30px;
    }
  }

  .goPhysicalSign {
    display: block;
    margin: 40px auto;
    width: 60%;
  }

  .chartWrap {
    .chart {
      width: 100%;
      margin: 30px auto;
      .echarts {
        width: 100% !important;
      }
    }
  }
}
</style>
