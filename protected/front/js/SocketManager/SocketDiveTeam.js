import DiveTeam from "../dive_team.js";

let socket = io();

// SOCKET EMIT

function getAllDives() {
    socket.emit('getAllDiveTeams');
}

// SOCKET ON

socket.on('receiveAllDiveTeams', (tabDiveTeams) => {
    DiveTeam.LoadAllDiveTeams(tabDiveTeams);
});

// EXPORT
export default {
    getAllDiveTeams,
}