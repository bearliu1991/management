export default {
    keywords: [
        {
            key: 'statusDesc',
            title: '状态描述',
            value: ''
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
    formItems: [
        {
            label: '状态id',
            prop: 'statusId',
            unshow: true
        }, {
            type: "textarea",
            label: '状态描述',
            prop: 'statusDesc'
        }
    ]
}
