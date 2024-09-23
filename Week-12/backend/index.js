const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

let db = new sqlite3.Database('./todos.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

app.get('/todos', (req, res) => {
    const query = 'SELECT * FROM todos';
    db.all(query, (err, rows) => {
        if (err) {
            return res.send(err.message);
        }
        res.json(rows);
    });
});

// app.get('/todo/:id', (req, res) => {
//     const { id } = req.params;
//     const query = `SELECT * FROM todos WHERE id = ${id}`;
//     db.get(query, (err, row) => {
//         if (err) {
//             return res.send(err.message);
//         }
//         res.json(row);
//     });
// });

app.post('/todos', (req, res) => {
    const { title, description, deadline } = req.body;
    const query = `INSERT INTO todos (title, description, deadline) VALUES ('${title}', '${description}', '${deadline}')`;
    db.run(query, (err) => {
        if (err) {
            return res.send(err.message);
        }
        res.json({ message: 'Todo created successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
