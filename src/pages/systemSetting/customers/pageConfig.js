export default {
    keywords: [
        {
            key: 'corpId',
            title: '公司id',
            value: null,
            type: 'number'
        },
        {
            key: 'mgrId',
            title: '维护人id',
            value: null,
            type: 'number'
        },
        {
            key: 'startCreateTime',
            type: 'date',
            title: '起始创建时间',
            value: ''
        },
        {
            key: 'endCreateTime',
            type: 'date',
            title: '末尾创建时间',
            value: ''
        }
    ],
    selctors: [
        {
            type: "所属系统",
            key: "condition",
            value: '-1',
            options: [
                {
                    value: '-1',
                    label: '--全部--'
                },
                {
                    value: '1',
                    label: '客户简称'
                },
                {
                    value: '2',
                    label: '客户名称'
                }
            ]
        },
        {
            type: "排序顺序",
            key: "order",
            value: 'ASC',
            options: [
                {
                    value: 'ASC',
                    label: '升序'
                },
                {
                    value: 'DESC',
                    label: '降序'
                }
            ]
        },
        {
            type: "客户状态",
            key: "status",
            value: '-1',
            options: [
                {
                    value: '-1',
                    label: '--全部--'
                },
                {
                    value: 'ACTIVE',
                    label: '启用'
                },
                {
                    value: 'DISABLED',
                    label: '停用'
                },
                {
                    value: 'DELETE',
                    label: '标记删除'
                }
            ]
        },
        {
            type: "客户类型",
            key: "type",
            value: '-1',
            options: [
                {
                    value: '-1',
                    label: '--全部--'
                }
            ]
        },
        {
            type: "客户等级",
            key: "level",
            value: '-1',
            options: [
                {
                    value: '-1',
                    label: '--全部--'
                }
            ]
        },
        {
            type: "客户行业",
            key: "industry",
            value: '-1',
            options: [
                {
                    value: '-1',
                    label: '--全部--'
                }
            ]
        },
        {
            type: "是否包含停用",
            key: "disable",
            value: '-1',
            options: [
                {
                    value: '-1',
                    label: '--全部--'
                },
                {
                    value: 'N',
                    label: '不包含'
                },
                {
                    value: 'Y',
                    label: '包含'
                }
            ]
        }
    ],
    options: [
        {
            value: 'PC_WEB_CHAT',
            title: 'pc端web聊天系统'
        },
        {
            value: 'PC_DESKTOP_CHAT',
            title: 'pc端桌面聊天系统'
        },
        {
            value: 'PC_WEB_ADMIN',
            title: 'pc端web管理系统'
        },
        {
            value: 'PC_WEB_MANAGE',
            title: 'pc端web管理系统'
        },
        {
            value: 'IOS',
            title: 'IOS'
        },
        {
            value: 'ANDROID',
            title: '安卓'
        }
    ]
}
