// 通过mutation间接更新state的多个方法和对象

import {
    RECEIVE_USERINFO,
    RECEIVE_CAPTCHA,
    RECEIVE_WEATHERINFO,
    RECEIVE_MESSAGELISTS,
    RECEIVE_MESSAGECONTENT,
} from './mutation-types'

import {
    reqUserInfo,
    reqCaptcha,
    reqWeatherInfo,
    reqMessageLists,
    reqMessageContent,
} from '../../api/index'


export default {

    // 获取登录时用户的信息
    async getUserInfo({ commit }: any, loginMsg: any) {
        //发送异步ajax请求
        const result = await reqUserInfo(loginMsg)
        //提交一个mutation
        const userInfo = result.data
        commit(RECEIVE_USERINFO, { userInfo })
    },


    //获取验证码
    async getCaptcha({ commit }: any) {
        const result = await reqCaptcha()
        //将请求到的captcha值放入sessionStorage
        sessionStorage.setItem("captcha", result.headers.captcha)
        // 对图片进行处理
        // btoa用来解码base64,Uint8Array表示8bit unsigned integers向量
        const captcha = 'data:image/png;base64,' + btoa(new Uint8Array(result.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        // 提交一个mutation
        commit(RECEIVE_CAPTCHA, { captcha })
    },

    //异步获取天气信息
    async getWeatherInfo({ commit }: any, data: any) {
        //发送异步ajax请求
        const result = await reqWeatherInfo(data)
        // 提交一个mutation
        const weatherInfo = result.data
        commit(RECEIVE_WEATHERINFO, { weatherInfo })
    },

    //异步获取预警消息列表
    async getMessageLists({ commit }: any, data: any) {
        //发送异步ajax请求
        const result = await reqMessageLists(data)
        // 提交一个mutation
        const messageLists = result.data
        commit(RECEIVE_WEATHERINFO, { messageLists })
    },

    //异步获取预警消息正文
    async getMessageContent({ commit }: any, data: any) {
        //发送异步ajax请求
        const result = await reqMessageContent(data)
        // 提交一个mutation
        const messageContent = result.data
        commit(RECEIVE_WEATHERINFO, { messageContent })
    }

}

