const express = require('express');
const app = express();
const port = 3000;

app.delete('/hello', (req, res) => {
    res.send('Hello from express!')
});

app.listen(port, () => {
    console.log('Example of app listening on port ${port}');
});