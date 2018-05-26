<!--
  描述：squire 富文本编辑器组件
  开发人：桑杨
  开发日期：2018年3月13日09:58:16
-->
<template>
  <div class="squire">
    <div class="tool-bar">
      <span v-for="item in toolBars" class="item" v-bind:key="item.key" @click="toolbarItemClick(item)">
        <i :class="item.icon"></i>
      </span>
    </div>
    <iframe ref="iframe" :style="style" src="/static/squire/squire-form.html" frameborder="0"></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
// import './squire-raw'
import './css/iconfont.css'

export default {
  name: 'Squire',
  props: {
    value: null,
    width: {
      Type: String,
      default: '100%'
    },
    height: {
      Type: String,
      default: '600px'
    }
  },
  data() {
    return {
      currentValue: '',
      editor: null,
      toolBars: [
        {
          text: 'bold',
          key: 'bold',
          key2: 'removeBold',
          isActive: false,
          icon: 'kalix-squire kalix-squire-icon-fontbold'
        },
        {
          text: 'italic',
          key: 'italic',
          key2: 'removeItalic',
          isActive: false,
          icon: 'kalix-squire kalix-squire-icon-italic'
        },
        {
          text: 'underline',
          key: 'underline',
          key2: 'removeUnderline',
          isActive: false,
          icon: 'kalix-squire kalix-squire-icon-underline'
        },
        // setTextAlignment
        {
          text: 'alignLeft',
          key: 'alignLeft',
          isActive: false,
          icon: 'kalix-squire kalix-squire-icon-alignLeft'
        },
        {
          text: 'alignCenter',
          key: 'alignCenter',
          isActive: false,
          icon: 'kalix-squire kalix-squire-icon-alignCenter'
        },
        {
          text: 'alignRight',
          key: 'alignRight',
          isActive: false,
          icon: 'kalix-squire kalix-squire-icon-alignRight'
        },
        {
          text: 'undo',
          key: 'undo',
          isActive: false,
          icon: 'kalix-squire kalix-squire-icon-undo'
        },
        {
          text: 'redo',
          key: 'redo',
          isActive: false,
          icon: 'kalix-squire kalix-squire-icon-redo'
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      let oldCnt = ''
      let newCnt = ''
      let editorMt = null
      let regImg = /<img[^>]*>/gi
      let regText = /<\/?[^>]*>/g
      // console.log(this.$refs.iframe.contentWindow.editor.getHTML())
      this.$refs.iframe.onload = () => {
        // console.log(this.$refs.iframe.contentWindow.editor.getHTML())
        editorMt = setInterval(() => {
          let divEditor = this.$refs.iframe
          if (divEditor && divEditor.contentWindow) {
            newCnt = divEditor.contentWindow.editor.getHTML()
            if (oldCnt !== newCnt) {
              oldCnt = newCnt
              let cntImgs = newCnt.match(regImg)
              let cntText = newCnt.replace(regText, '')
              if (cntImgs && newCnt.length) {
                this.$emit('input', newCnt)
              } else if (cntText.length) {
                this.$emit('input', newCnt)
              } else {
                this.$emit('input', '')
              }
            }
          } else {
            clearInterval(editorMt)
            console.log('editorMt clearInterval')
          }
        }, 500)
      }
    }, 20)
  },
  methods: {
    getHtml() {
      // window.ED =
      console.log(this.$refs.iframe.contentWindow.editor.getHTML())
    },
    // 富文本编辑器按钮
    toolbarItemClick(item) {
      /* eslint-disable */
      let editor = this.$refs.iframe.contentWindow.editor
      let action = item.key
      let test = {
        value: action,
        testBold: editor.testPresenceinSelection('bold', action, 'B', (/>B\b/)),
        testItalic: editor.testPresenceinSelection('italic', action, 'I', (/>I\b/)),
        testUnderline: editor.testPresenceinSelection('underline', action, 'U', (/>U\b/)),
        testOrderedList: editor.testPresenceinSelection('makeOrderedList', action, 'OL', (/>OL\b/)),
        testLink: editor.testPresenceinSelection('makeLink', action, 'A', (/>A\b/)),
        testQuote: editor.testPresenceinSelection('increaseQuoteLevel', action, 'blockquote', (/>blockquote\b/)),
        isNotValue: function (a) {
          console.log('this:', this)
          console.log('this.value:', this.value)
          return (a == action && this.value !== '');
        }
      }

      editor.alignRight = function () {
        editor.setTextAlignment('right');
      };
      editor.alignCenter = function () {
        editor.setTextAlignment('center');
      };
      editor.alignLeft = function () {
        editor.setTextAlignment('left');
      };
      editor.alignJustify = function () {
        editor.setTextAlignment('justify');
      };
      editor.makeHeading = function () {
        editor.setFontSize('2em');
        editor.bold();
      };

      if (test.testBold | test.testItalic | test.testUnderline | test.testOrderedList | test.testLink | test.testQuote) {
        if (test.testBold) editor.removeBold();
        if (test.testItalic) editor.removeItalic();
        if (test.testUnderline) editor.removeUnderline();
        if (test.testLink) editor.removeLink();
        if (test.testOrderedList) editor.removeList();
        if (test.testQuote) editor.decreaseQuoteLevel();
      } else if (test.isNotValue('makeLink') | test.isNotValue('insertImage') | test.isNotValue('selectFont')) {
        // do nothing these are dropdowns.
      } else {
        console.log('action:', action)
        editor[action]();
        editor.focus();
      }
    }
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>
<style scoped lang="stylus" type="text/stylus">
  .squire
    .tool-bar
      font-size 0
      text-align left
      border-bottom 1px solid #d6d6d6
      margin 0 0px 0px
      padding 10px
      overflow hidden
      .item
        display inline-block
        font-size 14px
        border 1px solid #ffffff
        border-radius 4px
        text-align center
        width 20px
        height 20px
        line-height 20px
        padding 5px
        cursor pointer
        float left
        &.active
          background-color #dedede
        &:hover
          border-color #000000

    .editor
      width 100%
      height 600px
      margin 0 auto
      overflow auto
      text-align left
      font-family '宋体'
      outline none
      border 1px solid #bf0000
</style>
<style lang="stylus" type="text/stylus">
  p.MsoNormal
    margin auto !important
</style>
