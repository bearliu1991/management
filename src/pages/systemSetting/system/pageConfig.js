export default {
    keywords: [
        {
            key: 'paramId',
            title: 'ID',
            value: ''
        },
        {
            key: 'paramName',
            title: '参数名',
            value: ''
        },
        {
            key: 'paramValue',
            title: '参数值',
            value: ''
        }
    ],
    formItems: [
        {
            label: '全局参数',
            prop: 'paramId'
        },
        {
            label: '参数说明',
            prop: 'paramName'
        },
        {
            label: '参数值',
            prop: 'paramValue'
        },
        {
            type: "radio",
            label: '更新的时候忽略空属性',
            prop: 'ignoreEmpty',
            options: [
                { val: 'true', title: '是' },
                { val: 'false', title: '否' }
            ]
        },
        {
            label: '值单位',
            prop: 'unitType'
        }
    ]
}
