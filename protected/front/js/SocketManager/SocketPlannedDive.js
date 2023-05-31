import PlannedDive from "../planned_dive.js";

let socket = io();

// SOCKET EMIT

function getAllPlannedDives() {
    socket.emit('getAllPlannedDives');
}

function getAllDiveSites() {
    socket.emit('getAllDiveSites');
}

function addPlannedDive(id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site) {
    socket.emit('addPlannedDive', id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site);
    //console.log("emitAddPlannedDive");
}

// SOCKET ON

socket.on('receiveAllPlannedDives', (tabPlannedDives) => {
    PlannedDive.LoadAllPlannedDives(tabPlannedDives);
});

socket.on('receiveAllDiveSites', (tabDiveSites) => {
    PlannedDive.LoadAllDiveSites(tabDiveSites);
});



// EXPORT
export default {
    getAllPlannedDives,
    getAllDiveSites,
    addPlannedDive,
}