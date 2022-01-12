const express = require('express')
const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Mock database (array of objects)
let db = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})