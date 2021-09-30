<template>
  <div class="box">
    <nuxt-child />
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
          { type: 'Button', label: '修改', handle: () => {} },
          {}
        ]
      ]
    }
  }
}
</script>

<style scoped>

</style>
