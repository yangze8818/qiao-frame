module.exports = file => () => import(/* webpackChunkName: "kalix-views" */'@/views/' + file + '.vue')
