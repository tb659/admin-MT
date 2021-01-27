<!--
 * @Author: tb659
 * @Date: 2021-01-23 20:30:17
 * @LastEditors: tb659
 * @LastEditTime: 2021-01-27 22:03:40
 * @Description: 页面主体头部
 * @FilePath: \admin-MT\src\components\ContainerHeader\index.vue
-->
<template>
  <el-row :gutter="24" class="containerHeader">
    <el-col :span="left">
      <slot name="left"></slot>
    </el-col>
    <el-col slot="right" :span="right"> </el-col>
    <el-col :span="12" class="operatingButton">
      <slot name="right"></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ContainerHeader',
  props: {
    left: {
      type: Number,
      default: 12
    },
    right: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
  background-color: #fff;
  padding: 16px 10px;
  height: 64px;

  ::v-deep.el-form {
    height: 32px;
  }

  .operatingButton {
    @include flexbox;
    @include flex-just(flex-end);
  }
}
</style>
