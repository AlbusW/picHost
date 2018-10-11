<template>
  <div class="pic-host-upload-panel">
    <pic-uploader
      class="pic-uploader"
      :info="userInfo"
      @startUpload="handleStartUpload"
      @uploadSuccess="handleUploadSuccess"
      @uploadFail="handleUploadFail"
      @uploadFinish="handleUploadFinish"
    />
    <transition name="fade" >
      <p
        class="tip"
        :class="msgType === 'error' ? 'error-tip' : ''"
        v-show="showTip">
        {{tip}}
      </p>
    </transition>
    <ul class="pic-host-list">
      <pic-item
        v-for="item in list"
        :key="item.url"
        :data="item"
        :disabled="item.status === 'pending'"
        @click="handlePicItemClick"
      />
    </ul>
    <input
      class="clipboard"
      type="text"
      v-model="clipboard"
      ref="clipboard"
    />
  </div>
</template>

<script>
import PicItem from '../components/pic_item'
import PicUploader from '../components/uploader'
import utils from '../../common/utils'

export default {
  components: {
    PicItem, PicUploader
  },
  props: {
    picList: Array,
    userInfo: Object
  },
  data() {
    return {
      uploadList: [],
      clipboard: '',
      showTip: false,
      tip: '',
      msgType: 'success'
    }
  },
  computed: {
    list() {
      return this.uploadList.concat(this.initStatus(this.picList))
    }
  },
  methods: {
    initStatus(data) {
      return data.map((item) => {
        item.status = 'success';
        return item
      })
    },
    handlePicItemClick(data) {
      this.clipboard = data.url ? data.url : data;

      if (this.userInfo.config.isMarkdown) {
        this.clipboard = `![](${this.clipboard})`;
      }

      this.$nextTick(()=> {
        this.excCopy();
        this.showMsg('复制成功！');
      });
    },
    handleStartUpload(item) {
      this.uploadList.unshift(item);
    },
    handleUploadSuccess(item) {
      let imgUrl = this.userInfo.hostConf.domain + '/' + item.key;
      utils.setStorage({
        picHostPicList: [{url: imgUrl}].concat(this.picList)
      });

      this.$emit('updateStorage', 'picHostPicList');
      this.handlePicItemClick(imgUrl);
    },
    handleUploadFail(res) {
      this.showMsg(res || '上传失败','error');
    },
    handleUploadFinish() {
      this.uploadList = [];
    },
    excCopy() {
      this.$refs.clipboard.select();
      document.execCommand('copy');
    },
    showMsg(msg,msgType = 'success') {
      this.msgType = msgType;
      this.tip = msg;
      this.showTip = true;
      setTimeout(() => {
        this.showTip = false;
      }, 1000);
    }
  }
}
</script>

<style lang="scss">
.pic-host-upload-panel {
  display: flex;
  flex-direction: column;
  position: relative;

  .pic-host-list {
    padding: 0 8px;
    max-height: 360px;
    overflow-y: auto;
  }

  .pic-uploader {
    margin: 8px;
  }

  .clipboard {
    position: absolute;
    left: -100px;
    top: -100px;
  }

  .tip {
    width: 100%;
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 5;
    line-height: 2.2;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    background: yellowgreen;
  }

  .error-tip {
    background: #ff866b;
  }

  .show-tip {
    display: block;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>
