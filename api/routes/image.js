const express = require("express");
const router = express.Router();

router.post("/", function (req, res, next) {
  const random = Math.random().toString(36).substring(2, 10);
  const savePath =
    process.env.IMAGES_PATH + random + "_" + req.files.image.name;
  const globalPath = "/img/" + random + "_" + req.files.image.name;
  req.files.image.mv(savePath, function (err) {
    if (err) return res.sendStatus(500);
    res.send({ filepath: globalPath });
  });
});

module.exports = router;
