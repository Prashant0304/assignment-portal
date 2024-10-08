const express = require('express');
const { registerUser, loginUser, uploadAssignment } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', auth, uploadAssignment);

module.exports = router;
