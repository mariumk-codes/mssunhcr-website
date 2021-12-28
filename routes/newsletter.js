const express = require('express')
const Newsletter = require('./../models/newsletter')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('newsletter/new', { newsletter: new Newsletter()})
})

router.get('/:id', (req,res) => {

})
router.post('/', async (req,res) => {
    const newsletter = new Newsletter({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        newsletter = await newsletter.save()
        res.redirect(`/newsletter/${newsletter.id}`)
    } catch (e){
        res.render('newsletter/new', {newsletter: newsletter})
    }
    
})

module.exports = router 

