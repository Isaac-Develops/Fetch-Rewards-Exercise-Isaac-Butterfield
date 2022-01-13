const express = require('express')
const { isString } = require('mocha/lib/utils')
const app = express()
const port = 3000

// Middleware
app.use(express.json())

// Mock database (array of objects)
let db = []

// Balance function
function getBalances() {
  let balances = {}
  for (let i = 0; i < db.length; i++) {
    const transaction = db[i];
    
    if (transaction.payer in balances) {
      balances[transaction.payer] += transaction.points
    } else {
      balances[transaction.payer] = transaction.points
    }
  }

  return balances
}

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

          // Check if balance goes negative
          if (getBalances()[req.body.payer] < 0) {
            db = db.filter(transaction => transaction !== newTransaction)
            res.status(400).send("Bad request. Balance of payer goes negative\n")
          } else {
            res.json(newTransaction)
            res.sendStatus(200)
          }
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

// Balances route
app.get("/balances", (req, res) => {
  res.json(getBalances())
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})