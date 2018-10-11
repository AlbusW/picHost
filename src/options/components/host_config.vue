<template>
  <section class="pic-host-config-main">
    <Tabs tab-position="left" v-model="hostType">
      <tab-pane
        class="host-tab-pane"
        v-for="item in conf"
        :key="item.name"
        :name="item.name"
        :label="item.label">
          <component
            ref="hostForm"
            :is="item.component"
            :data="userInfo.hostConf"
            @submit="handleSubmit"
          />
      </tab-pane>
    </Tabs>
    <div class="btn-group">
      <Button @click="handleClick" :disabled="submitDisabled">应用</Button>
    </div>
  </section>
</template>

<script>
import { Tabs, TabPane , Button, Message} from 'element-ui'
import HostForm from './host_form'
import utils from '../../common/utils'

export default {
  components: {
    Tabs, TabPane, Button, HostForm, Message
  },
  props: {
    userInfo: Object
  },
  data() {
    return {
      conf: [{
        label: '七牛',
        name: 'qiniu',
        component: HostForm
      }],
      hostType: 'qiniu',
      submitDisabled: false
    }
  },
  watch: {
    ['userInfo.config.host'](val) {
      if (val) {
        this.hostType = val;
      }
    }
  },
  methods: {
    handleClick() {
      this.$refs.hostForm[0].submit();
    },
    handleSubmit(data) {
      let hostConf = this.userInfo.hostConf;

      if (data) {
        hostConf = data;
      }

      utils.setStorage({
        picHostUserInfo: {
          hostConf: {...hostConf},
          config: {
            isMarkdown: this.userInfo.config.isMarkdown,
            host: this.hostType
          }
        }
      }).then(() => {
        Message.success({
          message: '设置成功！'
        });
        this.$emit('updateStorage')
      })
    },
  }
}
</script>

<style lang="scss">
.pic-host-config-main {
  .el-tabs__header {
    width: 20%;
  }

  .el-tabs__item {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
  }

  .el-tabs__content {
    min-height: 320px;
    border: 1px dashed #999;
    border-radius: 5px;
  }

  .conf-tip {
    font-size: 14px;
    text-align: center;
    margin-top: 50px;
  }

  .btn-group {
    text-align: center;
    margin: 30px 0;
  }
}
</style>
