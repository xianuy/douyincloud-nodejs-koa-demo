/** 
* 抖音云websocket监听的回调函数,客户端建连/上行发消息都会走到该HTTP回调函数中
ref:https://developer.open-douyin.com/docs/resource/zh-CN/developer/tools/cloud/develop-guide/websocket-guide/websocket#%E5%BB%BA%E8%BF%9E%E8%AF%B7%E6%B1%82
 */

export default async function (params: any, context: any) {
    let eventType = context.headers['x-tt-event-type'];
    switch (eventType) {
      // 客户端建连
      case "connect":
        context.log('connect');
        break;
      // 客户端断连
      case "disconnect": {
        context.log('disconnect');
        break;
      }
      // 客户端上行发消息
      case "uplink": {
        context.log('uplink', params.toString());
        break;
      }
      default:
        break;
    }
    return "success";
  };