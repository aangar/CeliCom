const express = require('express');
const router = express.Router();
const userRoutes = require('../controllers/users');
const passport = require('passport');
const { loginCheck } = require('../middleware/loginCheck');

router.route('/register')
    .get(userRoutes.getRegisterForm)
    .post(userRoutes.createUser)


router.route('/login')
    .get(userRoutes.loginForm)
    .post(passport.authenticate('local', { failureRedirect: "/users/login/in" }), userRoutes.login)


router.get('/login/in', (req, res) => {
    res.render('user/login', { error: true, msg: 'Those credentials are invalid.' })
})
router.route('/logout')
    .get(userRoutes.logout)


router.route('/:id/listings')
    .get(loginCheck, userRoutes.userPage)
module.exports = router;