require('dotenv').config();
const express = require('express');
const {requireAuth} = require('./middleWare/authMiddleware');
const signup = require('./routes/signup');
const login = require('./routes/login');
const product = require('./routes/product');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors')



const app = express();

app.use(express.urlencoded({ extended: true }));

//parse application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', function(req, res){
    res.send('welcome');
})


app.use('/signup', signup);
app.use('/login', login);
app.use('/check', requireAuth);
app.use('products', product);




//ini my database
mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost:27017/lyter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'lyter'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.listen(8000, function() {
    console.log("App is Listening http://localhost:8000");
})