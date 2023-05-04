const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const New = require('./modules/new')
const users = require('./modules/users')

router.use('/', home)
router.use('/new', New)
router.use('/users', users)


module.exports = router