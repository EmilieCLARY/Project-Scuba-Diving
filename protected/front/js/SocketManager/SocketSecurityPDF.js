import Secu_PDF from '../security_pdf.js';

let socket = io();

function getAllPlannedDives() {
    socket.emit('getAllPlannedDives');
}

function getAllDiveSites() {
    socket.emit('getAllDiveSites');
}

function getAllDivers() {
    socket.emit('getAllDivers');
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

function getIdPlannedDive(){
    socket.emit('getIdPlannedDive');
}

socket.on('receiveIdPlannedDive', (idPlannedDive) => {
    console.log("receiveIdPlannedDive");
    Secu_PDF.LoadIdPlannedDive(idPlannedDive);
});

socket.on('receiveAllPlannedDives', (tabPlannedDives) => {
    console.log("receiveAllPlannedDives");
    Secu_PDF.LoadAllPlannedDives(tabPlannedDives);
});

socket.on('receiveAllDiveSites', (tabDiveSites) => {
    console.log("receiveAllDiveSites");
    Secu_PDF.LoadAllDiveSites(tabDiveSites);
});

socket.on('receiveAllDivers', (tabDivers) => {
    console.log("receiveAllDivers");
    Secu_PDF.LoadAllDivers(tabDivers);
});

socket.on('receiveAllDives', (tabDives) => {
    console.log("receiveAllDives");
    Secu_PDF.LoadAllDives(tabDives);
});

socket.on('receiveAllDiveTeamMembers', (tabDiveTeamMembers) => {
    console.log("receiveAllDiveTeamMembers");
    Secu_PDF.LoadAllDiveTeamMembers(tabDiveTeamMembers);
});

socket.on('receiveAllDiveTeams', (tabDiveTeams) => {
    console.log("receiveAllDiveTeams");
    Secu_PDF.LoadAllDiveTeams(tabDiveTeams);
});

export default {
    getAllPlannedDives,
    getAllDiveSites,
    getAllDivers,
    getAllDives,
    getAllDiveTeamMembers,
    getAllDiveTeams,
    getIdPlannedDive
}