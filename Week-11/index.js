const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// เชื่อมต่อฐานข้อมูล SQLite
let db = new sqlite3.Database('./user_data.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Route สำหรับแสดงรายการผู้ใช้
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.all(query, (err, rows) => {
    if (err) {
      return res.send(err.message);
    }
    res.render('users', { users: rows });
  });
});

app.get('/user/:id', (req, res) => {
  const id = req.params.id;

  db.get(`SELECT * FROM users WHERE id = ${id}`, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    if (!row) {
      return res.status(404).send('User not found');
    }
    res.render('user_detail', { user: row });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
