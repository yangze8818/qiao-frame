## setup
```bash
vue init webpack kalix-vue-project
```
## change eslint
modify .eslintrc.js
```xml
  'space-before-function-paren': 0
```
## change build/webpack.dev.conf.js
```xml
  // devtool: '#cheap-module-eval-source-map',
  devtool: '#source-map',
```

## install docsify-cli
```xml
npm i docsify-cli -g
```

### run docsify
```xml
docsify serve ./docs
```


