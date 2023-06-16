// Imports
import SocketManager from './SocketManager/SocketDiveSite.js'
import DiveSite from './Classes/dive_site.js'
import PlannedDive from './Classes/planned_dive.js'

// Calling socket functions
SocketManager.getIsAdmin();
SocketManager.getAllDiveSites();
SocketManager.getAllPlannedDives();

// Global variables
let tabDiveSites = [];
let tabPlannedDives = [];

let modifyMode = false;
let modifiedDiveSite= -1;

let isAdmin = false;

let loaded = 0;
let nbOfLoaded = 3;

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
document.getElementById("open-site-modal").style.display = "none";

/********************************************************************/
/*                             MODALS                               */
/********************************************************************/

let modal = document.getElementById("site-creation-form");
let modal_planning = document.getElementById("container-modal");
let openModal = document.getElementById("open-site-modal");
let closeModal = document.getElementById("close-site-modal");
let choseImage = document.getElementById("dive-site-image-button");
let closeButton = document.getElementById("site-close-button");

openModal.onclick = function() {
    document.getElementById("dive-site-name").value = "";
    document.getElementById("dive-site-gps-latitude").value = "";
    document.getElementById("dive-site-gps-longitude").value = "";
    document.getElementById("dive-site-track-type").value = "";
    document.getElementById("dive-site-track-number").value = "";
    document.getElementById("dive-site-track-name").value = "";
    document.getElementById("dive-site-zip-code").value = "";
    document.getElementById("dive-site-city").value = "";
    document.getElementById("dive-site-country").value = "";
    document.getElementById("dive-site-aditionnal-info").value = "";
    document.getElementById("dive-site-telephone").value = "";
    document.getElementById("dive-site-url").value = "";
    document.getElementById("dive-site-image").value = "";

    document.getElementById("title-dive-site-modal").innerHTML = "Ajout d'un site de plongée";
    document.getElementById("validate-dive-site").innerHTML = "Créer le site de plongée";

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

window.onclick = function(event) {
    if (event.target == modal_planning) {
      modal_planning.style.display = "none";
    }
}

choseImage.onclick = function() {
    document.getElementById("dive-site-image").click();
}

let modal2 = document.getElementById("container-modal");
let closeModal2 = document.getElementById("close-planning-modal");
let closeButton2 = document.getElementById("planning-close-button");
closeModal2.onclick = function() {
    modal2.style.display = "none";
}

closeModal2.onmouseover = function() {
    closeButton2.classList.add("fa-shake");
}

closeModal2.onmouseout = function() {
    closeButton2.classList.remove("fa-shake");
}

/********************************************************************/
/*                         LOAD INFORMATIONS                        */
/********************************************************************/

function LoadAllDiveSites(tab){
    tab.forEach(element => {
        let tmp = new DiveSite(element.Id_Dive_Site,element.Site_Name, element.Gps_Latitude, element.Gps_Longitude, element.Track_Type, element.Track_Number, element.Track_Name, element.Zip_Code, element.City_Name, element.Country_Name, element.Additional_Address, element.Tel_Number, element.Information_URL, element.Image);
        tabDiveSites.push(tmp);
    });
    console.log(tabDiveSites);
    create_elements(tabDiveSites);
    hoverlistener();
    setListeners();
    loaded++;
    checkLoaded();
}

function LoadAllPlannedDives(tab){
    tab.forEach(element => {
        let tmp = new PlannedDive(element.Id_Planned_Dive, element.Planned_Date, element.Planned_Time, element.Comments, element.Special_Needs, element.Status, element.Diver_Price, element.Instructor_Price, element.Dive_Site_Id_Dive_Site);
        tabPlannedDives.push(tmp);
    });
    console.log(tabPlannedDives);
    loaded++;
    checkLoaded();
}

function LoadIsAdmin(isAdmin_){
    isAdmin = isAdmin_;
    loaded++;
    checkLoaded();
}

/********************************************************************/
/*                        CREATING FUNCTIONS                        */
/********************************************************************/

function create_elements(tab_dive_sites) {
    // Création de l'affichage des sites de plongée
    let container = document.getElementById("liste_dive_site");
    container.innerHTML = "";
    //console.log(tab_dive_sites);
    // Parcourir le tableau d'éléments et créer des <li> pour chaque élément
    for (let i = 0; i < tab_dive_sites.length; i++) {
        // Création dynamique des éléments HTML pour chaque site de plongée
        let siteElement = document.createElement('div');
        siteElement.classList.add("dive-site-list-item");
        siteElement.setAttribute("id", "dive-site-" + tab_dive_sites[i].get_id());

        // Partie haute avec le nom du site et la ville
        let siteElementTop = document.createElement('div');
        siteElementTop.classList.add("top-part");
        siteElementTop.classList.add("top-degrade");
        let siteElementTopWrap = document.createElement('div');
        siteElementTopWrap.classList.add("top-part-wrap");
        siteElementTop.appendChild(siteElementTopWrap);
        let siteElementTopName = document.createElement('h1');
        siteElementTopName.innerHTML = tab_dive_sites[i].get_site_name();
        siteElementTopName.setAttribute("id", "dive-site-name-" + tab_dive_sites[i].get_id());
        siteElementTopWrap.appendChild(siteElementTopName);
        let siteElementTopTown = document.createElement('h2');
        siteElementTopTown.classList.add("linkhover");
        siteElementTopTown.classList.add("cursor-pointer");
        siteElementTopTown.innerHTML = tab_dive_sites[i].get_city();
        let siteElementTopTownIcon = document.createElement('i');
        siteElementTopTownIcon.classList.add("fa-solid");
        siteElementTopTownIcon.classList.add("fa-circle-info");
        siteElementTopTownIcon.classList.add("info-icon");
        siteElementTopTown.appendChild(siteElementTopTownIcon);
        siteElementTopWrap.appendChild(siteElementTopTown);
        siteElement.appendChild(siteElementTop);

        // Partie basse avec l'image et les infos
        let siteElementBottom = document.createElement('div');
        siteElementBottom.classList.add("bottom-part");
        let siteElementBottomPicture = document.createElement('div');
        siteElementBottomPicture.classList.add("bottom-left");
        let siteImage = tab_dive_sites[i].get_image();
        let blob = new Blob([siteImage], {type: "image/jpeg"});
        let imgElement = document.createElement("img");
        imgElement.src = URL.createObjectURL(blob);
        siteElementBottomPicture.appendChild(imgElement);
        siteElementBottom.appendChild(siteElementBottomPicture);
        let siteElementBottomInfo = document.createElement('div');
        siteElementBottomInfo.classList.add("bottom-right");
        let siteElementBottomInfoAddress = document.createElement('p');
        if(tab_dive_sites[i].get_track_number() != null){
            siteElementBottomInfoAddress.innerHTML += " " + tab_dive_sites[i].get_track_number();
        }
        if(tab_dive_sites[i].get_track_type() != null){
            siteElementBottomInfoAddress.innerHTML += " " + tab_dive_sites[i].get_track_type();
        }
        if(tab_dive_sites[i].get_track_name() != null){
            siteElementBottomInfoAddress.innerHTML += " " + tab_dive_sites[i].get_track_name();
        }
        siteElementBottomInfo.appendChild(siteElementBottomInfoAddress);
        let siteElementBottomInfoTel = document.createElement('p');
        if(tab_dive_sites[i].get_telephone() == null || tab_dive_sites[i].get_telephone() == ""){
            siteElementBottomInfoTel.innerHTML = "Numéro de téléphone indisponible";
        }
        else{
            siteElementBottomInfoTel.innerHTML = tab_dive_sites[i].get_telephone();
        }
        siteElementBottomInfo.appendChild(siteElementBottomInfoTel);
        siteElementBottom.appendChild(siteElementBottomInfo);
        siteElement.appendChild(siteElementBottom);

        // Partie avec le bouton
        let siteElementButtonContainer = document.createElement('div');
        siteElementButtonContainer.classList.add("button-container");
        let siteElementButton = document.createElement('button');
        siteElementButton.classList.add("button");
        siteElementButton.innerHTML = "Voir planning";
        siteElementButton.setAttribute("id", "calBtn" + tab_dive_sites[i].get_id());
        siteElementButtonContainer.appendChild(siteElementButton);
        siteElement.appendChild(siteElementButtonContainer);

        // Partie avec les boutons de modification et de suppression
        if(isAdmin == 1){
            document.getElementById("open-site-modal").style.display = "block";
            let span_modif = document.createElement('span');
            let span_suppr = document.createElement('span');
            span_modif.classList.add("fa-solid");
            span_modif.classList.add("fa-pen-to-square");
            span_modif.classList.add("cursor-pointer");
            span_suppr.classList.add("fa-solid");
            span_suppr.classList.add("fa-trash-can");
            span_suppr.classList.add("cursor-pointer");
            span_modif.setAttribute("id", "btn_modif" + tab_dive_sites[i].get_id());
            span_suppr.setAttribute("id", "btn_suppr" + tab_dive_sites[i].get_id());

            siteElementButtonContainer.appendChild(span_modif);
            siteElementButtonContainer.appendChild(span_suppr);
        }

        // Div qui s'affiche lors du hover du nom de la ville
        let siteElementHoverContainer = document.createElement('div');
        siteElementHoverContainer.classList.add("hover-container");
        let siteElementHover = document.createElement('div');
        siteElementHover.classList.add("hover-div");
        siteElementHoverContainer.appendChild(siteElementHover);

        // Partie haute avec le nom de la ville et le pays
        let siteElementHoverTop = document.createElement('div');
        siteElementHoverTop.classList.add("top-part");
        let siteElementHoverTopCity = document.createElement('h1');
        siteElementHoverTopCity.innerHTML = tab_dive_sites[i].get_city() + ", " + tab_dive_sites[i].get_zip_code();
        siteElementHoverTop.appendChild(siteElementHoverTopCity);
        let siteElementHoverTopCountry = document.createElement('h2');
        siteElementHoverTopCountry.innerHTML = tab_dive_sites[i].get_country();
        siteElementHoverTop.appendChild(siteElementHoverTopCountry);
        let siteElementHoverTopClose = document.createElement('div');
        siteElementHoverTopClose.classList.add("close-hover");
        siteElementHoverTopClose.classList.add("cursor-pointer");
        let siteElementHoverTopCloseIcon = document.createElement('i');
        siteElementHoverTopCloseIcon.classList.add("fa-solid");
        siteElementHoverTopCloseIcon.classList.add("fa-xmark");
        siteElementHoverTopClose.appendChild(siteElementHoverTopCloseIcon);
        siteElementHoverTop.appendChild(siteElementHoverTopClose);
        siteElementHover.appendChild(siteElementHoverTop);

        // Partie basse avec la map et les coordonnées
        let siteElementHoverBottom = document.createElement('div');
        siteElementHoverBottom.classList.add("bottom-part");
        let siteElementHoverBottomMap = document.createElement('div');
        siteElementHoverBottomMap.classList.add("map");
        let mapWidth = window.innerWidth * 0.5;
        let mapHeight = window.innerHeight * 0.35; 
        siteElementHoverBottomMap.innerHTML = `<iframe src="`+tab_dive_sites[i].get_url()+`" width="`+mapWidth+`" height="`+mapHeight+`" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
        siteElementHoverBottomMap.setAttribute('id', 'map' + i);          
        siteElementHoverBottom.appendChild(siteElementHoverBottomMap);
        let siteElementHoverBottomLocation = document.createElement('div');
        siteElementHoverBottomLocation.classList.add("location");
        if (tab_dive_sites[i].get_aditionnal_info()!= null && tab_dive_sites[i].get_aditionnal_info() != ""){
        let siteElementHoverBottomLocationAddress = document.createElement('p');
        siteElementHoverBottomLocationAddress.innerHTML = "Informations Complémentaires : " + tab_dive_sites[i].get_aditionnal_info();
        siteElementHoverBottomLocation.appendChild(siteElementHoverBottomLocationAddress);
        }
        let siteElementHoverBottomLocationPosition = document.createElement('p');
        siteElementHoverBottomLocationPosition.innerHTML = "Coordonnées GPS : " +tab_dive_sites[i].get_gps_latitude() + " " + tab_dive_sites[i].get_gps_longitude();
        siteElementHoverBottomLocation.appendChild(siteElementHoverBottomLocationPosition);
        siteElementHoverBottom.appendChild(siteElementHoverBottomLocation);
        
        siteElementHover.appendChild(siteElementHoverBottom);
        siteElementTop.appendChild(siteElementHoverContainer);

        // Ajouter la div à l'élément parent
        container.appendChild(siteElement);
    }
}

/********************************************************************/
/*                    SETTING LISTENERS FUNCTIONS                   */
/********************************************************************/

function setButtonValidateListener(){
    document.getElementById("validate-dive-site").addEventListener("click", (e) => {
        // Get all input
        let name = document.getElementById("dive-site-name").value;
        let latitude = document.getElementById("dive-site-gps-latitude").value;
        let longitude = document.getElementById("dive-site-gps-longitude").value;
        let track_type = document.getElementById("dive-site-track-type").value;
        let track_number = document.getElementById("dive-site-track-number").value;
        let track_name = document.getElementById("dive-site-track-name").value;
        let zip_code = document.getElementById("dive-site-zip-code").value;
        let city = document.getElementById("dive-site-city").value;
        let coutntry = document.getElementById("dive-site-country").value;
        let aditionnal_info = document.getElementById("dive-site-aditionnal-info").value;
        let telephone = document.getElementById("dive-site-telephone").value;
        let url = document.getElementById("dive-site-url").value;
        let image = document.getElementById('dive-site-image').files[0];
    
        if((name == "" || latitude == "" || longitude == "" || track_type == "" || track_number == "" || track_name == "" || zip_code == "" || city == "" || coutntry == "" || url == "") && modifyMode == false){
            alert("Des champs sont vides. Veuillez les remplir s'il vous plait.");
            return;
        }
        else if(image == null && modifyMode == false){
            alert("Image manquante. Veuillez ajouter une image s'il vous plait.");
            return;
        }
        
    
        // Send to server
        //console.log(tabDiveSites);
        // Search the id max
        let id = 0;
        tabDiveSites.forEach(element => {
            if(element.get_id() > id){
                id = parseInt(element.get_id());
            }
        });
        id++;
        if(modifyMode == false){
            SocketManager.addDiveSite(id, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image);
            console.log(id, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image);
        }
        else{
            SocketManager.modifyDiveSite(modifiedDiveSite, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image);
        }
        
        // Clear all input
        document.getElementById("dive-site-name").value = "";
        document.getElementById("dive-site-gps-latitude").value = "";
        document.getElementById("dive-site-gps-longitude").value = "";
        document.getElementById("dive-site-track-type").value = "";
        document.getElementById("dive-site-track-number").value = "";
        document.getElementById("dive-site-track-name").value = "";
        document.getElementById("dive-site-zip-code").value = "";
        document.getElementById("dive-site-city").value = "";
        document.getElementById("dive-site-country").value = "";
        document.getElementById("dive-site-aditionnal-info").value = "";
        document.getElementById("dive-site-telephone").value = "";
        document.getElementById("dive-site-url").value = "";
        document.getElementById("dive-site-image").value = "";
        
        // Closing modal
        modal.style.display = "none";
            
        // Update the list
        if(modifyMode == false){
            console.log("Adding divesite in database");
        }
        else{
            console.log("Modifying divesite " + modifiedDiveSite+ " in database");
            modifyMode = false;
            modifiedDiveSite = -1;
        }

        document.getElementById("ring-loading").style.display = "block";
        document.body.style.cursor = "wait";        
        setTimeout(function() {
            updateDiveSite();
            document.getElementById("ring-loading").style.display = "none";
            document.body.style.cursor = "default";
        }, 1000);
    });
}

setButtonValidateListener();

function setListeners(){
    for (let i = 0; i < tabDiveSites.length; i++){
        let isDeletable = true;

        // Bouton pour afficher le calendrier
        document.getElementById("calBtn" + tabDiveSites[i].get_id()).addEventListener("click", (e) => {
            let tmp = tabDiveSites[i].get_id();
            createCalendar(tmp); 
            modal2.style.display = "block";
        });
        if(isAdmin == 1){
            // Bouton modifier et supprimer
            let btn_modif = document.getElementById("btn_modif" + tabDiveSites[i].get_id());
            let btn_suppr = document.getElementById("btn_suppr" + tabDiveSites[i].get_id());

            btn_modif.addEventListener("click", function(){
                console.log("Modification du site de plongée " + tabDiveSites[i].get_id());
                modifierDiveSite(tabDiveSites[i].get_id());
            });

            btn_suppr.addEventListener("click", function(){
                // Demande de confirmation

                tabPlannedDives.forEach(element => {
                    if(getDiveSiteById(element.get_id_dive_site()).get_city() == tabDiveSites[i].get_city()){
                        isDeletable = false;
                    }
                });

                if(!isDeletable) {
                    alert("Il y a des plongées prévues à cet endroit. Suppression impossible.");
                    return;
                }
                else {    
                    let text = "Êtes-vous sûr de vouloir supprimer " + tabDiveSites[i].get_site_name() + " de la base de données ?\nCette action est irréversible !";
                    if(confirm(text) == true){
                        console.log("Suppression du plongeur " + tabDiveSites[i].get_id());
                        supprimerDiveSite(tabDiveSites[i].get_id());
                    }
                    else{
                        console.log("Suppression annulée");
                    }
                }

            });
        }

        isDeletable = true;
    }
}

function hoverlistener() {
    let town_hover = document.getElementsByClassName("linkhover");
    let all_map_div = document.getElementsByClassName("hover-container");
    let all_map_div_close = document.getElementsByClassName("close-hover");
    for (let i = 0 ; i < town_hover.length; i++) {
        /*
        town_hover[i].addEventListener("mouseover", function( event ){
        let current_target = event.currentTarget.getElementsByTagName("div")[0];
        current_target.style.visibility = 'visible';
        
        }, false);
        town_hover[i].addEventListener("mouseleave", function( event ){
            let current_target = event.currentTarget.getElementsByTagName("div")[0];
            current_target.style.visibility = 'hidden';
        }, false); 
        */
        town_hover[i].addEventListener("click", function( event ){
            all_map_div[i].style.visibility = 'visible';
            town_hover[i].classList.add("highlight");
            for (let j = 0 ; j < town_hover.length; j++) {
                if (j != i) {
                    all_map_div[j].style.visibility = 'hidden';
                    town_hover[j].classList.remove("highlight");
                }
            }
        }, false);
         all_map_div_close[i].addEventListener("click", function( event ){
            all_map_div[i].style.visibility = 'hidden';
            town_hover[i].classList.remove("highlight");
        }, false);
        all_map_div_close[i].addEventListener("mouseover", function( event ){
            all_map_div_close[i].getElementsByTagName("i")[0].classList.add("fa-shake");
        }, false);
        all_map_div_close[i].addEventListener("mouseleave", function( event ){
            all_map_div_close[i].getElementsByTagName("i")[0].classList.remove("fa-shake");
        }, false);
    }
}

document.getElementById("input-search-text").addEventListener("keyup", function(event) {
    searchDiveSite();
});

/********************************************************************/
/*                         UPDATING FUNCTIONS                       */
/********************************************************************/

function updateDiveSite(){
    tabDiveSites = [];
    SocketManager.getAllDiveSites();
}

function modifierDiveSite(id){
    modifyMode = true;
    modifiedDiveSite = id;

    let tabElement = getDiveSiteById(id);

    document.getElementById("dive-site-name").value = tabElement.get_site_name();
    document.getElementById("dive-site-gps-latitude").value = tabElement.get_gps_latitude();
    document.getElementById("dive-site-gps-longitude").value = tabElement.get_gps_longitude();
    document.getElementById("dive-site-track-type").value = tabElement.get_track_type();
    document.getElementById("dive-site-track-number").value = tabElement.get_track_number();
    document.getElementById("dive-site-track-name").value = tabElement.get_track_name();
    document.getElementById("dive-site-zip-code").value = tabElement.get_zip_code();
    document.getElementById("dive-site-city").value = tabElement.get_city();
    document.getElementById("dive-site-country").value = tabElement.get_country();
    document.getElementById("dive-site-aditionnal-info").value = tabElement.get_aditionnal_info();
    document.getElementById("dive-site-telephone").value = tabElement.get_telephone();
    document.getElementById("dive-site-url").value = tabElement.get_url();

    document.getElementById("title-dive-site-modal").innerHTML = "Modification d'un site de plongée";
    document.getElementById("validate-dive-site").innerHTML = "Modifier le plongeur";

    modal.style.display = "block";
}

function supprimerDiveSite(id){
    SocketManager.deleteDiveSite(id);
    // Update de la page
    console.log("Updating dive site in database");
    document.getElementById("ring-loading").style.display = "block";
    document.body.style.cursor = "wait";        
    setTimeout(function() {
        updateDiveSite();
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
    }, 1000);
}

/********************************************************************/
/*                              CALENDAR                            */
/********************************************************************/

function createCalendar(id) {
    //document.addEventListener('DOMContentLoaded', function() {
        let id_planned = id;
        let statut_color, titre;
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        slotDuration: '01:00:00',
        //slotMinTime: '08:00:00',
        //slotMaxTime: '18:00:00',

        allDaySlot: false,
        defaultTimedEventDuration: '02:00:00',
        headerToolbar: {
        left: 'prev custom1 next',
        center: 'title',
        right: 'custom2,custom3,custom4' // user can switch between the two
        },
        
        eventClick: function(event, element) {
            // Affichage détaillé de l'événement cliqué
            console.log(event)
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

        });


        tabPlannedDives.forEach(element => {
            if(element.get_id_dive_site() == id_planned) {
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
                    title: "Plongée : " + titre,
                    start  : element.get_planned_date() + "T" + element.get_planned_time(),
                    textColor   : '#1C0B19',
                    borderColor : '#140D4F',
                    backgroundColor: statut_color,
                });    
            }
        });


        calendar.setOption('locale', 'fr');
        calendar.render();
        setTimeout(function() {
            calendar.changeView('timeGridWeek');
        }, 1);

    //});
}

/********************************************************************/
/*                          OTHER FUNCTIONS                         */
/********************************************************************/

function getDiveSiteById(id){
    for(let i = 0; i < tabDiveSites.length; i++){
        if(tabDiveSites[i].get_id() == id){
            return tabDiveSites[i];
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

function searchDiveSite(){
    let input = document.getElementById("input-search-text");
    let filter = input.value.toUpperCase();
    tabDiveSites.forEach(element => {
        if(element.get_site_name().toUpperCase().indexOf(filter) > -1){
            document.getElementById("dive-site-" + element.get_id()).style.display = "block";
        } else {
            document.getElementById("dive-site-" + element.get_id()).style.display = "none";
        }
    });

}

// Exports
export default {
    LoadAllDiveSites,
    LoadAllPlannedDives,
    LoadIsAdmin,
}
