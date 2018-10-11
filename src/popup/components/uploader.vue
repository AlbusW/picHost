<template>
  <div class="pic-host-uploader">
    <input
      class="uploader-input"
      placeholder="粘贴或点击图片上传"
      @paste="handlePaste"
      @click="handleClick"
      :disabled="disabled"
    />
    <input
      type="file"
      accept="image/gif,image/png,image/jpeg,image/jpg,image/bmp,image/webp"
      class="file-input"
      ref="fileInput"
      @change="handleSelectPic"
    >
  </div>
</template>

<script>
import http from '../../common/http/index';
import QiniuUPToken from 'qiniu-uptoken'

export default {
  props: {
    info: Object,
  },
  data() {
    return {
      url: '',
      disabled: false
    }
  },
  methods: {
    handleClick() {
      !this.disabled && this.$refs.fileInput.click();
    },
    handlePaste(e) {
      let clipboardData = e.clipboardData;
      if (clipboardData.types[0] === 'Files' && !this.disabled) {
        let file = clipboardData.files[0];
        file.type.match(/^image\//i) && this.uploadFile(file);
      }
    },
    handleSelectPic(e) {
      let files = [...e.target.files];
      files.map(file => {
        this.uploadFile(file);
      })
    },
    uploadFile(file) {
      let host = this.info.config.host;

      this.disabled = true;
      this.$emit('startUpload', {url: window.URL.createObjectURL(file), status: 'pending'});

      this[host + 'Post'](file);
    },
    qiniuPost(file) {
      if (this.info.hostConf.area) {
        http._io(this.info.hostConf.area, this.getQiniuParams(file), 'post')
          .then((res) => {
            if (res.status === 200) {
              this.$emit('uploadSuccess', res.data);
            } else {
              this.$emit('uploadFail', res);
            }
          }, (res) => {
            this.$emit('uploadFail', res);
          }).always(() => {
          this.$emit('uploadFinish', file);
          this.disabled = false;
        })
      }else {
          window.open('./options.html');
      }

    },
    getQiniuParams(file) {
      let formData = new FormData();
      formData.append('action', this.info.hostConf.scope);
      formData.append('file', file);
      formData.append('token', this.getToken(this.info.hostConf));

      return formData;
    },
    getToken(data) {
      return QiniuUPToken(data.accessKey, data.secretKey, data.scope)
    }
  }
}
</script>

<style lang="scss">
  .pic-host-uploader {
    border-radius: 3px;
    border: 1px dashed #999;
    box-sizing: border-box;

    &:hover {
      border-color: yellowgreen;
    }

    .uploader-input {
      padding: 0;
      margin: 0;
      font-size: 14px;
      width: 83%;
      line-height: 3;
      padding-left: 25px;
      border: none;
      color: transparent;
      cursor: pointer;
      user-select: none;

      &:focus {
        outline: none;
      }
    }

    .file-input {
      display: none;
    }
  }
</style>
