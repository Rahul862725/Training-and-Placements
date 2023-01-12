const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

let informationModel = require('../models/InformationModel');


// Routes
router.get('/get', (req, res) => {
    informationModel.find()
        .then(information => res.json(information))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',  async(req, res, next) => {
    // console.log(req.body)
    let d=new Date();
    let years = Math.round(d.getFullYear())%2021;
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    let newdate =  "   "+  day + "-" + month + "-" + year ;
     
    let data=await informationModel.find({ID:years});
    
    if(data.length>0)
    {
       
        if(req.body.Annoucement!=""){
        informationModel.updateOne({ID:years},
        {$push:{Annoucement:req.body.Annoucement+" "+newdate}},   function (err, item) {
            if (err) {
                console.log(err);
                res.send('Error!');
            }
            else {
                if(req.body.Notes==="")
                res.send('Information Added successfully!');
            }
    })
} 
   if(req.body.Notes!=""){
     informationModel.updateOne({ID:years},
    {$push:{Notes:req.body.Notes }}, function (err, item) {
        if (err) {
            console.log(err);
            res.send('Error!');
        }
        else {
          
            res.send('Information Added successfully!');
        }
})
   }

    }
    else{
        
        var obj = {
          ID:years,
        Annoucement:[],
        Notes:[]
        }
        if(req.body.Annoucement!=""){
             
        obj.Annoucement.push(req.body.Annoucement+" "+newdate)
        }
        if(req.body.Notes!=""){
            
        obj.Notes.push(req.body.Notes )
        }
        informationModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
                res.send('Error!');
            } else {
                item.save();
                res.send('Information added successfully!');
            }
        });
    }

  });
  module.exports = router;