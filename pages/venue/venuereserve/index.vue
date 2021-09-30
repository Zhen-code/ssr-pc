<template>
  <div class="venuereserve-container">
    <div class="venuereserve-top">
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="可预约日期">
          <el-select v-model="form.date" placeholder="请选择日期" clearable style="width: 260px" @change="change">
            <el-option label="2022-03-09(星期一)" value="2022/03/09/1" />
            <el-option label="2022-03-10(星期二)" value="2022/03/09/2" />
            <el-option label="2022-03-10(星期三)" value="2022/03/10/3" />
          </el-select>
        </el-form-item>
        <el-form-item label="你选择的预约日期">
          <el-input v-model="chooseDate" :disabled="true" style="width: 260px" />
        </el-form-item>
        <el-form-item label="可预约场地">
          <el-select v-model="form.site" multiple placeholder="请选择场地" clearable style="width: 260px">
            <el-option v-for="(site,i) in siteOption" :key="i" :label="site" :value="site" />
          </el-select>
        </el-form-item>
        <el-form-item label="你选择的预约场地">
          <el-tag v-for="(s,idx) in selectSites" :key="idx" class="tag">{{ s }}</el-tag>
        </el-form-item>
        <el-form-item label="选择预约场地时段">
          <el-time-select
            v-model="startTime"
            placeholder="起始时间"
            clearable
            :picker-options="{
              start: '06:00',
              step: '00:30',
              end: '24:00'
            }"
          />
          &nbsp;-&nbsp;
          <el-time-select
            v-model="endTime"
            placeholder="结束时间"
            clearable
            :picker-options="{
              start: '06:00',
              step: '00:30',
              end: '24:00',
              minTime: startTime
            }"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" class="search-btn">搜索</el-button>
    <div class="venuereserve-bottom">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column
          v-for="(item,index) in columns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width || 'auto'"
          align="center"
          :fixed="item.fixed || false"
        >
          <template slot-scope="scope">
            <span v-if="item.type === undefined">{{ scope.row[item.prop] }}</span>
            <el-input v-if="item.type === 'INPUT'" v-model="scope.row[item.prop]" />
            <el-image v-if="item.type === 'IMG'" :src="scope.row[item.prop]" @click="preview(scope.row[item.prop])" />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="book(scope)">预约</el-button>
            <el-button type="danger" size="small" @click="noBook(scope)">取消预约</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 预约弹窗-->
    <Dialog
      :visible="visible1"
      dialog-title="预约信息填写"
      popup-width="50%"
      @handleClose="visible1 = false"
      @resetPopupData="visible1 = false"
      @submitPopupData="visible1 = false"
    >
      <SearchForm
        label-width="140px"
        :inline="false"
        :search-form="searchForm"
        :search-data="searchData"
        :rules="rules"
      />
      <el-form :model="formInline" class="demo-form-inline">
        <el-form-item label="代理授权协议(.doc,.docx格式)">
          <Upload
          list-type="text"
          accept=".doc,.docx"
          :fileList="fileList"
          :limit="1"
          @addSuccess="addSuccess"
          @removePicture="removePicture"
          >
            <span slot="btnText">上传授权书</span>
          </Upload>
        </el-form-item>
      </el-form>
    </Dialog>
    <Dialog
      :visible="visible"
      dialog-title="审核截图"
      :show-footer="false"
      @handleClose="visible = false"
    >
      <el-image :src="imgSrc" />
    </Dialog>
  </div>
</template>
<!--{-->
<!--type: 'Upload',-->
<!--,-->
<!--limit: 1,-->
<!--prop: 'fileList',-->
<!--label: '代理授权协议'-->
<!--}-->
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'Index',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      form: {
        date: '',
        site: []
      },
      startTime: '',
      endTime: '',
      columns: [
        {
          label: '场地',
          prop: 'd1',
          fixed: 'left',
          width: 100
        },
        {
          label: '预约日期',
          prop: 'd2'
        },
        {
          label: '预约时段',
          prop: 'd3'
        },
        {
          label: '预约状态',
          prop: 'd4'
        },
        {
          label: '预约截至日期',
          prop: 'd5'
        },
        {
          label: '取消预约截至日期',
          prop: 'd6'
        },
        {
          label: '预约情况',
          prop: 'd7'
        },
        {
          label: '开放预约类型',
          prop: 'd8'
        },
        {
          label: '是否需要审批',
          prop: 'd9'
        },
        {
          label: '预约人电话',
          prop: 'd10',
          width: 200
        },
        {
          label: '预约人单位',
          prop: 'd11',
          width: 200
        },
        {
          label: '参加人数',
          prop: 'd12'
        },
        {
          label: '申请编号',
          prop: 'd13',
          width: 200
        },
        {
          label: '审核通过截图',
          prop: 'd14',
          type: 'IMG',
          width: 200
        }
      ],
      tableData: [
        {
          d1: '场地1',
          d2: '2021-2-20',
          d3: '09:00-11:00',
          d4: '可预约',
          d5: '2022-02-12',
          d6: '2021-02-01',
          d7: '未约',
          d8: '对外开放',
          d9: '是',
          d10: '10086',
          d11: '中国移动',
          d12: 20,
          d13: '123000',
          d14: 'https://p4.img.cctvpic.com/photoworkspace/2021/08/31/2021083110014593427.jpg'
        }
      ],
      visible: false,
      visible1: false,
      imgSrc: '',
      mode: '',
      searchForm: [
        {
          type: 'Radio',
          label: '预约方式',
          prop: 'mode',
          radios: [
            {
              label: '个人预约',
              value: '个人预约'
            },
            {
              label: '团体预约',
              value: '团体预约'
            }
          ]
        },
        {
          type: 'Checkbox',
          label: '是否代理',
          prop: 'agent',
          checkboxs: [
            {
              label: '代理预约',
              value: '代理预约'
            }
          ]
        },
        {
          type: 'Input',
          prop: 'name',
          label: '授权人姓名'
        },
        {
          type: 'Input',
          prop: 'cid',
          label: '授权人身份证号'
        },
        {
          type: 'Input',
          prop: 'phone',
          label: '授权人手机号',
          istype: 'number'
        },
        {
          type: 'Input',
          prop: 'num',
          label: '参加人数',
          istype: 'number'
        }
      ],
      searchData: {
        mode: [],
        agent: [],
        name: '',
        cid: '',
        phone: '',
        num: ''
      },
      formInline: {
        fileList: []
      },
      rules: {
        mode: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        cid: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        num: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }]
      },
      fileList: []
    }
  },
  // 监听属性 类似于data概念
  computed: {
    chooseDate() {
      if (this.form.date !== '') {
        return '2022-03-09(星期一)'
      } else {
        return ''
      }
    },
    siteOption() {
      if (this.chooseDate !== '') {
        return ['场地1', '场地2', '场地3']
      } else {
        return []
      }
    },
    selectSites() {
      if (this.form.site.length !== 0) {
        return ['场地1', '场地2', '场地3']
      } else {
        return []
      }
    }
  },
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
  // 方法集合
  methods: {
    change(val) {

    },
    book(scope) {
      this.visible1 = true
    },
    noBook() {
      this.$confirm('是否取消预约该场地?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {

      })
    },
    preview(val) {
      this.imgSrc = val
      if (val) {
        this.visible = true
      }
    },
    addSuccess({ response, file, fileList }) {
      this.fileList = fileList
    },
    removePicture(fileList) {
      this.fileList = fileList
    }
  }
}
</script>
<style scoped lang='scss'>
.venuereserve {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.venuereserve-top{
  .tag{
    margin-left: 16px;
  }
}
.search-btn{
  width: 200px;
  margin-bottom: 20px;
}
</style>
