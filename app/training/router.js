var express = require('express');
var router = express.Router();
const multer = require("multer")

const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require("./controller");

const upload = multer({ dest: '/public/uploads/training' })
const { isLoginAdmin } = require("../middleware/auth")

router.use(isLoginAdmin)
router.get('/', index);
router.get('/add', viewCreate);
router.post("/add", upload.single("thumbnail"), actionCreate)
router.get('/edit/:id', viewEdit);
router.put('/edit/:id', upload.single("thumbnail"), actionEdit);
router.delete("/delete/:id", actionDelete)

module.exports = router;