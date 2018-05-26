##### 设置菜单图标步骤
######1）搜集图标
<ul>
<li>登录阿里巴巴矢量图标库
http://www.iconfont.cn/manage/index?spm=0.7781069.1998910419.db775f1f3&manage_type=myprojects&projectId=102603
</li>
<li>
在首页搜索相应图标，点击【加入购物车】
</li>
<li>
点击【我的项目】，进入图标页面，查看图标编码，复制代码段代码（如果图标有变化需要重新生成代码并复制）
<pre>
<code> 
@font-face {
  font-family: 'iconfont';  /* project id 102603 */
  src: url('//at.alicdn.com/t/font_102603_omtd5o5pbo4m42t9.eot');
  src: url('//at.alicdn.com/t/font_102603_omtd5o5pbo4m42t9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_102603_omtd5o5pbo4m42t9.woff') format('woff'),
  url('//at.alicdn.com/t/font_102603_omtd5o5pbo4m42t9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_102603_omtd5o5pbo4m42t9.svg#iconfont') format('svg');
}
</code>
</pre>
</li>
</ul>

######2）修改前台项目图标配置文件（icon-font.css）
<ul>
<li>
将之前复制的代码黏贴到icon-font.css文件中对原来的内容进行替换，同时添加图标声明代码，如下：
<pre>
<code>
/*research*/
.icon-research:before{content: "\e681";}
.icon-research-person-student:before{content: "\e67d";}
.icon-research-person-teacher:before{content: "\e67e";}
.icon-research-person-worker:before{content: "\e67c";}
.icon-research-competiton:before{content: "\e67f";}
.icon-research-competiton-signup:before{content: "\e6e2";}
.icon-research-competiton-award:before{content: "\e6c2";}
.icon-research-competiton-competionInfo:before{content: "\e67b";}
.icon-research-statistics-datastatistics:before{content: "\e680";}
</code>
</pre>
</li>
</ul>

######3）修改后台菜单配置文件（config.research.app.cfg）
<ul>
<li>
找到需要配置图标的菜单，修改图标编码，代码如下：
<pre>
<code>

#Person_Student
MENU_PERSONSTUDENT_ID	=	personStudentMenu
MENU_PERSONSTUDENT_APPLICATION_ID	 =	research
MENU_PERSONSTUDENT_MODULE_ID = researchPersonModule
MENU_PERSONSTUDENT_TEXT = 学生信息
MENU_PERSONSTUDENT_ROUTE_ID	= research/Student
MENU_PERSONSTUDENT_ICONCLS	=	iconfont icon-research-person-student
MENU_PERSONSTUDENT_INDEX	=	1
MENU_PERSONSTUDENT_PERMISSION	=	0
MENU_PERSONSTUDENT_BUTTONS	=	添加,add;刪除,delete;修改,edit;查看,view
</code>
</pre>
</li>
</ul>

######4）重新build菜单配置文件
