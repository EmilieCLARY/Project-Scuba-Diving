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

// SOCKET ON

socket.on('receiveAllDiveSites', (tabDiveSites) => {
    DiveSite.LoadAllDiveSites(tabDiveSites);
});

socket.on('receiveAllPlannedDives', (tabPlannedDives) => {
    DiveSite.LoadAllPlannedDives(tabPlannedDives);
});

// EXPORT
export default {
    getAllDiveSites,
    getAllPlannedDives,
    addDiveSite,
}