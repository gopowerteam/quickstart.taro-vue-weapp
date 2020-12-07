import libs from '@/bootstrap/libs'

/**
 * 安装插件
 */
export const libsBoot = async () => {
    Object.entries(libs).forEach(([name, registerLib]) => {
        registerLib()
    })
}
