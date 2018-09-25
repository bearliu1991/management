import axios from 'axios'
import { Message } from 'iview'

const service = axios.create({
  withCredentials: true, // 允许携带cookie
  baseURL: process.env.API_ROOT
});
// 13156521718
service.interceptors.request.use(
    config => {
      console.log('ajaxrequest', config.url)
      console.log('ajaxrequestparam', config.data)
      console.log("*********")
      return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
service.interceptors.response.use(
    response => {
      let data = response.data;
      let reqUrl = response.config.url;
      console.log('response url ', reqUrl)
      console.log('ajaxresponse', response)
      console.log('-------------------')
      if (data.code !== 1 && !reqUrl.includes('pageauth')) {
        Message.error({
          content: data.message,
          duration: 10
        })
        return Promise.reject(data)
      }
      return data;
    },
    error => {
      console.log('ajax err', error)
      Message.error({
          content: error,
          duration: 10
        })
      return Promise.reject(error.response)
    });
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default service
