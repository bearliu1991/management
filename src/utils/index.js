import request from './request'
import components from './components'
import ieVersion from './ieVersion'
import Treelist from '@/components/treelist/treelist'

export default {
  install(Vue, options) {
    // 引入请求内容
    request();
    // 引入全局vue组件
    Vue.component("Treelist", Treelist)
    for (let key in components) {
      Vue.component(key, components[key])
    };
    // 自定义事件
    Vue.directive('focus', {
      inserted: function (el) {
        el.focus()
      }
    });
    Vue.prototype.ieVersion = ieVersion;
    // 设置cookie
    Vue.prototype.setCookie = function (cname, cvalue, exdays) {
      let d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + ';';
    };
    Vue.prototype.getCookie = function (cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
      }
      return "";
    };
    Vue.prototype.mergeSameProperty = (target, source) => {
      for (var key in source) {
        if (target.hasOwnProperty(key)) target[key] = source[key];
      }
      return target;
    };
    Vue.prototype.deepcopy = function (source) {
      if (!source) {
        return source;
      }
      let sourceCopy = source instanceof Array ? [] : {};
      for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? this.deepcopy(source[item]) : source[item];
      }
      return sourceCopy;
    };
    Vue.prototype.getTargetParentNode = (curNode, parentTagName) => {
      let parent = curNode
      while (parent.tagName.toLowerCase() !== parentTagName) {
        parent = parent.parentNode
      }
      return parent
    };
    Vue.prototype.dateTimeFormat = function(value, type) {
      var d = new Date(value);
      var date = (d.getFullYear()) + "-" +
                (d.getMonth() + 1) + "-" +
                (d.getDate());
      var time = (d.getHours()) + ":" +
                (d.getMinutes()) + ":" +
                (d.getSeconds());
      if (type === "date") {
        return date
      } else {
        return date + " " + time
      }
    };
    // filter function
    Vue.prototype.filterSubSystem = function(value) {
      if (!value) return ''
      if (value === 1) return '是pc端web聊天系统'
      if (value === 2) return '否pc端桌面聊天系统'
      if (value === 3) return '是pc端web管理系统'
      if (value === 4) return '否pc端web运营系统'
      if (value === 5) return '是IOS'
      if (value === 6) return '否安卓'
    };
    Vue.prototype.setModal = function (param = {}) {
      let arg = Object.assign({
        ref: 'modal',
        formValidate: null,
        type: null,
        title: null,
        visible: false,
        formItems: null,
        newFormItems: false,
        data: {},
        initFormItems: this.PageConfig.formItems,
        extItems: []
      }, param)
      this.modalType = arg.type;
      this.modalTitle = arg.title;
      this.$refs[arg.ref].modal = arg.visible;
      if (arg.formValidate) {
        this.$set(this, 'formValidate', arg.formValidate);
      } else {
        let _fromItems = arg.newFormItems ? [] : this.deepcopy(arg.initFormItems);
        _fromItems = _fromItems.concat(arg.extItems);
        _fromItems.forEach(item => {
          item.value = arg.data[item.prop] ? arg.data[item.prop] : arg.data[item.prop] === 0 ? 0 : item.value
        });
        this.$set(this, 'formItems', _fromItems);
      }
    };
    Vue.prototype.setModalOpen = function (param = {}) {
      let arg = Object.assign({
        ref: 'modal',
        formValidate: null,
        type: null,
        title: null,
        visible: false,
        formItems: null,
        data: {},
        initFormItems: [],
        extItems: []
      }, param)
      this.modalType = arg.type;
      this.modalTitle = arg.title;
      this.$refs[arg.ref].modal = arg.visible;
      if (!arg.visible) return;
      if (arg.formValidate) {
        this.$set(this, 'formValidate', arg.formValidate);
      } else {
        let _fromItems = this.deepcopy(arg.initFormItems);
        _fromItems = _fromItems.concat(arg.extItems);
        _fromItems.forEach(item => { item.value = arg.data[item.prop] || item.value });
        this.$set(this, 'formItems', _fromItems);
      }
    };
    Vue.prototype.confirm = function (param = {}) {
      let arg = Object.assign({
        ref: 'confirm',
        type: 'confirm',
        title: '操作提示',
        visible: false,
        enable: false,
        data: null
      }, param);
      let refCofirm = this.$refs[arg.ref]
        refCofirm.modal = arg.visible
        refCofirm.title = arg.title
        refCofirm.type = arg.type
        refCofirm.data = arg.data
        refCofirm.html = arg.html
        refCofirm.enable = arg.enable
    };
    Vue.prototype._transformData = function (obj, rules = {}, reverse, subobj) {
      let reverseRules = {}
      if (reverse) {
        for (let key in rules) {
          reverseRules[rules[key]] = key
        }
        rules = reverseRules
      }
        const transform = function (obj, rules, subobj) {
        let temp = {};
        for (let key in rules) {
          if (key === subobj && obj[key]) {
            if (Array.isArray(obj[key])) {
              temp[rules[key]] = []
              obj[key].forEach(_item => {
                temp[rules[key]].push(transform(_item, rules, subobj))
              })
            } else {
              temp[rules[key]] = transform(obj[key], rules, subobj)
            }
          } else {
            temp[rules[key]] = obj[key]
          }
        }
        return temp
      }
      if (Array.isArray(obj)) {
        return obj.map(item => transform(item, rules, subobj))
      } else {
        return transform(obj, rules, subobj)
      }
    }
    Vue.prototype._computedTreeTotal = function (obj, rules, subobj, ruleSumItem) {
      const computedTarget = (obj, rules, subobj, ruleSumItem, arr, flag) => {
          let temp = {}
            temp['flag'] = flag || 'tree'
          let _arr = arr || []
          let _arrLen = _arr.length
            for (let key in rules) {
                if (key !== ruleSumItem && _arrLen >= 1) {
                    temp[key] = _arr[_arrLen - 1][rules[key]]
                } else {
                    temp[key] = 0
                }
            }
            _arr.push(temp)
            _arr.forEach(item => {
                if (temp['flag'].includes(item.flag)) {
                    // item[ruleSumItem] += obj[rules[ruleSumItem]] || 0
                    item.total += obj.num || 0
                    console.log(item[ruleSumItem])
                }
            })
            for (let key in obj) {
                if (key === subobj && Array.isArray(obj[subobj])) {
                    temp[key] = []
                    obj[key].forEach((item, index) => {
                        temp[key].push(computedTarget(item, rules, subobj, ruleSumItem, _arr, temp.flag+index))
                    })
                } else {
                    temp[key] = obj[key]
                }
            }
          return temp;
      }
      return computedTarget(obj, rules, subobj, ruleSumItem);
    }
    Vue.prototype.bodyClick = function () {
      document.body.click()
    }
  }
};
