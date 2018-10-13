<template>
  <div id="pic-host-chrome-extension">
    <upload-panel
      :picList="picList"
      :userInfo="userInfo"
      @updateStorage="getStorageData"
    />
    <option-panel
      :userInfo="userInfo"
      @updateStorage="getStorageData"
    />
  </div>
</template>

<script>
import UploadPanel from './upload_panel/index'
import OptionPanel from './option_panel/index'
import utils from '../common/utils'

const storageMap = {
  picHostUserInfo: {
    data: 'userInfo',
    default: {}
  },
  picHostPicList: {
    data: 'picList',
    default: []
  }
}

export default {
  components: {
    UploadPanel, OptionPanel
  },
  data() {
    return {
      userInfo: {},
      picList: []
    }
  },
  methods: {
    getStorageData(key) {
      let keyMap = key ? [key] : ['picHostUserInfo', 'picHostPicList'];
      utils.getStorage(keyMap).then((res) => {
        if (res) {
          keyMap.map(key => {
            this[storageMap[key].data] = res[key] ?
              utils.deepClone(res[key]) :
              storageMap[key].default
          });
        }
      })
    },
  },
  created() {
    // utils.removeStorage(['picHostUserInfo','picHostPicList']);
    this.getStorageData();
  }
}
</script>

<style lang="scss">

body {
  margin: 0!important;
  font-size: 100%!important;
}

#pic-host-chrome-extension {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
  width: 196px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
}

</style>
