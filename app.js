const express =require ("express");
const path = require ('path');
const mysql = require ("mysql");
const dotenv = require ('dotenv');
const cookieParser = require ('cookie-parser');

dotenv.config ({ path: './.env'});

const app = express ();  //our view engine

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended:false}));
//api clients
app.use(express.json());
app.use(cookieParser());

db.connect ( (err)=>{
    if (err){
        console.log(error)
    }
    else {
        console.log("MYSQL Connected")
    }
})




app.set('view engine','hbs');

 //defeines router
 app.use ('/', require('./routes/pages'));
 app.use('/auth', require('./routes/auth'));
 
 app.listen(5001, ()=>{
console.log("server started on port 5001");
 })