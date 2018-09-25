export default {
    keywords: [
        {
            key: 'serviceCode',
            title: '服务代码',
            value: ''
        },
        {
            key: 'serviceName',
            title: '服务名称',
            value: ''
        },
        {
            key: 'serviceType',
            title: '服务类型',
            value: ''
        },
        {
            key: 'isGlobal',
            title: '全局性功能',
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
            label: '服务id',
            prop: 'serviceId',
            unshow: true
        }, {
            label: '服务代码',
            prop: 'serviceCode'
        }, {
            label: '服务名称',
            prop: 'serviceName'
        }, {
            label: '服务类型',
            prop: 'serviceType'
        }, {
            type: 'radio',
            label: '全局性功能',
            prop: 'isGlobal',
            options: [
                { val: 'Y', title: '是' },
                { val: 'N', title: '否' }
            ]
        }, {
            type: 'select',
            label: '管理服务',
            prop: 'optrType',
            options: [
                { val: 'FORBIDDEN', title: '禁用' },
                { val: 'RESERVE', title: '恢复' }
            ]
        }
    ]
}
