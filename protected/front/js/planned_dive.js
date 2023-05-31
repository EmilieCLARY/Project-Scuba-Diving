import SocketManager from './SocketManager/SocketPlannedDive.js'

SocketManager.getAllDiveSites();
SocketManager.getAllPlannedDives();

let tabPlannedDives = [];
let tabDiveSites = [];

// Classe privée planned_dives

class planned_dives {
    constructor(id_,planned_date_, planned_time_, comments_, special_needs_, statut_, diver_dive_price_, instructor_dive_price_, id_dive_site_) {
        this.id = id_;
        this.planned_date = planned_date_;
        this.planned_time = planned_time_;
        this.comments = comments_;
        this.special_needs = special_needs_;
        this.statut = statut_;
        this.diver_dive_price = diver_dive_price_;
        this.instructor_dive_price = instructor_dive_price_;
        this.id_dive_site = id_dive_site_;
    }

    get_id() {
        return this.id;
    }
    
    set_id(id) {
        this.id = id;
    }

    get_planned_date() {
        return this.planned_date;
    }

    set_planned_date(planned_date) {
        this.planned_date = planned_date;
    }

    get_planned_time() {
        return this.planned_time;
    }

    set_planned_time(planned_time) {
        this.planned_time = planned_time;
    }

    get_comments() {
        return this.comments;
    }

    set_comments(comments) {
        this.comments = comments;
    }

    get_special_needs() {
        return this.special_needs;
    }

    set_special_needs(special_needs) {
        this.special_needs = special_needs;
    }

    get_status() {
        return this.status;
    }

    set_status(status) {
        this.status = status;
    }


    get_diver_dive_price() {
        return this.diver_dive_price;
    }

    set_diver_dive_price(diver_dive_price) {
        this.diver_dive_price = diver_dive_price;
    }

    get_instructor_dive_price() {
        return this.instructor_dive_price;
    }

    set_instructor_dive_price(instructor_dive_price) {
        this.instructor_dive_price = instructor_dive_price;
    }

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

function LoadAllPlannedDives(tab) {
    tab.forEach(element => {
        let tmp = new planned_dives(element.Id_Planned_Dive,element.Planned_Date, element.Planned_Time, element.Comments, element.Special_Needs, element.Status, element.Diver_Price, element.Instructor_Price, element.Dive_Site_Id_Dive_Site);
        tabPlannedDives.push(tmp);
    });
    createCardsPlannedDive(tabPlannedDives);
    console.log(tabPlannedDives);
}

function LoadAllDiveSites(tab){
    tab.forEach(element => {
        let tmp = new dive_site(element.Id_Dive_Site,element.Site_Name, element.Gps_Latitude, element.Gps_Longitude, element.Track_Type, element.Track_Number, element.Track_Name, element.Zip_Code, element.City_Name, element.Country_Name, element.Additional_Address, element.Tel_Number, element.Information_URL, element.Image);
        tabDiveSites.push(tmp);
    });
    console.log(tabDiveSites);
    
    createDiveSitesList();
}

function createDiveSitesList(){
    let select = document.getElementById("planned-dive-site");
    tabDiveSites.forEach(element => {
        let option = document.createElement("option");
        option.text = element.get_site_name();
        option.value = element.get_id();
        select.add(option);
    });
}
 
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

    SocketManager.addPlannedDive(id,planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, parseInt(dive_site_value));
    //alert("Planned dive added");
    console.log(planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, dive_site_value);

    // Clear all fields
    document.getElementById("planned-dive-date").value = "";
    document.getElementById("planned-dive-time").value = "";
    document.getElementById("planned-dive-comments").value = "";
    document.getElementById("planned-dive-special-needs").value = "";
    document.getElementById("planned-dive-statut").value = "1";
    document.getElementById("planned-dive-diver-dive-price").value = "";
    document.getElementById("planned-dive-instructor-dive-price").value = "";
    document.getElementById("planned-dive-site").value = "1";

    // Update the list
    console.log("Adding planned dive in database");
    setTimeout(function() {updatePlannedDive()}, 1000);
}); 

function updatePlannedDive(){
    tabPlannedDives = [];
    SocketManager.getAllPlannedDives();
}

function createCardsPlannedDive(tabPlannedDives){

    let ul = document.getElementById("liste_planned_dive");
    ul.innerHTML = "";
    ul.classList.add("cards");

    for(let i = 0; i < tabPlannedDives.length; i++){

        let li = document.createElement("li");
        li.classList.add("cards_item");
        li.innerHTML = tabPlannedDives[i].get_planned_date();

        let div = document.createElement("div");
        div.classList.add("card");

        ul.appendChild(li);


    }

}

export default {
    LoadAllPlannedDives,
    LoadAllDiveSites,
}