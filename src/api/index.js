/* eslint-disable */
const url = ""
const api = url + "/api"
const preview_file = process.env.FILESERVER_ROOT //预览上传的fastfds服务的文件
export default {
  url: url,
  api: api,
  preview_file: preview_file,
  download: "/download", //download from fastfds server
  postcard: "/postcard", //method post is upload, method get is download
  getsid: url + "/sid",
  pageauth: url + "/pageauth",
  intercept: api + "/csws/intercept",
  login: api + "/login",
  register: api + "/register",
  logout: api + "/logout",
  //敏感词接口
  addWord: api + "/sensitive/addWord",
  getWordList: api + "/sensitive/getWordList",
  getWordInfo: api + "/sensitive/getWordInfo",
  updateWordUsage: api + "/sensitive/updateWordUsage",
  deleteWord: api + "/sensitive/deleteWord",
  //菜单
  getAuthMenuItemByMenuId: api + "/auth/getAuthMenuItemByMenuId",
  deleteAuthMenuItemItem: api + "/auth/saveOrUpdateAuthMenuItem",
  deletAuthMenu: api + "/auth/deletAuthMenu",
  queryAuthMenuTreeBySubSystemAndBusiType:
    api + "/auth/queryAuthMenuTreeBySubSystemAndBusiType",
  saveOrUpdateAuthMenu: api + "/auth/saveOrUpdateAuthMenu",
  deleteAuthMenuItem: api + "/auth/deleteAuthMenuItem",
  saveMenuAuthItem: api + "/auth/saveMenuAuthItem",
  saveAuthMenuItem: api + "/auth/saveAuthMenuItem",
  //角色
  getAuthRoleItemByRoleId: api + "/auth/getAuthRoleItemByRoleId",
  queryAuthRoleByBusiTypeItem: api + "/auth/saveOrUpdateAuthRoleItem",
  deleteAuthRole: api + "/auth/deleteAuthRole",
  queryAuthRole: api + "/auth/queryAuthRole",
  saveOrUpdateAuthRole: api + "/auth/saveOrUpdateAuthRole",
  queryAuthRoleByBusiType: api + "/auth/queryAuthRoleByBusiType",
  deleteAuthRoleByList: api + "/auth/deleteAuthRoleByList",
  updateAuthRoleStatusByList: api + "/auth/updateAuthRoleStatusByList",
  //权限
  deleteAuthItem: api + "/auth/deleteAuthItem",
  queryAuthItem: api + "/auth/queryAuthItem",
  saveOrUpdateAuthItem: api + "/auth/saveOrUpdateAuthItem",
  deleteAuthItemList: api + "/auth/deleteAuthItemList",
  //数据字典
  updateTItemDefine: api + "/tconfig/updateTItemDefine",
  deleteTItemValue: api + "/tconfig/deleteTItemValue",
  addTItemDefine: api + "/tconfig/addTItemDefine",
  updateTItemValue: api + "/tconfig/updateTItemValue",
  queryTItemValue: api + "/tconfig/queryTItemValue",
  deleteTItemDefine: api + "/tconfig/deleteTItemDefine",
  addTItemValue: api + "/tconfig/addTItemValue",
  queryTItemDefineByPager: api + "/tconfig/queryTItemDefineByPager",
  queryTItemValueByPager: api + "/tconfig/queryTItemValueByPager",
  queryTItemDefine: api + "/tconfig/queryTItemDefine",
  loadTConfigListTree: api + "/tconfig/loadTConfigListTree",
  //客户
  deleteCustomer: api + "/customer/deleteCustomer",
  updateCustomerStatus: api + "/customer/updateCustomerStatus",
  updateCustomerRemarkr: api + "/customer/updateCustomerRemarkr",
  selectCustomerInfo: api + "/customer/selectCustomerInfo",
  getCustomerListByPage: api + "/customer/getCustomerListByPage",
  saveCustomer: api + "/customer/saveCustomer",
  //系统配置、系统变量
  delSysCfg: api + "/tSysCfg/delSysCfg",
  getSysCfg: api + "/tSysCfg/getSysCfg",
  getSysCfgListPaging: api + "/tSysCfg/getSysCfgListPaging",
  updateSysCfg: api + "/tSysCfg/updateSysCfg",
  addSysCfg: api + "/tSysCfg/addSysCfg",
  // 套餐
  updateTPackageStatusById: api + "/tPackage/updateTPackageStatusById",
  deleteTPackageRoleById: api + "/tPackage/deleteTPackageRoleById",
  getTPackageRoleById: api + "/tPackage/getTPackageRoleById",
  addTPackageRole: api + "/tPackage/addTPackageRole",
  deleteTPackageById: api + "/tPackage/deleteTPackageById",
  getTPackageById: api + "/tPackage/getTPackageById",
  getTPackageListByPage: api + "/tPackage/getTPackageListByPage",
  addOrUpdateTPackage: api + "/tPackage/addOrUpdateTPackage",
  // 状态配置
  getTStatusListByPage: api + "/tStatus/getTStatusListByPage",
  getTStatusTableById: api + "/tStatus/getTStatusTableById",
  delTStatusTableById: api + "/tStatus/delTStatusTableById",
  saveTStatusTable: api + "/tStatus/saveTStatusTable",
  delTStatusById: api + "/tStatus/delTStatusById",
  getTStatusById: api + "/tStatus/getTStatusById",
  saveOrUpdateTStatus: api + "/tStatus/saveOrUpdateTStatus",
  // 服务配置
  delTService: api + "/tService/delTService",
  getTServiceById: api + "/tService/getTServiceById",
  getTServiceListByPage: api + "/tService/getTServiceListByPage",
  saveOrUpdateTService: api + "/tService/saveOrUpdateTService",
  // tJob
  deleteTJobCfg: api + "/tJob/deleteTJobCfg",
  queryTJobCfg: api + "/tJob/queryTJobCfg",
  addTJobCfg: api + "/tJob/addTJobCfg",
  updateTJobCfg: api + "/tJob/updateTJobCfg",
  queryTJobCfgByPager: api + "/tJob/queryTJobCfgByPager",
  // 用户身份定义
  addTIdentity: api + "/tconfig/addTIdentity",
  deleteTIdentity: api + "/tconfig/deleteTIdentity",
  queryTIdentity: api + "/tconfig/queryTIdentity",
  addTIdentityService: api + "/tconfig/addTIdentityService",
  updateTIdentity: api + "/tconfig/updateTIdentity",
  deleteTIdentityService: api + "/tconfig/deleteTIdentityService",
  queryIdentityByPager: api + "/tconfig/queryIdentityByPager",
  queryTIdentityService: api + "/tconfig/queryTIdentityService",
  // 防作弊刷票配置
  queryAntiCheatCfgByPager: api + "/tCheatConfig/queryAntiCheatCfgByPager",
  modAntiCheatCfg: api + "/tCheatConfig/modAntiCheatCfg",
  delAntiCheatCfg: api + "/tCheatConfig/delAntiCheatCfg",
  queryAntiCheatCfg: api + "/tCheatConfig/queryAntiCheatCfg",
  addAntiCheatCfg: api + "/tCheatConfig/addAntiCheatCfg",
  // APP应用注册表
  updateAppConfig: api + "/tAppConfig/updateAppConfig",
  queryTAppConfigByPager: api + "/tAppConfig/queryTAppConfigByPager",
  queryAppConfig: api + "/tAppConfig/queryAppConfig",
  deleteAppConfig: api + "/tAppConfig/deleteAppConfig",
  addAppConfig: api + "/tAppConfig/addAppConfig",
  // 系统消息
  getTSystemMessageListByPage:
    api + "/tSystemMessage/getTSystemMessageListByPage",
  saveOrUpdateTSystemMessage:
    api + "/tSystemMessage/saveOrUpdateTSystemMessage",
  getTSystemMessageById: api + "/tSystemMessage/getTSystemMessageById",
  delTSystemMessage: api + "/tSystemMessage/delTSystemMessage",
  // 系统消息
  getIsNewVersion: api + "/verCfg/getIsNewVersion",
  deleteVersion: api + "/verCfg/deleteVersion",
  updateVersion: api + "/verCfg/updateVersion",
  addVersion: api + "/verCfg/addVersion",
  queryTAppVersionByPager: api + "/verCfg/queryTAppVersionByPager",
  // company management
  getCorpListMultiByPager: api + "/corp/getCorpListMultiByPager",
  getCorpInfoMulti: api + "/corp/getCorpInfoMulti",
  updateCorpStatusByCorpId: api + "/corp/updateCorpStatusByCorpId",
  updateCorpPackName: api + "/corp/updateCorpPackName",
  // 公众号
  getPublicAccountListByPage:
    api + "/wxPublicAccount/getPublicAccountListByPage",
  updatePublicAccountToActive:
    api + "/wxPublicAccount/updatePublicAccountToActive",
  updatePublicAccountListToDisabled:
    api + "/wxPublicAccount/updatePublicAccountListToDisabled",
  updatePublicAccountToBlockUp:
    api + "/wxPublicAccount/updatePublicAccountToBlockUp",
  updatePublicAccountToUnAuthorization:
    api + "/wxPublicAccount/updatePublicAccountToUnAuthorization",
  updatePublicAccountListStatusToDelete:
    api + "/wxPublicAccount/updatePublicAccountListStatusToDelete",
  // 用户信息
  getCssWxUserByPager: api + "/wechat/user/getCssWxUserByPager",
  updateRemarkByOpenid: api + "/wechat/user/updateRemarkByOpenid",
  getUserInfoByOpenid: api + "/wechat/user/getUserInfoByOpenid",
  updateBlackSubscribeByOpenids:
    api + "/wechat/user/updateBlackSubscribeByOpenids",
  // 坐席
  selectSeatByPagerOperate: api + "/seat/selectSeatByPagerOperate",
  getSeatDetailByOperation: api + "/seat/getSeatDetailByOperation",
  updateSeatListStatusByOperation: api + "/seat/updateSeatListStatusByOperation"
};
