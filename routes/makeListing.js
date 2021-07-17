const express = require('express');
const router = express.Router();
const listingRoutes = require('../controllers/makeListing');
const { loginCheck } = require('../middleware/loginCheck');
const { verifyListing } = require('../middleware/verfiyListing');

router.route('/')
    .get(loginCheck, listingRoutes.createListingPage)
    .post(loginCheck, verifyListing, listingRoutes.makeListing)

module.exports = router;