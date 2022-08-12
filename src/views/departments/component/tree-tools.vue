<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width:100%">
    <el-col>
      <span>{{ treenode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>
          {{ treenode.manager }}
        </el-col>
        <el-col>
          <el-dropdown @command="oparateDepts">
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">操作部门</el-dropdown-item>
              <el-dropdown-item v-if="!isroot" command="aa">编辑</el-dropdown-item>
              <el-dropdown-item v-if="!isroot" command="qq">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delPartmnet } from '@/api/departments'
export default {
props: {
    // eslint-disable-next-line vue/require-default-prop
    treenode: {
        require: true,
        type: Object
    },
    isroot: {
        type: Boolean,
        default: false
    }
},
methods: {
  oparateDepts(type) {
    if (type === 'add') {
      this.$emit('adddepts', this.treenode)
    }
     if (type === 'aa') {
      // 添加部门\
      this.$emit('edititem', this.treenode)
    }
     if (type === 'qq') {
      this.$confirm('你确定要删除吗').then(() => {
      return delPartmnet(this.treenode.id)
      }).then(() => {
        this.$emit('delDepts')
        this.$message.success('删除部门成功')
      })
    }
  }
}
}
</script>

<style>

</style>
