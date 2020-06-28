const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');

console.log('router loaded');


router.get('/',passport.checkAuthentication, homeController.home);
router.get('/reset/:id', homeController.reset);
router.use('/users', require('./users'));

module.exports = router;