const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: 'SN限制',
        key: 'limitSn'
    },
    {
        title: '防作弊配置说明',
        key: 'limitName'
    },
    {
        title: '业务代码',
        key: 'busiCode'
    },
    {
        title: '业务代码枚举类型',
        key: 'busiCodeDefine'
    },
    {
        title: '对象类型',
        key: 'objectType'
    },
    {
        title: '防作弊类型',
        key: 'cheatType',
        render: (h, params) => {
            let data = params.row.cheatType;
            if (data === 'IP' || data === 'MAC') return h('span', '设备号码')
            if (data === 'ACCOUNT') return h('span', '用户号')
        }
    },
    {
        title: '防作弊周期',
        key: 'cheatCycleType',
        render: (h, params) => {
            let data = params.row.cheatCycleType;
            let text = null;
            // if (data === 'DAY') text = '日'
            // if (data === 'WEEK') text = '周'
            // if (data === 'MONTH') text = '月'
            data === 'DAY' ? text = '日'
            : data === 'WEEK' ? text = '周'
            : text = '月'
            return h('span', text)
        }
    },
    {
        title: '有效次数',
        key: 'limitNum'
    },
    {
        title: '父级配置SN',
        key: 'limitParentSn'
    },
    {
        title: '子类',
        key: 'children',
        render: (h, params) => {
            let data = params.row.children;
            let text = null;
            if (Array.isArray(data)) {
                text = data.length
            }
            return h('span', text)
        }
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns
