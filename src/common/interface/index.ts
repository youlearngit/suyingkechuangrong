// * 请求响应参数(不包含data)
export interface Result {
    code: string;
    msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
    data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
    data: T[];
    total: number;
}

// * 分页请求参数
export interface ReqPage extends BaseModel {
    pageNum: number;
    pageSize: number;
    sortField?: string;//orderNum
    sortOrder?: 'descending' | 'ascending' // ()
}

// base接口模型

export interface BaseModel {
    [key: string]: any;
}
