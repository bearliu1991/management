export default {
    keywords: [
        {
            key: 'id',
            title: '套餐id',
            value: null,
            type: 'number'
        },
        {
            key: 'name',
            title: '套餐名',
            value: ''
        },
        {
            key: 'seatNum',
            title: '坐席数',
            value: null,
            type: 'number'
        },
        {
            key: 'publiccodeNum',
            title: '订阅号数',
            value: null,
            type: 'number'
        },
        {
            key: 'servicecodeNum',
            title: '服务号数',
            value: null,
            type: 'number'
        },
        {
            key: 'startTime',
            type: 'date',
            title: '授权开始时间',
            value: ''
        },
        {
            key: 'endTime',
            type: 'date',
            title: '授权结束时间',
            value: ''
        },
        {
            key: 'validDay',
            title: '生效天数',
            value: null,
            type: 'number'
        },
        {
            key: 'price',
            title: '价格',
            value: null,
            type: 'number',
            placeholder: '单位分'
        },
        {
            key: 'proxyPrice',
            title: '代理价格',
            value: null,
            type: 'number',
            placeholder: '单位分'
        },
        {
            key: 'remark',
            title: '描述',
            value: ''
        },
        {
            key: 'createTime',
            type: 'date',
            title: '创建日期',
            value: ''
        },
        {
            key: 'updateTime',
            type: 'date',
            title: '更新日期',
            value: ''
        },
        {
            key: 'createId',
            title: '创建人id',
            value: null,
            type: 'number'
        },
        {
            key: 'updateId',
            title: '修改人id',
            value: null,
            type: 'number'
        }
    ],
    selctors: [
        {
            type: "授权类型",
            key: "authType",
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 1,
                    label: '按时间'
                },
                {
                    value: 2,
                    label: '按天数'
                }
            ]
        },
        {
            type: "自动审核",
            key: "autoAudit",
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 0,
                    label: '不自动'
                },
                {
                    value: 1,
                    label: '自动'
                }
            ]
        },
        {
            type: "状态",
            key: "status",
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 0,
                    label: '禁用'
                },
                {
                    value: 1,
                    label: '启用'
                },
                {
                    value: 2,
                    label: '未知'
                },
                {
                    value: 3,
                    label: '审核中'
                },
                {
                    value: 4,
                    label: '拒绝'
                },
                {
                    value: 5,
                    label: '逻辑删'
                }
            ]
        }
    ],
    formItems: [
        {
            label: '套餐名',
            prop: 'name'
        },
        {
            type: "number",
            label: '坐席数',
            prop: 'seatNum'
        },
        {
            type: "number",
            label: '订阅号数',
            prop: 'publiccodeNum'
        },
        {
            type: "number",
            label: '服务号数',
            prop: 'servicecodeNum'
        },
        {
            type: 'radio',
            label: '授权类型',
            prop: 'authType',
            options: [
                { val: '1', title: '按时间' },
                { val: '2', title: '按天数' }
            ]
        },
        {
            type: "date",
            label: '开始时间',
            prop: 'startTime'
        }, {
            type: "date",
            label: '结束时间',
            prop: 'endTime'
        }, {
            type: "number",
            label: '生效天数',
            prop: 'validDay'
        }, {
            type: "number",
            label: '价格',
            prop: 'price'
        }, {
            type: "number",
            label: '代理价格',
            prop: 'proxyPrice'
        }, {
            label: '自动审核',
            prop: 'autoAudit',
            options: [
                { val: 'Y', title: '是' },
                { val: 'N', title: '否' }
            ]
        }, {
            label: '描述',
            prop: 'remark'
        }, {
            type: 'select',
            label: '状态',
            prop: 'status',
            options: [
                { val: '0', title: '禁用' },
                { val: '1', title: '启用' },
                { val: '2', title: '未知' },
                { val: '3', title: '审核中' },
                { val: '4', title: '拒绝' },
                { val: '5', title: '逻辑删除' }
            ]
        }
    ]
}
