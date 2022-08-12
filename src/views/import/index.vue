<template>
  <Uploadelsx :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {
      arr: []
    }
  },
methods: {
   async success({ header, results }) {
    debugger
       const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
      console.log(results)
      results.forEach(item => {
        var userinfo = {}
        Object.keys(item).forEach(key => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userinfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          } else { userinfo[userRelations[key]] = item[key] }
        })
       this.arr.push(userinfo)
      })
      await importEmployee(this.arr)
      this.$message.success('导入成功')
      this.$router.back()
    },
    // 转换日期格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
}
}
</script>

<style>

</style>
