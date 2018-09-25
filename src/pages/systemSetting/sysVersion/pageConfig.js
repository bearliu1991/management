export default {
    keywords: [
        {
            key: 'insideVersion',
            title: '新内部版本号',
            value: null,
            type: 'number'
        },
        {
            key: 'outsideVersion',
            title: '外部版本号',
            value: ''
        },
        {
            key: 'hotUpdateDetail',
            title: '热更新数据集合',
            value: ''
        },
        {
            key: 'installUpdateUrl',
            title: '安装更新地址',
            value: ''
        },
        {
            key: 'hotUpdateDescribe',
            title: '热更新内容描述',
            value: ''
        },
        {
            key: 'installUpdateDescribe',
            title: '安装更新内容描述',
            value: ''
        },
        {
            key: 'appName',
            title: '终端版本名',
            value: ''
        }
    ],
    selctors: [
        {
            type: "是否更新",
            key: "isUpdate",
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 0,
                    label: '不更新'
                },
                {
                    value: 1,
                    label: '更新'
                }
            ]
        },
        {
            type: "更新方式",
            key: "updateMode",
            value: '0',
            options: [
                {
                    value: '0',
                    label: '热更新和安装更新'
                },
                {
                    value: '1',
                    label: '热更新'
                },
                {
                    value: '2',
                    label: '安装更新'
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
        isUpdate: 0,
        updateMode: '',
        insideVersion: null,
        outsideVersion: '',
        hotUpdateDetail: '',
        installUpdateUrl: '',
        hotUpdateDescribe: '',
        installUpdateDescribe: '',
        appName: ''
    },
    formItems: [
        {
            type: 'radio',
            label: '是否更新',
            prop: 'isUpdate',
            options: [
                {
                    val: 0,
                    title: '不更新'
                },
                {
                    val: 1,
                    title: '不更新'
                }
            ]
        },
        {
            type: 'select',
            label: '更新方式',
            prop: 'updateMode',
            options: [
                {
                    val: 0,
                    title: '热更新和安装更新'
                },
                {
                    val: 1,
                    title: '热更新'
                },
                {
                    val: 2,
                    title: '安装更新'
                }
            ]
        },
        {
            type: 'number',
            label: '新内部版本号',
            prop: 'insideVersion',
            value: null
        },
        {
            type: '',
            label: '外部版本号',
            prop: 'outsideVersion'
        },
        {
            type: '',
            label: '热更新数据集合',
            prop: 'hotUpdateDetail'
        },
        {
            type: '',
            label: '安装更新地址',
            prop: 'installUpdateUrl'
        },
        {
            type: '',
            label: '热更新内容描述',
            prop: 'hotUpdateDescribe'
        },
        {
            type: '',
            label: '安装更新内容描述',
            prop: 'installUpdateDescribe'
        },
        {
            type: '',
            label: '终端版本名',
            prop: 'appName'
        }
    ]
}
