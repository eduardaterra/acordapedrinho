import express from "express";

const server = express();

server.all("/", (req, res) => res.send("oi pedro"))

export const keepAlive = () => {
  server.listen(3000, () => console.log("server is ready!"))
}