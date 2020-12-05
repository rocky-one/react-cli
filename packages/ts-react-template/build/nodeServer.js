const static = require('koa-static')
const Koa = require('koa')
const app = new Koa()

app.use(static('./dist'))
app.listen(8011)