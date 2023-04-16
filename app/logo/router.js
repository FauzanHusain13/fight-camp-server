var express = require('express');
var router = express.Router();
const multer = require("multer")

const { index, viewEdit, actionEdit } = require("./controller")

const upload = multer({ dest: '/public/uploads/logo' })
const { isLoginAdmin } = require("../middleware/auth")

router.use(isLoginAdmin)
router.get('/', index);
router.get('/edit/:id', viewEdit)
router.put('/edit/:id', upload.single("logo"), actionEdit);

module.exports = router;