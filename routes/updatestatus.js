const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Course = require("../models/Course.js");

router.get("/", async (req, res, next) => {
  console.log("h1");
  await Course.find({
    courseNo: req.query.courseNo,
    year: req.query.year,
    semester: req.query.semester,
  })
    .exec()
    .then((courses) => {
      const sec = req.query.section;
      // const temp = courses[0].section.find(findsec => findsec.sectionNumber == sec );
      // console.log(temp);
      // temp.save({ status: req.query.status });

      for (let i = 0; i < courses[0].section.length; i++) {
        if (courses[0].section[i].sectionNumber == sec) {
          courses[0].section[i].status = req.query.status;
          break;
        }
      }
      const save = new Course(courses[0]);
      save.save();
      res.json(save);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
