const columns = [
  {
    fixed: "left",
    type: "selection",
    width: 50,
    align: "center"
  },
  {
    title: "企业ID",
    key: "id"
  },
  {
    title: "坐席编号",
    key: "seatNo"
  },
  {
    title: "分配公众号数",
      key: "appIdTotal"
  },
  {
    title: "坐席备注",
    key: "remark"
  },
  {
    title: "所属企业",
      key: "corpName"
  },
  {
    title: "员工姓名",
      key: "eeName"
  },
  {
    title: "手机号",
      key: "mobile"
  },
  {
    title: "部门",
      key: "deptName"
  },
  {
    title: "坐席状态",
    key: "status",
    render: (h, params) => {
      let data = params.row.status;
      let text = null;
      if (data === 1) text = "正常";
        if (data === 0) text = "删除";
      if (data === 2) text = "停用";
      if (data === 3) text = "禁用";
        if (data === 4) text = "未分配";
      return h("span", text);
    }
  },
  {
    title: "在线状态",
    key: "onlineStatus",
    render: (h, params) => {
      let data = params.row.onlineStatus;
      let text = null;
      if (data === 1) text = "在线";
      if (data === 2) text = "忙碌";
      if (data === 3) text = "离开";
        if (data === 4) text = "离线";
      return h("span", text);
    }
  }
];
columns.forEach((item, index) => {
    !item.width && (item.minWidth = 100)
    // if (index > 0) item.sortable = true
});
export const Columns = columns

