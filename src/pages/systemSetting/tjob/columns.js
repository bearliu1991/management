const columns = [
    {
        fixed: 'left',
        type: 'selection',
        width: 50,
        align: 'center'
    },
    {
        title: '名称',
        key: 'jobName'
    },
    {
        title: '描述',
        key: 'description'
    },
    {
        title: '类型',
        key: 'jobType'
    },
    {
        title: '类bean名称',
        key: 'jobBean'
    },
    {
        title: '任务池类型',
        key: 'jobPool',
        render: (h, params) => {
            let data = params.row.jobPool;
            if (data === 'none') return h('span', '不使用线程池')
            if (data === 'custom') return h('span', '自定义线程池')
        }
    },
    {
        title: '触发类型',
        key: 'triggerType',
        render: (h, params) => {
            let data = params.row.triggerType;
            if (data === 'simple') return h('span', '简单模式')
            if (data === 'cron') return h('span', 'cron表达式模式')
        }
    },
    {
        title: '重复次数',
        key: 'repeatCount'
    },
    {
        title: '重复间隔(ms)',
        key: 'repeatInterval'
    },
    {
        title: 'cron表达式',
        key: 'cronExpression'
    },
    {
        title: '状态',
        key: 'status',
        render: (h, params) => {
            let data = params.row.triggerType;
            if (data === 'ACTIVE') return h('span', '启用')
            if (data === 'INACTIVE') return h('span', '停用')
        }
    },
    {
        title: '执行优先级',
        key: 'priority'
    },
    {
        title: '延迟执行时间(ms)',
        key: 'delay'
    },
    {
        title: '线程最小数量',
        key: 'minPoolSize'
    },
    {
        title: '线程最大数量',
        key: 'maxPoolSize'
    },
    {
        title: '心跳时间(秒)',
        key: 'keepAliveTime'
    },
    {
        title: '缓存容量',
        key: 'cacheQueueCapacity'
    },
    {
        title: '服务器的IP',
        key: 'serverIp'
    },
    {
        title: '备份',
        key: 'serverIpBak'
    }
];

columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    if (index > 0) item.sortable = true
});

export default columns
