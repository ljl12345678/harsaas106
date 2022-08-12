<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <TreeTools :treenode="company" :isroot="isroot" @adddepts="adddepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <TreeTools slot-scope="{ data }" :treenode="data" @delDepts="getDepartments" @adddepts="adddepts" @edititem="editdepts" />
        </el-tree>
      </el-card>
    </div>
    <Additem ref="adddept" :showdioga.sync="showdioga" :treenode="node" @adddepts="getDepartments" />
  </div>
</template>

<script>
import { getdepartments } from '@/api/departments'
import TreeTools from './component/tree-tools'
import { tranListToTreeData } from '@/utils/auth'
import Additem from './component/add-dept'
export default {
 components: {
  TreeTools,
  Additem
},
 data() {
return {
  company: {
    name: '江苏传智播客教育科技股份有限公司',
    manager: '负责人'
  },
  departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹pi' }] },
        { name: '行政部', manager: '曹操' }, { name: '人事部', manager: '曹quan' }],

  defaultProps: {
    label: 'name',
    children: 'children'
  },
  isroot: true,
  rootValue: '',
  showdioga: false,
  node: null
}
},
created() {
  this.getDepartments()
},
methods: {
 async getDepartments() {
      const result = await getdepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, this.rootValue)
      console.log(result)
  },
  adddepts(node) {
    this.showdioga = true// 显示弹层
    this.node = node
  },
  editdepts(node) {
  this.showdioga = true
  this.node = node
  // 调用子组件的方法
  this.$refs.adddept.getdeptsdetail(node.id)
  }
}
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
