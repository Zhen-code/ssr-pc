<template>
  <div class="personalvenues-container">
    <div class="personalvenues-top">
      <SearchForm
        :search-form="searchForm"
        :search-data="searchData"
      >
      </SearchForm>
    </div>
    <div class="personalvenues-top">
      <MyTable
        :columns="columns"
        :table-data="tableData"
        :table-options="{ border: true }"
      >
      </MyTable>
    </div>
    <Dialog
      :center="true"
      popup-width="60%"
      dialog-title="预约人详情"
      :visible="visible"
      @resetPopupData="visible = false"
      @handleClose="visible = false"
      @submitPopupData="visible = false"
    >
      <el-form ref="add" :model="addData" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="账号">
              <el-input v-model="addData.account" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input v-model="addData.pass" show-password :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期">
              <el-input v-model="addData.datebirth" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="真实姓名">
              <el-input v-model="addData.name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-input v-model="addData.gender" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="身份证号码">
              <el-input v-model="addData.idcard" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实名制审核状态">
              <el-input v-model="addData.realnamesystem" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="手机号码">
              <el-input v-model="addData.phone" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="QQ号码">
              <el-input v-model="addData.qqnumber" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="联系地址">
              <el-input v-model="addData.address" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="微信号">
              <el-input v-model="addData.wechat" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="电子邮箱">
              <el-input v-model="addData.email" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用度得分">
              <el-input v-model="addData.creditscore" disabled type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="单位名称">
              <el-input v-model="addData.companyname" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="积分">
              <el-input v-model="addData.integral" disabled type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
<!--        <el-row>-->
<!--          <el-col :span="16">-->
<!--            <el-form-item label="账号状态">-->
<!--              <el-radio-group v-model="addData.accountstatus" disabled>-->
<!--                <el-radio label="正常"></el-radio>-->
<!--                <el-radio label="禁用"></el-radio>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </el-form>
    </Dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'index',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      searchForm: [
        {
          type: 'DateRange',
          prop: 'name',
          label: '预约日期'
        },
        {
          type: 'Input',
          prop: 'num',
          label: '预约场地'
        },
        {
          type: 'Input',
          prop: 'label',
          label: '是否需要审核'
        },
        {
          type: 'Select',
          prop: 'cat',
          label: '审核完成',
          options: [
            {
              label: '是',
              value: 0
            }
          ],
          change: () => {}
        },
        {
          type: 'Button',
          label: '查询',
          handle: () => {}
        },
      ],
      searchData: {
        name: '',
        num: '',
        label: '',
        cat: ''
      },
      columns: [
        {
          label: '预约人姓名',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '是否管理员',
          prop: 'num'
        },
        {
          label: '场地',
          prop: 'label'
        },
        {
          label: '预约日期',
          prop: 'cat'
        },
        {
          label: '预约时段',
          prop: 'area'
        },
        {
          label: '预约截止日期',
          prop: 't'
        },
        {
          label: '预约申请时间',
          prop: 't'
        },
        {
          label: '是否需要审核',
          prop: 're',
          width: '200'
        },
        {
          label: '审核完成',
          prop: 're1',
          width: '200'
        },
        {
          label: '审核通过',
          prop: 're2'
        },
        {
          label: '审核日期',
          prop: 're3'
        },
        {
          label: '预约人详情',
          type: 'Button',
          width: '100',
          btnList: [
            {
              label: '详情',
              type: 'info',
              handle: this.detail
            }
          ]
        },
      ],
      tableData: [
        {
          name: '王小二',
          num: '否',
          label: '场地12',
          cat: '2021-02-01',
          area: '10：00-12：00',
          t: '2020-12-11',
          ti: 'x',
          re: '是',
          re1: '是',
          re2: '是',
          re3: '2021-02-03'
        }
      ],
      visible: false,
      addData: {
        account: 'xx',
        pass: '123456',
        datebirth: '2009-01-01',
        name: 'xx',
        gender: 'xx',
        idcard: 'xxx',
        realnamesystem: 'xx',
        phone: 'xx',
        qqnumber: 'xxxx',
        address: '地址',
        wechat: '微信号',
        email: '44444@qq.com',
        creditscore: 'xxx',
        companyname: 'xxx',
        integral: 'xxx',
        accountstatus: '禁用'
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  // 生命周期 - 创建之前
  beforeCreate() { },
  // 生命周期 - 挂载之前
  beforeMount() { },
  // 生命周期 - 更新之前
  beforeUpdate() { },
  // 生命周期 - 更新之后
  updated() { },
  // 生命周期 - 销毁之前
  beforeDestroy() { },
  // 生命周期 - 销毁完成
  destroyed() { },
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated() { },
  // 方法集合
  methods: {
    detail() {
      this.visible = true
    }
  }
}
</script>
<style scoped lang='scss'>
.personalvenues {
  &-container {
    margin: 30px;
  }
}
</style>
