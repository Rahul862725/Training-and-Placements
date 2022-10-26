const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const xlsx=require('xlsx');

let facultyModel=require('../models/FacultyModel');

//Get Data
router.get('/policy', (req, res) => {
    facultyModel.find().sort({date:-1})
        .then(policy => res.json(policy))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Add Data

router.post('/add_faculty',  async(req, res, next) => {
    var obj = {
         Name:req.body.name,
         Dept:req.body.department,
         Mob_No:req.body.mob_no,
         Email:req.body.email,
         Des:req.body.designation,
      }
       
      await facultyModel.create(obj, (err, item) => {
          if (err) {
              console.log(err);
              res.send('Error!');
          } else {
              item.save();
              res.send('Facuty Data added successfully!');
          }
      });
});
module.exports = router;