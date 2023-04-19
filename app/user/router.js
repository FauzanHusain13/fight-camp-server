var express = require('express');
var router = express.Router();
const { training, detailTraining, checkout, confirmation, about, logo, gallery } = require("./controller");
const { isLoginPlayer } = require("../middleware/auth")

router.get('/training', training);
router.get('/detailTraining/:id', detailTraining)
router.post('/checkout', isLoginPlayer, checkout)
router.get('/confirmation', isLoginPlayer, confirmation)

router.get('/about', about)
router.get('/logo', logo)
router.get('/gallery', gallery)

module.exports = router;