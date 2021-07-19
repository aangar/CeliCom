const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const { loginCheck } = require('../middleware/loginCheck');
const { verifyOwnership } = require('../middleware/verifyOwnership');

router.route('/')
    .get(products.getListings)

router.route('/:id')
    .get(products.getItemPage);

router.route('/:id/edit')
    .get(loginCheck, verifyOwnership, products.changeItemData);


router.route('/:id/update')
    .put(loginCheck, verifyOwnership, products.updateItemData)

router.route('/remove/:id')
    .get(loginCheck, verifyOwnership, products.warnRemoval)
    .post(loginCheck, verifyOwnership, products.removeListing);
module.exports = router;