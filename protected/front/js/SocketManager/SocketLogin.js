let socket = io();

function SocketLogin(id_, fn, ln) {
    //console.log(fn, ln, id_);
    socket.emit('userLogin', id_, fn, ln);
}

export default {
    SocketLogin,
}