var express = require('express')
var router = express.Router()
const { training, detailTraining, checkout, confirmation, gallery } = require("./controller")
const { isLoginPlayer } = require("../middleware/auth")

router.get('/training', training)
router.get('/detailTraining/:id', detailTraining)
router.post('/checkout', isLoginPlayer, checkout)
router.get('/confirmation', isLoginPlayer, confirmation)

router.get('/gallery', isLoginPlayer, gallery)

module.exports = router;