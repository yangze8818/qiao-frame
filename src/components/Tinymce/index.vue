<template lang="pug">
  div
    <!--div tinymceId:{{tinymceId}}-->
    div.tinymce-container.editor-container
      textarea.tinymce-textarea(v-bind:id="tinymceId")
      div.editor-custom-btn-container(v-if="showCustomButton")
        div.editor-upload-btn
          component(:is="bizPop" v-on:popoverData="getPopoverData"
            v-bind:popData="popData" ref="kalixPop")
          <!--kalix-pop-table(v-bind:bizKey="popData.bizKey" v-bind:placement="popData.placement" v-bind:width="popData.width"-->
            <!--v-bind:jsonStr="popData.jsonStr" v-bind:trigger="popData.trigger" v-bind:buttonName="popData.buttonName"-->
            <!--v-bind:targetUrl="popData.targetUrl" v-bind:tableFields="popData.tableFields" ref="kalixPopTable")-->
          <!--editorImage.editor-upload-btn(color="#20a0ff" v-on:successCBK="imageSuccessCBK")-->
      <!--<div class="editor-custom-btn-container">-->
      <!--<editorImage  color="#20a0ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>-->
      <!--</div>-->
</template>

<script>
  // import editorImage from './components/editorImage'
  const INIT = 0
  const INPUT = 1
  const CHANGED = 2

  export default {
    name: 'tinymce',
    // components: { editorImage },
    // components: {
    //   // editorImage
    //   KalixPopTable: PopTableButton
    // },
    props: {
      id: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default() {
          return ['removeformat undo redo |  bullist numlist | outdent indent | fontselect | fontsizeselect | backcolor forecolor | fullscreen code', 'bold italic blockquote | h2 p  media link | alignleft aligncenter alignright']
        }
      },
      menubar: {
        default: ''
      },
      height: {
        type: Number,
        required: false,
        default: 360
      },
      showCustomButton: {
        type: Boolean,
        default: false
      },
      bizPop: { //  使用的popover组件名称
        type: String
      },
      popData: {
        type: Object,
        default() {
          return {
            placement: '',
            width: '150px',
            trigger: 'click',
            buttonName: '',
            tableFields: [],
            targetUrl: '',
            bizKey: '',
            jsonStr: ''
          }
        }
      },
      tinymcePlugins: {
        type: String,
        default: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools'
      }
    },
    data() {
      return {
        status: INIT,
        hasChange: false,
        hasInit: false,
        tinymceId: this.id || 'vue-tinymce-' + +new Date()
      }
    },
    watch: {
      value(val) {
        console.log('tiny mce is hasChange ' + this.hasChange)
        console.log('tiny mce is hasInit ' + this.hasInit)
        console.log('tiny mce is tinymceId ' + this.tinymceId)
        if (this.status === CHANGED) {
          /* eslint-disable no-return-assign */
          return this.status = INPUT
        }
        //
        this.$nextTick(() => window.tinymce.get(this.tinymceId) && window.tinymce.get(this.tinymceId).setContent(val))
        console.log('tiny mce is tinymceId =====  ' + val)
        // if (!this.hasChange && this.hasInit) {
        //   console.log('tiny mce is changed')
        //   this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
        // }
      }
    },
    mounted() {
      console.log('tiny mce is mounted')
      this.initTinymce()
    },
    activated() {
      console.log('tiny mce is activated')
      this.initTinymce()
    },
    deactivated() {
      console.log('tiny mce is deactivated')
      this.destroyTinymce()
    },
    methods: {
      initTinymce() {
        console.log('%c tiny mce is initTinymce', 'color:#FFF;background:#505')
        const _this = this
        window.tinymce.init({
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: this.toolbar,
          menubar: this.menubar,
          plugins: _this.tinymcePlugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
          imagetools_toolbar: 'watermark',
          default_link_target: '_blank',
          font_formats: '微软雅黑=\'微软雅黑\';宋体=\'宋体\';黑体=\'黑体\';仿宋=\'仿宋\';楷体=\'楷体\';隶书=\'隶书\';幼圆=\'幼圆\';Arial=\'Arial\';',
          link_title: false,
          statusbar: false,
          init_instance_callback: editor => {
            if (_this.value) {
              editor.setContent(_this.value)
            }
            _this.hasInit = true
            editor.on('NodeChange Change KeyUp', () => {
              this.hasChange = true
              // this.$emit('input', editor.getContent({format: 'raw'}))
            })
            editor.on('blur', () => {
              this.$emit('input', editor.getContent({format: 'raw'}))
            })
            editor.on('focus', () => {
              setTimeout(() => {
                editor.execCommand('fontName', false, '微软雅黑')
                editor.execCommand('fontSize', false, '18pt')
              }, 20)
            })
            editor.on('click', () => {
              // popovertable组件使用，当点击事件触发时，关闭pop弹出框
              if (this.showCustomButton === true) {
                this.$emit('contentClick')
              }
            })
          },
          setup: function (ed) { // 设置默认字体和字号
            ed.on('init', function () {
              ed.execCommand('fontName', false, '微软雅黑')
              ed.execCommand('fontSize', false, '18pt')
            })
          },
          language: 'zh_CN'
        })
      },
      destroyTinymce() {
        console.log('%c tiny mce is destroyTinymce', 'color:#FFF;background:#050')
        if (window.tinymce.get(this.tinymceId)) {
          window.tinymce.get(this.tinymceId).destroy()
        }
      },
      setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value)
      },
      getContent() {
        window.tinymce.get(this.tinymceId).getContent()
      },
      imageSuccessCBK(arr) {
        const _this = this
        arr.forEach(v => {
          window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
        })
      },
      onPopoverClick(_data) { // popovert点击事件
        this.$emit('popoverData', _data)
      },
      setInsertContent(value) { // tinymce组件内容在光标位置插入
        window.tinymce.get(this.tinymceId).execCommand('mceInsertContent', false, value)
      },
      getPopoverData(_data) {
        this.$emit('popoverData', _data)
      },
      getKalixPop(callBack) {
        setTimeout(() => {
          callBack(this.$refs.kalixPop)
        }, 20)
      }
    },
    destroyed() {
      this.destroyTinymce()
    }
  }
</script>

<style scoped>
  .tinymce-container {
    position: relative
  }

  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }
  .editor-custom-btn-container {
    position: absolute;
    right: 15px;
    z-index: 2005;
    top: 32px;
  }

  .editor-upload-btn {
    display: inline-block;
  }
</style>
<style lang="stylus" type="text/stylus">
  .tinymce-container.editor-container .mce-tinymce
    box-sizing border-box

</style>
