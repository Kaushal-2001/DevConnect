const express = require("express")
const { userAuth } = require("../middlewares/auth")


const requestRouter = express.Router()

requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
    try { res.send("connection request sent") }
    catch (err) {
        res.status(400).send("Err: " + err.message)
    }
})

module.exports = { requestRouter }


