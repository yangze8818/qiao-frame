import Vue from 'vue'
// cms
import Column from '../cms/column/index'
import Content from '../cms/content/index'
import Menu from '../cms/menu/index'
import Forum from '../message/forum/index'
import Reply from '../message/reply/index'
// gen
import Export from '../gen/export/index'
import Genealogy from '../gen/genealogy/index'
import Map from '../gen/map/index'
import Search from '../gen/search/index'
// sys
import Advert from '../sys/advert/index'
import Blogroll from '../sys/blogroll/index'
import Dict from '../sys/dict/index'
import District from '../sys/district/index'
import Setting from '../sys/setting/index'

Column.install(Vue)
Content.install(Vue)
Menu.install(Vue)
Forum.install(Vue)
Reply.install(Vue)
Export.install(Vue)
Genealogy.install(Vue)
Map.install(Vue)
Search.install(Vue)
Advert.install(Vue)
Blogroll.install(Vue)
Dict.install(Vue)
District.install(Vue)
Setting.install(Vue)
