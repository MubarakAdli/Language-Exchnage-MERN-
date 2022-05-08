const express = require("express");
const cors = require('cors')
const cookies=require('cookie-parser');

const app = express();

require("./server/config/mongoose.config");
// app.use(cookiesParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cookies());
    
require('./server/routes/user.routes')(app);
    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));