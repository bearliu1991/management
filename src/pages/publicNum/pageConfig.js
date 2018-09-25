export default {
    filters: [
        {
            key: 'pubName',
            title: '公众号名称：',
            placeholder: "输入公众号名称搜索"
        },
        {
            key: 'corpName',
            title: '企业名称',
            value: '',
            placeholder: "输入企业名称搜索"
        },
        {
            title: '公众号类型：',
            type: 'select',
            key: 'type',
            width: 120,
            value: -1,
            options: [
                {
                    value: -1,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '服务号'
                },
                {
                    value: 0,
                    label: '订阅号'
                }
            ]
        },
        {
            title: '认证状态：',
            type: 'select',
            key: 'authStatus',
            width: 120,
            value: -1,
            options: [
                {
                    value: -1,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '已认证'
                },
                {
                    value: 0,
                    label: '未认证'
                }
            ]
        },
        {
            title: '粉丝数量：',
            type: 'select',
            width: 120,
            key: 'fansNum',
            value: -1,
            options: [
                {
                    value: -1,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '小于500人'
                },
                {
                    value: 2,
                    label: '501到1000人'
                },
                {
                    value: 3,
                    label: '5001到1万人'
                },
                {
                    value: 4,
                    label: '1万到10万人'
                },
                {
                    value: 5,
                    label: '10万人以上'
                }
            ]
        },
        {
            title: '公众号使用状态：',
            type: 'select',
            key: 'status',
            value: -1,
            options: [
                {
                    value:  -1,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '正常'
                },
                {
                    value: 2,
                    label: '停用'
                },
                {
                    value: 4,
                    label: '禁用'
                },
                {
                    value: 3,
                    label: '未授权'
                }
            ]
        },
        {
            title: "授权时间：",
            key: "authTime",
            type: 'dateRange'
        }
    ]
}
