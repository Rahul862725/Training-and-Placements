const router = require('express').Router();
 
const xlsx=require('xlsx');

let userModel=require('../models/UserModel');


router.post('/login',  async(req, res, next) => {
    var obj = {
         Email:req.body.email,
         Pass:req.body.pass
      }
       
      await userModel.create(obj, (err, item) => {
          if (err) {
              console.log(err);
              res.send(2);
          } else {
              item.save();
              res.send(1);
          }
      });
});

router.post('/signup',  async(req, res, next) => {
    var obj = {
        Name:req.body.name,
        Email:req.body.email,
        Pass:req.body.pass
     }
     const data=userModel.find({Email:req.body.email});
     if(data.length()!=0)
     {
        res.send(0);
     }
     else{
       
      await userModel.create(obj, (err, item) => {
          if (err) {
              console.log(err);
              res.send('Error!');
          } else {
              item.save();
              res.send(1);
          }
      });
    }
});
module.exports = router;