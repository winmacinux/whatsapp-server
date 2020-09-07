const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.port || 4000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/login", (req, res) => {
  const { phoneNumber } = req.body;

  if (phoneNumber)
    res.status(200).json({
      ok: true,
      err: null,
      data: {
        phoneNumber,
      },
    });
  res.status(400).json({
    ok: true,
    err: "Bad Request",
    data: null,
  });
});

app.post("/verifyCode", (req, res) => {
  const { code } = req.body;
  if (code)
    res.status(200).json({
      ok: true,
      err: null,
      data: "Verified",
    });
  res.status(400).json({
    ok: true,
    err: "Bad Request",
    data: null,
  });
});

app.post("/profileUpdate", (req, res) => {
  const { profile, name } = req.body;

  if (profile && name)
    res.status(200).json({
      ok: true,
      err: null,
      data: {
        profile,
        name,
      },
    });
  res.status(400).json({
    ok: true,
    err: "Bad Request",
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
