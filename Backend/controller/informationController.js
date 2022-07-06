const Information = require('../modules/Information')

const getAllInformation = async (req, res) => {
    try {
        const info = await Information.find()
        res.send(info)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    getAllInformation
}