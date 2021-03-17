/* eslint-disable no-unused-vars */
var express = require("express");
const router = express.Router();
const charts = require("./charts.js")
const users = require("./users.js")

router.use("/users/", users);
router.use("/charts/", charts);
 
/**
 *  Not used, is an example of how to do safely.
 */
function protectedMiddleware (req, res, next)  {
    if (req.session.user) return next()
    return res.status(418).send('Nono')
}

router.use("/protectedEndpoint/", protectedMiddleware, charts)

module.exports = router
