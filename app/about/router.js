var express = require('express');
var router = express.Router();
const { index, viewCreate, actionCreate, viewEdit } = require("./controller")
const { isLoginAdmin } = require("../middleware/auth")

router.use(isLoginAdmin)
router.get('/', index);
router.get('/add', viewCreate);
router.post('/add', actionCreate);
router.get('/edit/:id', viewEdit);

module.exports = router;