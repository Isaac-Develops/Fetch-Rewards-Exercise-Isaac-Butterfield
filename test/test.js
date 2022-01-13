const assert = require("assert")
const fetch = require("node-fetch")

baseURL = "http://localhost:3000/"

describe("Transaction System Testing", () => {
    before(() => {
        console.log("Unit Tests for each route in system")
    })
})

// Add Transaction Route
describe("Add Transaction Route Test", () => {
    before(() => {
        console.log("Unit test for adding transactions to system")
    })

    it("Is returning succesful transaction addition", async () => {
        response = await fetch(baseURL + "add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "payer": "DANNON",
            "points": 1000,
            "timestamp": "2020-11-02T14:00:00Z"
        })
        }).then((res) => response = res.json()).then((data) => JSON.stringify(data))

        assert.equal(response, JSON.stringify({
            "payer": "DANNON",
            "points": 1000,
            "timestamp": "2020-11-02T14:00:00.000Z"
        }))
    })
})

// Spend Points Route
describe("Spend Points Route Test", () => {
    before(() => {
        console.log("Unit test for spending points in system")
    })
})

// Points Balance Route
describe("Points Balance Route Test", () => {
    before(() => {
        console.log("Unit test for retrieving payer balances")
    })
})