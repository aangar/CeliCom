const User = require('../models/User');

module.exports.getCart = async (req, res) => {
    const foundUser = await User.findById(res.locals.currentUser._id);
    const totalPrice = (cart) => {
        let total = 0;
        for (let c of cart) {
            total += parseInt(c.price);
        }
        return total;
    }
    res.render('cart/cartList', { cart: foundUser.cart, total: totalPrice(foundUser.cart) });
}

module.exports.updateCart = async (req, res) => {
    const foundUser = await User.findById(res.locals.currentUser._id);
    let cart = foundUser.cart;
    const toAdd = req.session.viewing;
    for (let i of cart) {
        if (i._id === toAdd._id) {

            return res.render('cart/alreadyExists');
        }
    }
    cart.push(toAdd);
    foundUser.cart = cart;
    await foundUser.save();
    res.redirect('/cart')
}

module.exports.removeItem = async (req, res) => {
    const { id } = req.params;
    const user = res.locals.currentUser;
    const filtered = user.cart.filter(item => item._id !== id);
    const updated = await User.findByIdAndUpdate(user._id, { cart: filtered });
    await updated.save();
    res.redirect('/cart');

}