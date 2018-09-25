import qs from 'qs'
import Vue from 'vue'
import Path from '@/api'
import Http from './public'

export default function () {
  Vue.prototype.Path = Path;
  Vue.prototype.$get = function (url, args) {
    return Http.httpGet(url, args)
  }
  Vue.prototype.$post = function (url, args) {
    return Http.httpPost(url, args)
  }
  Vue.prototype.$download = function (url, args) {
    let downLoadUrl = url + '?' + args.fileName + "=" + args.filePath;
    window.location.href = downLoadUrl
  }
  Vue.prototype.intercept = function (url, args) {
    return Http.httpPost(url, args)
  }
  Vue.prototype.getSid = function (url, args) {
    return Http.httpGet(Path.getSid)
  }
  Vue.prototype.login = function (args) {
    return Http.httpPost(Path.login, qs.stringify(args))
  }
  Vue.prototype.register = function (args) {
    return Http.httpPost(Path.register, qs.stringify(args))
  }
  Vue.prototype.logout = function (args) {
    return Http.httpPost(Path.logout)
  }
  Vue.prototype.getRoutes = function (args) {
    return Http.httpPost(Path.routeMap)
  }
  Vue.prototype.pageauth = function (args) {
    return Http.httpPost(Path.pageauth, args)
  }
}
