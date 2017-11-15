import {Validator} from 'vee-validate' // vee-validate为vue验证插件
import _ZhCN from '@/assets/js/zh_CN' // 引入中文提示包

export const Config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'zh_CN', //使用中文提示信息
  dictionary: {
    messages: _ZhCN
  },
  strict: true, // 开启严格模式，没有设置规则的表单不进行校验
  enableAutoClasses: false,
  /* classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  }, */
  events: 'input|blur',
  inject: true
}

Validator.setLocale(_ZhCN)

// 自定义提示
const dictionary = {
  zh_CN: {
    messages: {
      required: (field) => field + '不能为空',  // 用户操作表单后value还是为空时的提示
      email: (field) => field + '格式不正确'  // 改变验证显示的信息
    }
  }
}
Validator.updateDictionary(dictionary)

// 拓展validator的验证规则  mobile
Validator.extend('mobile', {
  // 验证提示的信息
  messages: {
    zh_CN: (field, args) => '手机号码必须是11位'
  },
  // 验证规则
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})
