// Imports
import SocketManager from './SocketManager/SocketPlannedDive.js'
import Diver from './Classes/diver.js'
import DiveSite from './Classes/dive_site.js'
import DiveRegistration from './Classes/dive_registration.js'
import PlannedDive from './Classes/planned_dive.js'

// Calling socket functions
SocketManager.getAllDiveSites();
SocketManager.getAllPlannedDives();
SocketManager.getAllDivers();
SocketManager.getAllDiveRegistrations();
SocketManager.getIsAdmin();
SocketManager.getUserProfile();

// Global variables
let tabPlannedDives = [];
let tabDiveSites = [];
let tabDivers = [];
let tabDiveRegistrations = [];
let isAdmin = false;
let userProfile;

let currentDiveSite = 0;
let currentPlannedDive = 0;
let nextSort = "asc";

let loaded = 0;
let nbOfLoaded = 6;

let modifyMode = false;
let modifiedPlannedDive = -1;

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


// Hide the loading ring
//document.getElementById("ring-loading").style.display = "none";
document.getElementById("open-planned-dive-form").style.display = "none";
document.getElementById("checkbox-coming").checked = true;

/********************************************************************/
/*                             MODALS                               */
/********************************************************************/

// Modal voir plus
let modal_info = document.getElementById("see-more");
let closeModalInfo = document.getElementById("close-see-more");
let closeInfoButton = document.getElementById("see-more-close-button");

closeModalInfo.onclick = function() {
    modal_info.style.display = "none";
}

closeModalInfo.onmouseover = function() {
    closeInfoButton.classList.add("fa-shake");
}

closeModalInfo.onmouseout = function() {
    closeInfoButton.classList.remove("fa-shake");
}

window.onclick = function(event) {
    if (event.target == modal_info) {
        modal_info.style.display = "none";
    }
}

// Modal planning complet
let modal_planning = document.getElementById("container-modal");
let open_planning = document.getElementById("open-planned-dive-planning");
let closePlanningModal = document.getElementById("close-planning-modal");
let closePlanningButton = document.getElementById("planning-close-button");

open_planning.onclick = function() {
    
    createCalendar();
    
    //console.log(tabPlannedDives);
    modal_planning.style.display = "block";
}

closePlanningModal.onclick = function() {
    modal_planning.style.display = "none";
}
closePlanningModal.onmouseover = function() {
    closePlanningButton.classList.add("fa-shake");
}
closePlanningModal.onmouseout = function() {
    closePlanningButton.classList.remove("fa-shake");
}

window.onclick = function(event) {
    if (event.target == modal_planning) {
        modal_planning.style.display = "none";
    }
}

// Modal création
let formModal = document.getElementById("planned-dive-creation-form");
let openformModal = document.getElementById("open-planned-dive-form");
let closeformModal = document.getElementById("close-planned-dive-form");
let closeformButton = document.getElementById("planned-dive-form-close-button");

openformModal.onclick = function() {
    document.getElementById("title-modal-plan").innerHTML = "Planifier une nouvelle plongée";
    document.getElementById("validate-planned-dive").innerHTML = "Planifier la plongée";
    formModal.style.display = "block";
}

closeformModal.onclick = function() {
    formModal.style.display = "none";
}


closeformButton.onmouseover = function() {
    closeformButton.classList.add("fa-shake");
}

closeformButton.onmouseout = function() {
    closeformButton.classList.remove("fa-shake");
}

window.onclick = function(event) {
    if (event.target == formModal) {
        formModal.style.display = "none";
    }
}

// Modal inscription
let modal_reg = document.getElementById("container-modal3");
let closeModalReg = document.getElementById("close-pd-modal3");
let closeRegButton = document.getElementById("pd-close-button3");

closeModalReg.onclick = function() {
    modal_reg.style.display = "none";
}

closeModalReg.onmouseover = function() {
    closeRegButton.classList.add("fa-shake");
}

closeModalReg.onmouseout = function() {
    closeRegButton.classList.remove("fa-shake");
}

/********************************************************************/
/*                         LOAD INFORMATIONS                        */
/********************************************************************/

function LoadAllPlannedDives(tab) {
    tab.forEach(element => {
        let tmp = new PlannedDive(element.Id_Planned_Dive,element.Planned_Date, element.Planned_Time, element.Comments, element.Special_Needs, element.Status, element.Diver_Price, element.Instructor_Price, element.Dive_Site_Id_Dive_Site);
        tabPlannedDives.push(tmp);
    });
    document.getElementById("ring-loading").style.display = "block";
    document.body.style.cursor = "wait";
    setTimeout(function(){
        sortPlannedDivesAsc();
        createCardsPlannedDive();
        setListeners();
        loaded++;
        checkLoaded();
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
    }, 1000);
}

function LoadAllDiveSites(tab){
    tab.forEach(element => {
        let tmp = new DiveSite(element.Id_Dive_Site,element.Site_Name, element.Gps_Latitude, element.Gps_Longitude, element.Track_Type, element.Track_Number, element.Track_Name, element.Zip_Code, element.City_Name, element.Country_Name, element.Additional_Address, element.Tel_Number, element.Information_URL, element.Image);
        tabDiveSites.push(tmp);
    });
    //console.log(tabDiveSites);
    createDiveSitesList(tabPlannedDives);
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
    //setListeners();
    updateTableDivers();
    loaded++;
    checkLoaded();
}

function LoadIsAdmin(isAdmin_){
    isAdmin = isAdmin_;
    loaded++;
    checkLoaded();
    if(isAdmin){
        document.getElementById("open-planned-dive-form").style.display = "block";
    }
}

function LoadUserProfile(userProfile_){
    userProfile = userProfile_;
    loaded++;
    checkLoaded();
}

/********************************************************************/
/*                        CREATING FUNCTIONS                        */
/********************************************************************/

function createDiveSitesList(){
    let select = document.getElementById("planned-dive-site");
    tabDiveSites.forEach(element => {
        let option = document.createElement("option");
        option.text = element.get_site_name();
        option.value = element.get_id();
        select.add(option);
    });
}

function createInfoPlannedDive(id) { 
    
    let PlannedDiveInfo = getPlannedDiveById(id);
    let PlannedDiveInfoDiveSite = getDiveSiteById(PlannedDiveInfo.get_id_dive_site());
    //console.log(PlannedDiveInfo);

    currentPlannedDive = PlannedDiveInfo.get_id();
    currentDiveSite = PlannedDiveInfoDiveSite.get_id();

    //console.log(currentPlannedDive, currentDiveSite);

    document.getElementById("see-more").style.display = "block";

    document.getElementById("site-name-pd").innerHTML = PlannedDiveInfoDiveSite.get_site_name();
    if(PlannedDiveInfo.get_diver_dive_price() == 0){
        document.getElementById("diver-price-pd").innerHTML = "Prix plongeur :<br>Gratuit";
    }
    else{
        document.getElementById("diver-price-pd").innerHTML = "Prix plongeur :<br>" + PlannedDiveInfo.get_diver_dive_price() + "€";
    }
    if(PlannedDiveInfo.get_instructor_dive_price() == 0){
        document.getElementById("instructor-price-pd").innerHTML = "Prix moniteur :<br>Gratuit";
    }
    else{
        document.getElementById("instructor-price-pd").innerHTML = "Prix moniteur :<br>" + PlannedDiveInfo.get_instructor_dive_price() + "€";
    }
    if(PlannedDiveInfo.get_comments() == ""){
        document.getElementById("comments-pd").innerHTML = "Aucun commentaire";
    }
    else{
        document.getElementById("comments-pd").innerHTML = PlannedDiveInfo.get_comments();
    }
    if(PlannedDiveInfo.get_special_needs() == ""){
        document.getElementById("special-needs-pd").innerHTML = "Aucun besoin spécial";
    }
    else{
        document.getElementById("special-needs-pd").innerHTML = PlannedDiveInfo.get_special_needs();
    }
    let month = PlannedDiveInfo.get_planned_date().substring(5,7);
    let day = PlannedDiveInfo.get_planned_date().substring(8,10);
    let year = PlannedDiveInfo.get_planned_date().substring(0,4);
    switch(month){
        case "01":
            month = "Janvier";
            break;
        case "02":
            month = "Février";
            break;
        case "03":
            month = "Mars";
            break;
        case "04":
            month = "Avril";
            break;
        case "05":
            month = "Mai";
            break;
        case "06":
            month = "Juin";
            break;
        case "07":
            month = "Juillet";
            break;
        case "08":
            month = "Août";
            break;
        case "09":
            month = "Septembre";
            break;
        case "10":
            month = "Octobre";
            break;
        case "11":
            month = "Novembre";
            break;
        case "12":
            month = "Décembre";
            break;
    }
    document.getElementById("date-pd-month").innerHTML = month + " " + year;
    document.getElementById("date-pd-day").innerHTML = day;
    document.getElementById("time-pd").innerHTML = PlannedDiveInfo.get_planned_time();


    let see_more_btn_modal = document.getElementById("buttons-modal-see-more");
    see_more_btn_modal.innerHTML = "";

    if(new Date(getPlannedDiveById(id).get_planned_date()) >= new Date()) {
        // Create 'S'inscrire' button
        let inscriptionBtn = document.createElement("button");
        inscriptionBtn.setAttribute('id', "inscription-planned-dive");
        inscriptionBtn.textContent = "S'inscrire";
        see_more_btn_modal.appendChild(inscriptionBtn);

        setInscriptionListener();

        if(isAdmin){
            // Create 'Modifier' button
            let modificationBtn = document.createElement("button");
            modificationBtn.setAttribute('id', "modification-planned-dive");
            modificationBtn.textContent = "Modifier";
            see_more_btn_modal.appendChild(modificationBtn);

            // Create 'Supprimer' button
            let suppressionBtn = document.createElement("button");
            suppressionBtn.setAttribute('id', "suppression-planned-dive");
            suppressionBtn.textContent = "Supprimer";
            see_more_btn_modal.appendChild(suppressionBtn);

            // Create 'Organisation' button
            let organisationBtn = document.createElement("button");
            organisationBtn.setAttribute('id', "planned-dive-organisation");
            organisationBtn.textContent = "Organisation";
            see_more_btn_modal.appendChild(organisationBtn);
                
            setModificationListener(id);
            setSuppressionListener(id);
            setOrganisationListener(id);
        }
    }        

    // Table divers
    updateTableDivers();
    
}

function createCardsPlannedDive(){
    let ul = document.getElementById("liste_planned_dive");
    ul.innerHTML = "";
    ul.classList.add("cards");

    /* Cartes des Planned_Dive*/

    for(let i = 0; i < tabPlannedDives.length; i++){
        // On vérifie que la plongée n'est pas passée

       if(new Date(tabPlannedDives[i].get_planned_date()) >= new Date()) {
            /* Création des cartes */
            let li = document.createElement("li");
            li.classList.add("cards_item");
            li.setAttribute('id', "card-item"+tabPlannedDives[i].get_id());

            /* Remplissage des cartes */   

            let div = document.createElement("div");
            div.classList.add("card");

            /* Div Haut */
            let div_haut = document.createElement("div");
            div_haut.classList.add("div_haut");
            div_haut.classList.add("top-degrade");

            let div_ville = document.createElement("div");
            div_ville.classList.add("div_ville");
            let dive_ville = document.createElement("h1");
            dive_ville.innerHTML = "Plongée à " + getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_city();
            dive_ville.classList.add("card_title");
            div_ville.appendChild(dive_ville);
            div_haut.appendChild(div_ville);

            let div_date = document.createElement("div");
            div_date.classList.add("div_date");
            let dive_date = document.createElement("h2");
            dive_date.innerHTML = "Prévue le : " + tabPlannedDives[i].get_planned_date();
            dive_date.classList.add("card_title");
            dive_date.classList.add("card_date");
            div_date.appendChild(dive_date);
            div_haut.appendChild(div_date);     

            div.appendChild(div_haut);

            /* Div Milieu Top */
            let div_milieuTop = document.createElement("div");
            div_milieuTop.classList.add("div_milieuTop");

            let div_site_name = document.createElement("div");
            div_site_name.classList.add("div-title");
            let dive_site_name = document.createElement("h2");
            dive_site_name.innerHTML = getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_site_name();
            dive_site_name.classList.add("card_title");
            dive_site_name.setAttribute('id', "dive-site-name"+tabPlannedDives[i].get_id());
            div_site_name.appendChild(dive_site_name);
            div_milieuTop.appendChild(div_site_name);

            let div_dive_time = document.createElement("div");
            div_dive_time.classList.add("div-title");
            let dive_time = document.createElement("h2");
            dive_time.innerHTML = "À : " + tabPlannedDives[i].get_planned_time();
            dive_time.classList.add("card_title");
            dive_time.classList.add("card_date");
            div_dive_time.appendChild(dive_time);
            div_milieuTop.appendChild(div_dive_time);

            div.appendChild(div_milieuTop);

            /* Div MilieuBot */
            let div_milieuBot = document.createElement("div");
            div_milieuBot.classList.add("div_milieuBot");

            let dive_price_diver = document.createElement("p");
            if(tabPlannedDives[i].get_diver_dive_price() == 0){
                dive_price_diver.innerHTML = "Prix plongeur : Gratuit";
            }else{
                dive_price_diver.innerHTML = "Prix plongeur : " + tabPlannedDives[i].get_diver_dive_price() + "€";
            }
            dive_price_diver.classList.add("card_text");
            div_milieuBot.appendChild(dive_price_diver);

            let dive_price_instructor = document.createElement("p");
            if(tabPlannedDives[i].get_instructor_dive_price() == 0){
                dive_price_instructor.innerHTML = "Prix moniteur : Gratuit";
            }else{
                dive_price_instructor.innerHTML = "Prix moniteur : " + tabPlannedDives[i].get_instructor_dive_price() + "€";
            }
            dive_price_instructor.classList.add("card_text");
            div_milieuBot.appendChild(dive_price_instructor);
            
            div.appendChild(div_milieuBot);

            /* Div Bas */
            let div_bas = document.createElement("div");
            div_bas.classList.add("div_bas");
                /* Div Statut */
            let div_statut = document.createElement("div");
            let dive_status = document.createElement("p");
            if(tabPlannedDives[i].get_statut() == 'Close'){
                dive_status.innerHTML = "Statut : Fermée ";
            } else{
                dive_status.innerHTML = "Statut : Ouverte ";
            }

            // Si l'utilisateur est inscrit à la plongée
            if(isUserInDive(tabPlannedDives[i].get_id())){
                //console.log("true")
                let span = document.createElement("span");
                let i = document.createElement("i");
                i.classList.add("fa-solid");
                i.classList.add("fa-circle-check");
                i.style.color = "lime";
                span.appendChild(i);
                dive_status.textContent += "-- Inscrit ";
                dive_status.appendChild(span);
            }
            else{
                //console.log("false")
                let span = document.createElement("span");
                let i = document.createElement("i");
                i.classList.add("fa-solid");
                i.classList.add("fa-circle-xmark");
                i.style.color = "red";
                span.appendChild(i);
                dive_status.textContent += "-- Non inscrit ";
                dive_status.appendChild(span);
            }

            dive_status.classList.add("card_text");
            div_statut.appendChild(dive_status);

            div_bas.appendChild(div_statut);

                /* Div bouton plus */
            let div_boutonPlus = document.createElement("div");
            div_boutonPlus.classList.add("div_boutonPlus");

            let bouton_plus = document.createElement("button");
            bouton_plus.innerHTML = "Voir plus";
            bouton_plus.setAttribute("id", "PD_btn" + tabPlannedDives[i].get_id());
            div_boutonPlus.appendChild(bouton_plus);

            div_bas.appendChild(div_boutonPlus);

            div.appendChild(div_bas);

            li.appendChild(div);
            ul.appendChild(li);
        }
        else{
            /* Création des cartes */
            let li = document.createElement("li");
            li.classList.add("cards_item");
            li.setAttribute('id', "card-item"+tabPlannedDives[i].get_id());

            /* Remplissage des cartes */   

            let div = document.createElement("div");
            div.classList.add("card");

            /* Div Haut */
            let div_haut = document.createElement("div");
            div_haut.classList.add("div_haut");
            div_haut.classList.add("top-degrade");

            let div_ville = document.createElement("div");
            div_ville.classList.add("div_ville");
            let dive_ville = document.createElement("h1");
            dive_ville.innerHTML = "Plongée à " + getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_city();
            dive_ville.classList.add("card_title");
            div_ville.appendChild(dive_ville);
            div_haut.appendChild(div_ville);

            let div_date = document.createElement("div");
            div_date.classList.add("div_date");
            let dive_date = document.createElement("h2");
            dive_date.innerHTML = "Prévue le : " + tabPlannedDives[i].get_planned_date();
            dive_date.classList.add("card_title");
            dive_date.classList.add("card_date");
            div_date.appendChild(dive_date);
            div_haut.appendChild(div_date);     

            div.appendChild(div_haut);

            /* Div Milieu Top */
            let div_milieuTop = document.createElement("div");
            div_milieuTop.classList.add("div_milieuTop");

            let dive_site_name = document.createElement("h2");
            dive_site_name.innerHTML = getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_site_name();
            dive_site_name.classList.add("card_title");
            dive_site_name.setAttribute('id', "dive-site-name"+tabPlannedDives[i].get_id());
            div_milieuTop.appendChild(dive_site_name);

            let dive_time = document.createElement("h2");
            dive_time.innerHTML = "À : " + tabPlannedDives[i].get_planned_time();
            dive_time.classList.add("card_title");
            dive_time.classList.add("card_date");
            div_milieuTop.appendChild(dive_time);

            div.appendChild(div_milieuTop);

            /* Div MilieuBot */
            let div_milieuBot = document.createElement("div");
            div_milieuBot.classList.add("div_milieuBot");

            let dive_price_diver = document.createElement("p");
            if(tabPlannedDives[i].get_diver_dive_price() == 0){
                dive_price_diver.innerHTML = "Prix plongeur : Gratuit";
            }else{
                dive_price_diver.innerHTML = "Prix plongeur : " + tabPlannedDives[i].get_diver_dive_price() + "€";
            }
            dive_price_diver.classList.add("card_text");
            div_milieuBot.appendChild(dive_price_diver);

            let dive_price_instructor = document.createElement("p");
            if(tabPlannedDives[i].get_instructor_dive_price() == 0){
                dive_price_instructor.innerHTML = "Prix moniteur : Gratuit";
            }else{
                dive_price_instructor.innerHTML = "Prix moniteur : " + tabPlannedDives[i].get_instructor_dive_price() + "€";
            }
            dive_price_instructor.classList.add("card_text");
            div_milieuBot.appendChild(dive_price_instructor);
            
            div.appendChild(div_milieuBot);

            /* Div Bas */
            let div_bas = document.createElement("div");
            div_bas.classList.add("div_bas");
                /* Div Statut */
            let div_statut = document.createElement("div");
            let dive_status = document.createElement("p");
            if(tabPlannedDives[i].get_statut() == 'Close'){
                dive_status.innerHTML = "Statut : Fermée ";
            } else{
                dive_status.innerHTML = "Statut : Ouverte ";
            }

            // Si l'utilisateur est inscrit à la plongée
            if(isUserInDive(tabPlannedDives[i].get_id())){
                //console.log("true")
                let span = document.createElement("span");
                let i = document.createElement("i");
                i.classList.add("fa-solid");
                i.classList.add("fa-circle-check");
                i.style.color = "lime";
                span.appendChild(i);
                dive_status.textContent += "-- Inscrit ";
                dive_status.appendChild(span);
            }
            else{
                //console.log("false")
                let span = document.createElement("span");
                let i = document.createElement("i");
                i.classList.add("fa-solid");
                i.classList.add("fa-circle-xmark");
                i.style.color = "red";
                span.appendChild(i);
                dive_status.textContent += "-- Non inscrit ";
                dive_status.appendChild(span);
            }

            dive_status.classList.add("card_text");
            div_statut.appendChild(dive_status);

            div_bas.appendChild(div_statut);

                /* Div bouton plus */
            let div_boutonPlus = document.createElement("div");
            div_boutonPlus.classList.add("div_boutonPlus");

            let bouton_plus = document.createElement("button");
            bouton_plus.innerHTML = "Voir plus";
            bouton_plus.setAttribute("id", "PD_btn" + tabPlannedDives[i].get_id());
            div_boutonPlus.appendChild(bouton_plus);

            div_bas.appendChild(div_boutonPlus);

            div.appendChild(div_bas);

            li.appendChild(div);
            ul.appendChild(li);

            li.style.display = "none";
        }
    }
}

/********************************************************************/
/*                    SETTING LISTENERS FUNCTIONS                   */
/********************************************************************/

function setButtonValidateListener(){
    document.getElementById("validate-planned-dive").addEventListener("click", (e) => {
        let planned_date = document.getElementById("planned-dive-date").value;
        let planned_time = document.getElementById("planned-dive-time").value;
        let comments = document.getElementById("planned-dive-comments").value;
        let special_needs = document.getElementById("planned-dive-special-needs").value;
        let statut = document.getElementById("planned-dive-statut").value;
        let diver_dive_price = document.getElementById("planned-dive-diver-dive-price").value;
        let instructor_dive_price = document.getElementById("planned-dive-instructor-dive-price").value;
        let dive_site_value = document.getElementById("planned-dive-site").value;
        

        // Check if all fields are filled
        if (planned_date == "" || planned_time == "" || statut == "") {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }

        if(instructor_dive_price == ""){ instructor_dive_price = 0;}
        if(diver_dive_price == ""){ diver_dive_price = 0;}

        // Vérification de la date
        let dateSaisie = new Date(document.getElementById("planned-dive-date").value);
        let dateActuelle = new Date(); 
        if (dateSaisie < dateActuelle) {
            alert("La date saisie est dépassée");
            return;
        }
        
        // Search the id max
        let id = 0;
        tabPlannedDives.forEach(element => {
            if(element.get_id() > id){
                id = parseInt(element.get_id());
                //console.log(id);
            }
        });
        id++;

        if(modifyMode == false){
            SocketManager.addPlannedDive(id,planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, parseInt(dive_site_value));
        }
        else{
            SocketManager.modifyPlannedDive(modifiedPlannedDive,planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, parseInt(dive_site_value));
            modal_info.style.display = "none";
        }

        // Clear all fields
        document.getElementById("planned-dive-date").value = "";
        document.getElementById("planned-dive-time").value = "";
        document.getElementById("planned-dive-comments").value = "";
        document.getElementById("planned-dive-special-needs").value = "";
        document.getElementById("planned-dive-statut").value = "1";
        document.getElementById("planned-dive-diver-dive-price").value = "";
        document.getElementById("planned-dive-instructor-dive-price").value = "";
        document.getElementById("planned-dive-site").value = "1";

        // Closing modal
        formModal.style.display = "none";

        // Update the list
        if(modifyMode == false){
            console.log("Adding planned dive in database");
        }
        else{
            console.log("Modifying planned dive " + modifiedPlannedDive + " in database");
            modifyMode = false;
        }

        document.getElementById("ring-loading").style.display = "block";
        document.body.style.cursor = "wait";        
        setTimeout(function() {
            updatePlannedDive();
            //document.getElementById("ring-loading").style.display = "none";
            //document.body.style.cursor = "default";
        }, 1000);
    });
}

setButtonValidateListener();

function setListeners(){
    for(let i = 0; i < tabPlannedDives.length; i++){
        let actualDate = new Date();

        //if(new Date(tabPlannedDives[i].get_planned_date()) >= new Date()) {
            document.getElementById("PD_btn" + tabPlannedDives[i].get_id()).addEventListener("click", (e) => {
                let tmp = tabPlannedDives[i].get_id();
                createInfoPlannedDive(tmp); 
            });
        //}
    }
}

function setInscriptionListener(){
    document.getElementById("inscription-planned-dive").addEventListener("click", (e) => {
        document.getElementById("container-modal3").style.display = "block";
    });
}

function setModificationListener(id){
    document.getElementById("modification-planned-dive").addEventListener("click", (e) => {
        console.log("Modification planned dive " + id);
        modifierPlannedDive(id);
    });
}

function setSuppressionListener(id){
    document.getElementById("suppression-planned-dive").addEventListener("click", (e) => {
        console.log("Suppression planned dive " + id);
        supprimerPlannedDive(id);
    });
}

function setOrganisationListener(id){
    document.getElementById("planned-dive-organisation").addEventListener("click", (e) => {
        console.log("Organisation planned dive " + id);
        SocketManager.setPlannedDive(id);

        document.getElementById("ring-loading").style.display = "block";
        document.body.style.cursor = "wait";
        setTimeout(function() {
            location.href = '/dive';
        }, 1000);
        
    });
}

function setButtonRegisterListener(){
    document.getElementById("inscription-planned-dive-modal").addEventListener("click", (e) => {
        let id_planned_dive = currentPlannedDive;
        let diver_role = document.getElementById("diver-role").value;
        let registration_timestamp = new Date();
        let personal_comment = document.getElementById("personal-comment").value;
        let car_pooling_seat_offered;
        let car_pooling_seat_request;
        let tmp_blablacar = document.getElementById("car-pooling").value;

        // Covoiturage
        if(tmp_blablacar == "-1"){
            car_pooling_seat_offered = 0;
            car_pooling_seat_request = "1";
        }
        else if(tmp_blablacar == "Aucun"){
            car_pooling_seat_offered = 0;
            car_pooling_seat_request = "0";
        }
        else{
            car_pooling_seat_offered = parseInt(tmp_blablacar);
            car_pooling_seat_request = "0";
        }

        
        let id_diver = userProfile.Id_Diver;
        let diver_qualification = getDiverById(id_diver).get_diver_qualification();
        let instructor_qualification = getDiverById(id_diver).get_instructor_qualification();

        let birth_date = getDiverById(id_diver).get_birth_date();
        let age = new Date().getFullYear() - new Date(birth_date).getFullYear();
        //console.log("Age : " + age);

        //console.log("Diver qualification : " + diver_qualification);
        //console.log("Instructor qualification : " + instructor_qualification);


        // Si il est déjà inscrit
        for(let i = 0; i < tabDiveRegistrations.length; i++){
            if(tabDiveRegistrations[i].get_planned_dive_id() == id_planned_dive && tabDiveRegistrations[i].get_diver_id() == id_diver){
                alert("Vous êtes déjà inscrit à cette plongée.\nAfin de modifier votre inscription, veuillez vous désinscrire puis vous réinscrire.");
                return;
            }
        }

        // Role du plongeur en fonction de ses qualifications et de son âge
        if(diver_role == "Directeur de plongée" && diver_qualification != "9"){
            alert("Vous n'avez pas la qualification pour être directeur de plongée");
            return;
        }
        else if(diver_role == "Guide de palanquée" && age < 16){
            alert("Vous n'avez pas l'âge requis pour être guide de palanquée");
            return;
        }

        // Si il y a déjà un directeur de plongée
        if(diver_role == "Directeur de plongée"){
            for(let i = 0; i < tabDiveRegistrations.length; i++){
                if(tabDiveRegistrations[i].get_planned_dive_id() == id_planned_dive && tabDiveRegistrations[i].get_diver_role() == "Directeur de plongée"){
                    alert("Il y a déjà un directeur de plongée pour cette plongée");
                    return;
                }
            }
        }

        SocketManager.diverRegistration(id_planned_dive, diver_role, registration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request);

        document.getElementById("container-modal3").style.display = "none";

        document.getElementById("ring-loading").style.display = "block";
        document.body.style.cursor = "wait";
        setTimeout(function(){
            updateDiveRegistration();
            updatePlannedDive();
            //document.getElementById("ring-loading").style.display = "none";
            //document.body.style.cursor = "default";
        }, 1000);
    });
}

function setSortAndSearchListeners(){
    document.getElementById("input-search-text").addEventListener("keyup", function(event) {
        searchDiveSite();
    });

    document.getElementById("checkbox-registered").addEventListener("click", function(event) {
        searchDiveSite();
    });

    document.getElementById("checkbox-coming").addEventListener("click", function(event) {
        searchDiveSite();
    });

    document.getElementById("checkbox-past").addEventListener("click", function(event) {
        searchDiveSite();
    });

    document.getElementById("sort-date").addEventListener("click", function(event) {
        if(nextSort == "asc"){
            sortPlannedDivesAsc();
            createCardsPlannedDive();
            setListeners();
            searchDiveSite();
            document.getElementById("icon-sort").classList = "fa-solid fa-arrow-up-1-9 fa-xl";
        }
        else{
            sortPlannedDivesDesc();
            createCardsPlannedDive();
            setListeners();
            searchDiveSite();
            document.getElementById("icon-sort").classList = "fa-solid fa-arrow-down-9-1 fa-xl";
        }
    });
}

/********************************************************************/
/*                         UPDATING FUNCTIONS                       */
/********************************************************************/

function updatePlannedDive(){
    tabPlannedDives = [];
    SocketManager.getAllPlannedDives();
}

function updateTableDivers(){
    // Clear the table
    document.getElementById("tbody-pd").innerHTML = "";
    document.getElementById("tr-desc").innerHTML = "";

    // Création des theads
    let tdh1 = document.createElement("td");
    let tdh2 = document.createElement("td");
    let tdh3 = document.createElement("td");

    tdh1.innerHTML = "Nom";
    tdh2.innerHTML = "Prénom";
    tdh3.innerHTML = "Rôle";

    document.getElementById("tr-desc").appendChild(tdh1);
    document.getElementById("tr-desc").appendChild(tdh2);
    document.getElementById("tr-desc").appendChild(tdh3);

    
    if(isAdmin == 1){
        let tr_desc = document.getElementById("tr-desc");
        let td_suppr = document.createElement("td");
        td_suppr.innerHTML = "Supprimer";
        td_suppr.setAttribute("id", "td-suppr");
        tr_desc.appendChild(td_suppr);
    }

    // Parcours du tableau des dives registration
    
    tabDiveRegistrations.forEach(element => {
        if(element.get_planned_dive_id() == currentPlannedDive){
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");

            td1.innerHTML = getDiverById(element.get_diver_id()).get_last_name();
            td2.innerHTML = getDiverById(element.get_diver_id()).get_first_name();
            td3.innerHTML = element.get_diver_role();

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            if(isAdmin == 1){
                let td4 = document.createElement("td");
                let span_trash = document.createElement("span");
                let i_trash = document.createElement("i");
                i_trash.setAttribute("id", "btn_suppr", + element.get_diver_id());
                i_trash.classList.add("cursor-pointer");
                i_trash.classList.add("fa-solid");
                i_trash.classList.add("fa-trash-can");

                span_trash.appendChild(i_trash);
                td4.appendChild(span_trash);
                tr.appendChild(td4);

                i_trash.addEventListener("click", (e) => {
                    let text = "Êtes-vous sûr de vouloir supprimer cette inscription ?";
                    if(confirm(text) == true){
                        supprimerRegistration(element.get_diver_id(), element.get_planned_dive_id());
                        console.log("Suppression de l'inscription");
                    }
                    else{
                        console.log("Annulation de la suppression");
                    }
                });
            }            
            else if(isAdmin == 0 && element.get_diver_id() == userProfile.Id_Diver){
                let tr_desc = document.getElementById("tr-desc");
                let td_suppr = document.createElement("td");
                td_suppr.innerHTML = "Supprimer";
                td_suppr.setAttribute("id", "td-suppr");
                tr_desc.appendChild(td_suppr);

                let td4 = document.createElement("td");
                let span_trash = document.createElement("span");
                let i_trash = document.createElement("i");
                i_trash.setAttribute("id", "btn_suppr", + element.get_diver_id());
                i_trash.classList.add("cursor-pointer");
                i_trash.classList.add("fa-solid");
                i_trash.classList.add("fa-trash-can");

                span_trash.appendChild(i_trash);
                td4.appendChild(span_trash);
                tr.appendChild(td4);

                i_trash.addEventListener("click", (e) => {
                    let text = "Êtes-vous sûr de vouloir supprimer cette inscription ?";
                    if(confirm(text) == true){
                        supprimerRegistration(element.get_diver_id(), element.get_planned_dive_id());
                        console.log("Suppression de l'inscription");
                    }
                    else{
                        console.log("Annulation de la suppression");
                    }
                });
            }

            document.getElementById("tbody-pd").appendChild(tr);
        }
    });
    if(document.getElementById("tbody-pd").innerHTML == ""){
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Aucune inscription";
        td.setAttribute("colspan", "4");
        tr.appendChild(td);
        document.getElementById("tbody-pd").appendChild(tr);
    }
}

function supprimerRegistration(id_diver, id_planned_dive){
    //console.log(id_diver, id_planned_dive);
    SocketManager.deleteDiveRegistration(id_diver, id_planned_dive);
    document.getElementById("ring-loading").style.display = "block";
    document.body.style.cursor = "wait";
    setTimeout(function(){
        updateDiveRegistration();
        updatePlannedDive();
        //document.getElementById("ring-loading").style.display = "none";
        //document.body.style.cursor = "default";
    }, 1000);
}

function updateDiveRegistration(){
    tabDiveRegistrations = [];
    SocketManager.getAllDiveRegistrations();
}

function modifierPlannedDive(id){
    modifyMode = true;
    modifiedPlannedDive = id;

    let tabElement = getPlannedDiveById(id);

    document.getElementById("planned-dive-date").value = tabElement.get_planned_date();
    document.getElementById("planned-dive-time").value = tabElement.get_planned_time();
    document.getElementById("planned-dive-comments").value = tabElement.get_comments();
    document.getElementById("planned-dive-special-needs").value = tabElement.get_special_needs();
    document.getElementById("planned-dive-statut").value = tabElement.get_statut();
    document.getElementById("planned-dive-diver-dive-price").value = tabElement.get_diver_dive_price();
    document.getElementById("planned-dive-instructor-dive-price").value = tabElement.get_instructor_dive_price();
    document.getElementById("planned-dive-site").value = tabElement.get_id_dive_site();

    document.getElementById("title-modal-plan").innerHTML = "Modifier une plongée";
    document.getElementById("validate-planned-dive").innerHTML = "Modifier";

    formModal.style.display = "block";
}

function supprimerPlannedDive(id){
    let text = "Êtes-vous sûr de vouloir supprimer cette plongée ?";
    if(confirm(text) == true){
        SocketManager.deletePlannedDive(id);
        tabDiveRegistrations.forEach(element => {
            if(element.get_planned_dive_id() == id){
                console.log("Suppression de l'inscription");
                SocketManager.deleteDiveRegistration(element.get_diver_id(), element.get_planned_dive_id());
            }
        });
        document.getElementById("ring-loading").style.display = "block";
        document.body.style.cursor = "wait";
        setTimeout(function(){
            updatePlannedDive();
            updateDiveRegistration();
            document.getElementById("ring-loading").style.display = "none";
            document.body.style.cursor = "default";
            modal_info.style.display = "none";
        }, 1000);
    }
    else{
        console.log("Annulation de la suppression");
    }
}
    

/********************************************************************/
/*                              CALENDAR                            */
/********************************************************************/

function createCalendar() {
    let statut_color, titre;
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    slotDuration: '01:00:00',
    //slotMinTime: '08:00:00',
    //slotMaxTime: '18:00:00',

    allDaySlot: false,
    defaultTimedEventDuration: '02:30:00',
    headerToolbar: {
    left: 'prev custom1 next',
    center: 'title',
    right: 'custom2,custom3,custom4' // user can switch between the two
    },
        
    customButtons: {
        custom1: {
        text: 'Actuel',
        click: function() {
            calendar.today();
        }
        },  
        custom2: {
        text: 'Jour',
        click: function() { calendar.changeView('timeGridDay'); }
        },
        custom3: {
        text: 'Semaine',
        click: function() { calendar.changeView('timeGridWeek'); }
        },
        custom4: {
        text: 'Mois',
        click: function() { calendar.changeView('dayGridMonth'); }
        },
    },

    eventClick: function(event, element) {
        // Affichage détaillé de l'événement cliqué
        //console.log(event.event.id);
        createInfoPlannedDive(event.event.id);
    },});
        
    tabPlannedDives.forEach(element => {
        switch(element.get_statut()) {
            case "Ouverte":
                statut_color = "lime";
                titre = "Ouverte"
                break;
            case "Close":
                statut_color = "red";
                titre = "Fermée"
                    break;
            case "Prévue":
                statut_color = "#F3DE8A";
                titre = "Prévue"
                break;
            default:
                console.log("Erreur de statut");
                statut_color = "blue";
                titre = "Indisponible"
                break;
        }

        calendar.addEvent({
            id: element.get_id(),
            title: getDiveSiteById(element.get_id_dive_site()).get_site_name() + " : " + titre,
            start  : element.get_planned_date() + "T" + element.get_planned_time(),
            textColor   : '#1C0B19',
            borderColor : '#140D4F',
            backgroundColor: statut_color,
        });    
    });

    calendar.setOption('locale', 'fr');
    calendar.render();
    setTimeout(function() {
        calendar.changeView('timeGridWeek');
    }, 1);
}

/********************************************************************/
/*                          OTHER FUNCTIONS                         */
/********************************************************************/

// Fonction réalisée par Alexis Sauteuse mais surtout par la touche tab (merci Copilot)
function getDiveSiteById(id){  
    for(let i = 0; i < tabDiveSites.length; i++){
        if(tabDiveSites[i].get_id() == id){
            return tabDiveSites[i];
        }
    }
}

// Fonction réalisée par Gabindetroa mais sutout par la touche tab influencée par Alexis Sauteuse et Copilot (merci à eux) 
function getPlannedDiveById(id){
    for(let i = 0; i < tabPlannedDives.length; i++){
        if(tabPlannedDives[i].get_id() == id){
            return tabPlannedDives[i];
        }
    }
    return null;
}

function getDiverById(id){
    for(let i = 0; i < tabDivers.length; i++){
        if(tabDivers[i].get_id() == id){
            return tabDivers[i];
        }
    }
    return null;
}

function isUserInDive(id_planned_dive){
    let isInDive = false;
    //console.log(userProfile);
    //console.log(getPlannedDiveById(id_planned_dive))
    tabDiveRegistrations.forEach(element => {
        //console.log("1", id_planned_dive, element.get_planned_dive_id(), id_planned_dive == element.get_planned_dive_id());
        //console.log("2", userProfile.Id_Diver, element.get_diver_id(), userProfile.Id_Diver == element.get_diver_id());   
        if(id_planned_dive == element.get_planned_dive_id() && userProfile.Id_Diver == element.get_diver_id()){
            isInDive = true;
        }
    });
    return isInDive;
}

function checkLoaded(){
    if(loaded == nbOfLoaded){
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
        loaded = 0;
        setSortAndSearchListeners();
        setButtonRegisterListener();
    }
}

function searchDiveSite(){
    let input = document.getElementById("input-search-text");
    let filter = input.value.toUpperCase();
    let checkbox_registered = document.getElementById("checkbox-registered");
    let checkbox_coming = document.getElementById("checkbox-coming");
    let checkbox_past = document.getElementById("checkbox-past");
    // Search in all planned dives displayed
    for(let i = 0; i < tabPlannedDives.length; i++){
        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "none";
        if(checkbox_coming.checked && !checkbox_past.checked){
            if(checkbox_registered.checked){
                if(new Date(tabPlannedDives[i].get_planned_date()) >= new Date()){
                    if(getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_site_name().toUpperCase().indexOf(filter) > -1 && isUserInDive(tabPlannedDives[i].get_id())){
                        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "block";
                    }
                    else{
                        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "none";
                    }
                }
            }
            else{
                if(new Date(tabPlannedDives[i].get_planned_date()) >= new Date()){
                    if(getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_site_name().toUpperCase().indexOf(filter) > -1){
                        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "block";
                    }
                    else{
                        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "none";
                    }
                }
            }
        }
        else if(!checkbox_coming.checked && checkbox_past.checked){
            if(checkbox_registered.checked){
                if(new Date(tabPlannedDives[i].get_planned_date()) < new Date()){
                    if(getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_site_name().toUpperCase().indexOf(filter) > -1 && isUserInDive(tabPlannedDives[i].get_id())){
                        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "block";
                    }
                    else{
                        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "none";
                    }
                }
            }
            else{
                if(new Date(tabPlannedDives[i].get_planned_date()) < new Date()){
                    if(getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_site_name().toUpperCase().indexOf(filter) > -1){
                        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "block";
                    }
                    else{
                        document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "none";
                    }
                }
            }
        }
        else if(checkbox_past.checked && checkbox_coming.checked){
            if(checkbox_registered.checked){
                if(getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_site_name().toUpperCase().indexOf(filter) > -1 && isUserInDive(tabPlannedDives[i].get_id())){
                    document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "block";
                }
                else{
                    document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "none";
                }
            }
            else{
                if(getDiveSiteById(tabPlannedDives[i].get_id_dive_site()).get_site_name().toUpperCase().indexOf(filter) > -1){
                    document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "block";
                }
                else{
                    document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "none";
                }
            }
        }
        else{
            // Hide all planned dives
            document.getElementById("card-item"+tabPlannedDives[i].get_id()).style.display = "none";
        }
    }
}

// Sort planned dives table by date (descending)
function sortPlannedDivesDesc(){
    tabPlannedDives.sort(function(a, b){
        return new Date(b.get_planned_date()) - new Date(a.get_planned_date());
    });
    nextSort = "asc";
}

// Sort planned dives table by date (ascending)
function sortPlannedDivesAsc(){
    tabPlannedDives.sort(function(a, b){
        return new Date(a.get_planned_date()) - new Date(b.get_planned_date());
    });
    nextSort = "desc";
}

// Exports
export default {
    LoadAllPlannedDives,
    LoadAllDiveSites,
    LoadAllDivers,
    LoadAllDiveRegistrations,
    LoadIsAdmin,
    LoadUserProfile,
}