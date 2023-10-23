const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const verifyAndValidateToken = (token, res) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).send({ ok: false, message: "Invalid token" });
      } else {
        resolve(user);
      }
    });
  });
};

router.get("/signout", async (req, res) => {
  console.log(req.cookies);
  res
    .clearCookie("token", { path: "/", domain: "api-obe.cpe.eng.cmu.ac.th" })
    .send({ ok: true });
});

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = await verifyAndValidateToken(token, res);
    if (!user.cmuitaccount) {
      return res.status(403).send({ ok: false, message: "Invalid token" });
    }

    return res.send(user);
  } catch (err) {
    return res
      .status(500)
      .send({ ok: false, message: "Internal Server Error" });
  }
});

const getCMUBasicInfoAsync = async (accessToken) => {
  try {
    const response = await axios.get(process.env.CMU_OAUTH_GET_BASIC_INFO, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

router.post("/oauth_student", async (req, res) => {
  try {
    //validate authorizationCode
    const authorizationCode = req.query.code;
    if (typeof authorizationCode !== "string")
      return res
        .status(400)
        .json({ ok: false, message: "Invalid authorization code" });

    //get access token
    const response = await axios.post(
      process.env.CMU_OAUTH_GET_TOKEN_URL,
      {},
      {
        params: {
          code: authorizationCode,
          redirect_uri: process.env.CMU_OAUTH_REDIRECT_URL,
          client_id: process.env.CMU_OAUTH_CLIENT_ID,
          client_secret: process.env.CMU_OAUTH_CLIENT_SECRET,
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (!response)
      return res
        .status(400)
        .send({ ok: false, message: "Cannot get OAuth access token" });
    //get basic info
    const response2 = await getCMUBasicInfoAsync(response.data.access_token);
    if (!response2)
      return res
        .status(400)
        .send({ ok: false, message: "Cannot get cmu basic info" });
    //create session
    const token = jwt.sign(response2, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token will last for one day only
    });
    return res
      .cookie("token", token, {
        maxAge: 3600000 * 24 * 7, // Cookie will last for one day only
        //Set httpOnly to true so that client JavaScript cannot read or modify token
        //And the created token can be read by server side only
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        domain: "api-obe.cpe.eng.cmu.ac.th",
        //force cookie to use HTTPS only in production code
      })
      .send({ ok: true });
  } catch (err) {
    if (!err.response) {
      return res.send({
        ok: false,
        message: "Cannot connect to API Server. Please try again later.",
      });
    } else if (!err.response.data.ok) return err.response.data;
    else return err;
  }
});

module.exports = router;
