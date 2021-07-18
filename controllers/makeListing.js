const User = require('../models/User');
const Product = require('../models/Product');

module.exports.createListingPage = (req, res) => {
    res.render('listings/createListing', { error: false, msg: 'You\'re missing one or more required fields.' });
}

module.exports.makeListing = async (req, res) => {
    const { name, price, description, type, gender, size, brand, color } = req.body;
    let userList = res.locals.currentUser.listings;
    const user = res.locals.currentUser._id;
    const d = new Date();
    const publish = d.toDateString();
    const product = new Product({
        name: name,
        price: parseInt(price),
        description: description,
        type: type,
        gender: gender,
        size: size,
        brand: brand,
        color: color,
        tags: [color, type],
        time: publish
    })
    await product.save();
    userList.push(product._id);
    const toSave = await User.findByIdAndUpdate(user, { listings: userList })
    await toSave.save();
    res.redirect('products');
}