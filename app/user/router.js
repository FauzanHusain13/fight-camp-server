var express = require('express');
var router = express.Router();
const { training, detailTraining, checkout, confirmation } = require("./controller");
const { isLoginPlayer } = require("../middleware/auth")

router.get('/training', training);
router.get('/detailTraining/:id', detailTraining)
router.post('/checkout', isLoginPlayer, checkout)
router.get('/confirmation', isLoginPlayer, confirmation)

module.exports = router;