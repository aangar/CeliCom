const express = require('express');
const router = express.Router();
const listingRoutes = require('../controllers/makeListing');
const { loginCheck } = require('../middleware/loginCheck');

router.route('/')
    .get(loginCheck, listingRoutes.createListingPage);

module.exports = router;