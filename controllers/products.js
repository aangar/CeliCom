const Products = require('../models/Product');
const User = require('../models/User');

module.exports.getListings = async (req, res) => {
    const found = await Products.find({});
    res.render('products', { found })
}

module.exports.getItemPage = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id);
    req.session.viewing = product;
    res.render('itemRedo', { product });
}

module.exports.changeItemData = async (req, res) => {
    const toEdit = await Products.findById(req.params.id);
    res.render('listings/editListing', { product: toEdit, error: false });
}

module.exports.updateItemData = async (req, res) => {
    const { name, price, description } = req.body;
    const toUpdate = await Products.findByIdAndUpdate(req.params.id, { name: name, price: price, description: description });
    await toUpdate.save();
    res.redirect(`/products/${req.params.id}`);
}

module.exports.warnRemoval = async (req, res) => {
    const toRemove = await Products.findById(req.params.id);
    res.render('listings/removeListing', { name: toRemove.name, id: req.params.id });
}

module.exports.removeListing = async (req, res) => {
    const item = req.params.id;
    const userListings = res.locals.currentUser.listings;
    userListings.splice(userListings.indexOf(item), 1);
    const user = await User.findByIdAndUpdate(res.locals.currentUser.id, { listings: userListings });
    user.save();
    await Products.findByIdAndDelete(req.params.id);
    res.redirect(`/users/${res.locals.currentUser.id}/listings`)
}