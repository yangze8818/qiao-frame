## Module build failed: Error: ENOENT: no such file or directory, scandir '/Users/e063428/Dev/Mastercard/phoenix-wallet/node_modules/node-sass/vendor'

> https://github.com/yarnpkg/yarn/issues/1981

## IE报vuex requires a Promise polyfill in this browser问题解决

> npm install --save babel-polyfill

```
module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/main.js"]
  }
};
```

then include the polyfill file before your source and test files within the files section of your karma.conf.js:
```
files: [
  '../node_modules/babel-polyfill/dist/polyfill.js',
  'index.js'
]
```

## phantomjs prbuild error
```bash
yarn config set registry https://registry.npm.taobao.org

yarn config set sass-binary-site= http://npm.taobao.org/mirrors/node-sass

set PHANTOMJS_CDNURL=https://npm.taobao.org/dist/phantomjs

set chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver

npm install chromedriver --chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
```

## eslint
```
https://segmentfault.com/q/1010000013079361
add script to setting
```

