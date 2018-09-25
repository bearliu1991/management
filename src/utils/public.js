// 此处放置公用方法
import axios from './axios'
import ieVersion from './ieVersion'
import qs from 'qs'
// get请求
function httpGet (url, args) {
  return new Promise(function (resolve, reject) {
    axios.get(url, {
      params: args
    })
      .then(function (r) {
        resolve(r)
      }).catch(function (err) {
        debugger
        reject(err)
    })
  })
}

// post请求
function httpPost(url, args) {
  return new Promise(function (resolve, reject) {
    if (ieVersion < 10) {
      let _url = '';
      let _args = '';
      if (typeof args !== 'string') {
        args.sessionId = getCookie('sessionId');
        args.isIE9 = true;
        _args = qs.stringify(args)
      } else {
        _args = args + '&isIE9=true&sessionId=' + getCookie('sessionId')
      }
      url.includes('?') ? (_url = url + _args) : (_url = url + "?" + _args);
      axios.get(_url).then(function (r) {
        resolve(r)
      }).catch(function (err) {
        reject(err)
      })
    } else {
      axios.post(url, args)
        .then(function (r) {
          resolve(r)
        }).catch(function (err) {
          reject(err)
        })
    }
  })
}
// 多重请求
function httpAll (reqFun1, reqFun2) {
  return new Promise(function (resolve, reject) {
    axios.all([reqFun1, reqFun2])
      .then(axios.spread(function (acct, perms) {
        resolve(acct, perms)
      }))
      .catch(function (error) {
        throw error
      })
  })
}

// 设置cookie
function setCookie(cname, cvalue, exdays) {
  var _exdays = exdays || 0;
  var d = new Date();
    d.setTime(d.getTime() + (_exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + ';';
}

// 获取cookie
function getCookie (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
  }
  return "";
}
// 清除cookie
function clearCookie(name) {
  setCookie(name, "", -1);
}

export default {
  httpGet,
  httpPost,
  httpAll,
  setCookie,
  getCookie,
  clearCookie
}
