"use strict"

const express = require("express");
const {
    getTopLocations,
    createLocation,
    deleteLocation
} = require("../controllers/location.controller");

const router = express.Router({
    mergeParams: true
})

router.get("/", getTopLocations);
router.post("/", createLocation);
router.delete("/:id", deleteLocation);

module.exports = router;