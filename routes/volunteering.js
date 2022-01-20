const express = require('express')
const app = express.Router({mergeParams: true});
var Volunteer = require('../models/volunteerModel');
app.get('/volunteering', function(req, res){
    Volunteer.find({}, function(err, volunteers){
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
  });
module.exports = app;