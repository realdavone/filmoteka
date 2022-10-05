import { Server } from "socket.io"

export let io

export function init(server) {
  io = new Server(server, { cors: { origin: '*' } })
}