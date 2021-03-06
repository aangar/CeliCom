module.exports.verifyListing = (req, res, next) => {
    const { type, size, brand, color, price, gender } = req.body;
    if (size === 'default' || brand === 'default' || type === 'default' || color === 'default') {
        return res.render('listings/createListing', { error: true, msg: 'You\'re missing one or more required fields.' })
    } else {
        if (price <= 0) {
            return res.render('listings/createListing', {
                error: true, msg: 'That price is invalid.'
            })
        }
        else if (gender === '') {
            return res.render('listings/createListing', {
                error: true, msg: 'Please Select a Gender.'
            })
        }

    }
    next();
}