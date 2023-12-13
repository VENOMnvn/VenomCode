const express = require("express");
const cors = require("cors");
const connectdb = require("./config/connectdb.js");
const routes = require("./routes/routes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const cookieParser = require("cookie-parser");
const User = require("./MongoDB/UserSchema.js");
const POSTS = require("./MongoDB/postSchema.js");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DataBase Connection
connectdb();

app.get("/", (req, res) => {
  res.send("working v.1.7");
});

app.use(routes);
app.use(notFound);
app.use(errorHandler);

const EmptyAll = async () => {
  const users = await User.find();
  users.forEach((user) => {
    user.followers = [];
    user.following = [];
    user.save();
    console.log(user.username + " empty");
  });

  const posts = await POSTS.find();
  posts.forEach((post) => {
    post.likes = [];
    post.save();
  });
};

// EmptyAll();

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

