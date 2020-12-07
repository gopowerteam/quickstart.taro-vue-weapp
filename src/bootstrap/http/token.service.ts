import { ExtendService } from '@/core/http'
import { useStore } from '@/store'
// import { OperatorController } from '@/config/services/operator.controller'
// import store from '~/store'

// const whitelist = [OperatorController.login]

const store = useStore()
export class TokenService extends ExtendService {
    public before = (params: any) => {
        const token = store.state.token

        if (token) {
            params.options.header = params.options.header || {}
            params.options.header['X-EmployeeToken'] = token
        }
    }
}
