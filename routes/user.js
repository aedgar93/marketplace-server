const userController = require('../controllers/user.ctrl')
module.exports = (router) => {

    /**
     * Get a user
     */
    router.route('/user/:id')
    .get(userController.getUser)

     /**
     * Get a user profile
     */
    router
    .route('/user/profile/:id')
    .get(userController.getUserProfile)

    /**
     * Adds a user
     */
    router
    .route('/user')
    .post(userController.fetchOrAdd)

}
