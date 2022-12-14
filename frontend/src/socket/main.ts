import { io } from "socket.io-client"

const socket = io.connect(import.meta.env.VITE_SOCKET_ADDRESS)

export default socket