import axios from "axios";
import { handleError } from "vue";

const instance = axios.create({
  baseURL: "http://localhost:8101/api",
  timeout: 10000,
  headers: {},
});
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const data = response.data;
    if (data.code === 0) {
      return data.data;
    }
    console.error("request error: " + data);
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      showError(error.response.data.message);
    } // 请求没有发送成功
    else {
      showError("Network Error");
    }
    return Promise.reject(error);
  }
);

// 错误展示函数
function showError(message: string) {
  // 在页面上展示错误
  // @ts-ignore
  document.getElementById("error").innerText = message;
}

export default instance;
