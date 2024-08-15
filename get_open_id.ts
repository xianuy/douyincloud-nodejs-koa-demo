/** 
* @param params 调用参数，HTTP 请求下为请求体
 * @param context 调用上下文
 *
 * @return 函数的返回数据，HTTP 场景下会作为 Response Body
 *
 */

export default async function (params: any, context: any) {
    const value = context.headers['x-tt-openid'];
        if (value) {
         return {
              success: true,
              data: value,
          }
      } else {
          return {
              success: false,
              message: `dyc-open-id not exist`,
          }
      }
  };
  