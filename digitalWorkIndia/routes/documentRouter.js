const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const multer = require('multer');

const storage=multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/add', upload.single('image'), documentController.uploadDocument);
router.get('/:documentId', documentController.getDocument);
router.delete('/:documentId', documentController.deleteDocument);
router.get('/', documentController.getAllUserDocuments);

exports.router = router;

// const path =require('path');

// const storage = multer.diskStorage({
//     destination: '../uploads',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1000000
//     }
// })
// const upload = multer({ dest: 'uploads/' });