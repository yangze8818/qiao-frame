## refers
https://zhuanlan.zhihu.com/p/26710831
https://zhuanlan.zhihu.com/p/27710902

## npm build report

1.先学会分析代码，分析代码结构，分析你的包中到底是什么东西如此之大。
借助工具：

```
yarn add webpack-visualizer-plugin webpack-stats-plugin -D
```

配置：

```
 import:
    const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
    const Visualizer = require('webpack-visualizer-plugin');

 plugin:
     new StatsWriterPlugin({
      fields: null,
      stats: { chunkModules: true }
    }),
     new Visualizer({
      filename: './statistics.html'
    })
```
