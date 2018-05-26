# develop rules
> 这里明确规定了各种方法的调用方式，用于开发人员

## ajax call
```xml
  this.$http.get(api).then((resp) => {
    console.log(resp.data)
  }).catch((err) => {
              console.log(err.message)
            })
```

## vue template
```vue
  /**
   * Created by sunlf on 2017/7/21.
   * 登录api
   */
  <template lang="pug">
      div
  </template>
  
  <script type="text/ecmascript-6">
      export default {
      }
  </script>
  
  <style scoped lang="stylus">
  
  </style>
```

## 目录说明
```

src/
├── App.vue ----------------------- 入口组件 
│  
├── assets  ----------------------- 静态资源
│  
├── api  -------------------------- 管理http请求
│   
├── components -------------------- vue组件
│   
├── common ------------------------- 通用js
│   
├── config ------------------------- 配置文件
│
├── router ------------------------ 路由
│   ├── index.js ------------------ 动态加载路由
│   └── router_path.toml ---------- 路由配置文件
|
├── store ------------------------- vuex
│  
├── views ------------------------- 视图模板
│  
├── styles ------------------------ 主样式
│  
├── main.js ----------------------- 入口JS
│  

```
