/** 
* @param params 调用参数，HTTP 请求下为请求体
 * @param context 调用上下文
 *
 * @return 函数的返回数据，HTTP 场景下会作为 Response Body
 *
 */
import { dySDK } from '@open-dy/node-server-sdk';
export default async function (params: any, context: any) {
  const content = params.content;
  const res = await openApiInvoke(context, 'http://developer.toutiao.com/api/v2/tags/text/antidirt', 'post', {}, {
    "tasks": [
      {
        "content": content
      }
    ]
  });
  return {
    "result": (res as any)?.data,
    "success": true,
  };
};

async function openApiInvoke(context: any, url: string,
  method: string,
  querys?: Record<string, any>,
  data?: any,
  headers?: Record<string, any>) {
  const serviceContext = dySDK.context(context);
  return serviceContext.openApiInvoke({
    "url": url,
    "method": method,
    "querys": querys,
    "data": data,
    "headers": headers
  })
}