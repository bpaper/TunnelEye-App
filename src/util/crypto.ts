// 加密解密模块
// 引入模块
import CryptoJS, { AES } from "crypto-js";

// 加密函数部分
export const encrypt = (content: any) => {
    //    声明密钥
    let key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
    // 声明加密的内容
    let message = CryptoJS.enc.Utf8.parse(content);
    // AES加密
    let encrypted = CryptoJS.AES.encrypt(message, key, {
        // mode加密方式
        // padding填充方式
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    // crypto-js的encrypt不会直接返回字符串，需要调用toString 
    return encrypted.toString();
}


//解密函数部分
export const decrypt = (content: any) => {
    let key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
    // 解密
    let decrypt = CryptoJS.AES.decrypt(content, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}