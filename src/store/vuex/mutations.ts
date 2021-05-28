// 直接更新state的多个方法

import { State } from '../constraint'

import {
    RECEIVE_USERINFO,
    RECEIVE_CAPTCHA,
    RECEIVE_MESSAGECONTENT,
    RECEIVE_MESSAGELISTS,
    RECEIVE_WEATHERINFO,
} from './mutation-types'
import state from './state'

export default {
    [RECEIVE_USERINFO](State: State, { userInfo }: any) {
        state.userInfo = userInfo
    },
    [RECEIVE_CAPTCHA](State: State, { captcha }: any) {
        state.captcha = captcha
    },
    [RECEIVE_MESSAGECONTENT](State: State, { messageContent }: any) {
        state.messageContent = messageContent
    },
    [RECEIVE_MESSAGELISTS](State: State, { messageLists }: any) {
        state.messageLists = messageLists
    },
    [RECEIVE_WEATHERINFO](State: State, { weatherInfo }: any) {
        state.weatherInfo = weatherInfo
    },
}