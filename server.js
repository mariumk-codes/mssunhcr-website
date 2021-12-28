const express = require('express')
const newsletterRouter = require('./routes/newsletter')
const aboutRouter = require('./routes/about')
const eventsRouter = require('./routes/events')
const communityRouter = require('./routes/community')
const volunteeringRouter = require('./routes/volunteering')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/mssunhcr')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))

//newsletter dropdown btns
app.get('/newsletter', (req, res) => {
    const newsletter = [{
        title: 'Test Newsletter',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Newsletter 2',
        createdAt: new Date(),
        description: 'Test description 2'  
    }
    ]
    res.render('newsletter/newsletter', {newsletter: newsletter})
})
//index dropdown btns
app.get('/', (req, res) => {
    const index = [{
        title: 'Test Newsletter',
        createdAt: Date.now(),
        description: 'Test description'
    }]
    res.render('index', {index: index})
})

//about dropdown btns
app.get('/about', (req, res) => {
    const about = [{
        title: 'Test Newsletter',
        createdAt: Date.now(),
        description: 'Test description'
    }]
    res.render('about', {about: about})
})

//community dropdown btns
app.get('/community', (req, res) => {
    const community = [{
        title: 'Test Newsletter',
        createdAt: Date.now(),
        description: 'Test description'
    }]
    res.render('community', {community: community})
})

//events dropdown btns
app.get('/events', (req, res) => {
    const events = [{
        title: 'Test Event',
        createdAt: new Date(),
        location: 'Test location'
    },
    {
        title: 'Test Event 2',
        createdAt: new Date(),
        location: 'Test location 2'  
    }
    ]
    res.render('events/events', {events: events})
})

//volunteering dropdown btns
app.get('/volunteering', (req, res) => {
    const volunteering = [{
        title: 'Test Newsletter',
        createdAt: Date.now(),
        description: 'Test description'
    }]
    res.render('volunteering', {volunteering: volunteering})
})

app.use('/newsletter', newsletterRouter)
app.use('/about', aboutRouter)
app.use('/events', eventsRouter)
app.use('/volunteering', volunteeringRouter)
app.use('/community', communityRouter)

app.listen(8000)
