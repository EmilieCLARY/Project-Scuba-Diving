//import e from 'express';
import SocketManager from './SocketManager/SocketDiveSite.js'

SocketManager.getAllDiveSites();

let tabDiveSites = [];
let modal = document.getElementById("site-creation-form");
let openModal = document.getElementById("open-site-modal");
let closeModal = document.getElementById("close-site-modal");
let choseImage = document.getElementById("dive-site-image-button");
let closeButton = document.getElementById("site-close-button");



openModal.onclick = function() {
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

choseImage.onclick = function() {
    document.getElementById("dive-site-image").click();
}

// Classe privée Site de plongée
class dive_site {
    constructor(id_,site_name_, gps_latitude_, gps_longitude_, track_type_, track_number_, track_name_, zip_code_, city_, country_, aditionnal_info_, telephone_, url_, image_) {
        this.id = id_;
        this.site_name = site_name_;
        this.gps_latitude = gps_latitude_;
        this.gps_longitude = gps_longitude_;
        this.track_type = track_type_;
        this.track_number = track_number_;
        this.track_name = track_name_;
        this.zip_code = zip_code_;
        this.city = city_;
        this.country = country_;
        this.aditionnal_info = aditionnal_info_;
        this.telephone = telephone_;
        this.url = url_;
        this.image = image_;
    }

    get_id() {
        return this.id;
    }

    set_id(id) {
        this.id = id;
    }

    get_site_name() {
        return this.site_name;
    }

    set_site_name(site_name) {
        this.site_name = site_name;
    }

    get_gps_latitude() {
        return this.gps_latitude;
    }

    set_gps_latitude(gps_latitude) {
        this.gps_latitude = gps_latitude;
    }

    get_gps_longitude() {
        return this.gps_longitude;
    }

    set_gps_longitude(gps_longitude) {
        this.gps_longitude = gps_longitude;
    }

    get_track_type() {
        return this.track_type;
    }

    set_track_type(track_type) {
        this.track_type = track_type;
    }

    get_track_number() {
        return this.track_number;
    }

    set_track_number(track_number) {
        this.track_number = track_number;
    }
    
    get_track_name() {
        return this.track_name;
    }

    set_track_name(track_name) {
        this.track_name = track_name;
    }

    get_zip_code() {
        return this.zip_code;
    }

    set_zip_code(zip_code) {
        this.zip_code = zip_code;
    }

    get_city() {
        return this.city;
    }

    set_city(city) {
        this.city = city;
    }

    get_country() {
        return this.country;
    }

    set_country(country) {
        this.country = country;
    }

    get_aditionnal_info() {
        return this.aditionnal_info;
    }

    set_aditionnal_info(aditionnal_info) {
        this.aditionnal_info = aditionnal_info;
    }

    get_telephone() {
        return this.telephone;
    }

    set_telephone(telephone) {
        this.telephone = telephone;
    }

    get_url() {
        return this.url;
    }

    set_url(url) {
        this.url = url;
    }

    get_image() {
        return this.image;
    }

    set_image(image) {
        this.image = image;
    }
}

function LoadAllDiveSites(tab){
    tab.forEach(element => {
        let tmp = new dive_site(element.Id_Dive_Site,element.Site_Name, element.Gps_Latitude, element.Gps_Longitude, element.Track_Type, element.Track_Number, element.Track_Name, element.Zip_Code, element.City_Name, element.Country_Name, element.Additional_Address, element.Tel_Number, element.Information_URL, element.Image);
        tabDiveSites.push(tmp);
    });
    console.log(tabDiveSites);
    create_elements(tabDiveSites);
    hoverlistener();
}

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

    if(name == "" || latitude == "" || longitude == "" || track_type == "" || track_number == "" || track_name == "" || zip_code == "" || city == "" || coutntry == "" || aditionnal_info == "" || telephone == "" || url == ""){
        alert("Il manque des informations connard ! On t'appelle pas Gilbert pour rien !");
        return;
    }
    else if(image == null){
        alert("L'image connard !");
        return;
    }
    

    // Send to server
    console.log(tabDiveSites);
    // Search the id max
    let id = 0;
    tabDiveSites.forEach(element => {
        if(element.get_id() > id){
            id = parseInt(element.get_id());
        }
    });
    id++;
    SocketManager.addDiveSite(id, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image);
    console.log(id, name, latitude, longitude, track_type, track_number, track_name, zip_code, city, coutntry, aditionnal_info, telephone, url, image);

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
    
        
    // Update the list
    console.log("Updating dive site in database");
    setTimeout(function() {updateDiveSite()}, 1000); // Pourquoi ne pas faire une animation de chargement ?*
});

function create_elements(tab_dive_sites) {
    // Création de l'affichage des sites de plongée
    let container = document.getElementById("liste_dive_site");
    container.innerHTML = "";
    console.log(tab_dive_sites);
    // Parcourir le tableau d'éléments et créer des <li> pour chaque élément
    for (let i = 0; i < tab_dive_sites.length; i++) {

        /*let siteImage = tab_dive_sites[i].get_image();
        let blob = new Blob([siteImage], {type: "image/jpeg"});
        let imgElement = document.createElement("img");
        imgElement.src = URL.createObjectURL(blob);
        let imageContainer = document.getElementById("teeeeeest");
        imageContainer.appendChild(imgElement);
        console.log(imageContainer);*/
        
        
        // Création dynamique des éléments HTML pour chaque site de plongée
        let siteElement = document.createElement('div');
        siteElement.classList.add("dive-site-list-item");

        // Partie haute avec le nom du site et la ville
        let siteElementTop = document.createElement('div');
        siteElementTop.classList.add("top-part");
        let siteElementTopName = document.createElement('h1');
        siteElementTopName.innerHTML = tab_dive_sites[i].get_site_name();
        siteElementTop.appendChild(siteElementTopName);
        let siteElementTopTown = document.createElement('h2');
        siteElementTopTown.classList.add("linkhover");
        siteElementTopTown.innerHTML = tab_dive_sites[i].get_city();
        let siteElementTopTownIcon = document.createElement('i');
        siteElementTopTownIcon.classList.add("fa-solid");
        siteElementTopTownIcon.classList.add("fa-circle-info");
        siteElementTopTown.appendChild(siteElementTopTownIcon);
        siteElementTop.appendChild(siteElementTopTown);
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
        if(tab_dive_sites[i].get_telephone() == null){
            siteElementBottomInfoTel.innerHTML = "06 06 06 06 06";
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
        siteElementButtonContainer.appendChild(siteElementButton);
        siteElement.appendChild(siteElementButtonContainer);

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
        siteElementHover.appendChild(siteElementHoverTop);

        // Partie basse avec la map et les coordonnées
        let siteElementHoverBottom = document.createElement('div');
        siteElementHoverBottom.classList.add("bottom-part");
        let siteElementHoverBottomMap = document.createElement('div');
        siteElementHoverBottomMap.classList.add("map");
        siteElementHoverBottomMap.innerHTML = "Map";
        siteElementHoverBottomMap.setAttribute('id', 'map' + i);          
        siteElementHoverBottom.appendChild(siteElementHoverBottomMap);
        let siteElementHoverBottomLocation = document.createElement('div');
        siteElementHoverBottomLocation.classList.add("location");
        let siteElementHoverBottomLocationAddress = document.createElement('p');
        siteElementHoverBottomLocationAddress.innerHTML = tab_dive_sites[i].get_aditionnal_info();
        siteElementHoverBottomLocation.appendChild(siteElementHoverBottomLocationAddress);
        let siteElementHoverBottomLocationPosition = document.createElement('p');
        siteElementHoverBottomLocationPosition.innerHTML = tab_dive_sites[i].get_gps_latitude() + " " + tab_dive_sites[i].get_gps_longitude();
        siteElementHoverBottomLocation.appendChild(siteElementHoverBottomLocationPosition);
        siteElementHoverBottom.appendChild(siteElementHoverBottomLocation);
        
        siteElementHover.appendChild(siteElementHoverBottom);
        siteElementTopTown.appendChild(siteElementHoverContainer);                

        //siteElement.innerHTML = tab_dive_sites[i].get_site_name() + "<br>" + tab_dive_sites[i].get_track_type() + " " + tab_dive_sites[i].get_track_number() + " " + tab_dive_sites[i].get_track_name() + "<br>" + tab_dive_sites[i].get_zip_code() + " " + tab_dive_sites[i].get_city() + "<br>" + tab_dive_sites[i].get_country() + "<br>" + tab_dive_sites[i].get_aditionnal_info() + "<br>" + tab_dive_sites[i].get_telephone() + "<br>" + tab_dive_sites[i].get_url() + "<br>" + tab_dive_sites[i].get_gps_latitude() + " " + tab_dive_sites[i].get_gps_longitude() + "<br>" + "<br>";
        // Ajouter du contenu ou des styles si nécessaire
        //for(let element of tab_dive_sites){
        //    console.log(element);
        //    div.innerHTML = element.get_site_name() + "<br>" + element.get_track_type() + " " + element.get_track_number() + " " + element.get_track_name() + "<br>" + element.get_zip_code() + " " + element.get_city() + "<br>" + element.get_country() + "<br>" + element.get_aditionnal_info() + "<br>" + element.get_telephone() + "<br>" + element.get_url() + "<br>" + element.get_gps_latitude() + " " + element.get_gps_longitude() + "<br>" + "<br>";
        //}

        // Ajouter la div à l'élément parent
        container.appendChild(siteElement);
        initMap(tab_dive_sites[i],i);
    }
}


function hoverlistener() {
    let town_hover = document.getElementsByClassName("linkhover");
    for (let i = 0 ; i < town_hover.length; i++) {
        town_hover[i].addEventListener("mouseover", function( event ){
        let current_target = event.currentTarget.getElementsByTagName("div")[0];
        current_target.style.visibility = 'visible';
        
        }, false);
        town_hover[i].addEventListener("mouseleave", function( event ){
            let current_target = event.currentTarget.getElementsByTagName("div")[0];
            current_target.style.visibility = 'hidden';
        }, false); 
     }


}


async function initMap(tab_dive_sites,i) {
    const { Map } = await google.maps.importLibrary("maps");
    const map = new google.maps.Map(document.getElementById('map'+i), {
        zoom: 4,
        center: { lat : tab_dive_sites.get_gps_latitude(), lng : tab_dive_sites.get_gps_longitude() },
      });
}



function updateDiveSite(){
    tabDiveSites = [];
    SocketManager.getAllDiveSites();
}

// CALENDAR :


//window.initMap = initMap;

export default {
    LoadAllDiveSites,
}
