<template>
  <div class="personalvenuesforbooking-container">
    <div class="personalvenuesforbooking-top">
      <SearchForm
        :search-form="searchForm"
        :search-data="searchData"
      >
      </SearchForm>
    </div>
    <div class="personalvenuesforbooking-bottom">
      <MyTable
        :columns="columns"
        :table-data="tableData"
        :table-options="{ border: true }"
      >
      </MyTable>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'index',
  data() {
    // 这里存放数据
    return {
      searchForm: [
        {
          type: 'Input',
          prop: 'name',
          label: '预约场地'
        },
        {
          type: 'Date',
          prop: 'num',
          label: '日期'
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
          label: '姓名',
          prop: 'name',
          fixed: 'left'
        },
        {
          label: '手机号码',
          prop: 'num'
        },
        {
          label: '预定场地',
          prop: 'label'
        },
        {
          label: '日期',
          prop: 'cat'
        },
        {
          label: '场次',
          prop: 'area'
        },
        {
          label: '预约签到时段',
          prop: 're'
        },
        {
          label: '预约号',
          prop: 're1',
          width: '200'
        },
        {
          label: '审核通过时间',
          prop: 'cat',
          width: '200'
        },
        {
          label: '短信通知',
          prop: 're2'
        },
        {
          label: '短信通知内容',
          prop: 're2'
        },
        {
          label: '预约二维码',
          type: 'IMG',
          prop: 't'
        },
      ],
      tableData: [
        {
          name: '王小额',
          num: '17845524145',
          label: '场地1',
          cat: '2021-01-02',
          area: '1',
          re4: 'x',
          ti: 'x',
          re: '21：00-12：00',
          re1: '0012455',
          re2: '短信123',
          re3: 'x',
          t: 'https://img1.baidu.com/it/u=3557076644,2243796918&fm=26&fmt=auto&gp=0.jpg',
        }
      ],
      loadingControl: true
    }
  },
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  // 方法集合
  methods: {
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
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
  activated() { }
}
</script>
<style scoped lang='scss'>
.personalvenuesforbooking {
  &-container {
    margin: 30px;
  }
}
</style>
