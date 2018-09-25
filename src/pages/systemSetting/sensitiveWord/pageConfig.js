export default {

    selctors: [
        {
            type: "敏感词等级",
            key: "sensitiveLevel",
            value: '',
            options: [
                {
                    value: 'WARNING',
                    label: '违规级'
                },
                {
                    value: 'MASK',
                    label: '敏感级'
                },
                {
                    value: 'FORBBIDEN',
                    label: '禁发级'
                }
            ]
        },
        {
            type: "敏感词用途",
            key: "sensitiveUse",
            value: '',
            options: [
                {
                    value: 'CHAT',
                    label: '发言'
                },
                {
                    value: 'NICKNAME',
                    label: '昵称'
                },
                {
                    value: 'PUBLISH_CONTENT',
                    label: '文本'
                }
            ]
        },
        {
            type: "敏感词状态",
            key: "status",
            value: '',
            options: [
                {
                    value: 'ACTIVE',
                    label: '有效'
                },
                {
                    value: 'INVALID',
                    label: '无效'
                }
            ]
        }
    ],
    formItems: [
        {
            label: '敏感词',
            prop: 'sensitiveName'
        },
        {
            type: "radio",
            label: '敏感等级',
            prop: 'sensitiveLevel',
            options: [
                { val: 'WARNING', title: '违规级' },
                { val: 'MASK', title: '敏感级' },
                { val: 'FORBBIDEN', title: '禁发级' }
            ]
        },
        {
            type: "radio",
            label: '替换类型',
            prop: 'replaceType',
            options: [
                { val: '', title: '不替换' },
                { val: 'PART', title: '部分替换' },
                { val: 'ALL', title: '全部替换' }
            ]
        },
        {
            label: '替换用词',
            prop: 'replaceWord'
        },
        {
            type: 'checkbox',
            label: '敏感词用途',
            prop: 'sensitiveUse',
            value: [],
            options: [
                { val: 'CHAT', title: '发言' },
                { val: 'NICKNAME', title: '昵称' },
                { val: 'PUBLISH_CONTENT', title: '文本' }
            ]
        },
        {
            type: 'radio',
            label: '状态',
            prop: 'status',
            options: [
                { val: 'ACTIVE', title: '有效' },
                { val: 'INVALID', title: '无效' }
            ]
        }
    ]
}
