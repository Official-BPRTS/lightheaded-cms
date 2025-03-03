const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const viewRoutes = require('./routes/view-routes');
const Database = require('./logic/database');

const app = express();
const port = 3000;

const db = new Database();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', '_layout');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

db.connect();

app.use('/', viewRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});