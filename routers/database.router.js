"use strict"

const express = require("express");
const {
    get,
} = require("../controllers/database.controller");

const router = express.Router({
    mergeParams: true
})

router.get("/", get);

module.exports = router;