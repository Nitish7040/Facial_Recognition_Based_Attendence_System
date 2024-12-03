const express = require('express');
const { takeAttendance } = require('../controllers/attendanceController');
const router = express.Router();

router.post('/mark-attendance', takeAttendance);

module.exports = router;
