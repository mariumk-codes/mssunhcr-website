const express = require('express')
/*const Newsletter = require('./../models/newsletter')*/
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('events/new')
})

module.exports = router 
