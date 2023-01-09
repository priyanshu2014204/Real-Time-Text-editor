const { Server, Socket } = require("socket.io");
const cors = require("cors");
const { connection } = require("./config/db");
const { Data } = require("./model/data");
connection;

const ws = new Server(8080, {
  cors: { origin: "*" },
  method: ["GET", "POST"],
});

async function createdocs(id) {
    if(id==null)return
  let data = await Data.findOne({ _id: id });
  if (data) {
    return data;
  }
  return await Data.create({ _id: id, data: "" });
}

async function updatedocs(id, data) {
 return await Data.findByIdAndUpdate(id, { data });
}

ws.on("connection", (socket) => {
  console.log("Connection started...");
  socket.on("mydocs", async (docs) => {
    const data = await createdocs(docs);
    socket.join(docs);
    socket.emit("docscame", data.data);

    socket.on("abc", (e) => {
      socket.broadcast.to(docs).emit("myrecivechnage", e);
      console.log(e)
    });
    socket.on("save", async (data) => {
       await updatedocs(docs,data);
      console.log(data);
    });
  });
});
