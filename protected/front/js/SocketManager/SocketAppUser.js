import AppUser from '../app_user.js'

let socket = io();

// SOCKET EMIT

function getAllAppUsers() {
    socket.emit('getAllAppUsers');
}

function getAllDivers() {
    socket.emit('getAllDivers');
    //console.log("emitAllDivers");
}

function modifyAppUser(id, id_diver, isAdmin){
    socket.emit('modifyAppUser', id, id_diver, isAdmin);
    //console.log("emitModifyAppUser");
}

function updateInfosForAllUsers(id){
    socket.emit('actualizeBDD', id , window.location.pathname);
}

// SOCKET ON

socket.on('receiveAllAppUsers', (tabAppUsers) => {
    AppUser.LoadAllAppUsers(tabAppUsers);
});

socket.on('receiveAllDivers', (tabDivers) => {
    console.log("receiveAllDivers");
    AppUser.LoadAllDivers(tabDivers);
});

socket.on('updatePage', (id, currentPage) => {
    console.log("updatePage");
    AppUser.updatePage(id, currentPage);
});

export default {
    getAllAppUsers,
    getAllDivers,
    modifyAppUser,
    updateInfosForAllUsers
}