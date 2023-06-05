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
        //diver_div.style.display = 'block';
        //createDivDiver();
        //createAppUserDiv();
        createDiverBubble();
        createAppUserBubble();
    }
}

/*function createDivDiver(){
    // Create the main div element
    var diverDiv = document.createElement('div');
    diverDiv.setAttribute('class', 'home-list-item reversed');
    diverDiv.setAttribute('onclick', "location.href='/diver';");
    diverDiv.setAttribute('style', 'cursor: pointer;');

    // Create the first inner div element
    var imgDiv = document.createElement('div');

    // Create the image element
    var img = document.createElement('img');
    img.setAttribute('src', '/protected/front/img/boat.jpg');
    img.setAttribute('alt', 'boat');

    // Append the image to the first inner div
    imgDiv.appendChild(img);

    // Create the second inner div element
    var textDiv = document.createElement('div');

    // Create the paragraph element
    var paragraph = document.createElement('p');
    paragraph.setAttribute('class',  "home-list-text");
    paragraph.textContent = 'Diver (only admin)';

    // Append the paragraph to the second inner div
    textDiv.appendChild(paragraph);

    // Append the inner divs to the main div
    diverDiv.appendChild(imgDiv);
    diverDiv.appendChild(textDiv);

    // Append the main div to the document body or any other parent element
    document.getElementById('list-container-div').appendChild(diverDiv);
}

function createAppUserDiv(){
    // Create the main div element
    var appUserDiv = document.createElement('div');
    appUserDiv.setAttribute('class', 'home-list-item');
    appUserDiv.setAttribute('onclick', "location.href='/app_user';");
    appUserDiv.setAttribute('style', 'cursor: pointer;');

    // Create the first inner div element
    var imgDiv = document.createElement('div');

    // Create the image element
    var img = document.createElement('img');
    img.setAttribute('src', '/protected/front/img/boat.jpg');
    img.setAttribute('alt', 'boat');

    // Append the image to the first inner div
    imgDiv.appendChild(img);

    // Create the second inner div element
    var textDiv = document.createElement('div');

    // Create the paragraph element
    var paragraph = document.createElement('p');
    paragraph.setAttribute('class',  "home-list-text");
    paragraph.textContent = 'Application Users (only admin)';

    // Append the paragraph to the second inner div
    textDiv.appendChild(paragraph);

    // Append the inner divs to the main div
    appUserDiv.appendChild(imgDiv);
    appUserDiv.appendChild(textDiv);

    // Append the main div to the document body or any other parent element
    document.getElementById('list-container-div').appendChild(appUserDiv);
}*/

function createDiverBubble() {
        // Créer l'élément div
    const div = document.createElement("div");
    const ul = document.getElementById("bubble-list");
    div.id = "bubble-4";
    div.classList.add("bubble-item");
    div.style.cursor = "pointer";
    div.onclick = function() {
    location.href = "/diver";
    };

    // Créer l'élément section
    const section = document.createElement("section");
    section.className = "stage";

    // Créer l'élément p
    const p = document.createElement("p");
    p.className = "bubble-text";
    p.textContent = "Liste Plongeur";

    // Créer l'élément figure
    const figure = document.createElement("figure");
    figure.className = "ball bubble";

    // Ajouter les éléments à la structure parente
    figure.appendChild(p);
    section.appendChild(figure);
    div.appendChild(section);

    // Ajouter l'élément div au document
    ul.appendChild(div);
}

function createAppUserBubble() {
    // Créer l'élément div
    const div = document.createElement("div");
    const ul = document.getElementById("bubble-list");
    div.id = "bubble-5";
    div.classList.add("bubble-item");
    div.style.cursor = "pointer";
    div.onclick = function() {
    location.href = "/app_user";
    };

    // Créer l'élément section
    const section = document.createElement("section");
    section.className = "stage";

    // Créer l'élément p
    const p = document.createElement("p");
    p.className = "bubble-text";
    p.textContent = "Utilisateurs de l'application";

    // Créer l'élément figure
    const figure = document.createElement("figure");
    figure.className = "ball bubble";

    // Ajouter les éléments à la structure parente
    figure.appendChild(p);
    section.appendChild(figure);
    div.appendChild(section);

    // Ajouter l'élément div au document
    ul.appendChild(div);
}


export default {
    getIsAdmin,
}