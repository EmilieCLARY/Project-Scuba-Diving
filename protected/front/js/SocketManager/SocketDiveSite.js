import DiveSite from "../dive_site.js";

let socket = io();

// SOCKET EMIT

function getAllDiveSites() {
    socket.emit('getAllDiveSites');
}

// SOCKET ON

socket.on('receiveAllDiveSites', (tabDiveSites) => {
    DiveSite.LoadAllDiveSites(tabDiveSites);
});

// EXPORT
export default {
    getAllDiveSites,
}