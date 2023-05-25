import Emergency from "../emergency.js";

let socket = io();

// SOCKET EMIT

function getAllEmergencies() {
    socket.emit('getAllEmergencies');
}

// SOCKET ON

socket.on('receiveAllEmergencies', (tabEmergencies) => {
    Emergency.LoadAllDiveSites(tabEmergencies);
});

// EXPORT
export default {
    getAllEmergencies,
}