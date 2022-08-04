const User = require('../modules/User')


const updateUserProduct = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.products.push(...req.body)
        const updatedUser = await user.save()
        res.send(updatedUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    updateUserProduct
}