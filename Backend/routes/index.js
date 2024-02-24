const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');



connectToMongo();

const app = express();
const port = process.env.PORT || 8000
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use(cors());

// available routes
app.use("/api/auth", require("./auth"));
app.use("/api/notes", require("./notes"));


app.listen(port, () => {
    console.log(`NoteBook backend listening at http://localhost:${port}`);
});

