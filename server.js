const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
var path = require("path");
const handlebars = require("express-handlebars");
var hb = require("express-handlebars").create();

// All routes
const informationRouter = require("./routes/InformationRouter");
const internshipRouter = require("./routes/InternshipRouter");
const placementrouter = require("./routes/PlacementRouter");
const whyrecruitRouter = require("./routes/WhyRecruitRouter");
const peopleRouter = require("./routes/FacultyRouter");
const faqRouter = require("./routes/FAQRouter");

require("dotenv").config();
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// mongo db connections
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting Handlebars for frontend
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: false,
  })
);

const partialsPath = path.join(__dirname, "views/partials");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views/"));
app.use(express.static(path.join(__dirname, "views/")));
app.use(express.static("views/img"));
app.use(express.static("public"));
// hbs.registerPartials(partialsPath)

Handlebars.registerHelper("ifNotEquals", function (arg1, arg2, options) {
  return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});

/*  END POINTS */

//    ****** Main Page******

app.use("/Information", informationRouter);
//Use for Admin
app.get("/Information_form", (req, res) => {
  res.render("Main/Insert.hbs");
});
app.get("/", (req, res) => {
  res.render("Main/index.hbs", { URL: process.env.URL });
});

// ******* General Backend related Page ******

app.get("/add_SData", (req, res) => {
  res.render("Internship/addStudentData.hbs", { URL: process.env.URL });
});

//  ****** Internship Page *******

app.use("/Internship", internshipRouter);
app.get("/index_internship", (req, res) => {
  res.render("Internship/internships.hbs", { URL: process.env.URL });
});
app.get("/add_iprocess", (req, res) => {
  res.render("Internship/addProcess.hbs", { URL: process.env.URL });
});
app.get("/add_ipolicy", (req, res) => {
  res.render("Internship/addPolicy.hbs", { URL: process.env.URL });
});

//  ****** Placements Page *******
app.use("/Placement", placementrouter);
app.get("/index_placements", (req, res) => {
  res.render("Placements/placements.hbs", { URL: process.env.URL });
});
app.get("/add_pprocess", (req, res) => {
  res.render("Placements/addProcess.hbs", { URL: process.env.URL });
});
app.get("/add_ppolicy", (req, res) => {
  res.render("Placements/addPolicy.hbs", { URL: process.env.URL });
});

//  ****** Why_Recruit Page *******
app.use("/Why_Recruit", whyrecruitRouter);
app.use("/FAQ", faqRouter);
// add faq Question and Answer
app.get("/add_faq", (req, res) => {
  res.render("why_recruit/faqadd.hbs", { URL: process.env.URL });
});
app.get("/add_rprocess", (req, res) => {
  res.render("why_recruit/addProcess.hbs", { URL: process.env.URL });
});
app.get("/add_rpolicy", (req, res) => {
  res.render("why_recruit/addPolicy.hbs", { URL: process.env.URL });
});
app.get("/index_wrecruit", (req, res) => {
  res.render("why_recruit/recruit.hbs", { URL: process.env.URL });
});

//  ****** Download Page *******
app.get("/index_download", (req, res) => {
  res.render("Download/downloads.hbs", { URL: process.env.URL });
});

//  ****** People Page *******
app.use("/People", peopleRouter);
app.get("/add_Faculty", (req, res) => {
  res.render("People/addFaculty.hbs", { URL: process.env.URL });
});
app.get("/index_people", (req, res) => {
  res.render("People/people.hbs", { URL: process.env.URL });
});

// ****** Login Page *******
app.get("/index_login", (req, res) => {
    res.render("Login/login.hbs", { URL: process.env.URL});
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
