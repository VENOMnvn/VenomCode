const express = require("express");
const cors = require("cors");
const connectdb = require("./config/connectdb.js");
const routes = require("./routes/routes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DataBase Connection
connectdb();

app.use(express.static(path.join(__dirname, 'client','build')));
app.use('/api',routes);
app.use(errorHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'client','build','index.html'));
});

const server = app.listen(port, () => {
  console.log(`run on the ${port}`);
});

//WebSocket using SOCKET IO
const io = require("socket.io")(server, {
  cors: "*",
});

let socketUsers = [];

const addSocketUser = (userId,socketId)=>{
    !socketUsers.some((user)=>user.userId == userId) && socketUsers.push({userId,socketId});
    console.log("socket users :",socketUsers,"::\n");
}

io.on('connection',(socket,arg)=>{
  socket.on('setup',(id)=>{
    socket.join(id);
    console.log(id + ' connected');
    socket.emit('connected');
  });

  socket.on('message-send',(msgObj)=>{
    socket.to(msgObj.username).emit('message-recieved',msgObj);
  });
  
});

module.exports = app;