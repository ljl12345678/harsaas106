<template>
  <div>
    <el-upload list-type="picture-card" :limit="1" action="#" :on-preview="preview" :file-list="fileList" :class="{disable: filecomputed}" :on-remove="handleRemove" :on-change="changefile" :before-upload="beforeUpload" :http-request="upload">
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="shpwprogress" style="width: 180px" :percentage="percent" />
    <el-dialog title="图片预览" :visible.sync="showdialog">
      <img :src="imagurl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
    SecretId: 'AKIDvkPuIZiiYFnDVebSCpKpANWYSDrOk1AC',
    SecretKey: 'yukU6c2KUYVJwOgnnfLo8JKAqMgoofMr'
})
export default {
data() {
        return {
            showdialog: false,
            imagurl: '',
            fileList: [],
            currentuid: null,
            percent: 50,
            shpwprogress: false
        }
    },
computed: {
    filecomputed() {
        return this.fileList.length
    }
},
methods: {
    preview(file) {
        console.log(file)
        this.imagurl = file.url
        this.showdialog = true
    },
    handleRemove(file, fileList) {
      // file是点击删除的文件
    //   将原来的文件给排除掉了 剩下的就是最新的数组了
    //   this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    this.fileList = fileList
    },
    changefile(file, fileList) {
        this.fileList = fileList.map(item => item)
 },
 beforeUpload(file) {
// 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentuid = file.uid
      this.shpwprogress = true
      return true
 },
 upload(params) {
    if (params.file) {
       cos.putObject({
          Bucket: '123456-1312865850', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
          // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // data返回数据之后 应该如何处理
        //   console.log(err || data)
        if (!err && data.statusCode === 200) {
          this.fileList = this.fileList.map(item => {
                if (item.uid === this.currentuid) {
                    return { url: 'http://' + data.Location, upload: true }
                }
                return item
            })
            this.shpwprogress = false
            this.percent = 0
        }
        })
}
 }
 }
}
</script>

<style>
.disable .el-upload--picture-card {
    display: none;
}
</style>
