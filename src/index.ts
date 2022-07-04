import http from "http";
import express from "express";
import path from "path";
import morgan from "morgan";
import { Server } from "socket.io";

import { F1TelemetryClient, constants } from "@racehub-io/f1-telemetry-client";
import { PacketMotionData } from "@racehub-io/f1-telemetry-client/build/src/parsers/packets/types";
const { PACKETS } = constants;

type CarData = {}

/*
 *   'port' is optional, defaults to 20777
 *   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
 *                   defaults to true
 *   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
 *                   defaults to undefined
 *   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
 *                   defaults to false
 */
const client = new F1TelemetryClient({ port: 20777 });

// // to start listening:
client.start();

// and when you want to stop:
// client.stop();

const app = express();
const server = http.createServer(app)
const io = new Server(server);

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));

// Object.keys(PACKETS).forEach((key, idx) => {

//   // setInterval(() => {
//   //   client.emit(key, Math.random().toString(36).slice(2, 7))
//   // }, 500+1000*idx);

//   client.on(key, (data) => {
//     io.emit(key, data)
//   });
// });

client.on(PACKETS.motion, (data: PacketMotionData) => {
  const playerIdx = data.m_header.m_playerCarIndex
  const motionData = data.m_carMotionData[playerIdx]
  // console.log(motionData)
  io.emit(PACKETS.motion, motionData)
})

server.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
`)
);