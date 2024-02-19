import express from 'express'
import fetch from 'node-fetch'

var app = express()
var port = 3002

var r_http1 = /(?<=')https?:\/\/.*?(?=')/g
var r_http2 = /(?<=")https?:\/\/.*?(?=")/g
var r_path1 = /(?<=')\/[^:]*?(?=')/g
var r_path2 = /(?<=")\/[^:]*?(?=")/g

app.get('/*', async (req, res) => {
  let target = req.params[0]
  try {
    let response = await fetch(target)
    let contentType = response.headers.get('Content-Type')
    console.log({ target, 'Content-Type': contentType })
    if(contentType.startsWith('text/') || contentType.startsWith('application/')) {
      let text = await response.text()
      text = text.replace(r_http1, doReplace)
      text = text.replace(r_http2, doReplace)
      text = text.replace(r_path1, doReplace)
      text = text.replace(r_path2, doReplace)
      res.status(200).set('Content-Type',contentType).send(text)
    } else {
      console.log(['redirect', response.url])
      res.redirect(301, response.url)
    }
  } catch (e) {
    console.error(e)
    res.status(451).send(e.message)
  }
  function findHost() {
    let i = req.rawHeaders.findIndex(x => x==='Host')
    return req.rawHeaders[i+1]
  }
  function doReplace(source) {
    if(['/','//','http://','https://'].includes(source)) {
      return source
    } else if(source.startsWith('http') || source.startsWith('//')) {
      return source
    }
    return '//'+findHost()+'/'+target+source
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
