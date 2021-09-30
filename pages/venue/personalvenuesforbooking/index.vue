<template>
  <div class="personalvenuesforbooking-container">
    <div class="personalvenuesforbooking-top">
      <SearchForm
        :search-form="searchForm"
        :search-data="searchData"
      />
    </div>
    <div class="personalvenuesforbooking-bottom">
      <MyTable
        :columns="columns"
        :table-data="tableData"
        :table-options="{ border: true }"
      />
    </div>
    <Dialog
      popup-width="80%"
      dialog-title="添加审批"
      :visible="visible"
      @resetPopupData="visible = false"
      @submitPopupData="visible = false"
      @handleClose="visible = false"
    >
      <el-timeline>
        <el-timeline-item
          timestamp="2021-09-02"
          placement="top"
          :hide-timestamp="true"
          type="primary"
        >
          <el-card>
            <div slot="header">
              <span>步骤1/申请人审批 | <el-tag type="success">审批通过</el-tag> 时间：2021-02-01</span>
            </div>
            <validate-form
              :search-form="searchForm0"
              :search-data="searchData0"
              :disabled="true"
              :inline="true"
              label-width="160px"
            >
              <span slot="extra">
                <el-upload
                  class="upload-demo"
                  action="192.168.100.17:8080"
                  :limit="1"
                  :file-list="fileList"
                >
                </el-upload>
              </span>
            </validate-form>
          </el-card>
        </el-timeline-item>
        <el-timeline-item
          timestamp="2021-09-03"
          placement="top"
          :hide-timestamp="true"
          type="info"
        >
          <el-card>
            <div slot="header">
              <span>步骤2/部门对口人审批| <el-tag type="info">审批中</el-tag> 时间：--</span></span>
            </div>
            <validate-form
              :search-form="searchForm1"
              :search-data="searchData1"
              :inline="true"
              :disabled="true"
              label-width="160px"
            >
              <span slot="extra">
                <el-upload
                  class="upload-demo"
                  action="192.168.100.17:8080"
                  :limit="1"
                  :file-list="fileList1"
                >
                </el-upload>
              </span>
            </validate-form>
          </el-card>
        </el-timeline-item>
        <!--        <el-timeline-item-->
        <!--          timestamp="2021-09-04"-->
        <!--          placement="top"-->
        <!--          :hide-timestamp="true"-->
        <!--          type="primary"-->
        <!--        >-->
        <!--          <el-card>-->
        <!--            <div slot="header">-->
        <!--              <span>步骤3/部门领导审核</span>-->
        <!--            </div>-->
        <!--            <validate-form-->
        <!--              :search-form="searchForm2"-->
        <!--              :search-data="searchData2"-->
        <!--              :inline="true"-->
        <!--              label-width="160px"-->
        <!--            >-->
        <!--              <span slot="extra">-->
        <!--&lt;!&ndash;                <Upload&ndash;&gt;-->
        <!--&lt;!&ndash;                  :file-list="fileList2"&ndash;&gt;-->
        <!--&lt;!&ndash;                  accept=".doc,.docx"&ndash;&gt;-->
        <!--&lt;!&ndash;                  list-type="text"&ndash;&gt;-->
        <!--&lt;!&ndash;                  :disabled="true"&ndash;&gt;-->
        <!--&lt;!&ndash;                  @addSuccess="addSuccess2"&ndash;&gt;-->
        <!--&lt;!&ndash;                >&ndash;&gt;-->
        <!--&lt;!&ndash;                  <span slot="btnText">上传文档</span>&ndash;&gt;-->
        <!--&lt;!&ndash;                </Upload>&ndash;&gt;-->
        <!--              </span>-->
        <!--            </validate-form>-->
        <!--          </el-card>-->
        <!--        </el-timeline-item>-->
        <!--        <el-timeline-item-->
        <!--          timestamp="2021-09-05"-->
        <!--          placement="top"-->
        <!--          :hide-timestamp="true"-->
        <!--          type="primary"-->
        <!--        >-->
        <!--          <el-card>-->
        <!--            <div slot="header">-->
        <!--              <span>步骤4/其它部门审批</span>-->
        <!--            </div>-->
        <!--            <validate-form-->
        <!--              :search-form="searchForm3"-->
        <!--              :search-data="searchData3"-->
        <!--              :inline="true"-->
        <!--              label-width="160px"-->
        <!--            >-->
        <!--              <span slot="extra">-->
        <!--&lt;!&ndash;                <Upload&ndash;&gt;-->
        <!--&lt;!&ndash;                  :file-list="fileList3"&ndash;&gt;-->
        <!--&lt;!&ndash;                  accept=".doc,.docx"&ndash;&gt;-->
        <!--&lt;!&ndash;                  list-type="text"&ndash;&gt;-->
        <!--&lt;!&ndash;                  :disabled="true"&ndash;&gt;-->
        <!--&lt;!&ndash;                  @addSuccess="addSuccess3"&ndash;&gt;-->
        <!--&lt;!&ndash;                >&ndash;&gt;-->
        <!--&lt;!&ndash;                  <span slot="btnText">上传文档</span>&ndash;&gt;-->
        <!--&lt;!&ndash;                </Upload>&ndash;&gt;-->
        <!--              </span>-->
        <!--            </validate-form>-->
        <!--          </el-card>-->
        <!--        </el-timeline-item>-->
        <!--        <el-timeline-item-->
        <!--          timestamp="2021-09-06"-->
        <!--          placement="top"-->
        <!--          :hide-timestamp="true"-->
        <!--          type="primary"-->
        <!--        >-->
        <!--          <el-card>-->
        <!--            <div slot="header">-->
        <!--              <span>步骤5/粤剧院领导审批</span>-->
        <!--            </div>-->
        <!--            <validate-form-->
        <!--              :search-form="searchForm4"-->
        <!--              :search-data="searchData4"-->
        <!--              :inline="true"-->
        <!--              label-width="160px"-->
        <!--            >-->
        <!--              <span slot="extra">-->
        <!--&lt;!&ndash;                <Upload&ndash;&gt;-->
        <!--&lt;!&ndash;                  :file-list="fileList4"&ndash;&gt;-->
        <!--&lt;!&ndash;                  accept=".doc,.docx"&ndash;&gt;-->
        <!--&lt;!&ndash;                  list-type="text"&ndash;&gt;-->
        <!--&lt;!&ndash;                  :disabled="true"&ndash;&gt;-->
        <!--&lt;!&ndash;                  @addSuccess="addSuccess4"&ndash;&gt;-->
        <!--&lt;!&ndash;                >&ndash;&gt;-->
        <!--&lt;!&ndash;                  <span slot="btnText">上传文档</span>&ndash;&gt;-->
        <!--&lt;!&ndash;                </Upload>&ndash;&gt;-->
        <!--              </span>-->
        <!--            </validate-form>-->
        <!--          </el-card>-->
        <!--        </el-timeline-item>-->
      </el-timeline>
    </Dialog>
  </div>
</template>

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
        }
      ],
      searchData: {
        name: '',
        num: '',
        label: '',
        cat: ''
      },
      searchForm0: [
        {
          type: 'Input',
          prop: 'title',
          label: '标题',
          placeText: ''
        },
        {
          type: 'Select',
          prop: 's',
          label: '发送人',
          options: [
            {
              label: '书记',
              value: '1'
            }
          ],
          change: () => {}
        },
        {
          type: 'Input',
          prop: 'd',
          label: '事由'
        },
        {
          type: 'TextArea',
          prop: 'con',
          label: '具体内容'
        },
        {
          type: 'Extra',
          prop: 'extra',
          label: '附件'
        }
      ],
      searchData0: {
        title: '',
        s: '',
        con: '',
        extra: null
      },
      searchForm1: [
        {
          type: 'Input',
          prop: 'title',
          label: '标题'
        },
        {
          type: 'Select',
          prop: 's',
          label: '发送人',
          options: [
            {
              label: '书记',
              value: '1'
            }
          ],
          change: () => {}
        },
        {
          type: 'Input',
          prop: 'd',
          label: '事由'
        },
        {
          type: 'TextArea',
          prop: 'con',
          label: '具体内容'
        },
        {
          type: 'Extra',
          prop: 'extra',
          label: '附件'
        }
      ],
      searchData1: {
        title: '',
        s: '',
        con: '',
        extra: null
      },
      searchForm2: [
        {
          type: 'Input',
          prop: 'title',
          label: '标题'
        },
        {
          type: 'Select',
          prop: 's',
          label: '发送人',
          options: [
            {
              label: '书记',
              value: '1'
            }
          ],
          change: () => {}
        },
        {
          type: 'Input',
          prop: 'd',
          label: '事由'
        },
        {
          type: 'TextArea',
          prop: 'con',
          label: '具体内容'
        },
        {
          type: 'Extra',
          prop: 'extra',
          label: '附件'
        }
      ],
      searchData2: {
        title: '',
        s: '',
        con: '',
        extra: null
      },
      searchForm3: [
        {
          type: 'Input',
          prop: 'title',
          label: '标题'
        },
        {
          type: 'Select',
          prop: 's',
          label: '发送人',
          options: [
            {
              label: '书记',
              value: '1'
            }
          ],
          change: () => {}
        },
        {
          type: 'Input',
          prop: 'd',
          label: '事由'
        },
        {
          type: 'TextArea',
          prop: 'con',
          label: '具体内容'
        },
        {
          type: 'Extra',
          prop: 'extra',
          label: '附件'
        }
      ],
      searchData3: {
        title: '',
        s: '',
        con: '',
        extra: null
      },
      searchForm4: [
        {
          type: 'Input',
          prop: 'title',
          label: '标题'
        },
        {
          type: 'Select',
          prop: 's',
          label: '发送人',
          options: [
            {
              label: '书记',
              value: '1'
            }
          ],
          change: () => {}
        },
        {
          type: 'Input',
          prop: 'd',
          label: '事由'
        },
        {
          type: 'TextArea',
          prop: 'con',
          label: '具体内容'
        },
        {
          type: 'Extra',
          prop: 'extra',
          label: '附件'
        }
      ],
      searchData4: {
        title: '',
        s: '',
        con: '',
        extra: null
      },
      fileList: [
        {
          name: '关于场地申请文档',
          url: 'https://api.idocv.com/data/doc/在线文档预览用户手册.docx'
        }
      ],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
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
          prop: 'cat'
        },
        {
          label: '审核详情',
          type: 'Button',
          width: '100',
          btnList: [
            {
              label: '详情',
              type: 'info',
              handle: this.detail
            }
          ]
        }
      ],
      tableData: [
        {
          name: '王二',
          num: '是',
          label: '场地',
          cat: '2021-01-02',
          area: '10：00-12：00',
          t: '2021-01-02',
          ti: 'x',
          re: '是',
          re1: '是',
          re2: '是',
          re3: 'x',
          re4: 'x'
        }
      ],
      visible: false
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
  // 方法集合
  methods: {
    detail() {
      this.visible = true
    },
    addSuccess({ response, file, fileList }) {
      this.fileList = fileList
    },
    addSuccess1({ response, file, fileList }) {
      this.fileList1 = fileList
    },
    addSuccess2({ response, file, fileList }) {
      this.fileList2 = fileList
    },
    addSuccess3({ response, file, fileList }) {
      this.fileList3 = fileList
    },
    addSuccess4({ response, file, fileList }) {
      this.fileList4 = fileList
    }
  }
}
</script>
<style scoped lang='scss'>
.personalvenuesforbooking {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
