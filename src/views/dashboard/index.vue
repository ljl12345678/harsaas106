<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <Pagetools :showbefore="true">
      <template v-slot:after>
        <el-button type="primary">你好</el-button>
      </template>
      <span slot="before" type="primary">你好</span>
    </Pagetools>
    <Uploadelsx />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
