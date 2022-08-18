import axios from "axios"
axios.defaults.baseURL = 'https://admin.lyrjfwpt.cn'
// const service = axios.create({
//   baseURL: 'http://testserver.hkkj.net',
//   timeout: 10000 // 超时时间
// })
// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  if (localStorage.getItem("access_token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = 'Bearer ' + localStorage.getItem("access_token")
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})


// // http request 拦截器
// axios.interceptors.request.use(
//   config => {
//       if (localStorage.getItem("access_token")) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//           config.headers.Authorization = 'Bearer ' + localStorage.getItem("access_token");
//       }
//       return config;
//   },
//   err => {
//       return Promise.reject(err);
//   });


// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       console.log("response error :" + error);
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   localStorage.clear();
//                   sessionStorage.clear();
//                   console.log("token 过期");
//                   return;
//           }
//       }
//       return Promise.reject(error)   // 返回接口返回的错误信息
//   });

  export default {
    /*
     * @param url
     * @param data
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    post(url, data, response, exception) {
        axios({
            method: 'post',
            //url: handleUrl(url),
            url: url,
            // data: handleParams(data),
            data: data,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'token': localStorage.getItem("access_token")
            }
        }).then(
            (result) => {
                response(result.data)
            }
        ).catch(
            (error) => {
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    },
    /*
     * get 请求
     * @param url
     * @param response 请求成功时的回调函数
     * @param exception 异常的回调函数
     */
    get(url, data, response, exception) {
        axios({
            method: 'get',
            url: url,
            params: data,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'token': localStorage.getItem("access_token")
            }
        }).then(
            (result) => {
                response(result.data)
            }
        ).catch(
            (error) => {
                console.log("error" + response);
                if (exception) {
                    exception(error)
                } else {
                    console.log(error)
                }
            }
        )
    }
}

// export default service