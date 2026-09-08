const express = require("express");

const {
  getProperties,
} = require("../controllers/property.controller");

const {
  getImages,
} = require("../controllers/image.controller");

const router = express.Router();

router.get("/get-property", getProperties);

router.get("/images", getImages);

module.exports = router;