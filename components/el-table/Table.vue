<template>
  <div class="MyTable">
    <el-table ref="multipleTable" :highlight-current-row="isRadio" :height="tableOptions.height ? tableOptions.height : '100%'" :border="tableOptions.border ? tableOptions.border : false" :stripe="tableOptions.stripe ? tableOptions.stripe : false" :data="tableData" style="width: 100%" @current-change="handleCurrentChange" @selection-change="selectionChange">
      <!-- 多选项 s -->
      <el-table-column v-if="tableOptions.isSelection" :selectable="tableOptions.showSelect ? tableOptions.showSelect: showSelect2" type="selection" width="40" align="center" />
      <!-- 序号 s -->
      <el-table-column v-if="tableOptions.isIndex" type="index" width="50" align="center" label="序号" />
      <!-- 序号 e -->
      <el-table-column v-for="(item, key) in columns" :key="key" :fixed="item.fixed ? item.fixed : false" :align="columnsOptions.align ? columnsOptions.align : 'center'" :prop="item.prop" :label="item.label" :min-width="item.minwidth" :width="item.width">
        <template slot-scope="scope">
          <!-- 按钮 -->
          <span v-if="item.type==='Button'">
            <el-button v-for="(btn, index) in item.btnList" :key="index" :disabled="btn.disabled ? btn.disabled : btn.disabledFun ? btn.disabledFun(scope.row) : false" :type="btn.type" :icon="btn.icon" @click="btn.handle(scope.row)">{{ btn.label }}</el-button>
          </span>
          <!-- 文字按钮 -->
          <span v-if="item.type === 'textButton'" :style="[{cursor:'pointer'},{color: item.color}]" @click="item.handle(scope.row)">
            {{ scope.row[item.prop] ? scope.row[item.prop] : item.text }}
          </span>
          <!-- 图片 -->
          <span v-if=" item.type==='IMG'">
            <span v-if=" scope.row[item.prop]==='' || scope.row[item.prop]===null">--</span>
            <img v-else :src="scope.row[item.prop]" style="width: 59px;height: 59px; object-fit: cover;" @click="preview(scope.row[item.prop])">
          </span>
          <!--Switch 开关-->
          <el-switch v-if="item.type === 'Switch'" v-model="scope.row[item.prop]" :active-text="item.aTxt?item.aTxt:''" :inactive-text="item.iTxt?item.iTxt:''">
          </el-switch>
          <!-- 输入框 -->
          <div class="item__content" v-if="item.type === 'Input'">
            <div v-if="item.fronttext" style="margin-right: 10px; white-space: nowrap; line-height: 40px">{{ item.fronttext }}</div>
            <el-input v-model="scope.row[item.prop]" :type="item.istype ? item.istype : 'text'" :placeholder="'请输入' + item.label"></el-input>
            <div v-if="item.aftertext" style="margin-left: 10px; white-space: nowrap; line-height: 40px">{{ item.aftertext }}</div>
          </div>
          <!-- 下拉框 -->
          <el-select v-if="item.type==='Select'" v-model="scope.row[item.prop]" :disabled="item.disabled ? item.disabled : false" :multiple="item.multiple || false" @change="item.change ? item.change(searchData[item.prop]) : ''">
            <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
          </el-select>
          <template v-if="!item.type">
            <!-- 默认 -->
            <span v-if="!item.formatter">{{ scope.row[item.prop] ? scope.row[item.prop] : '--' }}</span>
            <!-- 列formatter  -->
            <span v-else v-html="item.formatter(scope.row, item)"></span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isPagination" style="text-align: center">
      <el-pagination background layout="prev, pager, next" :current-page="currentPage" :page-size="pageSize" :total="total" @current-change="currentChange" />
    </div>
    <Dialog append-to-body dialog-title="图片预览" :visible="visible" :show-footer="false" :center="true" @handleClose="visible = false">
      <el-image :src="imgSrc" style="width: 100%;"></el-image>
    </Dialog>
  </div>
</template>

<script>

export default {
  name: 'MyTable',
  props: {
    // 表单数据
    tableData: {
      type: Array,
      default: () => []
    },
    /* * 表格配置项（与element-ul字段列信息一致）
    *  {
    *    border: true, // 是否带有纵向边框
    *    stripe: true // 是否为斑马纹 table
    *  // isIndex: //是否开启表单索引
    *   isSelection: 是否开启多选
    *   showSelect: (row,index) => {
    *   // row:行数据
    *     return true || false
    *   } //用于设置某个多选框是不是禁用
    *    ......
    *  }
    * */
    tableOptions: {
      type: Object,
      default: () => ({})
    },
    /* * 表格列字段列信息（与element-ul字段列信息一致）
    *  {
    *    label: '名称',
    *    prop: '字段属性',
    *    formatter: (row, column) => {
    *                   return row.BookType == 0 ? '汇编' : '非汇编'
    *              } // 它用于格式化指定列的值，接受一个Function，会传入两个参数：row和column，可以根据自己的需求进行处理
    *    ......
    *  }
    * */
    columns: {
      type: Array,
      default: () => []
    },
    // 表格列配置项（与element-ul字段列信息一致）
    columnsOptions: {
      type: Object,
      default: () => ({})
    },
    // 是否开启单选
    isRadio: {
      type: Boolean,
      default: false
    },
    // 是否开启分页
    isPagination: {
      type: Boolean,
      default: true
    },
    // 分页组件总条数
    total: {
      type: Number,
      default: 1000
    },
    // 分页组件每页显示条目个数
    pageSize: {
      type: Number,
      default: 10
    },
    // 分页组件当前页码
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    // 这里存放数据
    return {
      visible: false,
      imgSrc: '',
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
  },
  // 方法集合
  methods: {
    // 表单列点击事件
    handleCurrentChange (currentRow) {
      const vm = this
      if (!vm.isRadio) return
      vm.$emit('ClickCurrentChange', currentRow)
    },
    // 分页点击事件
    currentChange (val) {
      this.$emit('currentChange', val)
    },
    // 多选选择项发生变化时会触发该事件
    selectionChange (val) {
      this.$emit('selectionChange', val)
    },
    // 清空多选的选择项
    clearSelection () {
      this.$refs.multipleTable.clearSelection();
    },
    // 表格图片弹窗预览
    preview (val) {
      this.imgSrc = val
      this.visible = true
    },
    // 设置多选框可选
    showSelect2 () {
      return true
    },
    // 在 Input 失去焦点时触发
    inputBlur (val) {
      console.log(123)
    }
  }
}
</script>
<style scoped lang='scss'>
.el-pagination {
  padding: 25px;
}
.item__content {
  display: flex;
}
</style>
<style>
.el-table th.gutter {
  display: table-cell !important;
}
</style>
