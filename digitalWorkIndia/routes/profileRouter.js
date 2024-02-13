const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const multer = require('multer');

const storage=multer.memoryStorage();
const upload = multer({storage:storage});

router.get('/', profileController.getUserProfile);
router.get('/picture', profileController.getProfilePicture);
router.put('/update', profileController.updateUserProfile);
router.post('/upload-picture', upload.single('image') ,  profileController.uploadProfilePicture);

exports.router = router;
