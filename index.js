const express = require('express')
const { isString } = require('mocha/lib/utils')
const app = express()
const port = 3000

// Express Middleware
app.use(express.json())

// Mock database (array of objects)
let db = []

// Balance function
function getBalances() {
  let balances = {}
  for (let i = 0; i < db.length; i++) {
    const transaction = db[i]
    
    if (transaction.payer in balances) {
      balances[transaction.payer] += transaction.points
    } else {
      balances[transaction.payer] = transaction.points
    }
  }

  return balances
}

// Sum of Balances Function
function getBalancesSum() {
  let sum = 0
  for (let i = 0; i < db.length; i++) {
    const transaction = db[i];
    
    sum += transaction.points
  }

  return sum
}

// Root Route
app.get('/', (req, res) => {
  res.send("Hello There! Please use the provided routes:<br><br>'/add': Add a new transaction<br>'/spend': Spend points<br>'/balances': Get all payer point balances")
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
            res.status(400).send("Bad request. Balance of payer goes negative.")
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

// Spend Points Route
app.patch("/spend", (req, res) => {

  // Check for basic problems with request
  if (
    req.body.points &&
    typeof req.body.points == "number" &&
    req.body.points % 1 == 0
    ) {

      // Check if there's enough points to spend
      if (req.body.points <= getBalancesSum()) {
        let pointsToSpend = req.body.points
        let transactionsByDate = []

        // Copy objects in DB and sort by date
        for (let i = 0; i < db.length; i++) {
          let transaction = db[i];

          transactionsByDate.push({...transaction})
        }

        transactionsByDate.sort((a, b) => a.timestamp - b.timestamp)

        // Sort points in DB from oldest to newest
        let sortedPoints = []
        for (let i = 0; i < transactionsByDate.length; i++) {
          const transaction = transactionsByDate[i]
    
          if (transaction.points <= 0) {
            index = sortedPoints.findIndex((points) => points.payer == transaction.payer)
            sortedPoints[index].points += transaction.points
          } else {
            sortedPoints.push(transaction)
          }
        }

        // Array of points spent by payer
        let pointsSpent = []

        // Spend points until there is no more pointsToSpend
        let i = -1
        while (pointsToSpend != 0) {
          i++
          let balances = getBalances()
          let transaction = sortedPoints[i]
          const maxPoints = balances[transaction.payer] > pointsToSpend ? pointsToSpend : balances[transaction.payer]

          if (transaction.points <= 0 || balances[transaction.payer] <= 0) {
            continue
          } else {

            let newTransaction = {
              payer: transaction.payer,
              points: 0,
              timestamp: new Date(),
            }

            // Check if payer has already spent points
            if (pointsSpent.some((spentPoints) => spentPoints.payer == transaction.payer)) {
              index = pointsSpent.findIndex((spentPoints) => spentPoints.payer == transaction.payer)

              if (transaction.points > maxPoints) {
                pointsSpent[index].points += -maxPoints
                pointsToSpend += -maxPoints

                newTransaction["points"] += -maxPoints
              } else {
                pointsSpent[index].points += -transaction.points
                pointsToSpend += -transaction.points

                newTransaction["points"] += -transaction.points
              }
            } else {

              if (transaction.points > maxPoints) {
                pointsSpent.push({"payer": transaction.payer, "points": -maxPoints})
                pointsToSpend += -maxPoints

                newTransaction["points"] += -maxPoints
              } else {
                pointsSpent.push({"payer": transaction.payer, "points": -transaction.points})
                pointsToSpend += -transaction.points

                newTransaction["points"] += -transaction.points
              }
            }
            db.push(newTransaction)
          }
        }

        res.json(pointsSpent)
        res.sendStatus(200)
      } else {
        res.status(400).send("Bad request. Not enough points to spend.")
      }

    } else {
      res.sendStatus(400)
    }
})

// Balances route
app.get("/balances", (req, res) => {
  res.json(getBalances())
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Points system listening at http://localhost:${port}`)
})