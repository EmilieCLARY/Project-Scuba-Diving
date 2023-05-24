let socket = io();

console.log("OUI");

function getAllDiveSites() {
    socket.emit('getAllDiveSites');
}

export default {
    getAllDiveSites
}