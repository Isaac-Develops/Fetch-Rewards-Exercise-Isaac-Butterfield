const express = require('express')
const { isString } = require('mocha/lib/utils')
const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Mock database (array of objects)
let db = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Add Transaction Route
app.post("/add", (req, res) => {

  // Check for missing parameters
  if (
    req.body.payer &&
    req.body.points &&
    req.body.timestamp
    ) {

    // Check for incorrect parameter types
    if (
      isString(req.body.payer) &&
      isString(req.body.timestamp) &&
      typeof req.body.points == "number" &&
      req.body.points % 1 == 0
      ) {

        // Check if timestamp is a proper date
        if (!isNaN(new Date(req.body.timestamp))) {

      // Add new transaction to DB
      const newTransaction = {
        payer: req.body.payer,
        points: req.body.points,
        timestamp: new Date(req.body.timestamp),
      }

      db.push(newTransaction)
      res.json(newTransaction)
      res.sendStatus(200)
      
      } else {
        res.status(400).send("Bad request. Timestamp must be a proper date.\n\n'timestamp': '2020-11-02T14:00:00Z'")
      }
    } else {
      res.status(400).send("Bad request. Incorrect parameter types.\n\n'payer': string\n'points': integer\n'timestamp': string")
    }
  } else {
    res.status(400).send("Bad request. Missing required parameters.")
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})