export default {
    keywords: [
        {
            key: 'limitName',
            title: '弊配置说明',
            value: ''
        },
        {
            key: 'busiCode',
            title: '业务代码',
            value: null,
            type: "number"
        },
        {
            key: 'busiCodeDefine',
            title: '代码枚举类型',
            value: ''
        },
        {
            key: 'limitNum',
            title: '有效次数',
            value: null,
            type: "number"
        },
        {
            key: 'limitParentSn',
            title: '父级配置SN',
            value: null,
            type: "number"
        }
    ],
    selctors: [
        {
            type: '对象类型',
            key: 'objectType',
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 'WORKS',
                    label: 'WORKS'
                }
            ]
        },
        {
            type: '防作弊类型',
            key: 'cheatType',
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 'IP',
                    label: '设备号码(IP)'
                },
                {
                    value: 'MAC',
                    label: '设备号码(MAC)'
                },
                {
                    value: 'ACCOUNT',
                    label: '用户号'
                }
            ]
        },
        {
            type: '防作弊周期',
            key: 'cheatCycleType',
            value: -1,
            options: [
                {
                    value: -1,
                    label: '--全部--'
                },
                {
                    value: 'DAY',
                    label: '日'
                },
                {
                    value: 'WEEK',
                    label: '周'
                },
                {
                    value: 'MONTH',
                    label: '月'
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
    formItems: [
        {
            type: 'number',
            label: 'sn',
            prop: 'limitSn',
            unshow: true
        },
        {
            label: '配置说明',
            prop: 'limitName'
        },
        {
            type: 'number',
            label: '业务代码',
            prop: 'busiCode',
            value: null
        },
        {
            label: '枚举类型',
            prop: 'busiCodeDefine'
        },
        {
            type: '',
            label: '对象类型',
            prop: 'objectType'
        },
        {
            type: 'radio',
            label: '防作弊类型',
            prop: 'cheatType',
            value: "ACCOUNT",
            options: [
                {
                    val: 'IP',
                    title: '设备号码(IP)'
                },
                {
                    val: 'MAC',
                    title: '设备号码(MAC)'
                },
                {
                    val: 'ACCOUNT',
                    title: '用户号'
                }
            ]
        },
        {
            type: 'radio',
            label: '防作弊周期',
            prop: 'cheatCycleType',
            value: 'MONTH',
            options: [
                {
                    val: 'DAY',
                    title: '日'
                },
                {
                    val: 'WEEK',
                    title: '周'
                },
                {
                    val: 'MONTH',
                    title: '月'
                }
            ]
        },
        {
            type: 'number',
            label: '有效次数',
            prop: 'limitNum',
            value: null
        },
        {
            type: 'number',
            label: '父级配置SN',
            prop: 'limitParentSn',
            value: null
        }
    ]
}
