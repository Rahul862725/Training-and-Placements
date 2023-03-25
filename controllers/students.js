const Students = require("./../models/students");
const xlsx = require("xlsx");

exports.addStudents = async (req, res) => {
  let workbook = xlsx.readFile(req.file.path);
  let sheet_namelist = workbook.SheetNames;
  let x = 0;
  function camelCase(str) {
    let st = "";
    let ans = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] == " ") {
        st = st.toLowerCase();
        if (st != "") st = st[0].toUpperCase() + st.substring(1);
        ans += st;
        ans += " ";
        st = "";
      } else st += str[i];
    }
    st = st.toLowerCase();
    if (st != "") st = st[0].toUpperCase() + st.substring(1);
    ans += st;
    return ans;
  }
  const obj1 = {};
  sheet_namelist.forEach((el) => {
    var clData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    for (let z in clData) {
      //  console.log(JSON.stringify(clData[z]))
      var keys = Object.keys(clData[z]);
      var values = Object.values(clData[z]);

      const obj = {};
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i].toString().toLowerCase();
        let nk = "";
        for (let j = 0; j < k.length; j++) {
          if (k[j] != " " && k[j] != "_") nk += k[j];
        }

        obj[nk] = values[i];
      }

      //  console.log(obj);
      if (obj.name != undefined) {
        obj1.Name = camelCase(obj.name);
      }
      if (obj.rollno != undefined) {
        obj1.RollNo = obj.rollno;
      }
      if (obj.gender != undefined) {
        obj1.Gender = camelCase(obj.gender);
      }
      if (obj.course != undefined) {
        obj1.Course = camelCase(obj.course);
      }
      if (obj.profile != undefined) {
        obj1.Profile = camelCase(obj.profile);
      }
      if (obj.branch != undefined) {
        obj1.Branch = camelCase(obj.branch);
      }
      if (obj.batch != undefined) {
        obj1.Batch = obj.batch;
      }
      if (obj.company != undefined) {
        obj1.Company = camelCase(obj.company);
      }
      if (obj.package != undefined) {
        obj1.Package = obj.package;
      }
      if (obj.twominternship != undefined) {
        obj1.TwoMInternship =
          obj.twominternship.toLowerCase() === "yes" ? true : false;
      }
      if (obj.sixminternship != undefined) {
        obj1.SixMInternship =
          obj.sixminternship.toLowerCase() === "yes" ? true : false;
      }
      if (obj.fte != undefined) {
        obj1.FTE = obj.fte.toLowerCase() === "yes" ? true : false;
      }

      Students.create(obj1, (err, item) => {
        if (err) {
          console.log(err);
          res.send("Error!");
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
  res.send("Data added successfully!");
};

exports.getStudent = async (req, res) => {
  if (req.query.id !== undefined) {
    Students.find({ _id: req.query.id })
      .then((student) => res.status(200).send(student))
      .catch((err) => res.status(400).send("Error: " + err));
  } else {
    Students.find()
      .sort({ Package: -1, Course: 1, Batch: -1 })
      .collation({ locale: "en_US_POSIX", numericOrdering: true })
      .then((students) => res.status(200).send(students))
      .catch((err) => res.status(400).send("Error: " + err));
  }
};

exports.showallStudents = async (req, res) => {
  Students.find()
    .sort({ Package: -1, Course: 1, Batch: -1 })
    .collation({ locale: "en_US_POSIX", numericOrdering: true })
    .then((students) => res.status(200).send(students))
    .catch((err) => res.status(400).send("Error: " + err));
};

exports.getCourseStudents = async (req, res) => {
  Students.find({ Course: req.params.Course })
    .sort({ Batch: -1 })
    .then((students) => res.status(200).send(students))
    .catch((err) => res.status(404).send("Error: " + err));
};

exports.getBatchStudents = async (req, res) => {
  Students.find({ Batch: req.params.Batch })
    .sort({ Course: 1 })
    .then((students) => res.status(200).send(students))
    .catch((err) => res.status(404).send("Error: " + err));
};
