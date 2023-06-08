// Imports
import SocketManager from './SocketManager/SocketDives.js'
import DiveTeam from './Classes/dive_team.js'
import Dive from './Classes/dive.js'
import DiveSite from './Classes/dive_site.js'
import DiveRegistration from './Classes/dive_registration.js'
import Diver from './Classes/diver.js';
import DiveTeamMember from './Classes/dive_team_member.js';
import PlannedDive from './Classes/planned_dive.js';
import MaxDepthForQualification from './Classes/max_depth_for_qualification.js'

// Calling socket functions
SocketManager.getIdPlannedDive();
SocketManager.getAllDiveSites();
SocketManager.getAllPlannedDives();
SocketManager.getAllDivers();
SocketManager.getAllDiveRegistrations();
SocketManager.getAllDiveTeamMembers();
SocketManager.getAllDiveTeams();
SocketManager.getAllDives();
SocketManager.getIsAdmin();
SocketManager.getUserProfile();
SocketManager.getMaxDepthForQualification();

// Global variables
let tabPlannedDives = [];
let tabDiveSites = [];
let tabDivers = [];
let tabDiveRegistrations = [];
let tabDives = [];
let tabDiveTeamMembers = [];
let tabDiveTeams = [];
let tabMaxDepthForQualification = [];
let isAdmin = false;
let userProfile;

let idPlannedDive;

let loaded = 0;
let nbOfLoaded = 11;

var tablecounter = 0;

let mézon = document.getElementById("mézon");
mézon.onmouseover = function() {
    mézon.classList.add("fa-beat");
}

mézon.onmouseout = function() {
    mézon.classList.remove("fa-beat");
}

document.getElementById("mézon").addEventListener("click", (e) => {
        location.href = '/protected/';
});


/********************************************************************/
/*                         LOAD INFORMATIONS                        */
/********************************************************************/

function LoadAllPlannedDives(tab) {
    tab.forEach(element => {
        let tmp = new PlannedDive(element.Id_Planned_Dive,element.Planned_Date, element.Planned_Time, element.Comments, element.Special_Needs, element.Status, element.Diver_Price, element.Instructor_Price, element.Dive_Site_Id_Dive_Site);
        tabPlannedDives.push(tmp);
    });
    //console.log(tabPlannedDives);
    loaded++;
    checkLoaded();
}

function LoadAllDiveSites(tab){
    tab.forEach(element => {
        let tmp = new DiveSite(element.Id_Dive_Site,element.Site_Name, element.Gps_Latitude, element.Gps_Longitude, element.Track_Type, element.Track_Number, element.Track_Name, element.Zip_Code, element.City_Name, element.Country_Name, element.Additional_Address, element.Tel_Number, element.Information_URL, element.Image);
        tabDiveSites.push(tmp);
    });
    //console.log(tabDiveSites);
    loaded++;
    checkLoaded();
}

function LoadAllDivers(tab){
    tab.forEach(element => {
        let tmp = new Diver(element.Id_Diver,element.Lastname,element.Firstname,element.Diver_Qualifications,element.Instructor_Qualification,element.Nox_Level,element.Additional_Qualifications,element.License_Number,element.License_Expiration_Date,element.Medical_Certificate_Expiration_Date,element.Birthdate);
        tabDivers.push(tmp);
    });
    //console.log(tabDivers);
    loaded++;
    checkLoaded();
}

function LoadAllDiveRegistrations(tab){
    tab.forEach(element => {
        let tmp = new DiveRegistration(element.Diver_Id_Diver,element.Planned_Dive_Id_Planned_Dive,element.Diver_Role,element.Resgistration_Timestamp,element.Personal_Comment,element.Car_Pooling_Seat_Offered,element.Car_Pooling_Seat_Request);
        tabDiveRegistrations.push(tmp);
    });
    //console.log(tabDiveRegistrations);
    loaded++;
    checkLoaded();
}

function LoadAllDives(tab){
    tab.forEach(element => {
        let tmp = new Dive(element.Id_Dive,element.Begin_Time,element.Begin_Date,element.End_Date,element.End_Time,element.Comment,element.Surface_Security,element.Dive_Price,element.Instructor_Price,element.Max_Ppo2,element.Diver_Id_Diver,element.Planned_Dive_Id_Planned_Dive);
        tabDives.push(tmp);
    });
    console.log(tabDives);
    loaded++;
    checkLoaded();
}

function LoadIsAdmin(isAdmin_){
    isAdmin = isAdmin_;
    loaded++;
    checkLoaded();
}

function LoadUserProfile(userProfile_){
    userProfile = userProfile_;
    //console.log(userProfile);
    loaded++;
    checkLoaded();
}

function LoadAllDiveTeamMembers(tab){
    tab.forEach(element => {
        let tmp = new DiveTeamMember(element.Diver_Id_Diver,element.Dive_team_Id_Dive_Team,element.Temporary_Diver_Qualification,element.Current_Diver_Qualification,element.Diver_Role,element.Current_Instructor_Qualification,element.Nox_Percentage,element.Comment,element.Paid_Amount);
        tabDiveTeamMembers.push(tmp);
    });
    console.log(tabDiveTeamMembers);
    loaded++;
    checkLoaded();
}

function LoadAllDiveTeams(tab){
    tab.forEach(element => {
        let tmp = new DiveTeam(element.Id_Dive_Team,element.Max_Depth,element.Max_Duration,element.Real_Depth,element.Dive_Type,element.Dive_Type, element.Sequence_number,element.Start_Time,element.Stop_Time,element.Comment,element.Diver_Guide_Id_Diver, element.Dive_Id_Dive);
        tabDiveTeams.push(tmp);
    });
    console.log(tabDiveTeams);
    loaded++;
    checkLoaded();
}

function LoadMaxDepthForQualification(tab){
    tab.forEach(element => {
        let tmp = new MaxDepthForQualification(element.Id_Max_Depth_for_Qualification,element.Diver_Qualification,element.Diver_Age,element.Guided_Diver_Depth,element.Autonomous_Diver_Depth);
        tabMaxDepthForQualification.push(tmp);
    });
    //console.log(tabMaxDepthForQualification);
    loaded++;
    checkLoaded();
}

function LoadIdPlannedDive(idPlannedDive_){
    idPlannedDive = idPlannedDive_;
    loaded++;
    checkLoaded();
}

function setButtonListener(){
    const ajoutTabBouton = document.getElementById('ajouter-tableau');
    ajoutTabBouton.addEventListener('click', event => {
        creationTableauPalanquee(5,6);
    });

    const deleteAllTab = document.getElementById('clear-tableaux');
    deleteAllTab.addEventListener('click', event => {
        supprimerTousLesTableaux();
    });

    const attributionAutomatique = document.getElementById('attribution-automatique');
    attributionAutomatique.addEventListener('click', event => {
        attributionAutomatique();
    });

}

function suppressionTableauPalanquée(tableId){
    console.log("Suppression du tableau " + tableId);
    const table = document.getElementById(tableId);
    const tableBody = document.getElementById('tableBody');
    
    //Check if the table is empty
    if (tableBody.childElementCount > 5) {
        console.log("Tableau rempli");
        confirm("Impossible de supprimer un tableau rempli, merci de vider le tableau avant de le supprimer");
    }
    else{
        for (let i = tableId; i < tablecounter; i++) {
            console.log("Tableau " + i);
            let tmp = parseInt(i)+1;
            console.log(tmp);
            let table2 = document.getElementById(tmp);
            console.log(table2);
            table2.setAttribute('id', i);
            // Append
            let td = table2.getElementsByTagName('td')[0];
            td.innerHTML = "Palanquée " + table2.id;
        }
        // Remove the table
        console.log(tableId);
        table.parentNode.remove();
        tablecounter--; 
    }
    

    console.log("Nombre tableaux : " + tablecounter)
}

function supprimerTousLesTableaux(){
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = "";
    tablecounter = 0;
}

function attributionAutomatique(){
    // Cette fonction a pour but de répartir les inscrits en fonction de l'âge et du niveau dans les différentes palanquées
    console.log("Non réalisé")
    
}

// TABLEAU PALANQUÉE

function creationTableauPalanquee(rows, columns) {

    tablecounter++;

    const tableDiv = document.createElement('div');
    tableDiv.classList.add('tableDiv');

    // Create a new table element
    const table = document.createElement('table');
    table.classList.add('blueTable');
    table.classList.add('tableDiveTeam');
    const tableId = tablecounter;
    table.id = tableId;


    // Create the table header
    const thead = document.createElement('thead');
    
    const tr = document.createElement('tr');
    tr.classList.add('tr');

    let th1 = document.createElement('th');
    th1.innerHTML = "Nom";
    tr.appendChild(th1);

    let th2 = document.createElement('th');
    th2.innerHTML = "Prénom";
    tr.appendChild(th2);

    let th3 = document.createElement('th');
    th3.innerHTML = "Niveau";
    tr.appendChild(th3);

    let th4 = document.createElement('th');
    th4.innerHTML = "Âge";
    tr.appendChild(th4);

    let th5 = document.createElement('th');
    th5.innerHTML = "Rôle";
    tr.appendChild(th5);

    thead.appendChild(tr);
    table.appendChild(thead);

    // Create the table body with rows and cells
    const tbody = document.createElement('tbody');
    tbody.id = "tableBody";

    let isPassed = false;
    let isPassed2 = false;

    for (let i = 0; i < rows; i++) {

        const row = document.createElement('tr');
        row.classList.add('tr');
        row.classList.add('my-handle');

        if(isPassed == false){

            for (let j = 0; j < columns - 1; j++) {

                if(isPassed2 == false){
                    const cell = document.createElement('td');
                    // Make a colspan of the number of columns for the last cell
                    cell.setAttribute('colspan', columns - 1);
                    cell.classList.add('static');
                    cell.innerHTML = "Palanquée " + tableId;
                    isPassed2 = true;
                              
                    row.appendChild(cell);
                }
                isPassed = true;

            }
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);


    // Append the table to the container
    const tableContainer = document.getElementById('tableContainer');
    tableDiv.appendChild(table);
    const supprButton = document.createElement('button');
    supprButton.setAttribute("id", "supprButton" + tableId);
    supprButton.addEventListener('click', event => {
        console.log(event.target.parentNode.firstChild.id);
        suppressionTableauPalanquée(event.target.parentNode.firstChild.id);
    });
    supprButton.innerHTML = "Supprimer le tableau";
    tableDiv.appendChild(supprButton);
    tableContainer.appendChild(tableDiv);

    // Initialize SortableJS for the new table
    new Sortable(tbody, {
        filter : ".static",
        group: 'shared',
        handle: ".my-handle",
        animation: 150,
        draggable: ".tr",
    });
}


// TABLEAU INSCRITS

function createTableInscrits() {

    // Create a new table element
    const table = document.createElement('table');
    table.classList.add('blueTable');
    table.classList.add('tableInscrits');

    // Create the table header
    const thead = document.createElement('thead');

    const tr = document.createElement('tr');
    tr.classList.add('tr');

    let th1 = document.createElement('th');
    th1.innerHTML = "Nom";
    tr.appendChild(th1);

    let th2 = document.createElement('th');
    th2.innerHTML = "Prénom";
    tr.appendChild(th2);

    let th3 = document.createElement('th');
    th3.innerHTML = "Niveau";
    tr.appendChild(th3);

    let th4 = document.createElement('th');
    th4.innerHTML = "Âge";
    tr.appendChild(th4);

    let th5 = document.createElement('th');
    th5.innerHTML = "Rôle";
    tr.appendChild(th5);

    thead.appendChild(tr);
    table.appendChild(thead);

    // Create the table body with rows and cells

    const tbody = document.createElement('tbody');

    for (let i = 0; i < tabDiveRegistrations.length; i++) {

        if(tabDiveRegistrations[i].get_planned_dive_id() == idPlannedDive) { // Mettre l'id de la plongée ici
            let ligne = document.createElement('tr');
            ligne.classList.add('tr');
            ligne.classList.add('my-handle');

            let celluleNom = document.createElement('td');
            celluleNom.innerHTML = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_last_name();

            let cellulePrenom = document.createElement('td');
            cellulePrenom.innerHTML = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_first_name();

            let celluleNiveau = document.createElement('td');
            let diverqualif = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_diver_qualification();

            switch(parseInt(diverqualif)){
                case 1:
                    celluleNiveau.innerHTML = "Etoile de mer 1";
                    break;
                case 2:
                    celluleNiveau.innerHTML = "Bronze";
                    break;
                case 3:
                    celluleNiveau.innerHTML = "Argent";
                    break;
                case 4:
                    celluleNiveau.innerHTML = "Or";
                    break;
                case 5:
                    celluleNiveau.innerHTML = "N1";
                    break;
                case 6:
                    celluleNiveau.innerHTML = "N2";
                    break;
                case 7:
                    celluleNiveau.innerHTML = "N3";
                    break;
                case 8:
                    celluleNiveau.innerHTML = "N4";
                    break;
                case 11:
                    celluleNiveau.innerHTML = "Aucun";
                    break;
                case 12:
                    celluleNiveau.innerHTML = "Etoile de mer 2";
                    break;
                case 13:
                    celluleNiveau.innerHTML = "Etoile de mer 3";
                    break;
                default:
                    celluleNiveau.innerHTML = "Inconnu"
                    break;
            }


            let celluleAge = document.createElement('td');
            let age = calculerAge(getDiverById(tabDiveRegistrations[i].get_diver_id()).get_birth_date());
            celluleAge.innerHTML = age;

            let celluleRole = document.createElement('td');
            celluleRole.innerHTML = tabDiveRegistrations[i].get_diver_role();

            ligne.appendChild(celluleNom);
            ligne.appendChild(cellulePrenom);
            ligne.appendChild(celluleNiveau);
            ligne.appendChild(celluleAge);
            ligne.appendChild(celluleRole);

            tbody.appendChild(ligne);
        }

    }

    table.appendChild(tbody);

    // Append the table to the container
    const tableContainer = document.getElementById('tableContainerInscrits');
    tableContainer.appendChild(table);

    // Initialize SortableJS for the new table

    // Initialize SortableJS for the new table
    new Sortable(tbody, {
        group: 'shared',
        handle: ".my-handle",
        animation: 150,
        draggable: ".tr",
    });

}



function calculerAge(dateNaissance) {
    let maintenant = new Date();
    let anneeActuelle = maintenant.getFullYear();
    let anneeNaissance = new Date(dateNaissance).getFullYear();
    
    let age = anneeActuelle - anneeNaissance;
    
    return age;
}

// Algorithme de répartition des palanquées en fonction du niveau, de l'âge et de l'expérience des plongeurs
function repartitionPalanquees() {
 
    // Séparation des plongeurs en fonction de leur âge
    let diversJunior = [];
    let diversSenior = [];

    for (let i = 0; i < tabDives.length; i++) {
        if(calculerAge(tabDives[i].birthdate) < 18) {
            diversJunior.push(tabDives[i]);
        }
        else {
            diversSenior.push(tabDives[i]);
        }
    }

    // Séparation des plongeurs en fonction de leur niveau de plongeur

    let diversN1 = [];
    let diversN2 = [];
    let diversN3 = [];
    let diversN4 = [];
    let diversN5 = [];
    let diversEM1 = [];
    let diversEM2 = [];
    let diversEM3 = [];

    for (let i = 0; i < tabDivers[i].length; i++) {
        
        switch (tabDivers[i].get_diver_qualification()) {
            case "N1":
                diversN1.push(tabDivers[i]);
                break;
            case "N2":
                diversN2.push(tabDivers[i]);
                break;
            case "N3":
                diversN3.push(tabDivers[i]);
                break;
            case "N4":
                diversN4.push(tabDivers[i]);
                break;
            case "N5":
                diversN5.push(tabDivers[i]);
                break;
            case "EM1":
                diversEM1.push(tabDivers[i]);
                break;
            case "EM2":
                diversEM2.push(tabDivers[i]);
                break;
            case "EM3":
                diversEM3.push(tabDivers[i]);
                break;
            default:
                break;
        }
    
    }
}

function getDiverById(id){
    for(let i = 0; i < tabDivers.length; i++){
        if(tabDivers[i].get_id() == id){
            return tabDivers[i];
        }
    }
    return null;
}

function checkLoaded(){
    if(loaded == nbOfLoaded){
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
        loaded = 0;
        setButtonListener();
        createTableInscrits();
    }
}

export default {
    LoadAllPlannedDives,
    LoadAllDivers,
    LoadAllDiveSites,
    LoadAllDiveRegistrations,
    LoadAllDives,
    LoadIsAdmin,
    LoadUserProfile,
    LoadAllDiveTeamMembers,
    LoadAllDiveTeams,
    LoadMaxDepthForQualification,
    LoadIdPlannedDive,
}
