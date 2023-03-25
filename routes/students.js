const express = require("express");
const studentsController = require("../controllers/students");
const multer = require("multer");
//----------------------------------->

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads_excel");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

//Router
const Router = express.Router();

Router.route("/")
  .post(upload.single("Excel_file"), studentsController.addStudents)
  .get(studentsController.showallStudents);

Router.route("/:Course").get(studentsController.getCourseStudents);

Router.route("/:Batch").get(studentsController.getBatchStudents);

//Export----------------------------->
module.exports = Router;
