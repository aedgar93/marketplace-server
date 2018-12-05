// server/routes/index.js
const user = require('./user')
const item = require('./item')
module.exports = (router) => {
    user(router)
    item(router)
}
