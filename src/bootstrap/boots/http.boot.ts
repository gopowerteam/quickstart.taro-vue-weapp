import { RequestService } from '@/core/http'
import { appConfig } from '@/config/app.config'
import { TokenService } from '@/bootstrap/http/token.service'

/**
 * 安装网络配置
 */
export const httpBoot = () => {
    // 配置服务端信息
    RequestService.setConfig({
        server: appConfig.server,
        timeout: appConfig.timeout
    })

    // 添加状态拦截器
    RequestService.interceptors.status.use(() => {
        return true
    })

    // 添加成功拦截器
    RequestService.interceptors.success.use((respone: any) => {
        return respone.data
    })

    // 添加失败拦截器
    RequestService.interceptors.error.use((respone: any) => {
        return respone
    })

    // 网络异常处理
    RequestService.requestCatchHandle = (response ) => {
        const defaultError = '服务通讯连接失败'
        const message = {
            400: '请求参数错误',
            405: '请求服务方法错误',
            500: '服务器内部错误',
            403: '没有权限，请重新登陆'
        }
        if (response) {
            //   let errMsg = (respone.data || {}).message
            //   errMsg = errMsg || message[respone.status] || defaultError

            //   uni.showToast({ icon: 'none', title: errMsg, mask: true })

            switch (response.status) {
                case 403:
                    // router.push({
                    //     name: 'login'
                    // })
                    break
                case 400:
                    // openToast(response.data.message)
                    break
                default:
                    break
            }
        } else {
            //   uni.showToast({
            //     icon: 'none',
            //     title: '系统异常请稍后再试'
            //   })
            // console.log(response)
            // openToast('系统异常请稍后再试')
        }
    }

    // 安装全局服务扩展
    RequestService.installExtendService(new TokenService())


}
