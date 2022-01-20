const express = require('express')
const router = express.Router()

//creating a new newsletter
/*router.get('/composeN', (req, res) => {
    res.render('composeN');
});
router.post('/composeN', async (req,res) => {
    const newsletter = {
        title: req.body.newsletterTitle,
        description: req.body.description,
        body: req.body.markdown
    };

    newsletters.push(newsletter);
    res.redirect("/newsletter");
})*/

module.exports = router 

