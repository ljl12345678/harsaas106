<template>
  <el-dialog :visible="showdioga" :title="showtitle" @close="btncancel">
    <!-- 表单数据 -->
    <el-form ref="deptform" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- native可找到原生元素的事件 -->
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getemploysimple">
          <el-option v-for="item in people" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- 确定消息 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btn">
          确定
        </el-button>
        <el-button type="primary" size="small" @click="btncancel">
          取消
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getdepartments } from '@/api/departments'
import { getemploysimple } from '@/api/employees'
import { addPartmnet } from '@/api/departments'
import { getPartmnetdetail, updatePartmnet } from '@/api/departments'
export default {
props: {
    showdioga: {
        type: Boolean,
        default: false
    },
    treenode: {
        type: Object,
        default: null
    }
},
data() {
    const checknamerepeat = async(rule, value, callback) => {
        const { depts } = await getdepartments()
        // console.log(depts)
        let isrepeat = false
        if (this.formData.id) {
            // 编辑状态下
            isrepeat = depts.filter(item => { item.pid === this.formData.pid && item.id !== this.formData.id }).some(item => { item.name === value })
        } else {
            isrepeat = depts.filter(item => item.pid === this.treenode.id).some(item => item.name === value)
        }
        isrepeat ? callback(new Error(`同级部门下存在${value}部门了`)) : callback()
    }
    const checkcoderepeat = async(rule, value, callback) => {
        const { depts } = await getdepartments()
        let isrepeatcode = false
        if (this.formData.id) {
        // 编辑模式
        isrepeatcode = depts.filter(item => { item.id !== this.formData.id }).some(item => item.code === value && value)
        } else {
            isrepeatcode = depts.some(item => item.code === value && value)
        }
        isrepeatcode ? callback(new Error(`同级部门下存在${value}部门了`)) : callback()
    }
    return {
        formData: {
            name: '',
            code: '',
            manager: '',
            introduce: ''
        },
        rules: {
            name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门名称长度为1-50字符', trigger: 'blur' }, { trigger: 'blur', validator: checknamerepeat }],
            code: [{ required: true, message: '部门代码不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门代码长度为1-50字符' }, { trigger: 'blur', validator: checkcoderepeat }],
            manager: [{ required: true, message: '部门责任人不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门责任人长度为1-50字符', trigger: 'blur' }],
            introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '部门介绍长度为1-300字符', trigger: 'blur' }]
        },
        people: []
    }
},
computed: {
    showtitle() {
       return this.formData.id ? '编辑部门' : '新增部门'
    }
},
methods: {
   async getemploysimple() {
    this.people = await getemploysimple()
    },
    btn() {
        this.$refs.deptform.validate(async isOk => {
            if (isOk) {
                if (this.formData.id) {
                   await updatePartmnet(this.formData)
               } else {
                    await addPartmnet({
                    ...this.formData, pid: this.treenode.id
                })
                }

                this.$emit('adddepts')
                // 修改show的值
                this.$emit('update:showdioga', false)
                this.$refs.deptform.resetFields()
            }
        })
    },
    btncancel() {
        // resetFields不能重置非表单中的数据
        this.formData = {
            name: '',
            code: '',
            manager: '',
            introduce: ''
        }
         this.$emit('update:showdioga', false)
         this.$refs.deptform.resetFields()
    },
   async getdeptsdetail(id) {
      this.formData = await getPartmnetdetail(id)
    }
}
}
</script>

<style>

</style>
