require('dotenv').config()

const productsData = require('./data/Products') 
const informationData = require('./data/Information')
const connectDB = require('./config/db')

const Product = require('./modules/Products')
const Information = require('./modules/Information')

connectDB()

const importFuctions = async () => {
    try {
        await Product.deleteMany({})
        await Information.deleteMany({})
        await Product.insertMany(productsData)
        await Information.insertMany(informationData)
        console.log('Data imported successfully')
        process.exit()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

importFuctions()