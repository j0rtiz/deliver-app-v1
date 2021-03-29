const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const express = require('express');

const port = process.env.PORT || 4000;
const app = express();

app.use(history());
app.use(serveStatic(__dirname + '/dist'));
app.listen(port);
