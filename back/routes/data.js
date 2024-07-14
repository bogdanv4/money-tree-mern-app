const express = require("express");
const router = express.Router();
const { addData, getData } = require("../controllers/data");

router.post("/add", addData);
router.get("/getAll", getData);

module.exports = router;
