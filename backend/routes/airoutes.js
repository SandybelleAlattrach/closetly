const router = require("express").Router();
const { generateOutfit } = require("../controllers/aicontroller");

router.post("/generate", generateOutfit);

module.exports = router;
