import UserProfile from '../profile.js';

let socket = io();

// SOCKET EMIT

function getUserProfile() {
    socket.emit('getUserProfile');
}

function modifyDiver(id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date){
    socket.emit('modifyDiver',id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);
    //console.log("emitModifyDiver");
}

// SOCKET ON

socket.on('receiveUserProfile', (tabUserProfile) => {
    console.log("receiveUserProfile");
    UserProfile.LoadUserProfile(tabUserProfile);
});


// EXPORT
export default {
    getUserProfile,
    modifyDiver,
}