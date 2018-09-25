export default {
    keywords: [
        {
            key: 'jobName',
            title: '任务名称',
            value: ''
        },
        {
            key: 'description',
            title: '任务描述',
            value: ''
        },
        {
            key: 'jobType',
            title: '任务类型',
            value: 'stateful'
        },
        {
            key: 'jobBean',
            title: '类bean名称',
            value: ''
        },
        {
            key: 'repeatCount',
            title: '重复次数',
            value: null,
            type: "number"
        },
        {
            key: 'repeatInterval',
            title: '重复间隔',
            value: null,
            type: "number"
        },
        {
            key: 'cronExpression',
            title: 'cron表达式',
            value: ''
        },
        {
            key: 'status',
            title: '状态',
            value: ''
        },
        {
            key: 'priority',
            title: '执行优先级',
            value: null,
            type: "number"
        },
        {
            key: 'delay',
            title: '延迟执行时间',
            value: null,
            type: "number",
            palceholder: "单位：毫秒"
        },
        {
            key: 'minPoolSize',
            title: '线程最小数量',
            value: null,
            type: "number"
        },
        {
            key: 'maxPoolSize',
            title: '线程最大数量',
            value: null,
            type: "number"
        },
        {
            key: 'keepAliveTime',
            title: '心跳时间',
            value: null,
            type: "number"
        },
        {
            key: 'cacheQueueCapacity',
            title: '缓存容量',
            value: null,
            type: "number"
        },
        {
            key: 'serverIp',
            title: '务器的IP地址',
            value: ''
        },
        {
            key: 'serverIpBak',
            title: '备份',
            value: ''
        }
    ],
    selctors: [
        {
            type: "任务池类型",
            key: "jobPool",
            value: 'none',
            options: [
                {
                    value: 'none',
                    label: '不使用线程池'
                },
                {
                    value: 'custom',
                    label: '自定义线程池'
                }
            ]
        },
        {
            key: 'triggerType',
            type: '触发类型',
            value: 'simple',
            options: [
                {
                    value: 'simple',
                    label: '简单模式'
                },
                {
                    value: 'cron',
                    label: 'cron表达式模式'
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
        jobName: '',
        description: '',
        jobType: '',
        jobBean: '',
        jobPool: null,
        triggerType: '',
        repeatCount: null,
        repeatInterval: null,
        cronExpression: '',
        status: '',
        priority: null,
        delay: null,
        minPoolSize: 3,
        maxPoolSize: 10,
        keepAliveTime: 30,
        cacheQueueCapacity: 0,
        serverIp: '',
        serverIpBak: ''
    },
    formItems: [
        {
            label: '定时任务名称',
            prop: 'jobName'
        }, {
            label: '定时任务文字描述',
            prop: 'description'
        }, {
            label: '定时任务类型',
            prop: 'jobType'
        }, {
            label: '定时任务服务类bean名称',
            prop: 'jobBean'
        }, {
            label: '定时任务池类型',
            prop: 'jobPool'
        }, {
            label: '触发类型',
            prop: 'triggerType'
        }, {
            label: '重复次数',
            prop: 'repeatCount'
        }, {
            label: '重复间隔',
            prop: 'repeatInterval'
        }, {
            label: 'cron表达式',
            prop: 'cronExpression'
        }, {
            label: '状态',
            prop: 'status'
        }, {
            label: '任务执行优先级',
            prop: 'priority'
        }, {
            label: '延迟执行时间(毫秒)',
            prop: 'delay'
        }, {
            label: '线程最小数量',
            prop: 'minPoolSize'
        }, {
            label: '线程最大数量',
            prop: 'maxPoolSize'
        }, {
            label: '心跳时间(秒)',
            prop: 'keepAliveTime'
        }, {
            label: '缓存容量',
            prop: 'cacheQueueCapacity'
        }, {
            label: '执行服务器的IP地址',
            prop: 'serverIp'
        }, {
            label: '备份',
            prop: 'serverIpBak'
        }
    ]
}
