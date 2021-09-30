<!-- 搜索表单 -->
<template>
  <div class="ces-search">
    <el-form ref="searchData" :rules="rules" :inline="inline" :model="searchData" class="form-inline" :size="size" :label-width="labelWidth" :disabled="disabled">
      <!-- 一行单列 -->
      <template v-if="!multiColumn">
        <template v-for="item in searchForm">
          <div v-if="item.isButton" :key="item.prop" class="Input-box">
            <el-form-item :key="item.prop" style="flex: .97;" :label="item.type === 'Button'?'':item.label" :prop="item.prop">
              <!--输入框-->
              <el-input v-if="item.type === 'Input'" v-model="searchData[item.prop]" :type="item.istype ? item.istype : 'text'" :show-password="item.showpassword ? item.showpassword: false" :disabled="item.disabled ? item.disabled : false" :placeholder="'请选择'+item.label" />
              <!--文本框-->
            </el-form-item>
            <el-button style="height: 40px;" :type="item.color || 'success'" :icon="item.icon || ''" @click=" item.handle() ">{{ item.Buttonlabel }}</el-button>
          </div>
          <el-form-item v-else :key="item.prop" :label="item.type === 'Button' ? item.buttonlabel ? item.buttonlabel : '' : item.label" :prop="item.prop">
            <!--输入框-->
            <div class="item__content" v-if="item.type === 'Input'">
              <div v-if="item.fronttext" style="margin-right: 10px; white-space: nowrap;">{{ item.fronttext }}</div>
              <el-input v-model="searchData[item.prop]" :type="item.istype ? item.istype : 'text'" :show-password="item.showpassword ? item.showpassword: false" :disabled="item.disabled ? item.disabled : false" :placeholder="'请输入'+ item.placeText ? item.placeText:item.label" />
              <div v-if="item.aftertext" style="margin-left: 10px; white-space: nowrap">{{ item.aftertext }}</div>
            </div>
            <!--下拉框-->
            <el-select v-if="item.type==='Select'" v-model="searchData[item.prop]" :disabled="item.disabled ? item.disabled : false" :multiple="item.multiple || false" @change="item.change ? item.change(searchData[item.prop]) : ''">
              <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
            </el-select>
            <!--单选按钮-->
            <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
              <el-radio v-for="ra in item.radios" :key="ra.value" :label="ra.value">{{ ra.label }}</el-radio>
            </el-radio-group>
            <!--单选按钮-->
            <el-radio-group v-if="item.type==='RadioButton'" v-model="searchData[item.prop]" @change="item.change && item.change(searchData[item.prop])">
              <el-radio-button v-for="ra in item.radios" :key="ra.value" :label="ra.value">{{ ra.label }}</el-radio-button>
            </el-radio-group>
            <!--复选框-->
            <el-checkbox-group v-if="item.type==='Checkbox'" v-model="searchData[item.prop]">
              <el-checkbox v-for="ch in item.checkboxs" :key="ch.value" :label="ch.value">{{ ch.label }}</el-checkbox>
            </el-checkbox-group>
            <!--日期-->
            <el-date-picker v-if="item.type==='Date'" v-model="searchData[item.prop]" :type="item.istype || 'date'" :disabled="item.disabled || false" />
            <!--日期范围-->
            <el-date-picker v-if="item.type==='DateRange'" v-model="searchData[item.prop]" :disabled="item.disabled ? item.disabled : false" type="daterange" align="right" unlink-panels :range-separator="item.rangetext ? item.rangetext : '至'" :start-placeholder="item.starttext ? item.starttext : '开始日期'" :end-placeholder="item.endtext ? item.endtext : '结束日期'" :picker-options="pickerOptions" />
            <el-date-picker v-if="item.type==='MonthRange'" v-model="searchData[item.prop]" type="monthrange" align="right" unlink-panels :range-separator="item.rangetext ? item.rangetext : '至'" :start-placeholder="item.starttext ? item.starttext : '开始日期'" :end-placeholder="item.endtext ? item.endtext : '结束日期'" :picker-options="pickerOptions" />
            <!--时间-->
            <el-time-select v-if="item.type==='Time'" v-model="searchData[item.prop]" />
            <!--时间范围-->
            <span v-if="item.type==='TimeRange'">
              <el-time-picker v-model="searchData[item.prop]" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
              </el-time-picker>
            </span>
            <!-- 上传图片 -->
            <Upload v-if="item.type==='Upload'" :accept="item.accept ? item.accept : accept" :limit="item.limit ? item.limit : 1" :append-to-body="true" :file-list="searchData[item.prop]" @addSuccess="(value)=> addSuccess(item.prop, value)" @removePicture="(value)=> removePicture(item.prop, value)" />
            <!--按钮-->
            <el-button v-if="item.type === 'Button'" :type="item.color || item.label === '重置' ? 'danger':'primary'" :icon="item.icon || ''" @click="item.label !== '重置' ? item.handle() : resetForm() ">{{ item.label }}</el-button>
          </el-form-item>
        </template>
      </template>
      <!-- 一行多列 -->
      <template v-else>
        <el-row v-for="items in searchForm" :key="items[0].prop">
          <el-col v-for="item in items" :key="item.prop" :span="item.columns ? item.columns : (24/items.length)">
            <div v-if="item.isButton" :key="item.prop" class="Input-box">
              <el-form-item :key="item.prop" style="flex: .97;" :label="item.type === 'Button'?'':item.label" :prop="item.prop">
                <!--输入框-->
                <el-input v-if="item.type === 'Input'" v-model="searchData[item.prop]" :type="item.istype ? item.istype : 'text'" :show-password="item.showpassword ? item.showpassword: false" :disabled="item.disabled ? item.disabled : false" :placeholder="'请选择'+item.label" />
                <!--文本框-->
              </el-form-item>
              <el-button style="height: 40px;" :type="item.color || 'success'" :icon="item.icon || ''" @click=" item.handle() ">{{ item.Buttonlabel }}</el-button>
            </div>
            <el-form-item v-else :key="item.prop" :label="item.type === 'Button' ? item.buttonlabel ? item.buttonlabel : '' : item.label" :prop="item.prop">
              <!--输入框-->
              <div class="item__content" v-if="item.type === 'Input'">
                <div v-if="item.fronttext" style="margin-right: 10px; white-space: nowrap;">{{ item.fronttext }}</div>
                <el-input v-model="searchData[item.prop]" :type="item.istype ? item.istype : 'text'" :show-password="item.showpassword ? item.showpassword: false" :disabled="item.disabled ? item.disabled : false" :placeholder="'请输入'+item.label" />
                <div v-if="item.aftertext" style="margin-left: 10px; white-space: nowrap">{{ item.aftertext }}</div>
              </div>
              <!--下拉框-->
              <el-select v-if="item.type==='Select'" v-model="searchData[item.prop]" :disabled="item.disabled ? item.disabled : false" :multiple="item.multiple || false" @change="item.change ? item.change(searchData[item.prop]) : ''">
                <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
              </el-select>
              <!--单选按钮-->
              <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
                <el-radio v-for="ra in item.radios" :key="ra.value" :disabled="item.disabled ? item.disabled : false" :label="ra.value">{{ ra.label }}</el-radio>
              </el-radio-group>
              <!--单选按钮-->
              <el-radio-group v-if="item.type==='RadioButton'" v-model="searchData[item.prop]" @change="item.change && item.change(searchData[item.prop])">
                <el-radio-button v-for="ra in item.radios" :key="ra.value" :label="ra.value">{{ ra.label }}</el-radio-button>
              </el-radio-group>
              <!--复选框-->
              <el-checkbox-group v-if="item.type==='Checkbox'" v-model="searchData[item.prop]">
                <el-checkbox v-for="ch in item.checkboxs" :key="ch.value" :label="ch.value">{{ ch.label }}</el-checkbox>
              </el-checkbox-group>
              <!--日期-->
              <el-date-picker v-if="item.type==='Date'" v-model="searchData[item.prop]" :type="item.istype || 'date'" :disabled="item.disabled || false" :placeholder="'请选择'+item.label" />
              <!--日期范围-->
              <el-date-picker v-if="item.type==='DateRange'" v-model="searchData[item.prop]" :disabled="item.disabled ? item.disabled : false" :multiple="item.multiple || false" type="daterange" align="right" unlink-panels :range-separator="item.rangetext ? item.rangetext : '至'" :start-placeholder="item.starttext ? item.starttext : '开始日期'" :end-placeholder="item.endtext ? item.endtext : '结束日期'" :picker-options="pickerOptions" />
              <el-date-picker v-if="item.type==='MonthRange'" v-model="searchData[item.prop]" type="monthrange" align="right" unlink-panels :range-separator="item.rangetext ? item.rangetext : '至'" :start-placeholder="item.starttext ? item.starttext : '开始日期'" :end-placeholder="item.endtext ? item.endtext : '结束日期'" :picker-options="pickerOptions" />
              <!--时间-->
              <el-time-select v-if="item.type==='Time'" v-model="searchData[item.prop]" />
              <!--时间范围-->
              <span v-if="item.type==='TimeRange'">
                <el-time-picker v-model="searchData[item.prop]" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                </el-time-picker>
              </span>
              <!-- 上传图片 -->
              <Upload v-if="item.type==='Upload'" :accept="item.accept ? item.accept : accept" :limit="item.limit ? item.limit : 1" :append-to-body="true" :file-list="searchData[item.prop]" @addSuccess="(value)=> addSuccess(item.prop, value)" @removePicture="(value)=> removePicture(item.prop, value)" />
              <!--按钮-->
              <el-button v-if="item.type === 'Button'" :type="item.color || item.label === '重置' ? 'danger':'primary'" :icon="item.icon || ''" @click="item.label !== '重置' ? item.handle() : resetForm('searchData') ">{{ item.label }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 表单数据项
    searchData: {
      type: Object,
      default: () => { }
    },
    searchForm: {
      type: Array,
      default: () => []
    },
    // 用于控制该表单内label的尺寸
    labelWidth: {
      type: String,
      default: '100px'
    },
    inline: {
      type: Boolean,
      default: true
    },
    // 当前时间日期选择器的选项, 配置选项查看element日期选择器配置
    pickerOptions: {
      type: Object,
      default: () => { }
    },
    // 表单验证
    rules: {
      type: Object,
      default: () => { }
    },
    // 上传文件类型
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.gif'
    },
    // 表单禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 用于控制该表单内组件的尺寸
      size: '', // medium
      multiColumn: this.isMultiColumn() // 判断表单显示方式
    }
  },
  methods: {
    // 重置表单
    resetForm () {
      this.$nextTick(() => {
        this.$refs['searchData'].resetFields()
      })
    },
    // 表单提交
    submitForm () {
      return new Promise((resolve, reject) => {
        this.$refs['searchData'].validate((valid) => {
          resolve(valid)
        })
      })
    },
    // 判断是否表单是否显示一行多列
    isMultiColumn () {
      let vm = this
      for (let i = 0; i < vm.searchForm.length; i++) {
        // 判断是否为多维数组
        if (vm.searchForm[i] instanceof Array) {
          return true
        } else {
          return false
        }
      }
      return false
    },
    // 上传图片点击事件
    addSuccess (name, { response, file, fileList }) {
      let vm = this
      let fields = vm.$refs['searchData'].fields
      vm.searchData[name] = fileList
      // 移除该表单项的校验结果
      if (vm.searchData[name].length !== 0) {
        for (let i = 0; i < fields.length; i++) {
          if (fields[i].prop === name) {
            console.log(fields[i].prop)
            fields[i].clearValidate()
            break
          }
        }
      }
      // console.log(file)
      console.log(fileList)
    },
    // 删除上传图片点击事件
    removePicture (name, fileList) {
      let vm = this
      vm.searchData[name] = fileList
    },
  }
}

</script>
<style scoped lang='scss'>
.Input-box {
  display: flex;
  align-self: center;
  justify-content: space-between;
}
.item__content {
  display: flex;
}
</style>
