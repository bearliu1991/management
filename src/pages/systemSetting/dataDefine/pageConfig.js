export default {
    keywords: [
        {
            key: 'itemKey',
            title: '字典键值',
            value: '',
            placeholder: ''
        },
        {
            key: 'itemKeyDesc',
            title: '键值描述',
            value: '',
            placeholder: ''
        },
        {
            key: 'itemPk',
            title: '字典父键值',
            value: '',
            placeholder: ''
        }
    ],
    selctors: [
        {
            type: "排序方式",
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
    formItems: [
        {
            label: '字典键值',
            prop: 'itemKey'
        },
        {
            label: '键值描述',
            prop: 'itemKeyDesc'
        },
        {
            label: '字典父键值',
            prop: 'itemPk'
        }
    ]
}
