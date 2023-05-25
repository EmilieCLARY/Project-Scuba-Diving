import PlannedDive from "../planned_dive.js";

let socket = io();

// SOCKET EMIT

function getAllPlannedDives() {
    socket.emit('getAllPlannedDives');
}

// SOCKET ON

socket.on('receiveAllPlannedDives', (tabPlannedDives) => {
    PlannedDive.LoadAllPlannedDives(tabPlannedDives);
});

// EXPORT
export default {
    getAllPlannedDives,
}