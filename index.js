const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

const Product = require('./models/Product');
const User = require('./models/User');

const filterRoutes = require('./routes/filter');
const projectRoutes = require('./routes/products');
const advancedRoutes = require('./routes/advanced');
const userRoutes = require('./routes/users');
const cartRoutes = require('./routes/cart');
const listingRoutes = require('./routes/makeListing');

const session = require('express-session');
const passport = require('passport');
const localStrat = require('passport-local');

const dburl = process.env.DB || 'mongodb://localhost:27017/eCom';


mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('commerce db connected!');
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(mongoSanitize());
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'"],
        scriptSrc: ["'unsafe-inline'", "'self'"],
        'style-src': ["'unsafe-inline'", "fonts.googleapis.com"],
        fontSrc: ["self", "fonts.gstatic.com"],
        'style-src-elem': ["'self'"],
        workerSrc: ["'self'"],
        objectSrc: [],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            "https://images.unsplash.com/",
            "https://i2.wp.com/wallpapermaiden.com/image/2019/05/09/anime-girl-animal-ears-roar-nekomimi-cute-loli-33020-resized.jpeg"
        ],
    }
}));

//need session before passport session and use stuff
app.use(session({
    name: 'session',
    secret: process.env.SESSION || 'secretlmao',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrat(User.authenticate()));

//methods to keep the user in the sessiona and remove them
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.engine('ejs', ejsMate);

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/products', projectRoutes);
app.use('/filter', filterRoutes);
app.use('/advanced', advancedRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/makeListing', listingRoutes);

app.get('/populate', async (req, res) => {
    await Product.deleteMany();
    let colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];
    let type = ['Shirt', 'Glove', 'Shoes', 'Pants', 'Shorts', 'Underwear', 'Socks', 'Jacket'];
    let brands = ['Under Armour', 'Nike', 'Adidas', 'Puma', 'Tommy Hilfilger', 'Other'];
    let sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    let genders = ['Boys', 'Girls', 'Mens', "Womens", "Unisex"];
    for (let i = 0; i < 101; i++) {
        const rand1 = Math.floor(Math.random() * 5);
        const rand2 = Math.floor(Math.random() * 8);
        const rand3 = Math.floor(Math.random() * 6);
        let val = `${colors[rand1]} ${type[rand2]}`;
        let determineShoe = (type[rand2] === 'Shoes') ? true : false;
        let test = (determineShoe) ? Math.floor(Math.random() * 14) : sizes[rand3];
        const date = new Date();
        const p = new Product({
            name: val,
            price: Math.floor(Math.random() * 200),
            type: type[rand2],
            tags: ['Apparel', `${type[rand2]}`],
            description: 'This is a sample description! This will be where the poster can write what they need to about the product!',
            brand: brands[rand3],
            color: colors[rand1],
            size: test,
            gender: genders[rand1],
            seller: 'anon',
            time: date
        })
        await p.save();

    }
    res.send('done!!!')
})



//errors and opening!
app.use((req, res, next) => {
    res.render('error')
})

app.listen(port, () => {
    console.log('commerce app open!');
})