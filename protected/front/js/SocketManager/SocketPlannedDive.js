import PlannedDive from "../planned_dive.js";

let socket = io();

// SOCKET EMIT

function getAllPlannedDives() {
    socket.emit('getAllPlannedDives');
}

function getAllDiveSites() {
    socket.emit('getAllDiveSites');
}

function getAllDivers() {
    socket.emit('getAllDivers');
}

function getAllDiveRegistrations(){
    socket.emit('getAllDiveRegistrations');
}

function addPlannedDive(id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site) {
    socket.emit('addPlannedDive', id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site);
}

function diverRegistration(planned_dive_id, diver_role, registration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request) {
    socket.emit('addDiverRegistration', planned_dive_id, diver_role, registration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request);
}

function getIsAdmin(){
    socket.emit('getIsAdmin');
}

// SOCKET ON

socket.on('receiveAllPlannedDives', (tabPlannedDives) => {
    console.log("receiveAllPlannedDives");
    PlannedDive.LoadAllPlannedDives(tabPlannedDives);
});

socket.on('receiveAllDiveSites', (tabDiveSites) => {
    console.log("receiveAllDiveSites");
    PlannedDive.LoadAllDiveSites(tabDiveSites);
});

socket.on('receiveAllDivers', (tabDivers) => {
    console.log("receiveAllDivers");
    PlannedDive.LoadAllDivers(tabDivers);
});

socket.on('receiveAllDiveRegistrations', (tabDiveRegistrations) => {
    console.log("receiveAllDiveRegistrations");
    PlannedDive.LoadAllDiveRegistrations(tabDiveRegistrations);
});

socket.on('receiveIsAdmin', (isAdmin) => {
    PlannedDive.LoadIsAdmin(isAdmin);
});


// EXPORT
export default {
    getAllPlannedDives,
    getAllDiveSites,
    getAllDivers,
    getAllDiveRegistrations,
    getIsAdmin,
    addPlannedDive,
    diverRegistration
}