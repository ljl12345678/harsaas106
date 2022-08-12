<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btncel">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="roleids">
      <!-- 选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnok">确定</el-button>
        <el-button size="small" @click="btncel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getrolelist, getroledetail } from '@/api/setting'
import { assignRoles } from '@/api/employees'
export default {
 props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
data() {
return {
    list: [],
    roleids: []
    }
},
  created() {
    this.getrolelist()
  },
  methods: {
  async getrolelist() {
   const { rows } = await getrolelist({ page: 1, pagesize: 20 })
   console.log(rows)
   this.list = rows
  },
 async getroledetail(id) {
  const { permIds } = await getroledetail(id)
  console.log(permIds)
  this.roleids = permIds
  },
  btnok() {
    assignRoles({ id: this.userId, permIds: this.roleids })
    this.$emit('update:showRoleDialog', false)
  },
  btncel() {
this.roleids = []
this.$emit('update:showRoleDialog', false)
  }
  }
}
</script>

<style>

</style>
