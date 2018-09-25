export default {
    keywords: [
        {
            key: 'appId',
            title: 'app标识',
            value: null,
            type: "number"
        },
        {
            key: 'appName',
            title: 'app中文名',
            value: ''
        },
        {
            key: 'appEnname',
            title: 'app英文名',
            value: ''
        },
        {
            key: 'appSecret',
            title: 'app密钥',
            value: ''
        },
        {
            key: 'appDomain',
            title: 'app独立域名',
            value: ''
        },
        // {
        //     key: 'createTime',
        //     title: '创建时间',
        //     value: ''s
        // },
        {
            key: 'description',
            title: '描述',
            value: ''
        }
    ],
    selctors: [
        {
            type: '应用类型',
            key: 'appType',
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 0,
                    label: '外部应用'
                },
                {
                    value: 1,
                    label: '内部应用'
                }
            ]
        },
        {
            type: '状态',
            key: 'appStatus',
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 0,
                    label: '停用'
                },
                {
                    value: 1,
                    label: '启用'
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
        }
    ],
    formData: {
        appName: '',
        appEnname : '',
        appSecret : '',
        appDomain : '',
        appType : null,
        appStatus : null,
        createTime : '',
        description : ''
    },
    configItems: [
        {
            type: '',
            label: 'app英文名',
            prop: 'appEnname',
            value: ''
        }
    ],
    formItems: [
        {
            label: 'app标识',
            prop: 'appName'
        },
        {
            label: 'app中文名',
            prop: 'appEnname'
        },
        {
            label: 'app英文名',
            prop: 'appSecret'
        },
        {
            type: '',
            label: 'app密钥',
            prop: 'appDomain'
        },
        {
            type: 'radio',
            label: 'app独立域名',
            prop: 'appType',
            options: [
                {
                    val: '0',
                    title: '外部应用'
                },
                {
                    val: '1',
                    title: '内部应用'
                }
            ]
        },
        {
            type: 'radio',
            label: '应用',
            prop: 'appStatus',
            options: [
                {
                    val: '0',
                    title: '停用'
                },
                {
                    val: '1',
                    title: '启用'
                }
            ]
        },
        {
            type: '',
            label: '状态',
            prop: 'createTime',
            unshow: true
        },
        {
            type: '',
            label: '描述',
            prop: 'description'
        }
    ]
}
