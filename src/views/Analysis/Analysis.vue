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
</template>

<script lang="ts">
</script>

<style lang="scss">
</style>
