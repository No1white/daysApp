
import axios from './request'
export const baseUrl =  'http://192.168.0.106:4000/api/'
export const imgBaseUrl = 'http://192.168.0.106:4000/'
export const reqCode = data => {return axios.getRequest(baseUrl+'users/get_code',data)}; //获取验证码
export const reqRegister = data => {return axios.postRequest(baseUrl+'users/register',data)} //处理注册请求
export const reqLogin = data => {return axios.postRequest(baseUrl+'users/login',data)} //处理登录请求
export const reqChangePassword = data => {return axios.postRequest(baseUrl+'users/change_poassword',data)} //处理忘记密码请求
