import Protected from '../protected.js'
let socket = io();

// SOCKET EMIT

function SocketLogin(id_, fn, ln) {
    //console.log(fn, ln, id_);
    socket.emit('userLogin', id_, fn, ln);
}

// SOCKET ON

socket.on('loginSuccess', (isAdmin) => {
    //console.log(isAdmin);
    Protected.getIsAdmin(isAdmin);
});

export default {
    SocketLogin,
}