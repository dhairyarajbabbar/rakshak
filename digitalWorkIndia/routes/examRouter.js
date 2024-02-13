const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/start', examController.startExamSession);
router.post('/submit', examController.submitExamAnswers);
router.get('/results', examController.getExamResults);
router.get('/user-sessions', examController.getUserExamSessions);

exports.router = router;
