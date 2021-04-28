const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is up and running");
});

router.post("/user", (req, res) => {
  console.log(req.body)
});

module.exports = router;
