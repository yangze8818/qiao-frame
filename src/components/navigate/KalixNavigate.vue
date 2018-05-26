<template lang="pug">
  div.kalix-navigate()
    ul.column
      li.column-item(v-for="columnItem in columnList")
        div.tit.column-item-tt(v-on:click="columnClick(columnItem)" v-bind:class="{'active':columnItem.isActive}")
          i.tit_icon(:class="bindClass(columnItem.iconCls)")
          | {{columnItem.text}}
        el-collapse-transition
          ul.bd(v-show="columnItem.isActive")
            li(v-for="item in treeListData[columnItem.id]" v-bind:key="item.id" v-bind:class="{'active':item.isShow}")
              div.s-flex.tit.tit-txt(@click="showTree(item,$event)")
                div.s-flex_item
                  i.tit_icon(:class="bindClass(item.iconCls)")
                  span.txt {{item.text}}
                div.arrow
                  i(:class="showIcon(item.isShow)")
              el-collapse-transition
                div.mn(v-show="item.isShow")
                  ul
                    li(v-for="item in item.children" v-bind:key="item.id")
                      div.tit(v-on:click="selectItem(item)" v-bind:class="currentCls(item)")
                        i.tit_icon(:class="bindClass(item.iconCls)")
                        | {{item.text}}
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'KalixNavigate',
    props: {
      reqUrl: {
        type: String,
        default: ''
      },
      params: {
        type: Object,
        default() {
          return {
            _dc: (new Date()).getTime(),
            page: 1,
            start: 0,
            limit: 25
          }
        }
      },
      cacheTime: {
        type: Number,
        default: ''
      },
      url: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        name: 'kalixNav',
        currApp: '',
        currFun: '',
        activeName: '1',
        obj: {'name': 'aa'},
        treeData: [],
        clickedNode: null,
        flag: true,
        columnList: [],
        treeListData: {},
        menuChk: false
      }
    },
    activated() {
      console.log('+++++++++++++= activated =++++++++++++++++')
      this.initColumn()
      this.$KalixEventBus.$on('HeaderOnSmall', (e) => {
        this.menuChk = e
      })
      this.fetchData()
    },
    mounted() {
      console.log('+++++++++++++= mounted =++++++++++++++++')
      this.initColumn()
      this.fetchData()
    },
    watch: {
      '$route'(to, from) {
        if (to.path !== '/' && to.path !== '/login') {
          this.fetchData()
        }
      }
    },
    methods: {
      /**
       *  获取栏目
       */
      initColumn() {
        if (this.$route.name === 'login') {
          return
        }
        console.log(' ++++++++++ Kalix - Header')
        let toolListData = {}
        if (this.$KalixCatch.get('toolListData')) {
          toolListData = JSON.parse(this.$KalixCatch.get('toolListData'))
        }
        console.log('KalixSecondPage toolListData', toolListData)
        if (!this.$M_IsEmptyObject(toolListData)) {
          this.columnList = toolListData
          this._urlTransmit(toolListData)
        } else {
          if (this.reqUrl.length) {
            this.$http.get(this.reqUrl, {
              params: this.params
            }).then(response => {
              if (response && response.data) {
                console.log('[toolListData] data:', response.data)
                this.columnList = response.data
                this.columnList.map(e => {
                  this.$set(e, 'isActive', false)
                })
                toolListData = this.columnList
                this._urlTransmit(toolListData)
                this.$KalixCatch.save('toolListData', JSON.stringify(toolListData))
              }
            })
          } else {
            console.log(' ===== this.reqUrl is Null! ===== ')
          }
        }
      },
      /**
       * Url 跳转
       * @param data
       * @private
       */
      _urlTransmit(data) {
        console.log('data.length:', data.length)
        console.log('data[0].id:', data[0].id)
        let columnName = this.$route.params.app
        if (!columnName) {
          if (data.length && data[0].id) {
            columnName = data[0].id
          } else {
            columnName = ''
          }
        }
        this.columnList.map(e => {
          e.isActive = e.id === columnName
        })
        this.$router.push({
          path: `/${columnName}/`
        })
      },
      columnClick(item) {
        this.columnList.forEach((e) => {
          e.isActive = (e !== item) ? false : !e.isActive
        })
        this.$router.push({
          path: `/${item.id}/`
        })
        // this.getMenu()
      },
      fetchData() {
        this.treeData = []
        let d = new Date()
        let cd = d.getTime()
        this.currApp = this.$route.params.app
        this.currFun = this.$route.params.fun || ''
        if (this.$KalixCatch.get('treeListData')) {
          this.treeListData = JSON.parse(this.$KalixCatch.get('treeListData'))
        }
        if (this.treeListData.createDate && (this.treeListData.createDate - cd) < this.cacheTime && this.treeListData[this.currApp]) {
          this.treeData = this.treeListData[this.currApp]
          this.setItemShow()
        } else {
          const data = {_dc: cd, node: 'root'}
          if (this.flag) {
            this.flag = false
            this.$http
              .get(this.url + this.currApp,
                {
                  params: data
                })
              .then(response => {
                this.flag = true
                let nowDate = new Date()
                if (response.data && response.data.code !== 401) {
                  this.treeData = response.data
                  if (this.treeData.length) {
                    this.treeData.forEach(e => {
                      this.$set(e, 'isShow', false)
                    })
                    this.treeListData[this.currApp] = this.treeData
                    this.treeListData.createDate = nowDate.getTime()
                    this.setItemShow()
                    this.$KalixCatch.save('treeListData', JSON.stringify(this.treeListData))
                  }
                }
              })
          }
        }
      },
      setItemShow() {
        let routeName = this.currFun.toLowerCase()
        this.treeData.forEach((item) => {
          item.isShow = false
          let temp = item.children.find(function (e) {
            let routeId = e.routeId.split('/').pop()
            return routeId.toLowerCase() === routeName
          })
          if (temp) {
            item.isShow = true
          }
        })
      },
      bindClass(e) {
        return e
      },
      showTree(e) {
        console.log('KalixNavigate e:', e)
        this.clickedNode = e
        this.treeData.forEach((item) => {
          if (item !== e) {
            item.isShow = false
          } else {
            item.isShow = !item.isShow
          }
        })
      },
      showIcon(e) {
        return e ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
      },
      selectItem(item) {
        this.$router.push({path: `/${this.currApp}/${item.routeId.split('/').pop()}`})
        this.$KalixCatch.save('currentTreeListItem', JSON.stringify(item))
      },
      currentCls(item) {
        return item.routeId.split('/').pop().toLowerCase() === this.currFun.toLowerCase() ? 'active' : ''
      }
    },
    components: {}
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/border.styl"
  .kalix-navigate
    position relative
    width 190px
    height 100%
    text-align left
    overflow hidden
    transition width .2s
    z-index 999
    overflow-y auto
    background-color #f6f9fa
    font-size 12px
    color #666666
    &:after
      setRightLine(#e0e3ec)
    ul
      li
        width 100%
        .tit
          position relative
          height 45px
          line-height 45px
          cursor pointer
          &:before
            setBottomLine(#e0e3ec)
        .tit_icon
          margin-right 9px
          font-size 12px
      &.bd
        li
          .tit
            padding-left 42px
            padding-right 12px
            position relative
            transition color 0.5s
          .txt, .arrow
            transition opacity .2s
          .txt
            display inline-block
          .arrow
            width 12px
            color #ffffff
          &.active
            .tit-txt
              background-color #d9eceb
              color #40d0a7
          .mn
            .tit
              padding-left 64px
              &:hover,
              &.active
                background-color #d9eceb
                color #40d0a7
                &:before
                  visibility visible

      &.column
        .column-item
          .column-item-tt
            font-size 14px
            transition all .2s
            &.active
              background-color #d9eceb
              color #40d0a7
            &.router-link-active
              background-color #d9eceb
            .tit_icon
              font-size 14px
              color #ffffff
              margin-left 20px

</style>
