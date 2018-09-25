export default {
    filters: [
        {
            key: 'corpName',
            title: '企业名称：',
            width: 180,
            placeholder: '请输入企业名称'
        },
        {
            key: 'salerName',
            title: '销售姓名：',
            value: '',
            width: 180,
            placeholder: '请输入销售姓名'
        },
        {
            key: 'salerNickname',
            title: '销售微信昵称：',
            width: 180,
            placeholder: '请输入销售微信昵称'
        },
        {
            title: '授权公众号：',
            type: 'select',
            width: 120,
            key: 'appidNumStatus',
            value: 1,
            options: [
                {
                    value: 1,
                    label: '全部'
                },
                {
                    value: 2,
                    label: '授权1个'
                },
                {
                    value: 3,
                    label: '授权2个及以上'
                },
                {
                    value: 4,
                    label: '未授权'
                }
            ]
        },
        {
            title: '添加坐席：',
            type: 'select',
            width: 120,
            key: 'seatNumStatus',
            value: 1,
            options: [
                {
                    value: 1,
                    label: '全部'
                },
                {
                    value: 2,
                    label: '已添加'
                },
                {
                    value: 3,
                    label: '未添加'
                }
            ]
        },
        {
            title: '添加员工：',
            type: 'select',
            width: 120,
            key: 'eeNumStatus',
            value: 1,
            options: [
                {
                    value: 1,
                    label: '全部'
                },
                {
                    value: 2,
                    label: '已添加'
                },
                {
                    value: 3,
                    label: '未添加'
                }
            ]
        },
        {
            title: '企业状态：',
            type: 'select',
            width: 120,
            key: 'corpStatus',
            value: 'ALL',
            options: [
                {
                    value: 'ALL',
                    label: '全部'
                },
                {
                    value: 'ACTIVE',
                    label: '正常'
                },
                {
                    value: 'EXPIRE',
                    label: '到期'
                },
                {
                    value: 'DISABLED',
                    label: '禁用'
                }
            ]
        },
        {
            title: '套餐版本：',
            type: 'select',
            width: 120,
            key: 'version',
            value: 1,
            options: [
                {
                    value: 1,
                    label: '全部'
                },
                {
                    value: 2,
                    label: '免费版'
                },
                {
                    value: 3,
                    label: '付费版'
                }
            ],
            sub: {
                show: 3,
                width: 120,
                key: 'subversion',
                value: -1,
                options: []
            }
        },
        {
            title: "创建时间：",
            key: "createTimeStr",
            placeholder: '请选择创建时间',
            type: 'dateRange'
        },
        {
            title: "到期时间：",
            key: "endTimeStr",
            placeholder: '请选择到期时间',
            type: 'dateRange'
        },
        {
            title: "订购时间：",
            key: "payTimeStr",
            placeholder: '请选择订购时间',
            type: 'dateRange'
        }
    ]
}
