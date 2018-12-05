
const Item = require('./../models/Item')
const cloudinary = require('cloudinary')

module.exports = {
    addItem: (req, res, next) => {
        let { cost, title, description } = req.body
        if (!description || !title || !cost) {
            res.status(400).send("Please give your item a title, cost, and description")
            return next()
        }
        if (req.files && req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, result => {
                if (result.error) {
                    res.send(result.error.http_code || 400)
                    return next()
                }
                let obj = { cost, title, description, feature_img: result.url != null ? result.url : '' }
                saveItem(obj)
            }, {
                resource_type: 'image'
            })
        } else {
            saveItem({ cost, title, description, feature_img: '' })
        }
        function saveItem(obj) {
            new Item(obj).save((err, item) => {
                if (err)  { res.send(err) }
                else if (!item) { res.send(400) }
                else {
                    return item.addAuthor(req.body.author_id).then(_item => {
                        return res.send(_item)
                    })
                }
                next()
            })
        }
    },
    getAll: (req, res, next) => {
        Item.find()
        .populate('author')
        .exec((err, items) => {
            if (err) res.send(err)
            else if(!items) res.send(404)
            else res.send(items)
            next()
        })
    },
    getItem: (req, res, next) => {
        Item.findById(req.params.id)
        .populate('author')
        .exec((err, item) => {
            if (err) res.send(err)
            else if (!item) res.send(404)
            else res.send(item)
            next()
        })
    }
}
