// server.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();
const app = express();

// Connect Database
//connectDB();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('mongoDB connected');
}
).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
}

)
// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));
app.use('/api/category', require('./routes/category'));
app.use('/api/Subcategory', require('./routes/Subcategory'));
app.use('/api/order', require('./routes/order'));
app.use('/api/cart', require('./routes/cart'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


