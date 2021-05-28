// 包含n个接口请求函数的模块
//  * 函数的返回值: promise对象

import axios from 'axios'
import { decrypt } from '../util/crypto'
const BASE_URL = 'http://182.92.221.129:8081'

//获取登录信息
export const reqUserInfo = (loginMsg: any) => {
    let promise = axios({
        method: 'POST',
        url: BASE_URL + '/login',
        data: loginMsg,
        // http请求消息头
        headers: {
            // 标识响应报头的格式
            'Content-Type': 'application/json;charset=UTF-8',
            'captcha': sessionStorage.getItem('captcha'),
        }
    })
    return new Promise<any>(function (resolve, reject) {
        promise.then(function (response) {
            resolve(response)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取验证码
export const reqCaptcha = () => {
    let promise = axios({
        method: 'GET',
        url: BASE_URL + '/captcha',
        // 在发送跨域的请求的时候，设置不允许携带cookie
        withCredentials: false,
        // 设置请求响应对象数据类型为arraybuffer
        responseType: 'arraybuffer'

    })
    return new Promise<any>(function (resolve, reject) {
        promise.then(function (response) {
            resolve(response)
        }).catch(function (error) {
            reject(error)
        })
    })
}

//获取天气信息
export const reqWeatherInfo = (data: any) => {
    let promise = axios({
        method: 'get',
        // 天气预报json城市代码接口
        url: 'http://wthrcdn.etouch.cn/weather_mini',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        // params是添加到url的请求字符串中的，用于get，在请求后面拼接参数
        params: data
    })
    return new Promise<any>(function (resolve, reject) {
        promise.then(function (response) {
            resolve(response)
        }).catch(function (error) {
            reject(error)
        })
    })
}


//获取预警信息列表
export const reqMessageLists = (data: any) => {
    let promise = axios({
        method: 'get',
        url: BASE_URL + '/infos',
        headers: {
            // 对http请求进行权限设定，把登录之后每个用户对应的token解密之后给到authorization，作为请求的头部信息，因为每个人的token不同，从而达到对每个人的请求权限设定
            'Authorization': decrypt(sessionStorage.getItem("token")),
            'Content-Type': 'application/json;charset=UTF-8'
        },
        params: data
    })
    return new Promise<any>(function (resolve, reject) {
        promise.then(function (response) {
            resolve(response)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取预警信息正文
export const reqMessageContent = (data: any) => {
    let promise = axios({
        method: 'get',
        url: BASE_URL + '/info',
        headers: {
            'Authorization': decrypt(sessionStorage.getItem('token')),
            'Content-Type': 'application/json;charset=UTF-8'
        },
        params: data
    })
    return new Promise<any>(function (resolve, reject) {
        promise.then(function (response) {
            resolve(response)
        }).catch(function (error) {
            reject(error)
        })
    })
}

// 获取IP
export const reqIP = () => {
    let promise = axios({
        method: 'get',
        url: BASE_URL + '/ip',
        headers: {
            'Authorization': decrypt(sessionStorage.getItem('token')),
            'Content-Type': 'application/json;charset=UTF-8'
        },
    })
    return new Promise<any>(function (resolve, reject) {
        promise.then(function (response) {
            // 成功了调用resolve()
            resolve(response)
        }).catch(function (error) {
            //失败了调用reject()
            reject(error)
        })
    })
}