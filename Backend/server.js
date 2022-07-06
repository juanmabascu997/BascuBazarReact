require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const productsRoutes = require('./routes/productsRoutes')
const informationRoutes = require('./routes/informationRoutes')
// const client = require('./config/db')
const cors = require('cors');

connectDB()
const app = express()
app.use(express.json())
app.use(cors());

app.use('/api/products', productsRoutes)
app.use('/api/information', informationRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))