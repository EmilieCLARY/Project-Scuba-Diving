import DiveSite from "../dive_site.js";

let socket = io();

// SOCKET EMIT

function getAllDiveSites() {
    socket.emit('getAllDiveSites');
}

function getAllPlannedDives() {
    socket.emit('getAllPlannedDives');
}

// Add a new dive site
function addDiveSite(id, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image) {
    socket.emit('addDiveSite', id, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image);
    //console.log("emitAddDiveSite");
}

function deleteDiveSite(id) {
    socket.emit('deleteInDb', "Dive_Site", id);
    //console.log("emitDeleteDiveSite");
}

function modifyDiveSite(id, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image) {
    socket.emit('modifyDiveSite', id, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image);
    //console.log("emitModifyDiveSite");
}

function getIsAdmin(){
    socket.emit('getIsAdmin');
}

// SOCKET ON

socket.on('receiveAllDiveSites', (tabDiveSites) => {
    DiveSite.LoadAllDiveSites(tabDiveSites);
});

socket.on('receiveAllPlannedDives', (tabPlannedDives) => {
    DiveSite.LoadAllPlannedDives(tabPlannedDives);
});

socket.on('receiveIsAdmin', (isAdmin) => {
    DiveSite.LoadIsAdmin(isAdmin);
});

// EXPORT
export default {
    getAllDiveSites,
    getAllPlannedDives,
    addDiveSite,
    deleteDiveSite,
    modifyDiveSite,
    getIsAdmin,
}