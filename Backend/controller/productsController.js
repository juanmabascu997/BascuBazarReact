const Product = require('../modules/Products')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.send(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageURL: req.body.imageURL,
            countInStock: req.body.countInStock
        })
        const newProduct = await product.save()
        res.send(newProduct)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct
}