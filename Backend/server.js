require('dotenv').config()
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const productsRoutes = require('./routes/productsRoutes')
const informationRoutes = require('./routes/informationRoutes')
const paymentsMercadoPago = require('./routes/paymentsMercadoPago')
const usersRoutes = require('./routes/usersRoutes')
const purchaseRoutes = require('./routes/purchasesRoutes')

const cors = require('cors');

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors());

app.use('/api/products', productsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/information', informationRoutes)
app.use('/payments/mercadopago', paymentsMercadoPago);
app.use('/api/purchase', purchaseRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))