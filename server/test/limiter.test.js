/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const  { assert } = require("chai");

const agent = global.agent
const limiter = require("../helpers/limiter.js")


describe("user history with small limit", () => {
    let userId = 'TEST_USER'
    let limit = '8'
    it(`should return users the number of users:${userId}`, (done) => {
        agent
            .get(`/users/${userId}/history/limit=${limit}`)
            .end((err, res) => {
                if (err) return assert.fail("actual", "expected", "Error happened in the number");
                res.body.should.be.a('array')
                assert.equal(limiter.parse(res.body.length), 8, "Should now return 8 user histories")
                done()
            })
    })
})

/**
 *  TODO: limit number on 101 
 *  - Update number of common.test.
 *      - use @BeforeClass   https://metamorphant.de/blog/posts/2020-03-10-beforeall-afterall-cucumber-jvm-junit/ 
 *      - chance before to before all or before each. ???? 
 */


 /**
  * TODO: offset 
  *  - checks the value with a offset on zero 
  *  
  */

 /**
  * TODO: offset 
  *  - checks the value with a offset on 17
  *  
  */






