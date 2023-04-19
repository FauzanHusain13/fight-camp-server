var express = require('express');
var router = express.Router();
const { index, viewEdit, actionEdit } = require("./controller")
const { isLoginAdmin } = require("../middleware/auth")

router.use(isLoginAdmin)
router.get('/', index);
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', actionEdit);

module.exports = router;