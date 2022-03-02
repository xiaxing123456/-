<template>
  <div class="box">
    <!-- 
      show-file-list 是否显示已上传文件列表
      on-success 文件上传成功时的钩子
      before-upload  上传文件之前的钩子
     -->
    <el-upload
  class="avatar-uploader"
  action="http://localhost:3000/images"
  :show-file-list="false"      
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
<!-- <img src="imageUrl" alt=""> -->
  </div>
  
</template>

<script>
 export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        this.imageUrl = res.url
      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isJPG = file.type === 'image/jpeg';//规定上传图片类型
        const isLt2M = file.size / 1024 / 1024 < 2;//规定文件大小
        console.log(isJPG)
        console.log(isLt2M)
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style lang="less" scoped>
.box{
  width: 178px;
  border: 1px solid;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>>

