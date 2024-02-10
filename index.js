const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
const path = require("path");
connectToMongo();


const app = express()
const port = 5000

app.use(cors())

app.use(express.json())

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "inotebook", "build")));
  res.sendFile(path.resolve(__dirname, "inotebook", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`inotebook backend  listening at http://localhost:${port}`)
})