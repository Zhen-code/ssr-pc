<template>
  <div>
    <SearchForm
      :search-form="searchForm"
      :search-data="searchData"
    />
    <MyTable
      :columns="columns"
      :table-data="tableData"
      :table-options="{ border: true }"
    />
    <Dialog
      :visible="visible1"
      :dialog-title="dialogTitle1"
      popup-width="60%"
      @handleClose="visible1 = false"
      @resetPopupData="visible1 = false"
      @submitPopupData="visible1 = false"
    >
      <SearchForm
        v-show="!showComment"
        label-width="120px"
        :inline="false"
        :search-form="searchForm1"
        :search-data="searchData1"
      />
      <div v-show="showComment">
        <SearchForm
          label-width="120px"
          :inline="true"
          :search-form="searchForm2"
          :search-data="searchData2"
        />
        <MyTable
          :columns="columns1"
          :table-data="tableData1"
          :table-options="{ border: true }"
        />
      </div>
    </Dialog>
    <Dialog
      :visible="visible2"
      :dialog-title="dialogTitle2"
      popup-width="60%"
      @handleClose="visible2 = false"
      @resetPopupData="visible2 = false"
      @submitPopupData="visible2 = false"
    >
      <SearchForm
        v-show="!showConsult"
        label-width="120px"
        :inline="true"
        :search-form="searchForm3"
        :search-data="searchData3"
      />
      <div v-show="showConsult">
        <SearchForm
          label-width="120px"
          :inline="true"
          :search-form="searchForm2"
          :search-data="searchData2"
        />
        <MyTable
          :columns="columns2"
          :table-data="tableData2"
          :table-options="{ border: true }"
        />
      </div>
    </Dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      searchForm: [
        [
          {
            type: 'Input',
            prop: 'name',
            label: '场地名称'
          },
          {
            type: 'Input',
            prop: 'code',
            label: '场地编号'
          },
          {
            type: 'Input',
            prop: 'label',
            label: '标签'
          }
        ],
        [
          {
            type: 'Input',
            prop: 'cat',
            label: '类别'
          },
          {
            type: 'Input',
            prop: 'area',
            label: '区域'
          },
          {
            type: 'Button',
            label: '查询',
            handle: () => {}
          }
        ]
      ],
      searchData: {
        name: '',
        code: '',
        label: '',
        cat: '',
        area: ''
      },
      columns: [
        {
          label: '场地名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '场地编号',
          prop: 'num'
        },
        {
          label: '标签',
          prop: 'label'
        },
        {
          label: '类别',
          prop: 'cat'
        },
        {
          label: '区域',
          prop: 'area'
        },
        {
          label: '时间',
          prop: 're'
        },
        {
          label: '地点',
          prop: 're4',
          width: '200'
        },
        {
          label: '预约发布状态',
          prop: 're1',
          width: '200'
        },
        {
          type: 'Button',
          label: '评论操作',
          width: '300',
          btnList: [
            {
              type: 'success',
              label: '添加评论',
              handle: this.addComment
            },
            {
              type: 'primary',
              label: '查看评论',
              handle: this.lookComment
            }
          ]
        },
        {
          type: 'Button',
          label: '咨询操作',
          fixed: 'right',
          width: '300',
          btnList: [
            {
              type: 'success',
              label: '添加咨询',
              handle: this.addConsult
            },
            {
              type: 'primary',
              label: '查看咨询',
              handle: this.lookConsult
            }
          ]
        }
      ],
      tableData: [
        {
          name: '场地1',
          num: '001122',
          label: '标签1',
          cat: '类别1',
          area: '豫剧院',
          re4: '上海',
          ti: 'x',
          re: '2020-03-01',
          re1: '已发布',
          re2: 'x',
          re3: 'x',
          t: 'https://img1.baidu.com/it/u=3557076644,2243796918&fm=26&fmt=auto&gp=0.jpg'
        }
      ],
      columns1: [
        {
          label: '场地名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '场地编号',
          prop: 'num'
        },
        {
          label: '评论人姓名',
          prop: 'label'
        },
        {
          label: '评论人编号',
          prop: 'cat'
        },
        {
          label: '评论时间',
          prop: 'area'
        },
        {
          label: '评论内容',
          prop: 're'
        }
      ],
      tableData1: [
        {
          name: '场地1',
          num: '001',
          label: '王二',
          cat: '002',
          area: '2021-02-02 00：00：00',
          re4: 'x',
          ti: 'x',
          re: '评论的内容',
          re1: 'x',
          re2: 'x',
          re3: 'x',
          t: 'https://img1.baidu.com/it/u=3557076644,2243796918&fm=26&fmt=auto&gp=0.jpg'
        }
      ],
      visible1: false,
      searchForm1: [
        [
          {
            type: 'Input',
            prop: 'name',
            label: '场地名称'
          },
          {
            type: 'Input',
            prop: 'code',
            label: '场地编号'
          },
          {
            type: 'Input',
            prop: 'label',
            label: '标签'
          }
        ],
        [
          {
            type: 'Input',
            prop: 'cat',
            label: '类别'
          },
          {
            type: 'Input',
            prop: 'area',
            label: '区域'
          },
          {

          }
        ],
        [
          {
            type: 'Input',
            istype: 'textarea',
            prop: 'comments',
            label: '评论',
            fronttext: '(字数限制在100以内)'
          }
        ]
      ],
      searchData1: {
        name: '',
        code: '',
        label: '',
        cat: '',
        area: '',
        comments: ''
      },
      searchForm2: [
        {
          type: 'DateRange',
          prop: 'date',
          label: '评论时间'
        },
        {
          type: 'Input',
          prop: 'name',
          label: '评论人名称'
        },
        {
          type: 'Button',
          label: '查询',
          handle: () => {}
        }
      ],
      searchData2: {
        date: '',
        name: ''
      },
      visible2: false,
      showComment: false,
      dialogTitle1: '',
      dialogTitle2: '',
      showConsult: false,
      searchForm3: [
        [
          {
            type: 'Input',
            prop: 'name',
            label: '场地名称'
          },
          {
            type: 'Input',
            prop: 'code',
            label: '场地编号'
          },
          {
            type: 'Input',
            prop: 'label',
            label: '标签'
          }
        ],
        [
          {
            type: 'Input',
            prop: 'cat',
            label: '类别'
          },
          {
            type: 'Input',
            prop: 'area',
            label: '区域'
          },
          {

          }
        ],
        [
          {
            type: 'Input',
            istype: 'textarea',
            prop: 'allcomments',
            label: '常见咨询问题'
          }
        ],
        [
          {
            type: 'Input',
            istype: 'textarea',
            prop: 'comments',
            label: '咨询问题'
          }
        ]
      ],
      searchData3: {
        name: '',
        code: '',
        label: '',
        cat: '',
        area: '',
        allcomments: '常见问题',
        comments: ''
      },
      columns2: [
        {
          label: '场地名称',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '场地编号',
          prop: 'num'
        },
        {
          label: '咨询人姓名',
          prop: 'label'
        },
        {
          label: '咨询人编号',
          prop: 'cat'
        },
        {
          label: '咨询时间',
          prop: 'area'
        },
        {
          label: '咨询内容',
          prop: 're'
        },
        {
          label: '回复时间',
          prop: 're1'
        },
        {
          label: '回复内容',
          prop: 're2',
          width: '200'
        }
      ],
      tableData2: [
        {
          name: '场地1',
          num: '001',
          label: '王二',
          cat: '002',
          area: '2021-02-02 00：00：00',
          re4: 'x',
          ti: 'x',
          re: '评论的内容',
          re1: '2020-01-01 10:00:00',
          re2: '回复内容',
          re3: 'x',
          t: 'https://img1.baidu.com/it/u=3557076644,2243796918&fm=26&fmt=auto&gp=0.jpg'
        }
      ]
    }
  },
  methods: {
    addComment() {
      this.dialogTitle1 = '添加评论'
      this.showComment = false
      this.visible1 = true
    },
    lookComment() {
      this.dialogTitle1 = '查看评论'
      this.showComment = true
      this.visible1 = true
    },
    addConsult() {
      this.dialogTitle2 = '添加咨询'
      this.showConsult = false
      this.visible2 = true
    },
    lookConsult() {
      this.dialogTitle2 = '查看咨询'
      this.showConsult = true
      this.visible2 = true
    }
  }
}
</script>

<style scoped>

</style>
