const { Server } = require("socket.io");

function startSocketServer(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on('connection', socket => {
    console.log("Client connected:", socket.id);

    socket.on("message", msg => {
      console.log("Received message:", msg);
      socket.broadcast.emit("message", msg);
    });
  });
}

module.exports = startSocketServer;
