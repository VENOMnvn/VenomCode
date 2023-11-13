const http = require('http');
const express = require('express')
const cors = require('cors');
const connectdb = require('./config/connectdb.js')
const routes = require('./routes/routes.js')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 4004;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

// DataBase Connection
connectdb();

app.get("/", (req, res) => {
    res.send("working");
})

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`run on the ${port}`);
})