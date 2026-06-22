const express = require("express")
const { userAuth } = require("../middlewares/auth")
const user = require("../models/user");

const profileRouter = express.Router()

profileRouter.get("/profile", userAuth, async (req, res) => {
    const { user } = req.user
    res.send("reading cookies")
})

profileRouter.patch("/user/:userId", async (req, res) => {
    try {
        const userId = req.params?.userId
        const data = req.body
        const ALLOWED_UPDATES = ["id", "password", "age", "skills", "photoUrl", "about"]
        const isUpdateAllowed = Object.keys(data).every((k) => 
         ALLOWED_UPDATES.includes(k)
        )

        if (data.skills.length > 10) {
            throw new Error("Skills should not exceed 10")
        }

        if (!isUpdateAllowed) {
            throw new Error("update not allowed")
        }
 
        await User.findByIdAndUpdate({ _id : userId }, data, {
            returnDocument: "after",
            runValidators : true,
        },)
        res.send("User updated")
        
    }
    catch (err) {
        res.send("error: " + err.message)
    }
})

profileRouter.delete("/user", async (req, res) => {
    const userEmail = req.body.email
    try {
        await User.deleteMany({ email: userEmail })
        res.send("User deleted successfully")
    }
    catch (err) {
        res.send("User not deleted")
    }
})

module.exports = { profileRouter }
