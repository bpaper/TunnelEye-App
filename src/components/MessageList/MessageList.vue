<template>
  <mu-list-item
    avatar
    button
    :ripple="false"
    @click="goMessageContent(list.InfoId)"
  >
    <mu-list-item-action>
      <mu-avatar color="#4caf50" v-if="icon === 0">
        <mu-icon value="check_circle"></mu-icon>
      </mu-avatar>
      <mu-avatar color="#ffca28" v-else-if="icon === 1">
        <mu-icon value="priority_high"></mu-icon>
      </mu-avatar>
      <mu-avatar color="#f44336" v-else-if="icon === 2">
        <mu-icon value="warning"></mu-icon>
      </mu-avatar>
    </mu-list-item-action>
    <mu-list-item-content>
      <mu-list-item-title>{{ list.infoTitle }}</mu-list-item-title>
      <mu-list-item-sub-title>{{ list.infoTime }}</mu-list-item-sub-title>
    </mu-list-item-content>
    <mu-list-item-action>
      <mu-button icon>
        <mu-icon value="info"></mu-icon>
      </mu-button>
    </mu-list-item-action>
  </mu-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class MessageList extends Vue {
  @Prop(Object) public list!: any;
  public icon: number = 0;

  // 根据list中的数据，设置显示时的图标
  chooseIcon() {
    if (this.list.level === "普通") {
      this.icon = 0;
    } else if (this.list.level === "警告") {
      this.icon = 1;
    } else if (this.list.level === "严重") {
      this.icon = 2;
    }
  }

  mounted() {
    this.chooseIcon();
  }

  // 跳转到对应的警报详情，就是警报正文
  goMessageContent(value: number) {
    // 字符串拼接，实现对应跳转
    this.$router.push(`/MessageContent?InfoId=${value}`);
  }

  // 此时DOM的数据已经更新，可以执行依赖DOM的操作，由于数据的更改导致虚拟DOM重新渲染和打补丁，在这之后会调用这个钩子
  //  所有数据发生变化的时候都会调用，执行的时候是数据发生变化且界面更新完毕
  // 表示更新DOM完成
  updated() {
    this.chooseIcon();
  }
}
</script>

<style lang="scss">
</style>
