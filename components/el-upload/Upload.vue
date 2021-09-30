<template>
  <div>
    <el-upload ref="upload" :class="{imgHide:imgHideUpload}" :disabled="disabled" :action="action" :headers="setHeaders" :list-type="listType" :file-list="fileList" :data="dataType" :show-file-list="showFileList" :limit="limit" :multiple="multiple" :accept="accept" :on-success="addSuccess" :on-preview="picturePreview" :on-remove="pictureRemove" :on-exceed="handleExceed" :before-upload="Upload">
      <slot name="upBtn">
        <el-button v-show="!imgHideUpload" size="mini" type="primary">
          <slot name="btnText">上传图片</slot>
        </el-button>
      </slot>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    listType: {
      type: String,
      default: 'picture-card'
    },
    fileList: {
      type: Array,
      default: () => []
    },
    dataType: {
      type: Object,
      default: () => { }
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 用嵌套的方式显示 Dialog
    appendToBody: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.zip,.rar,.jpg,.jpeg,.png,.gif,.svg+xml'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      setHeaders: {
        'Authorization': 'Bearer' + 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjp7InJvbGUiOlsiQURNSU4iXX0sImV4cCI6MTYzMDQ2NzU3NSwidXNlcm5hbWUiOiJzeXMyIn0.dDAMZkC1doqCDIXvLZcPstPftPFM70Cvn9wfEJl6Oct56i2jUqmsBJjZoKvot9Mga38Gy8RjW7pu4Ypnt60Wgw"',
      },
      visible: false
    }
  },
  computed: {
    action () {
      return 'http://39.98.132.204:8095/v1/app/file/upload' // 图片上传接口地址
    },
    imgHideUpload () {
      if (this.fileList.length >= this.limit) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addSuccess (response, file, fileList) {
      /*
      * response:图片外网地址
      * */
      console.log(response)
      this.$emit('addSuccess', { response, file, fileList })
    },
    picturePreview (file) {
      if (this.listType === 'text') {
        return
      }
      this.pictureSrc = file.url
      this.visible = true;
    },
    /* 移除图片 */
    pictureRemove (file, fileList) {
      console.log(file, fileList)
      this.$emit('removePicture', fileList)
    },
    handleExceed () {
      this.$message({
        type: 'warning',
        message: '当前限制上传 1张图片',
        offset: 30
      });
    },
    // 上传限制
    Upload (file) {
      console.log(file.type)
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'zip', 'rar', 'jpg', 'jpeg', 'png', 'gif', 'svg+xml'].indexOf((file.name.replace(/.+\./, '')).toLowerCase()) === -1) {
        this.$message({ type: 'warning', message: '请上传图片或文档类型的附件！' });
        return false;
      }
      if (!isLt4M) {
        this.$message({
          type: 'error',
          message: '上传图片大小不能超过 4MB!',
          offset: 30
        });
        return false
      }
    },
  }
}

</script>

<style>
.imgHide .el-upload--picture-card {
  display: none;
}
</style>

