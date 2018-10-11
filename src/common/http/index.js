import axios from 'axios';

if (!Promise.prototype.always) {
  Promise.prototype.always = function (callback) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
  };
}

export default {
  _io(url,userData = {},type = 'GET'){
    if (url) {
      return new Promise(function(resolve, reject){
        let typeR = ['post','POST'].indexOf(type) !== -1 ? 'post' : 'get';
        let data = typeR === 'post' ? userData : {};
        let params = typeR === 'get' ? userData : {};

        axios({
          url: url,
          data: data,
          params: params,
          method: type,
          responseType: 'json',
        })
          .then(function(res){
            resolve(res);
          })
          .catch(function (res) {
            reject(res);
          })
      })
    }
  },
}
