const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const viewRoutes = require('./routes/view-routes');
const Database = require('./logic/database-processor');

const app = express();
const port = 3000;

const db = new Database();

app.set('view engine', 'ejs');
app.set('layout', '_layout');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, 'public', 'assets', 'images', 'favicon.ico')));

app.use('/', viewRoutes);

db.connection.connect();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});