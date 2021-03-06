// const express = require('express')

// const app = express()
// const port = 80

var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })


http.createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404
      res.end('no such location')
    })
  }).listen(80)
  
  handler.on('error', function (err) {
    console.error('Error:', err.message)
  })
  
  handler.on('push', function (event) {
      console.log(event.payload)
    console.log('Received a push event for %s to %s',
      event.payload.repository.name,
      event.payload.ref)
  })
  
  handler.on('issues', function (event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
      event.payload.repository.name,
      event.payload.action,
      event.payload.issue.number,
      event.payload.issue.title)
  })

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
