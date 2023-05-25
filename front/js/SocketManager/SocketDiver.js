import Divers from "../diver.js";

let socket = io();

// SOCKET EMIT

function getAllDivers() {
    socket.emit('getAllDivers');
}

// SOCKET ON

socket.on('receiveAllDivers', (tabDivers) => {
    Divers.LoadAllDivers(tabDivers);
});

// EXPORT
export default {
    getAllDivers,
}