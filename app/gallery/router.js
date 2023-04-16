var express = require('express');
var router = express.Router();
const { index, viewCreate } = require("./controller")
const { isLoginAdmin } = require("../middleware/auth")

router.use(isLoginAdmin)
router.get('/', index);
router.get('/add', viewCreate);

module.exports = router;