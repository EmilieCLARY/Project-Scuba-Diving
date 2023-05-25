import Dive from "../dive.js";

let socket = io();

// SOCKET EMIT

function getAllDives() {
    socket.emit('getAllDives');
}

// SOCKET ON

socket.on('receiveAllDives', (tabDives) => {
    Dive.LoadAllDiveSites(tabDives);
});

// EXPORT
export default {
    getAllDives,
}