const express = require('express');
const router = new express.Router();
const {registration, userLogin} = require("../../controllers/auth.controller")

router.post('/register', registration);
router.post('/login', userLogin)
module.exports = router;