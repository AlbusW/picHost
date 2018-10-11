import utils from '../common/utils'
import config from '../common/config'


function initStorage() {
  utils.getStorage(['picHostUserInfo', 'picHostPicList']).then((res) => {
    if (!res.picHostUserInfo && !res.picHostPicList) {
      utils.setStorage(config.defaultStorage);
    }
  })
}

initStorage();
