<!--
描述：系统应用-角色管理-权限分配组件
开发人：fengjing
开发日期：2017年12月29日
-->
<template lang="pug">
  kalix-dialog.user-add(
  title='权限分配'
  bizKey="role"
  ref="kalixBizDialog"
  v-bind:formModel.sync="formModel"
  v-bind:targetURL="targetURL"
  v-bind:submitCustom="submitCustom"
  )
    div.el-form(slot="dialogFormSlot" style="max-height:550px;min-height:550px;overflow:auto;border: 1px solid #d0d0d0;margin:-30px 0 -20px")
      el-tree.filter-tree(v-bind:data="treeData" v-bind:props="defaultProps" node-key="id" highlight-current
      show-checkbox v-bind:default-checked-keys="checkedKeys" default-expand-all
      empty-text="数据加载中!" ref="baseTree"
      v-on:check-change="checkChange")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {rolesURL} from '../../config.toml'

  const ON_REFRESH_DATA = 'refreshData'

  export default {
    name: 'AdminRoleAuth',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        treeDataURL: '/camel/rest/roles',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        checkedKeys: [],
        ids: [],
        funIds: [],
        targetURL: rolesURL,
        contentMessage: ''
      }
    },
    mounted () {
    },
    watch: {
      formModel: {
        handler: 'watchFormModel'
      }
    },
    methods: {
      // 获取数据
      getData() {
        this.treeData = []
        this.checkedKeys = []
        if (!this.treeDataURL) {
          return
        }
        if (!this.formModel.id) {
          return
        }
        let url = this.treeDataURL + '/' + this.formModel.id + '/authorizations'
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          if (res.data.children) {
            this.treeData = res.data.children
            // 获取选中节点, 并设置所有节点disable=true
            this.getCheckedKeys(this.treeData)
          }
        })
      },
      // 获取tree组件中被选中结点的id
      getCheckedKeys(array) {
        if (array && array.length > 0) {
          for (let i = 0; i < array.length; i++) {
            if (array[i].children) {
              // array[i].disabled = true
              if (array[i].children.length === 0) {
                // delete array[i].children
                if (array[i].checked) {
                  this.checkedKeys.push(array[i].id)
                }
              } else {
                this.getCheckedKeys(array[i].children)
              }
            }
          }
        }
      },
      close() {
        this.onCancelClick()
      },
      // 封装数据格式
      getIds(array) {
        if (array && array.length > 0) {
          for (let i = 0; i < array.length; i++) {
            if (array[i].children) {
              // array[i].disabled = true
              if (array[i].parentId === -1 && array[i].checked) {
                this.funIds.push('app:' + array[i].id)
              }
              if (array[i].children.length === 0) {
                // delete array[i].children
                if (array[i].checked) {
                  if (array[i].parentId === '-1') {
                    this.funIds.push('app:' + array[i].id)
                  } else {
                    this.funIds.push('fun:' + array[i].id)
                  }
                }
              } else {
                if (array[i].checked) {
                  this.funIds.push('fun:' + array[i].id)
                }
                this.getIds(array[i].children)
              }
            }
          }
        }
      },
      checkChange(a, b, c) {
        if (b) {
          a.checked = true
        } else if (c) {
          a.checked = true
        } else {
          a.checked = false
        }
      },
      watchFormModel(newVal) {
        this.getData()
        if (newVal.id) {
          this.targetURL = this.targetURL + '/' + newVal.id + '/authorizations'
        }
        this.ids.push(newVal.id)
      },
      // 重写basedialog的提交方法
      submitCustom(baseDialog) {
        this.funIds.push('fun:root')
        this.getIds(this.treeData)
        this.ids.push(this.funIds.join(','))
        baseDialog.$refs.dialogForm.validate((valid) => {
          if (valid) {
            this.axios.request({
              method: baseDialog.isEdit ? 'PUT' : 'POST',
              url: baseDialog.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.ids,
              params: {}
            }).then(response => {
              if (response.data.success) {
                this.$KalixMessage.success(response.data.msg)
                baseDialog.visible = false
                baseDialog.$refs.dialogForm.resetFields()
                baseDialog.submitComplete()
              } else {
                this.$KalixMessage.error(response.data.msg)
                baseDialog.submitComplete()
              }
              // 刷新列表
              this.$KalixEventBus.$emit(ON_REFRESH_DATA)
              baseDialog._afterDialogClose()
              console.log('[kalix] dialog submit button clicked !')
              baseDialog.visible = false
            })
          } else {
            this.$KalixMessage.error('请检查输入项！')
            baseDialog.submitComplete()
            return false
          }
        })
        this.ids = []
      }
    }
  }
</script>
