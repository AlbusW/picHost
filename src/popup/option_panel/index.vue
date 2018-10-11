<template>
<div class="pic-host-option-panel">
  <opt-item
    v-for="item in optConf"
    :key="item.type"
    :label="item.label"
    :type="item.type"
    :showSelect="item.type === 'Markdown' ? isMarkDown : false"
    @click="handleOptClick"
  />
</div>
</template>

<script>
import OptItem from '../components/opt_item'
import utils from '../../common/utils'

export default {
  components: {
    OptItem
  },
  props: {
    userInfo: Object
  },
  data() {
    return {
      optConf: [{
        label: 'Markdown',
        type: 'Markdown',
      },{
        label: '清空上传历史',
        type: 'Clear',
      },{
        label: '偏好设置',
        type: 'Config',
      }]
    }
  },
  computed: {
    isMarkDown() {
      return this.userInfo.config ? this.userInfo.config.isMarkdown : false
    }
  },
  methods: {
    handleOptClick(type) {
      this['handle'+ type + 'Click']();
    },
    handleMarkdownClick() {
      utils.setStorage({
        'picHostUserInfo' : {
          ...this.userInfo,
          config: {
            ...this.userInfo.config,
            isMarkdown: !this.userInfo.config.isMarkdown
          }
        }
      }).then(() => {
        this.$emit('updateStorage','picHostUserInfo');
      })
    },
    handleClearClick() {
      utils.setStorage({picHostPicList: []}).then(() => {
        this.$emit('updateStorage','picHostPicList');
      })
    },
    handleConfigClick() {
      window.open('../pages/options.html');
    },

  }
}
</script>

<style lang="scss">
.pic-host-option-panel {
  padding: 5px 8px;
}
</style>
