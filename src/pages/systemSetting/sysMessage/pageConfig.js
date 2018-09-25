export default {
    keywords: [
        {
            key: 'id',
            title: '消息ID',
            value: null,
            type: 'number'
        }
    ],
    selctors: [
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
        }
    ],
    options: {
        subtype: [
                {
                    value: 'localroom',
                    title: '消息只发送到aid数组的房间去'
                },
                {
                    value: 'broadcast',
                    title: '发送到所有的房间'
                },
                {
                    value: 'user',
                    title: '发给指定的用户'
                }
            ],
        order: [
            {
                value: 'ASC',
                title: '升序'
            },
            {
                value: 'DESC',
                title: '降序'
            }
        ]
    },
    formData: {
        id: null,
        messageName: '',
        subtype: '',
        roomIds: '',
        userIds: '',
        userType: '',
        display: '',
        platform: '',
        effDate: '',
        expDate: '',
        cronExpression: '',
        message: '',
        status: '',
        ext: ''
    },
    formItems: [
        {
            type: 'number',
            label: 'ID',
            prop: 'id',
            value: null,
            unshow: true
        },
        {
            label: '消息名称',
            prop: 'messageName'
        },
        {
            type: 'select',
            label: '发布类型',
            prop: 'subtype',
            value: '',
            options: [
                {
                    val: 'localroom',
                    title: '消息只发送到aid数组的房间去'
                },
                {
                    val: 'broadcast',
                    title: '发送到所有的房间'
                },
                {
                    val: 'user',
                    title: '发给指定的用户'
                }
            ]
        },
        {
            label: '接收消息房间',
            prop: 'roomIds'
        },
        {
            type: 'radio',
            label: '接受消息用户',
            prop: 'userIds',
            value: 'ASC',
            options: [
                {
                    val: 'ASC',
                    title: '升序'
                },
                {
                    val: 'DESC',
                    title: '降序'
                }
            ]
        },
        {
            type: 'radio',
            label: '用户类型',
            prop: 'userType',
            value: '1',
            options: [
                {
                    val: '1',
                    title: '用户'
                },
                {
                    val: '2',
                    title: '主播'
                }
            ]
        },
        {
            type: '',
            label: '显示区域',
            prop: 'display'
        },
        {
            type: '',
            label: '平台',
            prop: 'platform'
        },
        {
            type: 'date',
            label: '生效时间',
            prop: 'effDate'
        },
        {
            type: 'date',
            label: '失效时间',
            prop: 'expDate'
        },
        {
            type: '',
            label: 'cron表达式',
            prop: 'cronExpression'
        },
        {
            type: 'textarea',
            label: '消息内容',
            prop: 'message'
        },
        {
            type: 'radio',
            label: '状态',
            prop: 'status',
            value: 'ACTIVE',
            options: [
                {
                    val: 'ACTIVE',
                    title: '启动'
                },
                {
                    val: 'DISABLED',
                    title: '禁用'
                }
            ]
        },
        {
            type: '',
            label: '自定义',
            prop: 'ext'
        }
    ]
}
