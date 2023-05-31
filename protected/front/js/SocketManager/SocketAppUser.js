import AppUser from '../app_user.js'

let socket = io();

// SOCKET EMIT

function getAllAppUsers() {
    socket.emit('getAllAppUsers');
}

// SOCKET ON

socket.on('receiveAllAppUsers', (tabAppUsers) => {
    AppUser.LoadAllAppUsers(tabAppUsers);
});

export default {
    getAllAppUsers,
}