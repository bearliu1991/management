export default {
    filters: [
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
    formData: {
        itemId: null,
        itemName: '',
        uri: '',
        subSystem: 'PC_WEB_CHAT',
        itemDesc: '',
        showUri: 'T',
        showInMenu: 'T',
        itemOrder: null,
        itemPosition: ''
    },
    formItems: [
        {
            type: 'number',
            prop: 'itemId',
            unshow: true
        },
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
