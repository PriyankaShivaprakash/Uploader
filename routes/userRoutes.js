const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), userController.uploadExcel);
router.get('/download', userController.downloadExcel);

module.exports = router;
