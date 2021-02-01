const mysql = require ("mysql");
const jwt = require ('jsonwebtoken');
const bcrypt =require ('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        if (!username || !password){
            return res.status(400).render ('login', {
                message : 'unregistered account'
               
            })
             
        }
   
        db.query('SELECT * FROM users WHERE username = ? ', [username],  async (error, results) => {
            console.log(results);
            if (!results || !(await bcrypt.compare(password, results[0].password) )) {
                res.status(401).render('login', {
                    message: 'username or password is incorrect'
                })
            } 
            res.render('welcome') ;
              
        })
    } catch (error) {
       

        console.log(error);
    }
}
    


exports.register =(req, res) => {
    console.log(req.body);
   
    const {name, lastname, idnumber, address, username, password } = req.body;
    db.query('SELECT username FROM users WHERE username = ?', [username], async (error, results ) => {
        if (error){
            console.log(error);
        }
        if (results.lenght > 0){
            return res.render('register', {
                message: 'that email is allready in use'
            })
        } else if (password !== password){
            return res.render ('register', {
                message : 'Password do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log (hashedPassword);

        db.query ('INSERT INTO users SET ?',  {name: name, lastname: lastname, idnumber:idnumber, address: address, username :username, password: hashedPassword}, (error, results) =>
        { if (error){
            console.log (error);
        }
        else{
            console.log (results);
            return res.render ('register', {
                message: 'user registered'
            });
           }
          })
    })
     
    
   res.render('login');
}