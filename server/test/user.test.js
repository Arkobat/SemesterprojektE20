/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const  { assert } = require("chai");
const chai = global.chai
const agent = global.agent

describe("user history", () => {
    let userId = 'TEST_USER'
    it(`should return users history for ${userId}`, (done) => {
        agent
            .get(`/users/${userId}/history`)
            .end((err, res) => {
                if (err) return assert.fail("actual", "expected", "Error happened in request to endpoint");
                res.should.have.status(200)
                res.body.should.be.a('array')
                assert.equal(res.body.length, 26, "There should be 26 songs in the users history")
                done()
            })
    })
})