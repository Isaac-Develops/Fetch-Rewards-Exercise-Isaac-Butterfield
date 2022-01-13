const assert = require("assert")
const { response } = require("express")
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

    it("Is returning status 200", async () => {
        response1 = await fetch(baseURL + "add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "payer": "DANNON",
                "points": 1000,
                "timestamp": "2020-11-02T14:00:00Z"
            })
        })

        response2 = await fetch(baseURL + "add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "payer": "UNILEVER",
                "points": 200,
                "timestamp": "2020-10-31T11:00:00Z"
            })
        })

        response3 = await fetch(baseURL + "add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "payer": "DANNON",
                "points": -200,
                "timestamp": "2020-10-31T15:00:00Z"
            })
        })

        response4 = await fetch(baseURL + "add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "payer": "MILLER COORS",
                "points": 10000,
                "timestamp": "2020-11-01T14:00:00Z"
            })
        })

        response5 = await fetch(baseURL + "add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "payer": "DANNON",
                "points": 300,
                "timestamp": "2020-10-31T10:00:00Z"
            })
        })

        assert.equal(response1.status, 200)
        assert.equal(response2.status, 200)
        assert.equal(response3.status, 200)
        assert.equal(response4.status, 200)
        assert.equal(response5.status, 200)
    })

    it("Is returning status 400", async () => {
        response1 = await fetch(baseURL + "add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "payer": "DANNON",
                "points": "Wrong Type",
                "timestamp": "2020-11-02T14:00:00Z"
            })
        })

        response2 = await fetch(baseURL + "add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "payer": "DANNON"
            })
        })

        response3 = await fetch(baseURL + "add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "payer": "DANNON",
                "points": 1000,
                "timestamp": "No Proper Timestamp"
            })
        })

        assert.equal(response1.status, 400)
        assert.equal(response2.status, 400)
        assert.equal(response3.status, 400)
    })
})

// Spend Points Route
describe("Spend Points Route Test", () => {
    before(() => {
        console.log("Unit test for spending points in system")
    })

    it("Is returning the spending of points in the correct order", async () => {
        response = await fetch(baseURL + "spend", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "points": 5000
            })
        }).then((res) => res.json())

        assert.equal(response, [
            { "payer": "DANNON", "points": -100 },
            { "payer": "UNILEVER", "points": -200 },
            { "payer": "MILLER COORS", "points": -4700 }
        ])
    })
})

// Points Balance Route
describe("Points Balance Route Test", () => {
    before(() => {
        console.log("Unit test for retrieving payer balances")
    })

    it("Is returning the correct balance of each payer", async () => {
        response = await fetch(baseURL + "balances", {
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())

        assert.equal(response, {
            "DANNON": 1000,
            "UNILEVER": 0,
            "MILLER COORS": 5300
        })
    })
})