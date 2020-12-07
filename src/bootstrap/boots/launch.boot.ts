import { useStore } from '@/store'

const store = useStore()

/**
 * 系统启动业务逻辑
 * @param param0
 */
export const launchBoot = async () => {
    Promise.all([]).then(() => {
        store.action.ready()
    })
}
