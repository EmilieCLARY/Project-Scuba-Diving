import Divers from "../diver.js";

console.log("SocketDiver.js OUAIS");

let socket = io();

// SOCKET EMIT

function getAllDivers() {
    socket.emit('getAllDivers');
    //console.log("emitAllDivers");
}

function addDiver(id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date){
    socket.emit('addDiver',id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);
    //console.log("emitAddDiver");
}

// SOCKET ON

socket.on('receiveAllDivers', (tabDivers) => {
    console.log("receiveAllDivers");
    Divers.LoadAllDivers(tabDivers);
});

// EXPORT
export default {
    getAllDivers,
    addDiver,
}