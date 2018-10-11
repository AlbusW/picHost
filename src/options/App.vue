<template>
  <div id="app">
    <header>
      <h1>pic-host</h1>
      <p class="title">图床助手</p>
      <hr>
    </header>
    <host-config
      :userInfo="userInfo"
      @updateStorage="getStorageData"
    />
  </div>
</template>

<script>
import hostConfig from './components/host_config'
import utils from '../common/utils'

export default {
  components: {
    hostConfig
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    getStorageData() {
      utils.getStorage('picHostUserInfo').then((res) => {
        if (res) {
           this.userInfo =  utils.deepClone(res.picHostUserInfo)
        }
      })
    }
  },
  created() {
    this.getStorageData();
  }
}
</script>

<style lang="scss">
body {
  background-image: url(../../static/img/bg_body.jpg);
  background-repeat: repeat;
  background-position: center center;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #939699;
  margin: 0 15%;
}

header {
  padding-top: 15px;
}

h1 {
  font-weight: 500;
  font-size: 30px;
  margin: 5px 0;
}

.title {
  font-size: 16px;
  margin: 0;
}

hr {
  margin: 20px 0;
  border: 0;
  height: 1px;
  background-color: #dedede;
}
</style>
