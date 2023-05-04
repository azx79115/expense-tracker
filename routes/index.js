const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const New = require('./modules/new')

router.use('/', home)
router.use('/new', New)

module.exports = router