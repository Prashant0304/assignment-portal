const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Ensure this path is correct
const userRoutes = require('./routes/user'); // Ensure this path is correct
const adminRoutes = require('./routes/admin'); // Ensure this path is correct

require('dotenv').config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
