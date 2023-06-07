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
}