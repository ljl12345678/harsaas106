<template>
  <el-dialog title="新增员工" :visible="showdialog" @close="btncel">
    <!-- 表单 -->
    <el-form ref="addemployees" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="obj in EmployeeEnum.hireType" :key="obj.id" :label="obj.value" :value="obj.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getdepartments" />
        <el-tree v-if="showtree" v-loading="loading" :data="treedata" :props="{label:'name'}" :default-expand-all="true" @node-click="selectnode" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btncel">取消</el-button>
          <el-button type="primary" size="small" @click="btnok">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getdepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/auth'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
props: {
    showdialog: {
        type: Boolean,
        default: false
    }
},
data() {
    return {
        formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
        },
        rules: { username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }], mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }], formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }] },
        treedata: [],
        showtree: false,
        loading: false,
        EmployeeEnum
      }
    },
    methods: {
     async getdepartments() {
      this.loading = true
      this.showtree = true
     const { depts } = await getdepartments()
     this.treedata = tranListToTreeData(depts, '')
     this.loading = false
      },
      selectnode(node) {
        this.formData.departmentName = node.name
        this.showtree = false
      },
     async btnok() {
        try {
          await this.$refs.addemployees.validate()
          await addEmployee(this.formData)
          this.$parent.getemploylist()
          this.$parent.showdialog = false
        } catch (error) {
            console.log(error)
        }
      },
      btncel() {
       this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
        }
        this.$refs.addemployees.resetFields()
        this.$emit('update:showdialog', false)
      }
      }
}

</script>

<style>

</style>
