var express = require("express");
var router = express.Router();
const { default: axios } = require("axios");
const Coursess = require("../models/Course.js");
const sos = require("../models/So.js");
require("dotenv").config();
let config_1 = {
  headers: {
    Authorization: "Bearer " + process.env.FS_OBE_BEARER,
  },
};

router.get("/", async (req, res) => {
  try {
    // Get parameters from the request query
    const courseNo = req.query.courseNo;
    const year = req.query.year;
    const semester = req.query.semester;

    const tempdatabese = await Coursess.find({
      courseNo: courseNo,
      year: year,
      semester: semester,
    }).exec();
    if (tempdatabese[0].status == "Success") {
      let curriculum = "CPE";
      const response2 = await axios.get(
        "https://qa.cpe.eng.cmu.ac.th/api/3rdParty/so?curriculum=" +
          `${curriculum}` +
          "&year=" +
          `${year}`,
        config_1
      );
      const soList = response2.data.so;

      const tempSo = await sos
        .find({ courseNo: courseNo, year: year, semester: semester })
        .exec();
      const csoob = [];
      const csoScore = [];
      const csoscoreUsesList = [];
      const socso = [];
      for (let i = 0; i < tempdatabese[0].csoList.length; i++) {
        const temp = [];
        csoob.push(tempdatabese[0].csoList[i].objTH);
        csoScore.push(tempdatabese[0].csoList[i].csoScore);
        csoscoreUsesList.push(tempdatabese[0].csoList[i].scoreUsesList);
        for (let j = 0; j < tempdatabese[0].csoList[i].selectedSO.length; j++) {
          temp.push(tempdatabese[0].csoList[i].selectedSO[j]);
        }
        socso.push(temp);
      }
      const tempcso = {
        objTH: csoob,
        csoScore: csoScore,
        csoscoreUsesList: csoscoreUsesList,
      };
      const tempso = {
        solist: soList,
        socso: socso,
        soscore: tempSo[0].soScore,
      };
      res.status(200).json({ status: "Success", tempcso, tempso });
    } else {
      res.status(200).json({ status: "fail" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
