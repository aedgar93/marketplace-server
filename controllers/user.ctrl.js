const Item = require('./../models/Item')
const User = require('./../models/User')

module.exports = {
    fetchOrAdd: (req, res, next) => {
        User.findOne({'provider_id': req.body.provider_id}).then((user, err) => {
            if (!err && user) {
                //found a user
                res.send(user)
                return next()
            }
            //User not found, make a new one
            new User(req.body).save((err, newUser) => {
                if (err)
                    res.send(err)
                else if (!newUser)
                    res.send(400)
                else
                    res.send(newUser)
                next()
            });
        })
    },

    getUser: (req, res, next) => {
        User.findById(req.params.id)
        .then((err, user) => {
            if (err) res.send(err)
            else if (!user) res.send(404)
            else res.send(user)
            next()
        })
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then
        ((_user) => {
            return Item.find({'author': req.params.id}).then((_items)=> {
                return res.json({ user: _user, items: _items })
            })
        }).catch((err)=>console.error(err))
    }
}
