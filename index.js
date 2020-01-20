const conn = require('./conn');
const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes');


app.use(router);
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});
