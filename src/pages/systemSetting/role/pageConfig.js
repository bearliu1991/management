export default {
    filters: [
        {
            type: "select",
            key: "subSystem",
            value: -1,
            options: [
                {
                    value: -1,
                    label: '选择所属系统'
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
            type: "select",
            key: "busiType",
            value: -1,
            options: [
                {
                    value: -1,
                    label: '选择所属业务'
                },
                {
                    value: 0,
                    label: 'MGR'
                }
            ]
        }
    ],
    filtersSetAuth: [
        {
            width: 300,
            key: "itemNameOrUri",
            placeholder: "输入权限名称或URL搜索"
        },
        {
            type: "select",
            key: "subSystem",
            value: -1,
            options: [
                {
                    value: -1,
                    label: '选择所属系统'
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
        }
    ],
    formItems: [
        {
            label: '角色名称：',
            prop: 'roleId',
            unshow: true
        }, {
            label: '角色名称：',
            prop: 'roleName'
        }, {
            type: 'radio',
            label: '状态：',
            prop: 'isEnabled',
            value: 1,
            options: [
                { val: 1, title: '启用' },
                { val: 0, title: '禁用' }
            ]
        }, {
            label: '排序：',
            prop: 'roleDesc'
        }, {
            type: 'select',
            label: '所属系统：',
            prop: 'subSystem',
            value: 'PC_WEB_CHAT',
            options: [
                {
                    val: 'PC_WEB_CHAT',
                    title: 'pc端web聊天系统'
                },
                {
                    val: 'PC_DESKTOP_CHAT',
                    title: 'pc端桌面聊天系统'
                },
                {
                    val: 'PC_WEB_ADMIN',
                    title: 'pc端web管理系统'
                },
                {
                    val: 'PC_WEB_MANAGE',
                    title: 'pc端web管理系统'
                },
                {
                    val: 'IOS',
                    title: 'IOS'
                },
                {
                    val: 'ANDROID',
                    title: '安卓'
                }
            ]
        }, {
            type: 'select',
            label: '所属业务：',
            prop: 'busiType',
            value: 0,
            options: [
                {
                    val: 0,
                    title: 'MGR'
                }
            ]
        }, {
            label: '角色分组：',
            prop: 'groupName'
        }
    ]
}
