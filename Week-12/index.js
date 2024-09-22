const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(express.json());
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

app.post('/todos', (req, res) => {
    console.log(req.body);
    const { title, completed } = req.body;
    const query = `INSERT INTO todos (title, completed) VALUES ("${title}", ${completed})`;
    db.run(query, (err) => {
        if (err) {
            return res.send(err.message);
        }
        res.json({ message: 'Todo created successfully' });
    });
});

app.put('/todo/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const query = `UPDATE todos SET title = "${title}", completed = ${completed} WHERE id = ${id}`;
    db.run(query, (err) => {
        if (err) {
            return res.send(err.message);
        }
        res.json({ message: 'Todo updated successfully' });
    });
});

app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM todos WHERE id = ${id}`;
    db.run(query, (err) => {
        if (err) {
            return res.send(err.message);
        }
        res.json({ message: 'Todo deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
