/** require dependencies */
const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
require('dotenv').config()

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/marketplace"

/** configure cloudinary */
cloudinary.config({
    cloud_name: 'doxsvqpvb',
    api_key: '459243382726229',
    api_secret: 'oSqbjmTGtD9uocJfoF8QMVSliuY'
})

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useNewUrlParser: true
        //useMongoClient: true
    })
} catch (error) {

}

let port = process.env.PORT || 5000

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
