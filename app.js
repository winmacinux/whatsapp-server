const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();
const Mongoose = require("mongoose");
const config = require("./env");
const { updateUserProfile, registerUser, verifyOTP } = require("./db/services");

app.use(bodyParser.json());
app.use(cors());

// Register or Login API endpoint
app.post("/login", (req, res) => {
  const { phoneNumber } = req.body;

  if (phoneNumber) {
    registerUser({ phoneNumber })
      .then((data) => {
        res.status(200).json({
          ok: true,
          err: null,
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          ok: false,
          err: err.message,
          data: null,
        });
      });
  } else
    res.status(400).json({
      ok: false,
      err: "Bad Request",
      data: null,
    });
});

// Verify Code API endpoint
app.post("/verifyCode", (req, res) => {
  const { otp, phoneNumber } = req.body;
  if (otp && phoneNumber) {
    verifyOTP({ otp, phoneNumber })
      .then((data) => {
        res.status(200).json({
          ok: true,
          err: null,
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          ok: false,
          err: "err",
          data: null,
        });
      });
  } else
    res.status(400).json({
      ok: false,
      err: "Bad Request",
      data: null,
    });
});

// Profile Update API endpoint
app.post("/profileUpdate", (req, res) => {
  const { phoneNumber, profile, name } = req.body;

  if (phoneNumber && profile && name) {
    updateUserProfile({ profile, name, phoneNumber }).then((data) =>
      res
        .status(200)
        .json({
          ok: true,
          err: null,
          data: data,
        })
        .catch((err) => {
          console.log("err", err);
          res.status(400).json({
            ok: false,
            err: "Bad Request",
            data: null,
          });
        })
    );
  } else {
    res.status(400).json({
      ok: false,
      err: "Bad Request",
      data: null,
    });
  }
});

// Database Connection Setup
Mongoose.Promise = require("bluebird");
Mongoose.connect(config.dbURI, config.dbAuth)
  .then((conn) => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server has started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
