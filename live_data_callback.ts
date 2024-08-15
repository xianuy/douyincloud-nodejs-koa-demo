/** 
  * 通过抖音云服务接受直播间数据，内网专线加速+免域名备案
  * 通过内网专线会自动携带X-Anchor-OpenID字段
  * ref: <a href="https://developer.open-douyin.com/docs/resource/zh-CN/developer/tools/cloud/develop-guide/danmu-callback">...</a>
 */
 import { dySDK } from '@open-dy/node-server-sdk';
 export default async function (params: any, context: any) {
   const anchorOpenID = context.headers['x-anchor-openid'];
   const msgType = context.headers['x-msg-type'];
   let body = {
     msg_id: params[0].msg_id,
     msg_type: msgType,
     data:  JSON.stringify(params)
   }
   // 推送失败时，开发者可增加相关重试逻辑再次调用pushDataToClientByDouyinCloudWebsocket。
   await pushDataToClientByDouyinCloudWebsocket(body, anchorOpenID, context);
   return "success";
 };
 /**
  * 使用抖音云websocket网关,将数据推送到主播端
  * ref: <a href="https://developer.open-douyin.com/docs/resource/zh-CN/developer/tools/cloud/develop-guide/websocket-guide/websocket#%E4%B8%8B%E8%A1%8C%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81">...</a>
  */
 async function pushDataToClientByDouyinCloudWebsocket(params: any, anchorOpenID: string, context: any) {
   const serviceContext = dySDK.context(context);
    try {
     const res = await serviceContext.openApiInvoke({
       url: "http://ws-push.dycloud-api.service/ws/live_interaction/push_data",
       method: "POST", // openAPI 调用方式，
       headers: { "Content-Type": "application/json",'X-TT-WS-OPENIDS': JSON.stringify([anchorOpenID]) }, // openAPI 请求头
       data: params
     });
     context.log("抖音云弹幕推送res", res);
     return res;
   } catch (err) {
     context.error('抖音云弹幕推送错误err', err);
     return err;
   }
 }
 
 