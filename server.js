const express = require('express')
const app = express()
const fs = require('fs')

app.get('/video', function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range
  if (!range) {
    res.status(400).send('Requires Range header')
  }

  // get video stats (about 61MB)
  const videoPath = '18mb.mp4'
  const videoSize = fs.statSync('18mb.mp4').size

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6 // 1MB
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

  // Create headers
  const contentLength = end - start + 1
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
    'Timing-Allow-Origin': '*',
  }

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers)

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end })

  // Stream the video chunk to the client
  videoStream.pipe(res)
})

app.get('*', function (req, res) {
  const filePath = '.' + req.path
  let status = 200
  if (fs.existsSync(filePath)) {
    fs.createReadStream(filePath).pipe(res)
  } else {
    status = 404
    res.status(status).end()
  }
  console.log('SERVE', filePath, status)
})

app.listen(8000, function () {
  console.log('Listening on port 8000!')
})
