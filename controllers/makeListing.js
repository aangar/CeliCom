const User = require('../models/User');
const Product = require('../models/Product');

module.exports.createListingPage = (req, res) => {
    res.render('listings/createListing');
}