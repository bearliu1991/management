export default {
    keywords: [
                {
                    key: 'identityName',
                    title: '身份名称',
                    value: ''
                },
                {
                    key: 'identityType',
                    title: '身份类型',
                    value: ''
                },
                {
                    key: 'roleId',
                    title: '角色ID',
                    value: ''
                }
            ],
    selctors: [
                {
                    key: 'status',
                    type: '状态',
                    value: -1,
                    options: [
                        {
                            value: -1,
                            label: '--全部--'
                        },
                        {
                            value: 'ACTIVE',
                            label: '启用'
                        },
                        {
                            value: 'DISABLED',
                            label: '停用'
                        }
                    ]
                },
                {
                    type: "所属系统",
                    key: "subSystem",
                    value: -1,
                    options: [
                        {
                            value: -1,
                            label: '--全部--'
                        },
                        {
                            value: 1,
                            label: 'pc端web聊天系统'
                        },
                        {
                            value: 2,
                            label: 'pc端桌面聊天系统'
                        },
                        {
                            value: 3,
                            label: 'pc端web管理系统'
                        },
                        {
                            value: 4,
                            label: 'pc端web运营系统'
                        },
                        {
                            value: 5,
                            label: 'IOS'
                        },
                        {
                            value: 6,
                            label: '安卓'
                        }
                    ]
                },
                {
                    type: "所属行业",
                    key: "busiType",
                    value: -1,
                    options: [
                        {
                            value: -1,
                            label: '--全部--'
                        },
                        {
                            value: 0,
                            label: 'MGR'
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
            label: '身份名称',
            prop: 'identityName'
        },
        {
            label: '身份类型',
            prop: 'identityType'
        },
        {
            type: 'number',
            label: '权限系统的角色ID',
            prop: 'roleId',
            value: null
        },
        {
            type: 'select',
            label: '所属系统',
            prop: 'subSystem',
            value: 1,
            options: [
                {
                    val: 1,
                    title: 'pc端web聊天系统'
                },
                {
                    val: 2,
                    title: 'pc端桌面聊天系统'
                },
                {
                    val: 3,
                    title: 'pc端web管理系统'
                },
                {
                    val: 4,
                    title: 'pc端web运营系统'
                },
                {
                    val: 5,
                    title: 'IOS'
                },
                {
                    val: 6,
                    title: '安卓'
                }
            ]
        },
        {
            type: 'select',
            label: '所属行业',
            prop: 'busiType',
            value: 0,
            options: [
                {
                    val: 0,
                    title: 'MGR'
                }
            ]
        },
        {
            type: 'radio',
            label: '状态',
            prop: 'status',
            options: [
                {
                    val: '0',
                    title: '停用'
                },
                {
                    val: '1',
                    title: '启用'
                }
            ]
        }
    ]
}
