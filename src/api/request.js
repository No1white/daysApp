import axios from 'axios';  //用于发送ajax请求
import qs from "qs";  //qs处理url参数化

const url='/api'
// axios.defaults.baseURL = 'http://192.168.1.101:8081'; // 设置全局默认基本信息
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'; // 设置默认的请求头的Content-Type


/**
 * @description 封装的get请求的方法
 * @param {*} url 请求的地址
 * @param {*} data  请求的数据
 * @returns 数据请求的promise对象
 */
function getRequest(url, data) {
    return axios.get(url, {
        params: data
    })
}

/**
 * @description 封装post请求的方法
 * @param {*} url 请求的地址
 * @param {*} data 请求的数据
 * @returns 数据请求的promise对象
 */
function postRequest(url, data) {
    return axios.post(url, data)
}

// 请求拦截器
axios.interceptors.request.use(config => {
    if (Object.prototype.toString.call(config.data) !== '[object FormData]') {
        config.data = qs.stringify(config.data);
    }
    return config
})
// 响应拦截器
axios.interceptors.response.use(response => response.data)

export default {
    url,
    postRequest,
    getRequest
}

