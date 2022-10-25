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
//Insight Route
router.get('/insight', (req, res) => {
    studentModel.find()
        .then(insight => res.json(insight))
        .catch(err => res.status(400).json('Error: ' + err));
});

//            *****Add Data*****

// For Policy
router.post('/add_policy',  async(req, res, next) => {
    var obj = {
        Policy:req.body.Content
      }
      const data=await policyModel.find({});
       
      if(data!=null){
         
      await policyModel.remove({});
      }
      await policyModel.create(obj, (err, item) => {
          if (err) {
              console.log(err);
              res.send('Error!');
          } else {
              item.save();
              res.send('Policy added successfully!');
          }
      });
});

//For Process
router.post('/add_process',  async(req, res, next) => {
    var obj = {
        Process:req.body.Content
      }
      const data=await processModel.findOne({});
      if(data!=null)
      await processModel.remove({});
      processModel.create(obj, (err, item) => {
          if (err) {
              console.log(err);
              res.send('Error!');
          } else {
              item.save();
              res.send('Process added successfully!');
          }
      });
});

//For insights

const fileStorage=multer.diskStorage({
destination:(req,file,cb)=>{
    cb(null,"./uploads_excel");
},
filename:(req,file,cb)=>{
    cb(null,Date.now()+"--"+file.originalname);
}
});

const upload=multer({storage:fileStorage});
router.post('/add_SData', upload.single("Excel_file"), async(req, res, next) => {
     
  
     let workbook=xlsx.readFile(req.file.path);
     let sheet_namelist=workbook.SheetNames;
     let x=0;
     const obj1={}
     sheet_namelist.forEach(el=>{
        var clData=xlsx.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        for (let z in clData) {
            //  console.log(JSON.stringify(clData[z]))
             var keys = Object.keys(clData[z]);
             var values = Object.values(clData[z]);
             
             const obj={};
             for(let i=0;i<keys.length;i++)
             {
                let k=keys[i].toString().toLowerCase();
                let nk="";
                for(let j=0;j<k.length;j++)
                {
                    if(k[j]!=' ' && k[j]!='_')
                    nk+=k[j];
                }
                
                 obj[nk]=values[i];
             }
              
            //  console.log(obj);
            if( obj.name!=undefined){
                obj1.Name= obj.name;
                
            }
            if(obj.rollno!=undefined)
            {
                obj1.RollNo=  obj.rollno
            }
              if(obj.branch!=undefined)
            {
                obj1.Branch=  obj.branch
            }
              if( obj.batch!=undefined)
            {
                obj1.Batch= obj.batch
            }
              if( obj.company!=undefined)
            {
                obj1.Company=obj.company
            }
             if( obj.package!=undefined)
            {
                obj1.Package= obj.package
            }
              if(obj.twominternship!=undefined)
            {
                obj1.TwoMInternship= obj.twominternship.toLowerCase()==="yes"?true:false
            }
             if( obj.sixminternship!=undefined)
            {
                obj1.SixMInternship= obj.sixminternship.toLowerCase()==="yes"?true:false
            }
              if( obj.fte!=undefined)
            {
                obj1.FTE=  obj.fte.toLowerCase()==="yes"?true:false
            }
         
            studentModel.create(obj1, (err, item) => {
                if (err) {
                    console.log(err);
                    res.send('Error!');
                } else {
                    item.save();
                }
            });
          }
          
        // obj.Name=clData.Name;
        // obj.Roll_No=clData.Roll_No;
        // obj.Branch=clData.Branch;
        // obj.Batch=clData.Batch;
        // obj.Company=clData.Company;
        // obj.Package=clData.Package;
        // obj.TwoMInternship=clData.TwoMInternship;
        // obj.SixMINternship=clData.SixMINternship;
        // obj.FTE=clData.FTE;

     });
     res.send('Data added successfully!');
     //studentModel.
     

  });
  module.exports = router;