const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const xlsx=require('xlsx');

const faqModel=require('../models/faqModel');

router.get('/', (req, res) => {
    faqModel.find().sort({date:-1})
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',async(req,res)=>{
    var obj={
        Question:req.body.Question,
        Answer:req.body.Answer,
        Related:req.body.Related.toLowerCase(),
    }

    await faqModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
            res.send('Error!');
        } else {
            item.save();
            res.send('Questions added successfully!');
        }
    });
})

router.post('/delete',async(req,res)=>{
    var obj={
        Question:req.body.Question,
        Related:req.body.Related.toLowerCase(),
    }

    await  faqModel.deleteMany(obj,(err,item)=>{
        if (err) {
            console.log(err);
            res.send('Error!');
        } else {
            
            res.send('Questions Deleted successfully!');
        }
    })
})



module.exports = router;