const express = require("express");
const dotenv = require("dotenv")

require('dotenv').config();

const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log(`server run at Port ${PORT}`);
})