const express = require("express");
const IO = require("socket.io");
const http = require("http");
const port = process.env.PORT || 4000;
const app = express();

app.use(express.static("public/js"))

const server = http.createServer(app);

const io = IO(server);

io.on("connection", (socket) => {
  socket.on("new_result", (calcResult) => {
      console.log(calcResult)
    io.emit("broadcast_result", calcResult);
  });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});