import SocketManager from './SocketManager/SocketProtected.js';

let first_name;
let last_name;
let id;

let diver_div = document.getElementById('diver-div');
let app_user_div = document.getElementById('app-user-div');

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


function getIsAdmin(isAdmin){
    if(isAdmin == 1){
        createDiverBubble();
        createAppUserBubble();
    }
}

function createDiverBubble() {
    // Créer l'élément div
    const list = document.getElementById("list-container-div");
    const div = document.createElement("div");
    
    div.classList.add("home-list-container-item");
    div.setAttribute("id", "bubble-diver");
    div.style.cursor = "pointer";
    div.onclick = function() {
        location.href = "/diver";
    };

    // Créer l'élément p
    const p = document.createElement("p");
    p.className = "bubble-text";
    p.textContent = "Liste des plongeurs";

    // Ajouter l'élément p à l'élément div
    div.appendChild(p);

    // Ajouter l'élément div au document
    list.appendChild(div);
}

function createAppUserBubble() {
    // Créer l'élément div
    const list = document.getElementById("list-container-div");
    const div = document.createElement("div");
    
    div.classList.add("home-list-container-item");
    div.setAttribute("id", "bubble-app-user");
    div.style.cursor = "pointer";
    div.onclick = function() {
        location.href = "/app_user";
    };

    // Créer l'élément p
    const p = document.createElement("p");
    p.className = "bubble-text";
    p.textContent = "Utilisateurs";

    // Ajouter l'élément p à l'élément div
    div.appendChild(p);

    // Ajouter l'élément div au document
    list.appendChild(div);

    // Animation des bulles
    bubbleAnimation();
}

function bubbleAnimation(){
    let bubble_profile = document.getElementById('bubble-profile');
    let bubble_diver = document.getElementById('bubble-diver');
    let bubble_app_user = document.getElementById('bubble-app-user');
    let bubble_dive_site = document.getElementById('bubble-dive-site');
    let bubble_planned_dive = document.getElementById('bubble-planned-dive');

    bubble_profile.onmouseover = function() {
        bubble_profile.classList.add("fa-beat");
    }

    bubble_profile.onmouseout = function() {
        bubble_profile.classList.remove("fa-beat");
    }

    bubble_profile.onclick = function() {
        location.href = "/profile";
    }

    bubble_diver.onmouseover = function() {
        bubble_diver.classList.add("fa-beat");
    }

    bubble_diver.onmouseout = function() {  
        bubble_diver.classList.remove("fa-beat");
    }

    bubble_diver.onclick = function() {
        location.href = "/diver";
    }

    bubble_app_user.onmouseover = function() {
        bubble_app_user.classList.add("fa-beat");
    }

    bubble_app_user.onmouseout = function() {
        bubble_app_user.classList.remove("fa-beat");
    }

    bubble_app_user.onclick = function() {
        location.href = "/app_user";
    }

    bubble_dive_site.onmouseover = function() {
        bubble_dive_site.classList.add("fa-beat");
    }

    bubble_dive_site.onmouseout = function() {
        bubble_dive_site.classList.remove("fa-beat");
    }

    bubble_dive_site.onclick = function() {
        location.href = "/dive_site";
    }

    bubble_planned_dive.onmouseover = function() {
        bubble_planned_dive.classList.add("fa-beat");
    }

    bubble_planned_dive.onmouseout = function() {
        bubble_planned_dive.classList.remove("fa-beat");
    }

    bubble_planned_dive.onclick = function() {
        location.href = "/planned_dive";
    }

}


export default {
    getIsAdmin,
}