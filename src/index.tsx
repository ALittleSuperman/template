import React from "react";
import {F22} from "f22"
import "./index.css"
import {routerConfig} from "./router"
import {ConfigProvider, Spin, message} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import * as store from "./store"
import nprogress from "nprogress"
import moment from 'moment';
import 'moment/locale/zh-cn';
import {getEnv} from "./env";


moment.locale('zh-cn');

window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log('scriptURI: ' + scriptURI); // 异常文件路径
  console.log('lineNo: ' + lineNo); // 异常行号
  console.log('columnNo: ' + columnNo); // 异常列号
  console.log('error: ' + error); // 异常堆栈信息
};

F22
  .getInstance()
  .useProviderHandler((render) => {
    return (
      <ConfigProvider
        locale={zhCN}
      >
        {render()}
      </ConfigProvider>
    )
  })
  .useLoading(
    <div style={{textAlign: "center"}}>
      <Spin size="large"/>
    </div>
  )
  .useStore(store)
  .useRouter(routerConfig)
  .useHttp({
    baseUrl: getEnv().baseUrl,
    requestHook: function (a, b) {
      nprogress.start()
      const headerFactory = () => {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo") ?? "null")
        if (!userInfo) return {}
        return {
          headers: {
            "Authorization": userInfo.token
          }
        }
      };
      return {
        ...a,
        ...headerFactory()
      }
    },
    responseHook(data) {
      nprogress.done()
      // 常规
      const resultData = data.data as any
      if (parseInt(resultData.code) !== 200) {
        throw  {message: resultData.message}
      }
      return resultData.data
    },
    responseErrorHook(err) {
      nprogress.done();
      message.error(err.message);
      throw err;
    }
  })
  .run();
