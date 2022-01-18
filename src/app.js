// importing required libraries
const express = require('express');

const fetch = require('node-fetch');

const hbs = require('hbs');

const path = require('path');

const weather = require('../api/weather');
// setting directories paths
const viewsDir  = path.join(__dirname,'../views');
const publicDir = path.join(__dirname,'../public');
const partialsDir = path.join(__dirname,'../views/partials');

//initializing the router
const app = express();
//need that to get values from post request
app.use(express.json({extended:false}))
//configuring our router with project
app.use(express.static(publicDir));
app.set('view engine','hbs');
app.set('views',viewsDir);
hbs.registerPartials(partialsDir);
//get request fire when requesting the page
app.get('/', async (req,res)=>{
   
    res.render('index');

});
//post fire when fetch send an request and return location and tepreture
app.post('/api', async (req,res)=>{

   
    let temp = await weather.getWeather(req.body.location);
  
    res.send({
        title:req.body.location,
        temp : temp
    });
});

app.listen(3000,()=>{
   console.log('Server started on port 3000'); 
});