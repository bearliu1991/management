<template>
    <div>
        <h1>{{title}}</h1>
        <div>
            <Row>
                <Col span="6">客户ID</Col>
                <Col span="18">{{information.id}}</Col>
            </Row>
            <Row>
                <Col span="6">公司id</Col>
                <Col span="18">{{information.corpId}}</Col>
            </Row>
            <Row>
                <Col span="6">客户名称</Col>
                <Col span="18">{{information.name}}</Col>
            </Row>
            <Row>
                <Col span="6">简称</Col>
                <Col span="18">{{information.abbreviation}}</Col>
            </Row>
            <Row>
                <Col span="6">我方维护人id</Col>
                <Col span="18">{{information.mgrId}}</Col>
            </Row><Row>
                <Col span="6">我方维护人姓名</Col>
                <Col span="18">{{information.mgr}}</Col>
            </Row><Row>
                <Col span="6">客户介绍人</Col>
                <Col span="18">{{information.introducer}}</Col>
            </Row><Row>
                <Col span="6">客户联系电话</Col>
                <Col span="18">{{information.telephone}}</Col>
            </Row><Row>
                <Col span="6">邮箱地址</Col>
                <Col span="18">{{information.email}}</Col>
            </Row><Row>
                <Col span="6">网址</Col>
                <Col span="18">{{information.website}}</Col>
            </Row><Row>
                <Col span="6">是否为子公司</Col>
                <Col span="18">{{information.isSon | isSonOrNot }}</Col>
            </Row><Row>
                <Col span="6">父公司id</Col>
                <Col span="18">{{information.parentId}}</Col>
            </Row><Row>
                <Col span="6">纳税人识别码</Col>
                <Col span="18">{{information.taxpayerCode}}</Col>
            </Row>
            <Row>
                <Col span="6">信用控制</Col>
                <Col span="18">{{information.control}}</Col>
            </Row>
            <Row>
                <Col span="6">客户类型</Col>
                <Col span="18">{{information.type}}</Col>
            </Row>
            <Row>
                <Col span="6">客户等级</Col>
                <Col span="18">{{information.level}}</Col>
            </Row>
            <Row>
                <Col span="6">客户所属行业</Col>
                <Col span="18">{{information.industry}}</Col>
            </Row>
            <Row>
                <Col span="6">客户备注</Col>
                <Col span="18">{{information.remark}}</Col>
            </Row>
            <Row>
                <Col span="6">客户状态</Col>
                <Col span="18">{{information.status | infoStatus}}</Col>
            </Row>
        </div>
        <Table :columns="profilecolumns" :data="information.profileDtoList"></Table>
        <Table :columns="addresscolumns" :data="information.addressDtoList"></Table>
    </div>
</template>

<script>
  export default {
    name: "validateForm",
    props: {
        id: {
            type: Number,
            default: null
        },
        api: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: 'ykt'
        }
    },
    data() {
      return {
        refName:'',
        information: {
            id: 4,
            corpId: '1',
            name: '樊精英',
            abbreviation: 'Fan',
            mgrId: '4',
            mgr: '名字',
            introducer: '樊精英',
            telephone: '0371-65732233',
            email: '983780763@qq.com',
            website: '',
            isSon: '',
            parentId: 'null',
            taxpayerCode: '15067120966',
            control: '',
            type: '',
            level: '',
            industry: '互联网',
            remark: '',
            status: '',
            profileDtoList: [],
            addressDtoList: []
        },
        profilecolumns: [
            {
                title: '料编号',
                key: 'id'
            },
            {
                title: '关联id',
                key: 'refId'
            },
            {
                title: '关联信息业务类型',
                key: 'refType'
            },
            {
                title: '料编号',
                key: 'profileNumber'
            },
            {
                title: '资料名称',
                key: 'profileName'
            },
            {
                title: '资料保存路径',
                key: 'storePath'
            },
            {
                title: '资料查看路径',
                key: 'viewPath'
            },
            {
                title: '上传时间',
                key: 'uploadTime'
            },
            {
                title: '关联信息业务类型',
                key: 'refType'
            },
            {
                title: '资料后缀名称',
                key: 'extensionName'
            },
            {
                title: '状态',
                key: 'status',
                render: (h, params) => {
                    let text = '';
                    if (params.rows.status === 'ACTIVE') {
                       text = '启用';
                    } else if (params.rows.status === 'DISABLED') {
                        text = '停用';
                    } else if (params.rows.status === 'DELETE') {
                        text = '标记删除';
                    }
                    return h('span', text)
                }
            },
            {
                title: 'md5',
                key: 'profileMd5'
            },
            {
                title: '创建人',
                key: 'createUserId'
            }
        ],
        profileData:[],
        addresscolumns: [],
        addressData: []
      }
    },
    beforeCreate() {
        this.refName = "saveCustomer" + Date.now();
    },
    created() {
        console.log(this.id);
    },
    filters: {
        filterIsSon: function (value) {
            if (!value) return ''
            if (value === 'Y') return '是'
            if (value === 'N') return '否'
        },
        filterStatus: function (value) {
            let text = '';
            if (value === 'ACTIVE') {
                text = '启用';
            } else if (value === 'DISABLED') {
                text = '停用';
            } else if (value === 'DELETE') {
                text = '标记删除';
            }
            return text;
        }
    },
    methods: {
        getInfo (val) {
            if (this.api) {
                this.$post(this.api, val).then(res => {
                    // this.information = res
                    this.$set(this, 'information', res)
                })
            } else {
                this.$Message.error('err api');
            }
            // this.$router.push({
            //             name: 'customers',
            //             params: {
            //                 ok : 'true'
            //             }
            //         })
        }
    }
  }
</script>

<style lang="stylus" scoped>
  .form-page
      width 700px
      margin 10px auto 0
</style>
