<template>
  <Form ref="hostForm" :model="form" :rules="rules" label-width="20%" class="pic-host-form">
    <form-item
      v-for="item in config"
      :key="item.key"
      :label="item.label"
      :prop="item.key"
    >
      <Select
        v-if="item.key === 'area'"
        v-model="form.area"
      >
        <Option
          v-for="item in areaConf"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </Select>
      <Input
        v-else
        clearable
        v-model.trim="form[item.key]"
        :placeholder="item.placeholder"
        :type="item.key === 'secretKey' ? 'password' : 'text'"
      />
    </form-item>
  </Form>
</template>

<script>
import { Form, FormItem, Input, Select, Option} from 'element-ui'
import urlMap from '../../common/http/urls';

export default {
  components: {
    Form, FormItem, Input, Select, Option
  },
  props: {
    data: Object
  },
  data() {
    return {
      config: [{
        label: '储存区域',
        key: 'area'
      },{
        label: '资源目录',
        placeholder: '',
        key: 'scope'
      },{
        label: 'Access Key',
        placeholder: '',
        key: 'accessKey'
      },{
        label: 'Secret Key',
        placeholder: '',
        key: 'secretKey'
      },{
        label: '网址前缀',
        placeholder: '例如：http://pejdffbfu.bkt.clouddn.com',
        key: 'domain'
      }],
      form: {
        area: '',
        scope: '',
        accessKey: '',
        secretKey: '',
        domain: ''
      },
      rules: {
        area: [
          {required: true, message: '请选择存储区域', trigger: 'change' }
        ],
        scope: [
          { required: true, message: '请输入资源目录', trigger: 'blur' },
        ],
        accessKey: [
          { required: true, message: '请输入Access Key', trigger: 'blur' },
        ],
        secretKey: [
          { required: true, message: '请输入Secret Key', trigger: 'blur' },
        ],
        domain: [
          { required: true, message: '请输入网址前缀', trigger: 'blur' },
        ],
      },
      areaConf: urlMap.qiniu
    }
  },
  watch: {
    data(val) {
      this.form = {...val};
    }
  },
  methods: {
    submit () {
      this.$refs.hostForm.validate((res,data)=> {
        res && this.$emit('submit', {...this.form})
      })
    }
  }
}
</script>

<style lang="scss">
.pic-host-form {
  padding: 30px 120px 30px 30px;
}
</style>
