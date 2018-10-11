function excStorage(opt, source, data) {
  return new Promise((resolve, reject) => {
    chrome.storage[source][opt](data, (res) => {
      resolve(res);
    });
  }).catch((err) => {
    console.log(err)
  })
}

export default {
  getStorage(key = [], source = 'local') {
    return excStorage('get', source, key);
  },
  setStorage(data = {}, source = 'local') {
    return excStorage('set', source, data);
  },
  removeStorage(key = [], source = 'local') {
    return excStorage('remove', source, key);
  },
  deepClone: function (obj) {
    let isClass = function (object) {
      if (object === null) return "Null";
      if (object === undefined) return "Undefined";
      return Object.prototype.toString.call(object).slice(8, -1);
    }

    let result,
      oClass = isClass(obj);

    if (oClass === "Object") {
      result = {};
    } else if (oClass === "Array") {
      result = [];
    } else {
      return obj;
    }

    for (var key in obj) {
      var copy = obj[key];
      if (isClass(copy) == "Object") {
        result[key] = this.deepClone(copy);
      } else if (isClass(copy) == "Array") {
        result[key] = this.deepClone(copy);
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  },
}
