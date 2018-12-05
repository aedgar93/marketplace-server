// server/models/Item.js
const mongoose = require('mongoose')

let ItemSchema = new mongoose.Schema({
    title: String,
    cost: Number,
    description: String,
    feature_img: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

ItemSchema.methods.addAuthor = function(author_id) {
    this.author = author_id
    return this.save()
}

ItemSchema.methods.getUserItem = function(user_id) {
    Item.find({author: user_id}).then(Item => {
        return Item
    })
}

ItemSchema.methods.deleteItem = function() {
    return this.remove()
}

module.exports = mongoose.model('Item', ItemSchema)
