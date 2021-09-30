<template>
  <div>
    <search-form
      label-width="120px"
      :search-form="searchForm"
      :search-data="searchData"
    />
    <el-button type="primary" @click="edit" class="success-btn">资料编辑</el-button>
    <Dialog
      :visible="visible"
      popup-width="60%"
      :dialog-title="dialogTitle"
      @resetPopupData="visible = false"
      @submitPopupData="visible = false"
      @handleClose="visible = false"
    >
      <search-form
        label-width="120px"
        :search-form="searchForm1"
        :search-data="searchData1"
        :rules="rules"
      />
    </Dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      searchData: {
        account: '',
        pass: '',
        datebirth: '',
        name: '',
        gender: '',
        idcard: '',
        realnamesystem: '',
        phone: '',
        qqnumber: '',
        address: '',
        wechat: '',
        email: '',
        creditscore: '',
        companyname: '',
        integral: '',
        accountstatus: ''
      },
      searchForm: [
        [
          { type: 'Input', label: '账号', prop: 'account', disabled: true },
          { type: 'Input', label: '密码', prop: 'pass', disabled: true, showpassword: true },
          { type: 'Input', label: '出生日期', prop: 'datebirth', disabled: true }
        ],
        [
          { type: 'Input', label: '真实姓名', prop: 'name', disabled: true },
          { type: 'Input', label: '性别', prop: 'gender', disabled: true },
          { type: 'Input', label: '身份证号码', prop: 'idcard', disabled: true }
        ],
        [
          { type: 'Input', label: '实名制审核状态', prop: 'realnamesystem', disabled: true },
          { type: 'Input', label: '手机号码', prop: 'phone', disabled: true },
          { type: 'Input', label: 'QQ号码', prop: 'qqnumber', disabled: true }
        ],
        [
          { type: 'Input', label: '电子邮箱', prop: 'address', disabled: true },
          { type: 'Input', label: '信用度得分', prop: 'creditscore', disabled: true },
          { type: 'Input', label: '单位名称', prop: 'companyname', disabled: true }
        ],
        [
          { type: 'Input', label: '积分', prop: 'integral', disabled: true, columns: 8 },
          {},
          {}
        ]
      ],
      rules: {
        account: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        datebirth: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        realnamesystem: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        qqnumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        creditscore: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        companyname: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        integral: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        accountstatus: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      visible: false,
      dialogTitle: '用户个人资料修改',
      searchData1: {
        account: '',
        pass: '',
        datebirth: '',
        name: '',
        gender: '',
        idcard: '',
        realnamesystem: '',
        phone: '',
        qqnumber: '',
        address: '',
        wechat: '',
        email: '',
        creditscore: '',
        companyname: '',
        integral: '',
        accountstatus: ''
      },
      searchForm1: [
        [
          { type: 'Input', label: '账号', prop: 'account' },
          { type: 'Input', label: '密码', prop: 'pass', showpassword: true },
          { type: 'Input', label: '出生日期', prop: 'datebirth' }
        ],
        [
          { type: 'Input', label: '真实姓名', prop: 'name' },
          { type: 'Input', label: '性别', prop: 'gender' },
          { type: 'Input', label: '身份证号码', prop: 'idcard' }
        ],
        [
          { type: 'Input', label: '实名制审核状态', prop: 'realnamesystem' },
          { type: 'Input', label: '手机号码', prop: 'phone' },
          { type: 'Input', label: 'QQ号码', prop: 'qqnumber' }
        ],
        [
          { type: 'Input', label: '电子邮箱', prop: 'address' },
          { type: 'Input', label: '信用度得分', prop: 'creditscore' },
          { type: 'Input', label: '单位名称', prop: 'companyname' }
        ],
        [
          { type: 'Input', label: '积分', prop: 'integral', columns: 8 },
          {},
          {}
        ]
      ]
    }
  },
  methods: {
    edit() {
      this.visible = true
    }
  }
}
</script>

<style scoped>
.success-btn{
  width: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
