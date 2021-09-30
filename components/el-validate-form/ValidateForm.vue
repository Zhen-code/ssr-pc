<!-- 搜索表单 -->
<template>
  <div>
    <el-form
      ref="ruleForm"
      :disabled="disabled"
      :rules="rules"
      :inline="inline"
      :model="searchData"
      class="form-inline"
      :size="size"
      :label-width="labelWidth">
      <el-form-item v-for="item in searchForm" :key="item.prop" :prop="item.prop || ''" :label="item.type === 'Button'?'':item.label">
        <!--输入框-->
        <el-input v-if="item.type === 'Input'" v-model="searchData[item.prop]" :disabled="item.disabled" :placeholder="'请输入'+item.label" :type="item.inputtype || 'text'" style="width: 220px" />
        <!--前缀或后缀输入框-->
        <el-input v-if="item.type === 'prefixInput' || item.type === 'appendInput'" v-model="searchData[item.prop]" :disabled="item.disabled" :placeholder="'请输入'+item.label" :type="item.inputtype || 'text'" style="width: 220px">
          <template v-if="item.type === 'prefixInput'" slot="prepend">{{ item.prefixText || '' }}</template>
          <template v-if="item.type === 'appendInput'" slot="append">{{ item.appendText || '' }}</template>
        </el-input>
        <!--文本框-->
        <el-input v-if="item.type === 'TextArea'" v-model="searchData[item.prop]" :disabled="item.disabled" type="textarea" :rows="item.rows || 3" :placeholder="'请输入'+item.label" />
        <!--下拉框-->
        <el-select v-if="item.type==='Select'" v-model="searchData[item.prop]" @change="item.change && item.change(searchData[item.prop])">
          <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
        </el-select>
        <!--单选按钮-->
        <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
          <el-radio v-for="ra in item.radios" :key="ra.value" :label="ra.value">{{ ra.label }}</el-radio>
        </el-radio-group>
        <!--单选按钮-->
        <el-radio-group v-if="item.type==='RadioButton'" v-model="searchData[item.prop]" :disabled="item.disabled" @change="item.change && item.change(searchData[item.prop])">
          <el-radio-button v-for="ra in item.radios" :key="ra.value" :label="ra.value">{{ ra.label }}</el-radio-button>
        </el-radio-group>
        <!--复选框-->
        <el-checkbox-group v-if="item.type==='Checkbox'" v-model="searchData[item.prop]">
          <el-checkbox v-for="ch in item.checkboxs" :key="ch.value" :label="ch.value">{{ ch.label }}</el-checkbox>
        </el-checkbox-group>
        <!--日期-->
        <el-date-picker v-if="item.type==='Date'" v-model="searchData[item.prop]" :disabled="item.disabled" :type="item.dateType || 'date'" />
        <!--时间-->
        <el-time-select v-if="item.type==='Time'" v-model="searchData[item.prop]" />
        <!--开始时间范围-->
        <span v-if="item.type==='TimeRangeS'">
          <el-time-select
            v-model="searchData[item.prop]"
            placeholder="起始时间"
            :picker-options="item.pickerOptions ? item.pickerOptions : pickerOptionsStart"
          >
          </el-time-select>
        </span>
        <!--结束时间范围-->
        <span v-if="item.type==='TimeRangeE'">
          <el-time-select
            v-model="searchData[item.prop]"
            placeholder="结束时间"
            :picker-options="item.pickerOptions ? item.pickerOptions : pickerOptionsEnd"
          >
          </el-time-select>
        </span>
        <!--时间范围-->
        <span v-if="item.type==='TimeRange'">
          <el-time-picker
            v-model="searchData[item.prop]"
            is-range
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </span>
        <el-date-picker v-if="item.type==='DateRange'" v-model="searchData[item.prop]" type="daterange" align="right" unlink-panels :range-separator="item.rangetext ? item.rangetext : '至'" :start-placeholder="item.starttext ? item.starttext : '开始日期'" :end-placeholder="item.endtext ? item.endtext : '结束日期'" :picker-options="pickerOptions" />
        <!--按钮-->
        <el-button v-if="item.type === 'Button'" :type="item.color || 'primary'" :icon="item.icon || ''" @click="item.handle()">{{ item.label }}</el-button>
        <!--链接-->
        <el-link v-if="item.type === 'Link'" type="primary">{{ item.text }}</el-link>
        <!--其它自定义内容，类型自定义，可增加-->
        <span v-if="item.type === 'Extra'">
          <slot name="extra" />
        </span>
        <span v-if="item.type === 'Extra1'">
          <slot name="extra1" />
        </span>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'ValidateForm',
  props: {
    // 表单数据项
    searchData: {
      type: Object,
      default: () => {}
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
    rules: {
      type: Object,
      default: () => {}
    },
    // 当前时间日期选择器的选项, 配置选项查看element日期选择器配置
    pickerOptions: {
      type: Object,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 用于控制该表单内组件的尺寸
      size: 'medium',
      pickerOptionsStart: {
        start: '00:00',
        step: '00:30',
        end: '24:00'
      },
      pickerOptionsEnd: {
        start: '12:00',
        step: '00:30',
        end: '24:00'
      }
    }
  },
  methods: {
    submitForm() {
      let submit = false
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          submit = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
      return submit
    }
  }

}

</script>
<style>
</style>
