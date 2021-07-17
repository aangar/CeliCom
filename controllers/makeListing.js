const User = require('../models/User');
const Product = require('../models/Product');

module.exports.createListingPage = (req, res) => {
    res.render('listings/createListing', { error: false, msg: 'You\'re missing one or more required fields.' });
}

module.exports.makeListing = (req, res) => {
    res.send(req.body);
}