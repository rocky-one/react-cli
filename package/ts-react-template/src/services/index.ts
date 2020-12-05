import axios from 'axios';

const { CancelToken } = axios;

// 添加请求拦截器
axios.interceptors.request.use((config) =>
    // 在发送请求之前做些什么
    config,
    (error) =>
        // 对请求错误做些什么
        Promise.reject(error));

// 添加响应拦截器
axios.interceptors.response.use((response) =>
    // 对响应数据做点什么
    response,
    (error) =>
        // 对响应错误做点什么
        Promise.reject(error));

type ApiType = {
    url: string,
    method: string
}
type AxiosConfig = ApiType & {
    params?: any,
    data?: any,
    cancelToken?: any
}
export const cancelTokenMap = {};

/**
 * @desc 公共请求方法
 * @param {object} api 描述对象
 * @param {object} params 参数
 */
function request(api: ApiType, params?: any) {
    const config: AxiosConfig = {
        ...api,
        cancelToken: new CancelToken((cancel) => {
            cancelTokenMap[api.url] = cancel;
        }),
    };
    if (api.method !== 'PUT' && api.method !== 'POST' && api.method !== 'PATCH') {
        config.params = params;
    } else {
        config.data = params;
    }
    return axios.request(config);
}

export default request;
