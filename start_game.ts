/** 
* @param params 调用参数，HTTP 请求下为请求体
 * @param context 调用上下文
 *
 * @return 函数的返回数据，HTTP 场景下会作为 Response Body
 *
 */
interface Data {
  err_no?: number;
  err_msg?: string;
  data?: any;
}
import { dySDK } from '@open-dy/node-server-sdk';
export default async function (params: any, context: any) {
  let serviceContext = dySDK.context(context);
  let { appId, roomId, anchorOpenId, avatarUrl, nickName } = serviceContext.getContext();
  context.log(`appId is ${appId}, roomId is ${roomId}, anchorOpenID is ${anchorOpenId}, avatarUrl is ${avatarUrl}, nickName is ${nickName}`);
  try {
    let msgTypes = ['live_comment', 'live_like', 'live_gift', 'live_fansclub'];
    for (const msgType of msgTypes) {
      await startLiveDataTask(appId, roomId, context, msgType);
    }
  } catch (err) {
    context.log(err);
  }
};

async function startLiveDataTask(appId: string, roomId: string, context: any, msgType: string) {
  const serviceContext = dySDK.context(context);
  try {
    let param = {
      roomid: roomId,
      appid: appId,
      msg_type: msgType
    };
    // 调用弹幕玩法服务端API，开启直播间推送任务，开启后，开发者服务器会通过/live_data_callback_example接口 收到直播间玩法指令
    const res: Data = await serviceContext.openApiInvoke({
      url: "https://webcast.bytedance.com/api/live_data/task/start",
      method: "POST", // openAPI 调用方式，
      headers: { "Content-Type": "application/json" }, // openAPI 请求头
      data: param
    });
    if (res?.err_no === 0) {
      return res?.data;
    }
    context.log('开启评论推送任务失败，错误信息', res?.err_msg);

    return res?.err_msg;
  } catch (err) {
    context.log('启评论推送任务失败，错误信息为', err);
    return 'error';
  }
}