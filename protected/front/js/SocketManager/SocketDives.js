import Dive from "../dive.js";

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

function getAllDives(){
    socket.emit('getAllDives');
}

function getAllDiveTeamMembers(){
    socket.emit('getAllDiveTeamMembers');
}

function getAllDiveTeams(){
    socket.emit('getAllDiveTeams');
}

function getMaxDepthForQualification(){
    socket.emit('getMaxDepthForQualification');
}

function getIsAdmin(){
    socket.emit('getIsAdmin');
}

function getUserProfile() {
    socket.emit('getUserProfile');
}

function getIdPlannedDive(){
    socket.emit('getIdPlannedDive');
}

// ADD

function addDive(Id_Dive, Begin_Time, Begin_Date, End_Date, End_Time, Comment, Surface_Security, Diver_Price, Instructor_Price, Max_Ppo2, Diver_Id_Diver, Planned_Dive_Id_Planned_Dive) {
    socket.emit('addDive', Id_Dive, Begin_Time, Begin_Date, End_Date, End_Time, Comment, Surface_Security, Diver_Price, Instructor_Price, Max_Ppo2, Diver_Id_Diver, Planned_Dive_Id_Planned_Dive);
}

function addDiveTeam(id, minGuidedDepth, maxduration, temp, temp2, dive_type, sequence_number, planned_time, endTime, commentaireInput, guide_id, dive_id) {
    socket.emit('addDiveTeam', id, minGuidedDepth, maxduration, temp, temp2, dive_type, sequence_number, planned_time, endTime, commentaireInput, guide_id, dive_id);
}

function addDiveTeamMember(idDiver, id_dive_team, qualificationTempNombre, qualification, role, instructor_qualification, pourcentageNox, comment, montantPaye) {
    socket.emit('addDiveTeamMember', idDiver, id_dive_team, qualificationTempNombre, qualification, role, instructor_qualification, pourcentageNox, comment, montantPaye);
}

// UPDATE

function updateDive(Id_Dive, Begin_Time, Begin_Date, End_Date, End_Time, Comment, Surface_Security, Diver_Price, Instructor_Price, Max_Ppo2, Diver_Id_Diver, Planned_Dive_Id_Planned_Dive) {
    socket.emit('modifyDive', Id_Dive, Begin_Time, Begin_Date, End_Date, End_Time, Comment, Surface_Security, Diver_Price, Instructor_Price, Max_Ppo2, Diver_Id_Diver, Planned_Dive_Id_Planned_Dive);
}

// SOCKET ON

socket.on('receiveAllPlannedDives', (tabPlannedDives) => {
    console.log("receiveAllPlannedDives");
    Dive.LoadAllPlannedDives(tabPlannedDives);
});

socket.on('receiveAllDiveSites', (tabDiveSites) => {
    console.log("receiveAllDiveSites");
    Dive.LoadAllDiveSites(tabDiveSites);
});

socket.on('receiveAllDivers', (tabDivers) => {
    console.log("receiveAllDivers");
    Dive.LoadAllDivers(tabDivers);
});

socket.on('receiveAllDiveRegistrations', (tabDiveRegistrations) => {
    console.log("receiveAllDiveRegistrations");
    Dive.LoadAllDiveRegistrations(tabDiveRegistrations);
});

socket.on('receiveAllDives', (tabDives) => {
    console.log("receiveAllDives");
    Dive.LoadAllDives(tabDives);
});

socket.on('receiveIsAdmin', (isAdmin) => {
    console.log("receiveIsAdmin");
    Dive.LoadIsAdmin(isAdmin);
});

socket.on('receiveUserProfile', (tabUserProfile) => {
    console.log("receiveUserProfile");
    Dive.LoadUserProfile(tabUserProfile);
});

socket.on('receiveAllDiveTeamMembers', (tabDiveTeamMembers) => {
    console.log("receiveAllDiveTeamMembers");
    Dive.LoadAllDiveTeamMembers(tabDiveTeamMembers);
});

socket.on('receiveAllDiveTeams', (tabDiveTeams) => {
    console.log("receiveAllDiveTeams");
    Dive.LoadAllDiveTeams(tabDiveTeams);
});

socket.on('receiveMaxDepthForQualification', (maxDepthForQualification) => {
    console.log("receiveMaxDepthForQualification");
    Dive.LoadMaxDepthForQualification(maxDepthForQualification);
});

socket.on('receiveIdPlannedDive', (idPlannedDive) => {
    console.log("receiveIdPlannedDive");
    Dive.LoadIdPlannedDive(idPlannedDive);
});

// EXPORT
export default {
    getAllDiveSites,
    getAllPlannedDives,
    getAllDivers,
    getAllDiveRegistrations,
    getAllDives,
    getAllDiveTeamMembers,
    getAllDiveTeams,
    getMaxDepthForQualification,
    getIsAdmin,
    getUserProfile,
    getIdPlannedDive,
    addDive,
    addDiveTeam,
    addDiveTeamMember,
    updateDive,
}