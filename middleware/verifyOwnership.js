const User = require('../models/User');

module.exports.verifyOwnership = async (req, res, next) => {
    const user = await User.findById(res.locals.currentUser._id);
    if (user.listings.includes(req.params.id)) {
        next();
    } else {
        res.render('listings/notOwner')
    }
}