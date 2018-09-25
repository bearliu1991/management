export default {
    filtersTree: [
        {
            type: 'select',
            key: 'subSystem',
            value: 1,
            options: [
                {
                    value: -1,
                    label: '选择菜单所属系统'
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
            type: 'select',
            key: 'busiType',
            value: 1,
            options: [
                {
                    value: 1,
                    label: '选择菜单所属业务'
                },
                {
                    value: 0,
                    label: 'MGR'
                },
                {
                    value: 2,
                    label: '迎客通企业产品'
                },
                {
                    value: 3,
                    label: '迎客通代理商'
                }
            ]
        }
    ],
    filtersTable: [
        {
            key: 'itemNameOrUri',
            value: '',
            width: 300,
            placeholder: '输入权限名称或URL搜索'
        }
    ],
    filtersAuthTable: [
        {
            key: 'itemNameOrUri',
            width: 300,
            placeholder: '输入权限名称或URL搜索'
        },
        {
            type: 'select',
            key: 'subSystem',
            value: -1,
            options: [
                {
                    value: -1,
                    label: '选择菜单所属系统'
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
            type: "number",
            prop: 'menuId',
            unshow: true
        },
        {
            type: "number",
            prop: 'menuParent',
            unshow: true
        },
        {
            label: '菜单名称：',
            prop: 'title'
        },
        {
            type: 'select',
            label: '所属系统：',
            prop: 'subSystem',
            value: 0,
            options: [
                {
                    val: 0,
                    title: '选择菜单所属系统'
                },
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
                    label: '安卓'
                }
            ]
        },
        {
            type: 'select',
            label: '所属业务：',
            prop: 'busiType',
            value: 1,
            options: [
                {
                    val: 1,
                    title: '选择菜单所属业务'
                },
                {
                    val: 0,
                    title: 'MGR'
                },
                {
                    val: 2,
                    title: '迎客通企业产品'
                },
                {
                    val: 3,
                    title: '迎客通代理商'
                }
            ]
        },
        {
            type: "number",
            label: '排序：',
            prop: 'menuOrder'
        },
        {
            label: '菜单URL：',
            prop: 'menuUrl'
        },
        {
            type: "number",
            label: '菜单层次：',
            prop: 'menuLevel'
        },
        {
            label: '菜单位置：',
            prop: 'menuPosition'
        }
    ],
    formItemsAuth: [
        // {
        //     type: 'number',
        //     prop: 'itemId',
        //     unshow: true
        // },
        {
            label: '权限名称：',
            prop: 'itemName'
        },
        {
            label: 'URL：',
            prop: 'uri'
        },
        {
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
        },
        {
            type: 'radio',
            label: '是否显示URL：',
            prop: 'showUri',
            value: 'T',
            options: [
                {
                    val: 'T',
                    title: '显示'
                },
                {
                    val: 'F',
                    title: '隐藏'
                }
            ]
        },
        {
            type: 'radio',
            label: '菜单：',
            prop: 'showInMenu',
            value: 'T',
            options: [
                {
                    val: 'T',
                    title: '显示'
                },
                {
                    val: 'F',
                    title: '隐藏'
                }
            ]
        },
        {
            type: 'number',
            label: '排序：',
            value: 0,
            prop: 'itemOrder'
        },
        {
            label: '位置：',
            prop: 'itemPosition'
        },
        {
            type: "textarea",
            label: '权限描述：',
            prop: 'itemDesc'
        }
    ]
}
