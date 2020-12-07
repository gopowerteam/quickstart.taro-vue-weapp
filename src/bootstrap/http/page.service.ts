import { ExtendService, RequestParams } from '@/core/http'

export class PageService extends ExtendService {
    public default = {
        pageSize: 10,
        pageIndex: 1,
        total: 0,
        pageSizeOpts: [20, 50, 100, 200]
    }
    public pageSize: number
    public pageIndex: number
    public total: number
    public pageSizeOpts: number[]

    constructor(data?: any) {
        super()

        if (data) this.default = { ...this.default, ...data }

        this.pageSize = this.default.pageSize
        this.pageIndex = this.default.pageIndex || 1
        this.total = this.default.total
        this.pageSizeOpts = this.default.pageSizeOpts
    }

    /**
     * 分页完成状态
     */
    public get finished() {
        return this.total > 0 && this.total <= this.pageIndex * this.pageSize
    }

    public before = (params: any) => {
        params.data = {
            ...params.data,
            size: this.pageSize,
            page: this.pageIndex - 1
        }
    }

    public after = (response: any, params: any) => {
        // const result = response.content;
        this.total = response.totalElements
    }

    public reset() {
        this.pageIndex = this.default.pageIndex
        this.pageSize = this.default.pageSize
    }

    public update(pageIndex: number, pageSize: number) {
        this.pageIndex = pageIndex
        this.pageSize = pageSize
        return Promise.resolve()
    }

    /**
     * 分页前进操作
     * @param callback
     */
    public next(callback: any) {
        if (!this.finished) {
            this.pageIndex++
            callback(true)
        } else {
            callback(false)
        }
    }
}
