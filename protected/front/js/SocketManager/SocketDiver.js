import Divers from "../diver.js";

console.log("SocketDiver.js OUAIS");

let socket = io();

// SOCKET EMIT

function getAllDivers() {
    socket.emit('getAllDivers');
    console.log("emitAllDivers");
}

// SOCKET ON

socket.on('receiveAllDivers', (tabDivers) => {
    console.log("receiveAllDivers");
    Divers.LoadAllDivers(tabDivers);
});

// EXPORT
export default {
    getAllDivers,
}