// Imports
import SocketManager from './SocketManager/SocketDiver.js'
import Diver from './Classes/diver.js'

// Calling socket functions
SocketManager.getAllDivers();

// Global variables
let tabDivers = [];

let modifyMode = false;
let modifiedDiver = -1;

let loaded = 0;
let nbOfLoaded = 1;

let currentSortWay = "croissant";

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

// Hide loading ring
//document.getElementById("ring-loading").style.display = "none";

/********************************************************************/
/*                             MODALS                               */
/********************************************************************/

let modal = document.getElementById("form-diver-container");
let openModal = document.getElementById("open-site-modal-diver");
let closeModal = document.getElementById("close-site-modal");
let choseImage = document.getElementById("dive-site-image-button");
let closeButton = document.getElementById("diver-close-button");

openModal.onclick = function() {
    // Clear all input
    document.getElementById("diver-firstname").value = "";
    document.getElementById("diver-lastname").value = "";
    document.getElementById("diver-qualification").value = "11";
    document.getElementById("diver-instructor-qualification").value = "1";
    document.getElementById("diver-nox-level").value = "1";
    document.getElementById("diver-additionnal-qualification").value = "";
    document.getElementById("diver-license-number").value = "";
    document.getElementById("diver-license-expiration-date").value = "";
    document.getElementById("diver-medical-certificate-expiration-date").value = "";
    document.getElementById("diver-birthdate").value = "";

    document.getElementById("title-diver-modal").innerHTML = "Ajout d'un plongeur";
    document.getElementById("validate-diver").innerHTML = "Créer le plongeur";

    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

closeModal.onmouseover = function() {
    closeButton.classList.add("fa-shake");
}

closeModal.onmouseout = function() {
    closeButton.classList.remove("fa-shake");
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

/********************************************************************/
/*                         LOAD INFORMATIONS                        */
/********************************************************************/

function LoadAllDivers(tab){
    tab.forEach(element => {
        let tmp = new Diver(element.Id_Diver,element.Lastname,element.Firstname,element.Diver_Qualifications,element.Instructor_Qualification,element.Nox_Level,element.Additional_Qualifications,element.License_Number,element.License_Expiration_Date,element.Medical_Certificate_Expiration_Date,element.Birthdate);
        tabDivers.push(tmp);
    });
    createDiverTableHeaders(tabDivers);
    createDiverTableBody(tabDivers);
    setListeners();
    //console.log(tabDivers);
    loaded = 1;
    checkLoaded();
}

/********************************************************************/
/*                        CREATING FUNCTIONS                        */
/********************************************************************/

function createDiverTableHeaders(){    
    let head = document.getElementById("thead-diver-liste");
    head.innerHTML = "";

    /* Première Row*/

    let tr = document.createElement("tr");
    tr.classList.add("tr");

    let th1 = document.createElement("th");
    th1.classList.add("th1");
    th1.setAttribute("id", "th1-diver");
    th1.innerHTML = "Id plongeur  ";
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.classList.add("th2");
    th2.setAttribute("id", "th2-diver");
    th2.innerHTML = "Nom  ";
    tr.appendChild(th2);

    let th3 = document.createElement("th");
    th3.classList.add("th3");
    th3.setAttribute("id", "th3-diver");
    th3.innerHTML = "Prénom  ";
    tr.appendChild(th3);
    
    let th4 = document.createElement("th");
    th4.classList.add("th4");
    th4.setAttribute("id", "th4-diver");
    th4.innerHTML = "Qualification plongeur  ";
    tr.appendChild(th4);
    
    let th5 = document.createElement("th");
    th5.classList.add("th5");
    th5.setAttribute("id", "th5-diver");
    th5.innerHTML = "Qualification moniteur  ";
    tr.appendChild(th5);

    let th6 = document.createElement("th");
    th6.classList.add("th6");
    th6.setAttribute("id", "th6-diver");
    th6.innerHTML = "Qualification NITROX  ";
    tr.appendChild(th6);
    
    let th7 = document.createElement("th");
    th7.classList.add("th7");
    th7.setAttribute("id", "th7-diver");
    th7.innerHTML = "Qualification(s) additionnelle(s)  ";
    tr.appendChild(th7);

    let th8 = document.createElement("th");
    th8.classList.add("th8");
    th8.setAttribute("id", "th8-diver");
    th8.innerHTML = "Numéro de licence  ";
    tr.appendChild(th8);

    let th9 = document.createElement("th");
    th9.classList.add("th9");
    th9.setAttribute("id", "th9-diver");
    th9.innerHTML = "Date d'expiration de la licence  ";
    tr.appendChild(th9);

    let th10 = document.createElement("th");
    th10.classList.add("th10");
    th10.setAttribute("id", "th10-diver");
    th10.innerHTML = "Date d'expiration du certificat médical  ";
    tr.appendChild(th10);

    let th11 = document.createElement("th");
    th11.classList.add("th11");
    th11.setAttribute("id", "th11-diver");
    th11.innerHTML = "Date de naissance  ";
    tr.appendChild(th11);

    let th12 = document.createElement("th");
    th12.classList.add("th12");
    th12.innerHTML = "Modifier  ";
    tr.appendChild(th12);

    let th13 = document.createElement("th");
    th13.classList.add("th13");
    th13.innerHTML = "Supprimer  ";
    tr.appendChild(th13);
    
    head.appendChild(tr);
    //tableau.appendChild(head);
    //table.appendChild(tableau);

    for(let i = 1; i <= 11; i++){
        document.getElementById("th"+i+"-diver").style.cursor = "pointer";
        let span = document.createElement("span");
        span.setAttribute("class", "fas fa-sort-down");
        span.setAttribute("id", "span"+i+"-diver");
        document.getElementById("th"+i+"-diver").appendChild(span);
        document.getElementById("span"+i+"-diver").style.display = "none";
    }
}

function createDiverTableBody(tabDivers){
    let tbody = document.getElementById("tbody-diver-liste");
    tbody.innerHTML = "";

    // Parcours du tableau de plongeurs
    for (let i = 0; i < tabDivers.length; i++){

        let ligne = document.createElement("tr");
        ligne.classList.add("tr");
        

        let cellule = document.createElement("td");
        cellule.innerHTML = tabDivers[i].get_id();

        let cellule1 = document.createElement("td");
        cellule1.innerHTML = tabDivers[i].get_last_name();

        let cellule2 = document.createElement("td");
        cellule2.innerHTML = tabDivers[i].get_first_name();

        let cellule3 = document.createElement("td");
        switch(tabDivers[i].get_diver_qualification()){
            case "1":
                cellule3.innerHTML = "Étoile de mer 1";
                break;
            case "2":
                cellule3.innerHTML = "Bronze";
                break;
            case "3":
                cellule3.innerHTML = "Argent";
                break;
            case "4":
                cellule3.innerHTML = "Or";
                break;
            case "5":
                cellule3.innerHTML = "N1";
                break;
            case "6":
                cellule3.innerHTML = "N2";
                break;
            case "7":
                cellule3.innerHTML = "N3";
                break;
            case "8":
                cellule3.innerHTML = "N4";
                break;
            case "9":
                cellule3.innerHTML = "N5";
                break;
            case "11":
                cellule3.innerHTML = "Aucun";
                break;
            case "12":
                cellule3.innerHTML = "Étoile de mer 2";
                break;
            case "13":
                cellule3.innerHTML = "Étoile de mer 3";
                break;
            default:
                cellule3.innerHTML = "Inconnu";
                break;
        }

        let cellule4 = document.createElement("td");
        switch(tabDivers[i].get_instructor_qualification()){
            case "1":
                cellule4.innerHTML = "Aucun";
                break;
            case "2":
                cellule4.innerHTML = "E1";
                break;
            case "3":
                cellule4.innerHTML = "E2";
                break;
            case "4":
                cellule4.innerHTML = "E3";
                break;
            case "5":
                cellule4.innerHTML = "E4";
                break;
            default:
                cellule4.innerHTML = "Inconnu";
                break;
        }

        let cellule5 = document.createElement("td");
        switch(tabDivers[i].get_nox_level()){
            case "1":
                cellule5.innerHTML = "Aucune";
                break;
            case "2":
                cellule5.innerHTML = "NITROX";
                break;
            case "3":
                cellule5.innerHTML = "NITROX confirmé";
                break;
            case "4":
                cellule5.innerHTML = "Moniteur NITROX";
                break;
            default:
                cellule5.innerHTML = "Inconnu";
                break;
        }

        let cellule6 = document.createElement("td");
        cellule6.innerHTML = tabDivers[i].get_additionnal_qualification();

        let cellule7 = document.createElement("td");
        cellule7.innerHTML = tabDivers[i].get_licence_number();

        let cellule8 = document.createElement("td");
        cellule8.innerHTML = tabDivers[i].get_licence_expiration_date();
        
        let cellule9 = document.createElement("td");
        cellule9.innerHTML = tabDivers[i].get_medical_certificate_expiration_date();

        let cellule10 = document.createElement("td");
        cellule10.innerHTML = tabDivers[i].get_birth_date();

        ligne.appendChild(cellule);
        ligne.appendChild(cellule1);
        ligne.appendChild(cellule2);
        ligne.appendChild(cellule3);
        ligne.appendChild(cellule4);
        ligne.appendChild(cellule5);
        ligne.appendChild(cellule6);
        ligne.appendChild(cellule7);
        ligne.appendChild(cellule8);
        ligne.appendChild(cellule9);
        ligne.appendChild(cellule10);

        let cellule11 = document.createElement("td");
        let span_c11 = document.createElement("span");
        let i_c11 = document.createElement("i");
        i_c11.setAttribute("id", "btn_modif" + tabDivers[i].get_id());
        i_c11.classList.add("cursor-pointer");
        i_c11.classList.add("fa-solid");
        i_c11.classList.add("fa-pen-to-square"); 

        span_c11.appendChild(i_c11);
        cellule11.appendChild(span_c11);

        let cellule12 = document.createElement("td");
        let span_c12 = document.createElement("span");
        let i_c12 = document.createElement("i");
        i_c12.setAttribute("id", "btn_suppr" + tabDivers[i].get_id());
        i_c12.classList.add("cursor-pointer");
        i_c12.classList.add("fa-solid");
        i_c12.classList.add("fa-trash-can");

        span_c12.appendChild(i_c12);
        cellule12.appendChild(span_c12);
        ligne.appendChild(cellule11);
        ligne.appendChild(cellule12);

        tbody.appendChild(ligne);

        //tableau.appendChild(tbody);

        //table.appendChild(tableau);
    }

    setSortListeners();
}

/********************************************************************/
/*                    SETTING LISTENERS FUNCTIONS                   */
/********************************************************************/

function setListeners(){
    for (let i = 0; i < tabDivers.length; i++){
        let btn_modif = document.getElementById("btn_modif" + tabDivers[i].get_id());
        let btn_suppr = document.getElementById("btn_suppr" + tabDivers[i].get_id());

        btn_modif.addEventListener("click", function(){
            console.log("Modification du plongeur " + tabDivers[i].get_id());
            modifierDiver(tabDivers[i].get_id());
        });

        btn_suppr.addEventListener("click", function(){
            // Demande de confirmation
            let text = "Êtes-vous sûr de vouloir supprimer " + tabDivers[i].get_first_name()+ " " + tabDivers[i].get_last_name() + "de la base de données ?\nCette action est irréversible !";
            if(confirm(text) == true){
                console.log("Suppression du plongeur " + tabDivers[i].get_id());
                supprimerDiver(tabDivers[i].get_id());
            }
            else{
                console.log("Suppression annulée");
            }
        });
    }
}

function setButtonValidateListener(){
    document.getElementById("validate-diver").addEventListener("click", (e) => {
        // Get all input
        let first_name = document.getElementById("diver-firstname").value;
        let last_name = document.getElementById("diver-lastname").value;
        let diver_qualification = document.getElementById("diver-qualification").value;
        let instructor_qualification = document.getElementById("diver-instructor-qualification").value;
        let nox_level = document.getElementById("diver-nox-level").value;
        let additionnal_qualification = document.getElementById("diver-additionnal-qualification").value;
        //console.log(additionnal_qualification);
        let licence_number = document.getElementById("diver-license-number").value;
        let licence_expiration_date = document.getElementById("diver-license-expiration-date").value;
        let medical_certificate_expiration_date = document.getElementById("diver-medical-certificate-expiration-date").value;
        let birth_date = document.getElementById("diver-birthdate").value;

        // Check if all input are filled
        if(first_name == "" || last_name == "" || diver_qualification == "" || instructor_qualification == "" || nox_level == "" || licence_number == "" || licence_expiration_date == "" || medical_certificate_expiration_date == "" || birth_date == ""){
            alert("Veuillez remplir tous les champs");
            return;
        }

        // Vérification de la date
        let medical_certificate_expiration_date__ = new Date(document.getElementById("diver-medical-certificate-expiration-date").value);
        let licence_expiration_date__ = new Date(document.getElementById("diver-license-expiration-date").value);
        let dateActuelle = new Date(); 
        if (medical_certificate_expiration_date__ < dateActuelle || licence_expiration_date__ < dateActuelle || birth_date > dateActuelle) {
                alert("Une date n'est pas valide");
            return;
        }
        
        // Send to server
        //console.log(tabDivers);
        // Search the id max
        let id = 0;
        tabDivers.forEach(element => {
            if(element.get_id() > id){
                id = parseInt(element.get_id());
            }
        });
        id++;
        //console.log(id);
        if(modifyMode == false){
            SocketManager.addDiver(id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);
            //console.log(id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);
        }
        else{
            SocketManager.modifyDiver(modifiedDiver,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);
        }

        // Clear all input
        document.getElementById("diver-firstname").value = "";
        document.getElementById("diver-lastname").value = "";
        document.getElementById("diver-qualification").value = "11";
        document.getElementById("diver-instructor-qualification").value = "1";
        document.getElementById("diver-nox-level").value = "1";
        document.getElementById("diver-additionnal-qualification").value = "";
        document.getElementById("diver-license-number").value = "";
        document.getElementById("diver-license-expiration-date").value = "";
        document.getElementById("diver-medical-certificate-expiration-date").value = "";
        document.getElementById("diver-birthdate").value = "";

        // Closing modal
        modal.style.display = "none";

        // Update the list
        if(modifyMode == false){
            console.log("Adding diver in database");
        }
        else{
            console.log("Modifying diver " + modifiedDiver + " in database");
            modifyMode = false;
            modifiedDiver = -1;
        }
        
        document.getElementById("ring-loading").style.display = "block";
        document.body.style.cursor = "wait";        
        setTimeout(function() {
            updateDiver();
            document.getElementById("ring-loading").style.display = "none";
            document.body.style.cursor = "default";
        }, 1000);
    });
}

setButtonValidateListener();

function setSortListeners(){
    for(let i = 1; i <= 11; i++){
        //document.getElementById("th"+1+"-diver").style.userSelect = "none";
        document.getElementById("th"+i+"-diver").onclick = function(){
            document.getElementById("span"+i+"-diver").style.display = "inline-block";
            // Hide all other span
            for(let j = 1; j <= 11; j++){
                if(j != i){
                    document.getElementById("span"+j+"-diver").style.display = "none";
                }
            }
            sortTable(i);
            sortTableView(i);
        }
    }
}

/********************************************************************/
/*                         UPDATING FUNCTIONS                       */
/********************************************************************/

function updateDiver(){
    tabDivers = [];
    SocketManager.getAllDivers();
}

function modifierDiver(id){
    modifyMode = true;
    modifiedDiver = id;

    let tabElement = getDiverById(id);

    document.getElementById("diver-firstname").value = tabElement.get_first_name();
    document.getElementById("diver-lastname").value = tabElement.get_last_name();
    document.getElementById("diver-qualification").value = tabElement.get_diver_qualification();
    document.getElementById("diver-instructor-qualification").value = tabElement.get_instructor_qualification();
    document.getElementById("diver-nox-level").value = tabElement.get_nox_level();
    document.getElementById("diver-additionnal-qualification").value = tabElement.get_additionnal_qualification();
    document.getElementById("diver-license-number").value = tabElement.get_licence_number();
    document.getElementById("diver-license-expiration-date").value = tabElement.get_licence_expiration_date();
    document.getElementById("diver-medical-certificate-expiration-date").value = tabElement.get_medical_certificate_expiration_date();
    document.getElementById("diver-birthdate").value = tabElement.get_birth_date();

    document.getElementById("title-diver-modal").innerHTML = "Modification d'un plongeur";
    document.getElementById("validate-diver").innerHTML = "Modifier le plongeur";

    modal.style.display = "block";
}

function supprimerDiver(id){
    SocketManager.deleteDiver(id);
    // Update de la page
    document.getElementById("ring-loading").style.display = "block";
    document.body.style.cursor = "wait";        
    setTimeout(function() {
        updateDiver();
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
    }, 1000);
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
    }
}

function sortTable(n) {
    console.log("Sorting table by column " + n);
    // Tri de tabDivers
    console.log(tabDivers);
    const distantFuture = new Date(8640000000000000)
    let dateA, dateB;
    tabDivers.sort(function(a, b){
        switch(n){
            case 1:
                return a.get_id() - b.get_id();
            case 2:
                if(a.get_last_name().toLowerCase() < b.get_last_name().toLowerCase()){
                    return -1;
                }
                else if(a.get_last_name().toLowerCase() > b.get_last_name().toLowerCase()){
                    return 1;
                }
                else{
                    return 0;
                }
            case 3:
                if(a.get_first_name().toLowerCase() < b.get_first_name().toLowerCase()){
                    return -1;
                }
                else if(a.get_first_name().toLowerCase() > b.get_first_name().toLowerCase()){
                    return 1;
                }
                else{
                    return 0;
                }
            case 4:
                return a.get_diver_qualification() - b.get_diver_qualification();
            case 5:
                return a.get_instructor_qualification() - b.get_instructor_qualification();
            case 6:
                return a.get_nox_level() - b.get_nox_level();
            case 7:
                if(a.get_additionnal_qualification() < b.get_additionnal_qualification()){
                    return -1;
                }
                else if(a.get_additionnal_qualification() > b.get_additionnal_qualification()){
                    return 1;
                }
                else{
                    return 0;
                }
            case 8:
                if(a.get_licence_number() < b.get_licence_number()){
                    return -1;
                }
                else if(a.get_licence_number() > b.get_licence_number()){
                    return 1;
                }
                else{
                    return 0;
                }
            case 9:
                dateA = (a.get_licence_expiration_date() != null && a.get_licence_expiration_date() != "0000-00-00") ? new Date(a.get_licence_expiration_date()) : distantFuture;
                dateB = (b.get_licence_expiration_date() != null && b.get_licence_expiration_date() != "0000-00-00") ? new Date(b.get_licence_expiration_date()) : distantFuture;
                return dateA - dateB;
            case 10:
                dateA = (a.get_medical_certificate_expiration_date() != null && a.get_medical_certificate_expiration_date() != "0000-00-00") ? new Date(a.get_medical_certificate_expiration_date()) : distantFuture;
                dateB = (b.get_medical_certificate_expiration_date() != null && b.get_medical_certificate_expiration_date() != "0000-00-00") ? new Date(b.get_medical_certificate_expiration_date()) : distantFuture;
                return dateA - dateB;
            case 11:
                dateA = (a.get_birth_date() != null && a.get_birth_date() != "0000-00-00") ? new Date(a.get_birth_date()) : distantFuture;
                dateB = (b.get_birth_date() != null && a.get_birth_date() != "0000-00-00") ? new Date(b.get_birth_date()) : distantFuture;
                return dateA - dateB;
        }
    });

    console.log(tabDivers);
}

function sortTableView(n){
    // Update de la page
    document.getElementById("ring-loading").style.display = "block";
    document.body.style.cursor = "wait";
    setTimeout(function() {
        createDiverTableBody(tabDivers);
        setListeners();
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
    }, 100);
}

//function sortTable(n) {
//    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
//    table = document.getElementById("liste_diver");
//    switching = true;
//    //Set the sorting direction to ascending:
//    dir = "asc"; 
//    /*Make a loop that will continue until
//    no switching has been done:*/
//    while (switching) {
//        //start by saying: no switching is done:
//        switching = false;
//        rows = table.getElementsByTagName("tr");
//        //console.log(rows.length);
//        //rows = table.rows;
//        /*Loop through all table rows (except the
//        first, which contains table headers):*/
//        for (i = 1; i < (rows.length - 1); i++) {
//            //start by saying there should be no switching:
//            shouldSwitch = false;
//            /*Get the two elements you want to compare,
//            one from current row and one from the next:*/
//            x = rows[i].getElementsByTagName("td")[n];
//            y = rows[i + 1].getElementsByTagName("td")[n];
//            /*check if the two rows should switch place,
//            based on the direction, asc or desc:*/
//            if (dir == "asc") {
//                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//                    //if so, mark as a switch and break the loop:
//                    shouldSwitch= true;
//                    break;
//                }
//            } else if (dir == "desc") {
//                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//                    //if so, mark as a switch and break the loop:
//                    shouldSwitch = true;
//                    break;
//                }
//            }
//        }
//        if (shouldSwitch) {
//            /*If a switch has been marked, make the switch
//            and mark that a switch has been done:*/
//            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//            switching = true;
//            //Each time a switch is done, increase this count by 1:
//            switchcount ++;      
//        } else {
//            /*If no switching has been done AND the direction is "asc",
//            set the direction to "desc" and run the while loop again.*/
//            if (switchcount == 0 && dir == "asc") {
//                dir = "desc";
//                switching = true;
//            }
//        }
//    }
//  }

export default {
    LoadAllDivers,
}