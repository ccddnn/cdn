var express = require('express')
var app = express()
var port = 3000

app.use(express.static('./'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
