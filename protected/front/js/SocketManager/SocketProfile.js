import UserProfile from '../profile.js';

let socket = io();

// SOCKET EMIT

function getUserProfile() {
    socket.emit('getUserProfile');
}

// SOCKET ON

socket.on('receiveUserProfile', (tabUserProfile) => {
    console.log("receiveUserProfile");
    UserProfile.LoadUserProfile(tabUserProfile);
});


// EXPORT
export default {
    getUserProfile,
}