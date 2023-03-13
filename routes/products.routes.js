const express = require('express')
const controller = require('../controller/product.controller')
const productRouter = express.Router()

productRouter.get('/', controller.getall)
productRouter.post('/add', controller.add)
productRouter.post('/delete', controller.delete)

module.exports = {
    productRouter
}