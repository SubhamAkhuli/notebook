const connectToMongo = require('./db');
const express = require('express');


connectToMongo();

const app = express();
const port = process.env.PORT || 8000
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());

// available routes
app.use("/api/auth", require("./auth"));
app.use("/api/notes", require("./notes"));


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

