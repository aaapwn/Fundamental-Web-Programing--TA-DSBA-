const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
const PORT = 8000;

app.get('/',async (req, res) => {
    const data = await fetch('http://localhost:3000/todos').then(res => res.json());
    // console.log(data);
    res.render('index', { todos:data });
});

app.get('/add-todo', (req, res) => {
    res.render('add-todo');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
