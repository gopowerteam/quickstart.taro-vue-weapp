import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { RequestOption } from './request-option'
import { RequestInterceptor } from './request-interceptor'
import { ExtendService } from './extend-service'
import mpAdapter from 'axios-miniprogram-adapter'

// 安装适配器-小程序支持
axios.defaults.adapter = mpAdapter

export class RequestService {
    // 基础服务配置
    public static config = {
        server: '',
        timeout: 1000 * 60 * 15
    }

    // 通讯服务单例
    private static instance: RequestService

    // 拦截器
    public static interceptors = {
        // 前置拦截器
        before: [],
        // 后置拦截器
        after: [],
        // 状态拦截器
        status: new RequestInterceptor<boolean>(),
        // 成功状态拦截器
        success: new RequestInterceptor(),
        // 失败状态拦截器
        error: new RequestInterceptor()
    }

    // 生成URL地址拦截处理
    public static getRequestUrl: (option: RequestOption) => string

    // 生成请求头拦截处理
    public static getRequestHeader: (option: RequestOption) => any

    // 通讯异常处理
    public static requestCatchHandle: (respone: AxiosResponse) => void

    // 全局扩展服务数组
    public static extendServices: ExtendService[] = []

    /**
     * 设置网络请求基础配置
     * @param param
     */
    public static setConfig({
        server,
        timeout
    }: {
        server: string
        timeout: number
    }): void {
        RequestService.config.server = server
        RequestService.config.timeout = timeout
    }

    /**
     * 安装通讯扩展服务
     * @param service
     */
    public static installExtendService(service: ExtendService): void {
        RequestService.extendServices.push(service)
    }

    /**
     * 获取服务请求单例
     */
    public static getInstance(): RequestService {
        if (this.instance) {
            return this.instance
        }

        return new RequestService()
    }

    // axios单例
    private axiosInstance: AxiosInstance

    /**
     * 构造函数
     */
    constructor() {
        RequestService.instance = this

        // 创建axios实例
        this.axiosInstance = axios.create({
            baseURL: RequestService.config.server,
            timeout: RequestService.config.timeout,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
    }

    /**
     * 发送网络请求信息
     * @param param
     */
    public send(requestOption: RequestOption): Promise<any> {
        // 获取配置对象
        const options = requestOption.getOptions()
        // 发送通讯请求
        return this.axiosInstance
            .request({
                // 默认配置对象
                ...options
            })
            .then((response: AxiosResponse<any>) => {
                // 网络通讯正常
                // 无状态拦截器的情况下则返回通讯成功
                if (!RequestService.interceptors.status.defined) {
                    return RequestService.interceptors.success.defined
                        ? RequestService.interceptors.success.interceptor(
                              response
                          )
                        : response
                }

                // 状态拦截器转换通讯状态
                if (RequestService.interceptors.status.interceptor(response)) {
                    // 通讯成功
                    return RequestService.interceptors.success.defined
                        ? RequestService.interceptors.success.interceptor(
                              response
                          )
                        : response
                } else {
                    // 通讯失败
                    return RequestService.interceptors.error.defined
                        ? RequestService.interceptors.error.interceptor(
                              response
                          )
                        : response
                }
            })
            .catch((ex) => {
                if (RequestService.requestCatchHandle) {
                    RequestService.requestCatchHandle(ex.response)
                }
                return Promise.reject(ex)
            })
    }
}
