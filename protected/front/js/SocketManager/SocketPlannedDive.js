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

function modifyPlannedDive(id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site) {
    socket.emit('modifyPlannedDive', id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site);
}

function diverRegistration(planned_dive_id, diver_role, registration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request) {
    socket.emit('addDiverRegistration', planned_dive_id, diver_role, registration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request);
}

function getIsAdmin(){
    socket.emit('getIsAdmin');
}

function deleteDiveRegistration(id_diver, id_planned_dive){
    socket.emit('deleteDiveRegistrationInDb', id_diver, id_planned_dive);
}

function getUserProfile() {
    socket.emit('getUserProfile');
}

function setPlannedDive(id){
    socket.emit('setPlannedDive', id);
}

function deletePlannedDive(id){
    socket.emit('deleteInDb', "Planned_Dive", id);
}

function setIsAdminForDiveId(id){
    socket.emit('setIsAdminForDiveId', id);
}

function updateInfosForAllUsers(id){
    socket.emit('actualizeBDD', id , window.location.pathname);
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
    console.log("receiveIsAdmin");
    PlannedDive.LoadIsAdmin(isAdmin);
});

socket.on('receiveUserProfile', (tabUserProfile) => {
    console.log("receiveUserProfile");
    PlannedDive.LoadUserProfile(tabUserProfile);
});

socket.on('updatePage', (id, currentPage) => {
    console.log("updatePage");
    PlannedDive.updatePage(id, currentPage);
});

// EXPORT
export default {
    getAllPlannedDives,
    getAllDiveSites,
    getAllDivers,
    getAllDiveRegistrations,
    getIsAdmin,
    getUserProfile,
    addPlannedDive,
    modifyPlannedDive,
    deleteDiveRegistration,
    diverRegistration,
    setPlannedDive,
    deletePlannedDive,
    setIsAdminForDiveId,
    updateInfosForAllUsers
}