const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const xlsx=require('xlsx');

let studentModel = require('../models/StudentModel');
let processModel = require('../models/ProcessModel');
let policyModel = require('../models/PolicyModel');


// Policy Route
router.get('/policy', (req, res) => {
    policyModel.find()
        .then(policy => res.json(policy))
        .catch(err => res.status(400).json('Error: ' + err));
});
//Process Route
router.get('/process', (req, res) => {
    processModel.find()
        .then(process => res.json(process))
        .catch(err => res.status(400).json('Error: ' + err));
});

//            *****Add Data*****

// For Policy
router.post('/add_policy',  async(req, res, next) => {
    var obj = {
        RPolicy:req.body.Content
      }
      
      await policyModel.create(obj, (err, item) => {
          if (err) {
              console.log(err);
              res.send('Error!');
          } else {
              item.save();
              res.send('Recruit Policy added successfully!');
          }
      });
});

//For Process
router.post('/add_process',  async(req, res, next) => {
    var obj = {
        RProcess:req.body.Content
      }
      
      processModel.create(obj, (err, item) => {
          if (err) {
              console.log(err);
              res.send('Error!');
          } else {
              item.save();
              res.send('Recruit Process added successfully!');
          }
      });
});

 

 
  module.exports = router;