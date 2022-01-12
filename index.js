const express = require('express')
const app = express()
const port = 3000

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    res.header({ "Access-Control-Allow-Origin": "*" })
    res.header({
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    })
    res.header({
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    })
    if (req.method == "OPTIONS") {
      res.sendStatus(200)
    }
    next()
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})