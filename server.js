
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require("ejs");
mongoose.connect("http://mongodb+srv://admin-marium:test123@cluster0.rou5e.mongodb.net/mssunhcr?retryWrites=true&w=majority")
const path = require('path');
const _ = require("lodash");

require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';
const fs = require("fs");
const { stringify } = require('querystring');
const app= express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.use('/pdfs', express.static('pdfs'));
app.use('/event-imgs', express.static('event-imgs'));



const aboutContent = "McMaster Students in support of the UNHCR (MSSUNHCR) is a club that strives to follow in the footsteps of the UNHCR through various initiatives to aid refugees, returnees, stateless people, the internally displaced and asylum-seekers. We are determined to aid in the essential work of the UNHCR here at McMaster and provide a platform for UNHCR that enables students to join us on route to shed light on the hardships faced by refugees internationally and at home.McMaster Students in Support of the UNHCR (MSSUNHCR) aims to delve into the stories and struggles of refugees, stateless and displaced peoples, in the hopes of raising awareness on various refugee crises and eliminating misrepresented information through education and advocacy. Through various fundraising activities, events, campaigns and more, we intend to focus on the refugees themselves, rather than the situations that created them. MSSUNHCR is determined to make a difference within the McMaster, Canadian, and global communities of refugees." 

const eventsSchema = {
  title: String,
  date: String,
  desc: String,
  time: String,
  location: String,
  image: String,
  link: String
}


const Event = mongoose.model("Event", eventsSchema);


app.get("/events", function(req, res){

  Event.find({}).sort({id:-1}).exec(function(err, events){
    res.render("events", {
      events: events
      });
  });
});

app.get("/composeE", function(req, res){
  res.render("composeE");
});

app.post("/composeE", function(req, res){
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    desc: req.body.desc,
    location: req.body.location,
    time: req.body.time,
    image: req.body.image,
    link: req.body.link,
  });
  event.save(function(err){
    if (!err){
        res.redirect("/events");
    }
  });
});

const volunteersSchema = {
    title: String,
    description: String,
    link: String
};

const Volunteer = mongoose.model("Volunteer", volunteersSchema);



const newslettersSchema = {
  title: String,
  date: String,
  desc: String,
  file: String,
  image: String
}

const Newsletter = mongoose.model("Newsletter", newslettersSchema);

const Email = mongoose.model('Email', mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true
  } 
}));
//storing emails into the database

app.post("/newsletter", function( req, res){
  const email = new Email({
    email: req.body.email,
  });
  email.save(function(err){
    if (!err){
        res.redirect("/confirmed");
    }else{
      if(err.code && err.code == 11000) {
        res.redirect("/confirmed")
      }
      else{
        res.redirect("/error")
      }
  }});
});


app.get("/newsletter", function(req, res){

  Newsletter.find({}).sort({_id:-1}).exec(function(err, newsletters){
    res.render("newsletter", {
      newsletters: newsletters
      });
  });
});

app.get("/composeN", function(req, res){
  res.render("composeN");
});

app.post("/composeN", function(req, res){
  const newsletter = new Newsletter({
    title: req.body.title,
    date: req.body.date,
    desc: req.body.desc,
    file: req.body.file,
    image: req.body.image
  });
  newsletter.save(function(err){
    if (!err){
        res.redirect("/newsletter");
    }
  });
});


app.get("/newsletters/:id", function(req, res)
{
    Newsletter.findById(req.params.id, function(err, newsletter)
    {
       if(!err){
        res.render("n", {title: newsletter.title,
          file: newsletter.file});
      }
      else{
        console.log(err)
      }
     
       })
});

app.get('/volunteering', function(req, res){
  Volunteer.find({}).sort({_id:-1}).exec(function(err, volunteers){
    res.render('volunteering', {
      volunteers:volunteers
  })
})
});
    
app.get('/volunteerpost', function(req, res){
  res.render('volunteerpost')
});

app.post("/volunteerpost", function(req, res){
  const volunteer = new Volunteer ({
    title: req.body.vtitle,
    description: req.body.vdescription,
    link: req.body.vlink
  });
  volunteer.save(function(err){
    if(!err){
      res.redirect("/volunteering");
    }
  });
}) 


app.get('/contact', function(req, res){
  res.render('contact')
});
app.get('/', function(req, res) {
  res.render('index')
});
app.get('/about', function(req, res){
    res.render('about', {aboutContent: aboutContent});
}); 
app.get('/error', function(req, res){
  res.render('error');
}); 
app.get('/confirmed', function(req, res){
  res.render('confirmed');
}); 

app.get('/community', function(req, res)  {
res.render('community')
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 7000;
};
app.listen(port);
