<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row style="height: 60px">
              <el-button icon="el-icon-plus" type="primary" size="small" @click="showdialog=true">
                新增角色
              </el-button>
            </el-row>
            <!-- 给表哥绑定数据 -->
            <el-table border="" :data="list">
              <el-table-column label="序号" width="120" type="index" align="center" header-align="left" />
              <el-table-column label="名称" width="240" prop="name" align="center" />
              <el-table-column label="描述" prop="description" align="center" />
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editrole(scope.row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delrole(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-pagination layout="prev, pager, next" :total="page.total" :page-size="page.pagrsize" :current-page="page.page" @current-change="changepage" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formdata.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formdata.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formdata.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formdata. remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
    <!-- 放置一个弹层组件 -->
    <el-dialog title="编辑部门" :visible="showdialog" @close="btncancel">
      <el-form ref="roleform" label-width="120px" :model="roleform" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleform.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleform.description" />
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="8">
          <el-button @click="btncancel">
            取消
          </el-button>
          <el-button type="primary" @click="btnok">
            确定
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getrolelist, getcompanyinfo, delrole, getroledetail, updatalrole, addrole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
data() {
  return {
    list: [],
    page: {
      page: 1,
      pagesize: 10,
      total: 0// 记录总数
    },
    formdata: {},
    showdialog: false,
    roleform: {
      name: '',
      description: ''
    },
    rules: { name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }] }
  }
},
computed: {
  ...mapGetters(['companyid'])
},
created() {
this.getrolelist()
this.getcompanyid()
},
methods: {
 async getrolelist() {
   const { total, rows } = await getrolelist(this.page)
   console.log(rows)
    this.page.total = total
    this.list = rows
  },
  changepage(currentpage) {
    this.page.page = currentpage
    this.getrolelist()
  },
 async getcompanyid() {
   this.formdata = await getcompanyinfo(this.companyid)
  },
  async delrole(id) {
    try {
     await this.$confirm('确认删除吗')
     await delrole(id)
     this.getrolelist()
     this.$message.success('删除角色成功')
    } catch (error) {
      console.log(error)
    }
  },
 async editrole(id) {
   this.roleform = await getroledetail(id)
    this.showdialog = true
  },
 async btnok() {
  try {
    await this.$refs.roleform.validate()
    if (this.roleform.id) {
      await updatalrole(this.roleform)
    } else {
      // 新增
     await addrole(this.roleform)
    }
    this.getrolelist()
    this.$message.success('更新成功')
    this.showdialog = false
    this.$refs.roleform.resetFields()
    this.roleform = {
      name: '',
      description: ''
    }
  } catch (error) {
    alert(error)
  }
  },
  btncancel() {
    this.roleform = {
      name: '',
      description: ''
    }
    this.showdialog = false
    this.$refs.roleform.resetFields()
  }
}
}
</script>

<style>

</style>
