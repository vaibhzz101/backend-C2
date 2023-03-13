const express = require('express')
const controller = require('../controller/user.controller')
const userRouter = express.Router()

userRouter.post('/signup', controller.signup)
userRouter.post('/login', controller.login)
userRouter.post('/logout', controller.logout)

module.exports = {
    userRouter
}