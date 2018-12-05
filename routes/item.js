// server/routes/item.js
const itemController = require('./../controllers/item.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
module.exports = (router) => {
    /**
     * Get all items
     */
    router.route('/items')
    .get(itemController.getAll)

    /**
     * add an item
     */
    router.route('/item')
    .post(multipartWare, itemController.addItem)

    /**
     * get a particlular item to view
     */
    router.route('/item/:id')
    .get(itemController.getItem)
}
