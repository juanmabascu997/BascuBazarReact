const User = require('../modules/User')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addUser = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            address: req.body.address,
            phone: req.body.phone
        })
        const newUser = await user.save()
        res.send(newUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

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
    getUsers,
    getUserByID,
    addUser,
    updateUser,
    updateUserProduct,
}