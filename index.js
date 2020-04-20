const express = require('express');

const app = express();
const port = 8080;
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Server is running fine'
    });
});


app.listen(port, () => {
    console.log('server is running on port', port);
});