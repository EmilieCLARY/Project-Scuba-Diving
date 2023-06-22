// Imports
import SocketManager from './SocketManager/SocketAppUser.js'
import AppUser from './Classes/app_user.js'
import Diver from './Classes/diver.js'

// Calling socket functions
SocketManager.getAllAppUsers();
SocketManager.getAllDivers();

// Global variables
let tabAppUsers = [];
let tabDivers = [];
let modifiedAppUser;

/********************************************************************/
/*                              MODALS                              */
/********************************************************************/

let modal = document.getElementById("form-appuser-container");
let closeModal = document.getElementById("close-site-modal");
let closeButton = document.getElementById("diver-close-button");
let mézon = document.getElementById("mézon");

document.getElementById("ring-loading").style.display = "none";

closeModal.onclick = function() {
    modal.style.display = "none";
}

closeModal.onmouseover = function() {
    closeButton.classList.add("fa-shake");
}

closeModal.onmouseout = function() {
    closeButton.classList.remove("fa-shake");
}

mézon.onmouseover = function() {
    mézon.classList.add("fa-beat");
}

mézon.onmouseout = function() {
    mézon.classList.remove("fa-beat");
}

document.getElementById("mézon").addEventListener("click", (e) => {
        location.href = '/protected/';
});

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

/********************************************************************/
/*                         LOAD INFORMATIONS                        */
/********************************************************************/

function LoadAllAppUsers(tab){
    tab.forEach(element => {
        let tmp = new AppUser(element.Id_Application_User, element.Lastname, element.Firstname, element.Id_Diver, element.isAdmin);
        tabAppUsers.push(tmp);
    });
    //console.log(tabAppUsers);
    createAppUserTable(tabAppUsers);
    setListeners();
}

function LoadAllDivers(tab){
    tab.forEach(element => {
        let tmp = new Diver(element.Id_Diver,element.Lastname,element.Firstname,element.Diver_Qualifications,element.Instructor_Qualification,element.Nox_Level,element.Additional_Qualifications,element.License_Number,element.License_Expiration_Date,element.Medical_Certificate_Expiration_Date,element.Birthdate);
        tabDivers.push(tmp);
    });
    //console.log(tabDivers);
}

/********************************************************************/
/*                    SETTING LISTENERS FUNCTIONS                   */
/********************************************************************/

function setListeners(){
    for(let i = 0; i < tabAppUsers.length; i++){
        let btn = document.getElementById("btn_modif" + tabAppUsers[i].get_id());
        btn.addEventListener("click", function(){
            //console.log("Modification de l'utilisateur " + tabAppUsers[i].get_id());
            modifierAppUser(tabAppUsers[i].get_id());
        });
    }
}

function setButtonValidateListener(){
    document.getElementById("validate-appuser").addEventListener("click", function(){
        // Get all input
        let Id_Diver = document.getElementById("app-user-diver").value;
        let isAdmin = document.getElementById("app-user-admin").value;

        // Send to server
        // Check if Id_Diver exist
        //console.log(Id_Diver);
        if(tabDivers.find(element => element.get_id() == Id_Diver) == undefined){
            alert("Le plongeur avec cet ID n'existe pas");
            return;
        }
        
        SocketManager.modifyAppUser(modifiedAppUser,Id_Diver, isAdmin);
        // Clear all input
        document.getElementById("app-user-diver").value = "";
        document.getElementById("app-user-admin").value = "0";

        // Closing modal
        modal.style.display = "none";

        document.getElementById("ring-loading").style.display = "block";
        document.body.style.cursor = "wait";        
        setTimeout(function() {
            SocketManager.updateInfosForAllUsers(0);
            updateAppUser();
            document.getElementById("ring-loading").style.display = "none";
            document.body.style.cursor = "default";
        }, 1000);
    });
}

setButtonValidateListener();

/********************************************************************/
/*                        CREATING FUNCTIONS                        */
/********************************************************************/

function createAppUserTable(tabAppUsers){
    let table = document.getElementById("liste_user");
    table.innerHTML = "";
    //console.log(tabAppUsers);

    let tableau = document.createElement("table");
    tableau.classList.add("blueTable");

    let head = document.createElement("thead");

    /* Première Row */

    let tr = document.createElement("tr");
    tr.classList.add("tr");

    let th1 = document.createElement("th");
    th1.innerHTML = "Id Utilisateur";
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.innerHTML = "Nom";
    tr.appendChild(th2);

    let th3 = document.createElement("th");
    th3.innerHTML = "Prénom";
    tr.appendChild(th3);

    let th4 = document.createElement("th");
    th4.innerHTML = "Id Plongeur";
    tr.appendChild(th4);

    let th5 = document.createElement("th");
    th5.innerHTML = "Type de compte";
    tr.appendChild(th5);

    let th6 = document.createElement("th");
    th6.classList.add("th6");
    th6.innerHTML = "Modifier";
    tr.appendChild(th6);


    head.appendChild(tr);
    tableau.appendChild(head);

    /* Fin Première Row */

    let tbody = document.createElement("tbody");

    for(let i = 0; i < tabAppUsers.length; i++){

        let ligne = document.createElement("tr");
        ligne.classList.add("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = tabAppUsers[i].get_id();

        let td2 = document.createElement("td");
        td2.innerHTML = tabAppUsers[i].get_Lastname();

        let td3 = document.createElement("td");
        td3.innerHTML = tabAppUsers[i].get_Firstname();

        let td4 = document.createElement("td");
        td4.innerHTML = tabAppUsers[i].get_Id_Diver();

        let td5 = document.createElement("td");
        switch(tabAppUsers[i].get_isAdmin()){
            case 0:
                td5.innerHTML = "Utilisateur";
                break;
            case 1:
                td5.innerHTML = "Administrateur";
                break;
            default:
                td5.innerHTML = "Inconnu";
                break;
        }

        let td6 = document.createElement("td");
        let span_6 = document.createElement("span");
        span_6.classList.add("cursor-pointer");
        let i_td6 = document.createElement("i");
        i_td6.setAttribute("id", "btn_modif" + tabAppUsers[i].get_id());
        i_td6.classList.add("fa-solid");
        i_td6.classList.add("fa-pen-to-square");

        span_6.appendChild(i_td6);
        td6.appendChild(span_6);

        ligne.appendChild(td1);
        ligne.appendChild(td2);
        ligne.appendChild(td3);
        ligne.appendChild(td4);
        ligne.appendChild(td5);
        ligne.appendChild(td6);

        tbody.appendChild(ligne);
        tableau.appendChild(tbody);
        table.appendChild(tableau);
    }
}

/********************************************************************/
/*                         UPDATING FUNCTIONS                       */
/********************************************************************/

function updateAppUser(){
    tabAppUsers = [];
    SocketManager.getAllAppUsers();
}

function modifierAppUser(id){
    modifiedAppUser = id;

    let user = getUserById(id);

    document.getElementById("app-user-diver").value = user.get_Id_Diver();
    document.getElementById("app-user-admin").value = user.get_isAdmin();

    modal.style.display = "block";
}

/********************************************************************/
/*                          OTHER FUNCTIONS                         */
/********************************************************************/

function getUserById(id){
    for(let i = 0; i < tabAppUsers.length; i++){
        if(tabAppUsers[i].get_id() == id){
            return tabAppUsers[i];
        }
    }
    return null;
}

function updatePage(id, path){
    //console.log(id, idPlannedDive, path, window.location.pathname)
    if(path == window.location.pathname){
        alert("Les informations ont été mises à jour par un autre utilisateur. La page va se recharger.");
        window.location.reload();
    }
}

// Exports
export default {
    LoadAllAppUsers,
    LoadAllDivers,
    updatePage
}