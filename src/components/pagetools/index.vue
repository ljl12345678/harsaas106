<template>
  <el-card class="pageTools">
    <el-row type="flex" justify="center" align="middle">
      <el-col>
        <!-- 前插槽 -->
        <!-- 有名的具名插槽 -->
        <div v-if="showbefore" class="before">
          <i class="el-icon-info" />
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <!-- 后 -->
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
props: {
    showbefore: {
        default: false,
        type: Boolean
    }
}
}
</script>

<style lang='scss'>
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
 }
</style>
