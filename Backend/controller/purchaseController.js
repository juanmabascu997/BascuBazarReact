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
                    collection_id: (product.collection_id || "Not set yet"),
                    collection_status: (product.collection_status || "Not set yet"),
                    payment_id: (product.payment_id || "Not set yet"),
                    status: (product.status || "Not set yet"),
                    payment_type: (product.payment_type || "Not set yet"),
                    merchant_order_id: (product.merchant_order_id || "Not set yet"),
                    preference_id: (product.preference_id || "Not set yet"),
                    site_id: (product.site_id || "Not set yet"),
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