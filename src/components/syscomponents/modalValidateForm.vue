<template>
    <Modal
        v-model="modal"
        :title="title"
        :width="width"
        :mask-closable="false"
        @on-visible-change="visibleChange"
        @on-cancel="modalCancel">
        <Validateform ref="form"
        :formValidate="FormValidate"
        v-on:modalOk="afterOk"
        v-on:modalCancel="afterCancel"
        :label-width="labelWidth">
            <div v-if="type !== 'popup'" v-for="(item, index) in FormItems" :key="'formitem' + index">
                <FormItem v-if="item.type === 'radio' && !item.unshow" :label="item.label" :prop="item.prop">
                    <RadioGroup v-model="FormValidate[item.prop]">
                        <Radio v-for="(_item, index) in item.options" :key="index"
                        :label="_item.val">{{_item.title}}</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-else-if="item.type === 'checkbox' && !item.unshow" :label="item.label" :prop="item.prop">
                    <CheckboxGroup v-model="FormValidate[item.prop]">
                        <Checkbox v-for="(_item, index) in item.options" :key="index"
                        :label="_item.val">{{_item.title}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem v-else-if="item.type === 'select' && !item.unshow" :label="item.label" :prop="item.prop">
                    <Select v-model="FormValidate[item.prop]">
                        <Option v-for="(_item, index) in item.options" :key="index"
                        :value="_item.val">{{_item.title}}</Option>
                    </Select>
                </FormItem>
                <FormItem v-else-if="item.type === 'date' && !item.unshow" :label="item.label" :prop="item.prop">
                    <DatePicker
                    v-model="FormValidate[item.prop]"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    placeholder="Select date"></DatePicker>
                </FormItem>
                <FormItem v-else-if="item.type === 'number' && !item.unshow" :label="item.label" :prop="item.prop">
                    <InputNumber v-model="FormValidate[item.prop]"></InputNumber>
                </FormItem>
                <FormItem v-else-if="item.type === 'textarea' && !item.unshow" :label="item.label" :prop="item.prop">
                    <Input :type="item.type" v-model="FormValidate[item.prop]"></Input>
                </FormItem>
                <FormItem v-else-if="!item.unshow" :label="item.label" :prop="item.prop">
                    <Input v-model="FormValidate[item.prop]"></Input>
                </FormItem>
            </div>
            <div v-if="type === 'popup'" v-for="(item, index) in FormItems" :key="'popupItem' + index">
                <Row>
                    <Col span="6">{{item.label}}</Col>
                    <Col span="18">{{item.value}}</Col>
                </Row>
            </div>
        </Validateform>
        <div slot="footer">
            <Button type="primary" size="large" @click="modalOk" v-if="type !== 'popup'">确定</Button>
            <Button type="text" size="large" @click="modalCancel" v-if="type !== 'popup'">取消</Button>
        </div>
     </Modal>
</template>

<script>
  export default {
    name: "modalValidateForm",
    components: {
        Validateform : () => import('./validateForm.vue')
    },
    props: {
        title:{
            type: String,
            default:'ykt'
        },
        formValidate:{
            type: Object,
            default: function () { return {} }
        },
        width:{
            type: String,
            default: '500'
        },
        labelWidth:{
            type: Number,
            default: 100
        },
        type:{
            type: [String, Number],
            default: 0
        },
        formItems: {
            type: Array,
            default: function () { return [] }
        }
    },
    data () {
      return {
          modal: false,
          formData: {}
      }
    },
    computed: {
        FormItems() {
            return this.formItems;
        },
        FormValidate() {
            this.formItems.forEach(item => {
                let value = null;
                if (item.value === undefined) {
                    item.type === "number" ? value = null : value = ''
                } else {
                    value = item.value
                }
                this.$set(this.formData, item.prop, value)
                this.$set(this.formData, '_msg', item.msg)
            })
            return this.formData
        }
    },
    methods: {
        modalOk () {
            this.$refs['form'].parentHandleSubmit();
            // this.$Message.info('Clicked ok');
        },
        afterOk (val1, val2) {
            if (val1) {
                this.$emit('success', JSON.parse(JSON.stringify(val2)), this.type)
            }
        },
        modalCancel () {
            // this.$refs['form'].parentHandleReset()
            this.formItems.forEach(item => {
                let value = null;
                if (item.type === "number") {
                    value = item.value ? item.value : item.value === 0 ? 0 : null
                } else {
                    value = item.value || ''
                }
                this.$set(this.formData, item.prop, value)
            })
        },
        afterCancel (val) {
            console.log(val)
        },
        visibleChange(val) {
            this.$emit('visibleChange', val)
        }
    }
  }
</script>

<style lang="stylus">
</style>
