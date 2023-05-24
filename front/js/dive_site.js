import SocketManager from '../back/SocketManager/SocketDiveSite.js'


SocketManager.getAllDiveSite();

// Classe privée Site de plongée

class dive_site {
    constructor() {
        this.site_name = site_name;
        this.gps_latitude = gps_latitude;
        this.gps_longitude = gps_longitude;
        this.track_type = track_type;
        this.track_number = track_number;
        this.track_name = track_name;
        this.zip_code = zip_code;
        this.city = city;
        this.country = country;
        this.aditionnal_info = aditionnal_info;
        this.telephone = telephone;
        this.url = url;
    }

    get site_name() {
        return this.site_name;
    }

    set site_name(site_name) {
        this.site_name = site_name;
    }

    get gps_latitude() {
        return this.gps_latitude;
    }

    set gps_latitude(gps_latitude) {
        this.gps_latitude = gps_latitude;
    }

    get gps_longitude() {
        return this.gps_longitude;
    }

    set gps_longitude(gps_longitude) {
        this.gps_longitude = gps_longitude;
    }

    get track_type() {
        return this.track_type;
    }

    set track_type(track_type) {
        this.track_type = track_type;
    }

    get track_number() {
        return this.track_number;
    }

    set track_number(track_number) {
        this.track_number = track_number;
    }
    
    get track_name() {
        return this.track_name;
    }

    set track_name(track_name) {
        this.track_name = track_name;
    }

    get zip_code() {
        return this.zip_code;
    }

    set zip_code(zip_code) {
        this.zip_code = zip_code;
    }

    get city() {
        return this.city;
    }

    set city(city) {
        this.city = city;
    }

    get country() {
        return this.country;
    }

    set country(country) {
        this.country = country;
    }

    get aditionnal_info() {
        return this.aditionnal_info;
    }

    set aditionnal_info(aditionnal_info) {
        this.aditionnal_info = aditionnal_info;
    }

    get telephone() {
        return this.telephone;
    }

    set telephone(telephone) {
        this.telephone = telephone;
    }

    get url() {
        return this.url;
    }

    set url(url) {
        this.url = url;
    }
}

function create_element() {
    // Création de l'affichage des sites de plongée
    let ul = document.getElementById("liste_dive_site");
    let bdd_length = 5;
    
    // Parcourir le tableau d'éléments et créer des <li> pour chaque élément
    for (let i = 0; i < bdd_length; i++) {
        // Créer un nouvel élément <li>
        let li = document.createElement("li");

        // Définir le texte de l'élément <li> en utilisant l'élément correspondant du tableau
        li.appendChild(document.createTextNode("test\n"));

        // Ajouter l'élément <li> à l'élément <ul>
        ul.appendChild(li);
    }
}