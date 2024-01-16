var express = require('express')
var fileUpload = require('express-fileupload')
var app = express()
var port = 3001

app.use(fileUpload())

app.get('/', (req, res) => {
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" multiple/>
      <input type="submit" value="submit"/>
    </form>
  `)
})

app.post('/upload', (req, res) => {
  let fileVO = []
  if(req.files.file.length > 0) {
    console.log(['multiple files'])
    fileVO = req.files.file
  } else {
    console.log(['single file'])
    fileVO = [ req.files.file ]
  }
  Promise.all(
    fileVO.map((file,index) => {
      let extend = file.name.substring(file.name.lastIndexOf('.'))
      file.mv('./archive-' + Date.now() + '--' + index + extend.toLocaleLowerCase())
    })
  )
  .then(success => res.send('success'))
  .catch(e => res.status(500).send(e))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
