const express = require('express');
const connectDatabase = require('./config/db')
const path = require("path");
const app = express();
connectDatabase();

// Init Middleware
app.use(express.json({extended:false}));


app.get('/',(req,res)=> res.send('API RUNNING'))

app.use("/api/transaction",require("./routes/api/transaction"));
app.use("/api/user",require("./routes/api/user"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));