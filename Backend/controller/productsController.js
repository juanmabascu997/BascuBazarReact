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
            countInStock: req.body.countInStock,
            tags: req.body.tags,
        })
        product.save();
        console.log(product)

        res.send(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const productID = id;
        const product = await Product.findByIdAndUpdate(productID, body, { new: true })

        product.save();

        res.send(product)
    } catch (error) {
        return { message: error.message };
    }
}

const changeState = async (req, res) => {
    try {
        const { id } = req.params;
        const productID = id;
        const product = await Product.findById(productID)
        product.disabled = !product.disabled;

        product.save();

        res.send(product)
    } catch (error) {
        return { message: error.message };
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    changeState
}