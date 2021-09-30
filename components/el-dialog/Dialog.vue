<template>
  <div class="popup">
    <!-- 封装弹框 -->
    <el-dialog :center="center" :title="dialogTitle" :visible.sync="dialogVisible" :width="popupWidth" :before-close="handleClose" :append-to-body="appendToBody">
      <slot>
        <p>弹框自定义的内容</p>
      </slot>
      <!--内层弹窗-->
      <el-dialog :width="innerWidth" :title="innerTitle" :visible.sync="innerVisible" :before-close="handleInnerClose" append-to-body>
        <slot name="inner">
          <p>嵌套弹框自定义的内容</p>
        </slot>
      </el-dialog>
      <span v-if="showFooter" slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button v-if="hideBtn" type="primary" @click="Save">{{ buttonTitle }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogTitle: {
      type: String,
      default: '标题'
    },
    buttonTitle: {
      type: String,
      default: '确 定'
    },
    visible: {
      type: Boolean,
      default: false
    },
    popupWidth: {
      type: String,
      default: '550px'
    },
    center: {
      type: Boolean,
      default: false
    },
    innerVisible: {
      type: Boolean,
      default: false,
      required: false
    },
    innerWidth: {
      type: String,
      default: '80%'
    },
    innerTitle: {
      type: String,
      default: 'xxx部门xx岗位'
    },
    /* 是否隐藏按钮 */
    hideBtn: {
      type: Boolean,
      default: true
    },
    /* 是否隐藏所有按钮 */
    showFooter: {
      type: Boolean,
      default: true
    },
    // 用嵌套的方式显示 Dialog
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible () {
      return this.visible
    }
  },
  methods: {
    Cancel () {
      this.$emit('resetPopupData')
    },
    Save () {
      this.$emit('submitPopupData')
    },
    handleClose () {
      this.$emit('handleClose')
    },
    handleInnerClose () {
      this.$emit('closeInnerDialog')
    }
  }
}
</script>

<style scoped lang="scss">
.popup {
  width: 100%;

  .el-dialog {
    z-index: 9;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 10% !important;
  }

  .el-dialog__header {
    width: 100%;
    height: 40px;
    line-height: 38px;
    border-bottom: 1px solid #f6f7f9;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 16px;
  }

  .el-dialog__close.el-icon.el-icon-close {
    font-size: 20px;
    width: 17px;
    height: 17px;
  }

  .el-button.el-button--default {
    width: 88px;
    color: #1182fb;
    border: 1px solid #1182fb;
  }

  .el-button.el-button--primary {
    width: 88px;
  }

  .el-dialog__body {
    padding: 24px 32px;
    box-sizing: border-box;
  }

  .el-dialog__headerbtn {
    top: 4px;
  }

  .el-dialog__title {
    color: #3c4354;
    font-size: 16px;
    line-height: 16px;
  }

  .el-dialog__footer {
    text-align: center;
  }
}
</style>
