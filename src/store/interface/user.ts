export interface User {
    id: number; // 主键
    openId: string; // 唯一属性
    roleType: string; // 角色类型
    username: string; // 用户名称
    email: string; // 邮箱
    mobile: string; // 手机
    nickName: string; // 联系人姓名
    sex: string; // 性别
    avatarUrl: string; // 头像
    description: string; // 描述
    status: string; // 状态
    lastLoginTime: string; //
    createdAt: string; // 创建时间
    updatedAt: string; // 修改时间
}

export interface Login {
    token: string,
    expiresIn: number
    //账号登陆使用
    username: string
    password: string
}
