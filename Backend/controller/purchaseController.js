const User = require('../modules/User')


const allPurchases = async (req, res) => {
    try {
        const users = await User.find()
        let purchases = []
        users.forEach(user => {
            user.products.forEach(product => {
                purchases.push({
                    name: product.name,
                    price: product.price,
                    image: product.imageURL,
                    user: user.name,
                    quantity: product.quantity,
                })
            })
        }
        )
        res.send(purchases)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    allPurchases
}