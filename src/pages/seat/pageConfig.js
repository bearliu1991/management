export default {
  filters: [
    {
      title: "坐席编号：",
      key: "seatNo",
      placeholder: "请输入坐席编号"
    },
    {
    type: "number",
      title: "企业ID：",
      key: "corpId",
      placeholder: "请输入企业ID"
    },
    {
      title: "企业名称：",
      key: "corpName",
      placeholder: "请输入企业名称"
    },
    {
      title: "员工姓名：",
      key: "eeName",
      placeholder: "请输入员工姓名"
    },
    {
      title: "手机号码：",
      key: "mobile",
      placeholder: "请输入手机号码"
    },
    {
      title: "在线状态：",
      width: 120,
      type: "select",
      key: "onlineStatus",
      value: -1,
      options: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 1,
          label: "在线"
        },
        {
          value: 2,
          label: "忙碌"
        },
        {
          value: 3,
          label: "离开"
        },
        {
          value: 4,
          label: "离线"
        }
      ]
    },
    {
      title: "坐席状态：",
      width: 120,
      type: "select",
        key: "status",
      value: -1,
      options: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 1,
          label: "正常"
        },
        {
          value: 0,
          label: "删除"
        },
        {
          value: 2,
          label: "停用"
        },
        {
          value: 3,
            label: "禁用"
          },
          {
              value: 4,
              label: "未分配"
          }
      ]
    },
    {
      type: "dateRange",
      key: "jionTime"
    }
  ]
};
