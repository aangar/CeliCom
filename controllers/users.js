const passport = require('passport');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports.getRegisterForm = (req, res) => {
    res.render('user/register', { error: false, msg: '' })
}

module.exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body.user;
        const user = new User({
            username: username,
            email: email
        })
        const register = await User.register(user, password);
        res.redirect('login');
    } catch (e) {
        //style register form then make the little error box in css.
        const msg = (e.code) ? 'This email is already in use!' : e.message;
        res.render('user/register', { error: true, msg: msg });
        //redirect or render a new page where the user islogged in
    }
}

module.exports.loginForm = (req, res) => {
    res.render('user/login', { error: false, msg: '' });
}

module.exports.login = async (req, res) => {
    const returnUrl = req.session.returnAddress || '/products';
    res.redirect(returnUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/products')
}


module.exports.userPage = async (req, res) => {
    const user = await User.findById(res.locals.currentUser._id);
    let lists = [];
    for (let i of user.listings) {
        const item = await Product.findById(i);
        lists.push(item);
    }
    res.render('user/listings', { products: lists });
}