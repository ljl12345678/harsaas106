<template>
  <div class="dashboard-container">
    <div class="app-container">
      <Pagetools :showbefore="true">
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template v-slot:after>
          <el-button size="small" type="success" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportform">导出</el-button>
          <el-button size="small" type="primary" @click="showdialog=true">新增</el-button>
        </template>
      </Pagetools>
      <!-- 表格租金 -->
      <el-table border="" loadinf="loading" :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column v-imageerror="require('@/assets/common/bigUserHeader.png')" label="头像" align="center">
          <template slot-scope="{row}">
            <img :src="row.staffPhoto" alt="" style="border-radius: 50%; width: 100px; height: 100px; padding: 10px" @click="shorqrcode(row.staffPhoto)">
          </template>
        </el-table-column>
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatEmployment" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template v-slot="obj">
            {{ obj.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template slot-scope="{row}">
            <el-switch :value="row.enableState===1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editrole(row.id)">角色</el-button>
            <el-button type="text" size="small" @click="delemploy(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination layout="prev, pager, next" :current-page="page.page" :page-size="page.size" :total="page.total" @current-change="change" />
      </el-row>
    </div>
    <Addemployees :showdialog.sync="showdialog" />
    <el-dialog title="二维码" :visible.sync="showCodeDialog" @opened="shorqrcode" @close="imgUrl=''">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <Assign ref="assignrole" :show-role-dialog.sync="showroledialog" :user-id="userid" />
  </div>
</template>

<script>
import { getemploylist, delemploy } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import Addemployees from '@/views/employees/components/add-employees'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import Assign from '@/views/employees/components/assign-role'
export default {
  components: {
  Addemployees,
  Assign
  },
data() {
  return {
    list: [],
    page: {
      page: 1,
      size: 10,
      total: 0
    },
    loading: false,
    showdialog: false,
    showCodeDialog: false,
    showroledialog: false,
    userid: null
  }
},
created() {
this.getemploylist()
},
methods: {
 async getemploylist() {
  this.loading = false
  const { total, rows } = await getemploylist(this.page)
  this.list = rows
  this.page.total = total
  this.loading = false
  },
  change(newpage) {
    this.page.page = newpage
    this.getemploylist()
  },
  formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
  },
 async delemploy(id) {
    try {
     await this.$confirm('确定删除该员工吗')
     await delemploy(id)
     getemploylist()
     this.$message.success('删除成功')
    } catch (error) {
      console.log(error)
    }
  },
 async exportform() {
    const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
     const { rows } = await getemploylist({ page: 1, size: this.page.total })
    const data = this.formatjson(headers, rows)
    const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
    const merges = ['A1:A2', 'B1:F1', 'G1:G2']
    import('@/vendor/Export2Excel').then(excel => {
      excel.export_json_to_excel({
        header: Object.keys(headers),
        data: data,
        filename: '工资表',
        bookType: 'xlsx',
        multiHeader,
        merges
      })
    }

    )
  },
  formatjson(headers, rows) {
 return rows.map(item => {
   return Object.keys(headers).map(key => {
    if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
      return formatDate(item[headers[key]])
    } else if (headers[key] === 'formOfEmployment') {
       const obj = EmployeeEnum.hireType.find(ite => ite.id === item[headers[key]])
      return obj ? obj.value : '未知'
    } else {
      return item[headers[key]]
    }
    })
  })
  },
  shorqrcode(url) {
    if (url) {
      this.showCodeDialog = true
      this.$nextTick(() => {
        QrCode.toCanvas(this.$refs.myCanvas, url)
      })
    } else {
      this.$message.warning('该用户还没上传头像')
    }
  },
  editrole(id) {
    this.userid = id
    this.$refs.assignrole.getroledetail(id)
    this.showroledialog = true
  }
}
}
</script>

<style>

</style>
