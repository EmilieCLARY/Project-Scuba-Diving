import SocketManager from './SocketManager/SocketLogin.js';

let first_name;
let last_name;
let id;

function loadInfo() {
    $.getJSON('/protected/api/idPayload', function (id_token) {
		first_name = id_token.given_name;
        last_name = id_token.family_name;
        id = id_token.sub;
        //console.log(first_name, last_name, id);
		//$('#idTokenPayload').jsonViewer(id_token, {collapsed: false});
        SocketManager.SocketLogin(id, first_name, last_name);
    });
}

loadInfo();