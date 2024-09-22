const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webpro-week8'
});

app.get('/login', (req, res) => {
  return res.render('login');
});

app.get('/register', (req, res) => {
  return res.render('register');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query(`SELECT * FROM customer WHERE username = '${username}'`, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            if (result.length > 0) {
                if (result[0].password == password) {
                    return res.send(`Welcome ${result[0].first_name}`);
                } else {
                    return res.send('Password or Username not match');
                }
            } else {
                return res.send('Password or Username not match');
            }
        }
    });
});

app.post('/register', (req, res) => {
    const { username, first_name, last_name, email, password, confirm_password } = req.body;
    db.query(`SELECT * FROM customer WHERE username = '${username}'`, (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        } else {
            if (result.length > 0) {
                return res.send('Username already exist');
            } else {
                if (confirm_password == password) {
                    db.query(`INSERT INTO customer (username, password, first_name, last_name, email) VALUES ('${username}', '${password}', '${first_name}', '${last_name}', '${email}')`, (err, result) => {
                        if (err) {
                            return res.status(500).send(err.message);
                        } else {
                            return res.send('Register success');
                        }   
                    });
                } else {
                    return res.send('Password not match');
                }
            }
        }
    });
});

const PORT = process.env.PORT || 3000;

db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
    app.listen(PORT, () => {
        console.log(`Server is running! \n> http://localhost:${PORT}`);
    });
});
