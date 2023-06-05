import SocketManager from './SocketManager/SocketPlannedDive.js'

SocketManager.getAllDiveSites();
SocketManager.getAllPlannedDives();
SocketManager.getAllDivers();
SocketManager.getAllDiveRegistrations();
SocketManager.getIsAdmin();

let tabPlannedDives = [];
let tabDiveSites = [];
let tabDivers = [];
let tabDiveRegistrations = [];
let isAdmin = false;

let currentDiveSite = 0;
let currentPlannedDive = 0;

document.getElementById("ring-loading").style.display = "none";

// Modal voir plus
let modal_info = document.getElementById("container-modal2");
let closeModalInfo = document.getElementById("close-pd-modal2");
let closeInfoButton = document.getElementById("pd-close-button2");

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

// Modal création
let formModal = document.getElementById("planned-dive-creation-form");
let openformModal = document.getElementById("open-planned-dive-form");
let closeformModal = document.getElementById("close-planned-dive-form");
let closeformButton = document.getElementById("planned-dive-form-close-button");

openformModal.onclick = function() {
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

window.onclick = function(event) {
    if (event.target == modal_reg) {
        modal_reg.style.display = "none";
    }
}

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

    get_statut() {
        return this.statut;
    }

    set_statut(status) {
        this.statut = statut;
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

    get_id_dive_site() {
        return this.id_dive_site;
    }

    set_id_dive_site(id_dive_site) {
        this.id_dive_site = id_dive_site;
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

// Classe privée pour un plongeur
class diver {
    constructor(id_,last_name_,first_name_,diver_qualification_,instructor_qualification_,nox_level_,additionnal_qualification_,licence_number_,licence_expiration_date_,medical_certificate_expiration_date_,birth_date_) {
        this.id = id_;
        this.last_name = last_name_;
        this.first_name = first_name_;
        this.diver_qualification = diver_qualification_;
        this.instructor_qualification = instructor_qualification_;
        this.nox_level = nox_level_;
        this.additionnal_qualification = additionnal_qualification_;
        this.licence_number = licence_number_;
        this.licence_expiration_date = licence_expiration_date_;
        this.medical_certificate_expiration_date = medical_certificate_expiration_date_;
        this.birth_date = birth_date_;
    }

    get_id() {
        return this.id;
    }

    set_id(id) {
        this.id = id;
    }

    get_last_name() {
        return this.last_name;
    }

    set_last_name(last_name) {
        this.last_name = last_name;
    }

    get_first_name() {
        return this.first_name;
    }

    set_first_name(first_name) {
        this.first_name = first_name;
    }

    get_diver_qualification() {
        return this.diver_qualification;
    }

    set_diver_qualification(diver_qualification) {
        this.diver_qualification = diver_qualification;
    }

    get_instructor_qualification() {
        return this.instructor_qualification;
    }


    set_instructor_qualification(instructor_qualification) {
        this.instructor_qualification = instructor_qualification;
    }

    get_nox_level() {
        return this.nox_level;
    }

    set_nox_level(nox_level) {
        this.nox_level = nox_level;
    }

    get_additionnal_qualification() {
        return this.additionnal_qualification;
    }

    set_additionnal_qualification(additionnal_qualification) {
        this.additionnal_qualification = additionnal_qualification;
    }

    get_licence_number() {
        return this.licence_number;
    }

    set_licence_number(licence_number) {
        this.licence_number = licence_number;
    }

    get_licence_expiration_date() {
        return this.licence_expiration_date;
    }

    set_licence_expiration_date(licence_expiration_date) {
        this.licence_expiration_date = licence_expiration_date;
    }

    get_medical_certificate_expiration_date() {

        return this.medical_certificate_expiration_date;
    }

    set_medical_certificate_expiration_date(medical_certificate_expiration_date) {
        this.medical_certificate_expiration_date = medical_certificate_expiration_date;
    }

    get_birth_date() {
        return this.birth_date;
    }

    set_birth_date(birth_date) {
        this.birth_date = birth_date;
    }
}

class dive_registration {
    constructor(diver_id_, planned_dive_id_, diver_role_, registration_timestamp_, personal_comment_, car_pooling_seat_offered_, car_pooling_seat_request_){
        this.diver_id = diver_id_;
        this.planned_dive_id = planned_dive_id_;
        this.diver_role = diver_role_;
        this.registration_timestamp = registration_timestamp_;
        this.personal_comment = personal_comment_;
        this.car_pooling_seat_offered = car_pooling_seat_offered_;
        this.car_pooling_seat_request = car_pooling_seat_request_;
    }

    get_diver_id() {
        return this.diver_id;
    }

    set_diver_id(diver_id) {
        this.diver_id = diver_id;
    }

    get_planned_dive_id() {
        return this.planned_dive_id;
    }

    set_planned_dive_id(planned_dive_id) {
        this.planned_dive_id = planned_dive_id;
    }

    get_diver_role() {
        return this.diver_role;
    }

    set_diver_role(diver_role) {
        this.diver_role = diver_role;
    }

    get_registration_timestamp() {
        return this.registration_timestamp;
    }

    set_registration_timestamp(registration_timestamp) {
        this.registration_timestamp = registration_timestamp;
    }

    get_personal_comment() {
        return this.personal_comment;
    }

    set_personal_comment(personal_comment) {
        this.personal_comment = personal_comment;
    }

    get_car_pooling_seat_offered() {
        return this.car_pooling_seat_offered;
    }

    set_car_pooling_seat_offered(car_pooling_seat_offered) {
        this.car_pooling_seat_offered = car_pooling_seat_offered;
    }

    get_car_pooling_seat_request() {
        return this.car_pooling_seat_request;
    }

    set_car_pooling_seat_request(car_pooling_seat_request) {
        this.car_pooling_seat_request = car_pooling_seat_request;
    }
}

function LoadAllPlannedDives(tab) {
    tab.forEach(element => {
        let tmp = new planned_dives(element.Id_Planned_Dive,element.Planned_Date, element.Planned_Time, element.Comments, element.Special_Needs, element.Status, element.Diver_Price, element.Instructor_Price, element.Dive_Site_Id_Dive_Site);
        tabPlannedDives.push(tmp);
    });
    createCardsPlannedDive(tabPlannedDives, tabDiveSites);
    setListeners();

    console.log(tabPlannedDives);
}

function LoadAllDiveSites(tab){
    tab.forEach(element => {
        let tmp = new dive_site(element.Id_Dive_Site,element.Site_Name, element.Gps_Latitude, element.Gps_Longitude, element.Track_Type, element.Track_Number, element.Track_Name, element.Zip_Code, element.City_Name, element.Country_Name, element.Additional_Address, element.Tel_Number, element.Information_URL, element.Image);
        tabDiveSites.push(tmp);
    });
    console.log(tabDiveSites);
    
    createDiveSitesList(tabPlannedDives);
}

function LoadAllDivers(tab){
    tab.forEach(element => {
        let tmp = new diver(element.Id_Diver,element.Lastname,element.Firstname,element.Diver_Qualifications,element.Instructor_Qualification,element.Nox_Level,element.Additional_Qualifications,element.License_Number,element.License_Expiration_Date,element.Medical_Certificate_Expiration_Date,element.Birthdate);
        tabDivers.push(tmp);
    });
    console.log(tabDivers);
}

function LoadAllDiveRegistrations(tab){
    tab.forEach(element => {
        let tmp = new dive_registration(element.Diver_Id_Diver,element.Planned_Dive_Id_Planned_Dive,element.Diver_Role,element.Resgistration_Timestamp,element.Personal_Comment,element.Car_Pooling_Seat_Offered,element.Car_Pooling_Seat_Request);
        tabDiveRegistrations.push(tmp);
    });
    console.log(tabDiveRegistrations);
}

function LoadIsAdmin(isAdmin_){
    isAdmin = isAdmin_;
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
    document.getElementById("ring-loading").style.display = "block";
        document.body.style.cursor = "wait";        
        setTimeout(function() {
            updatePlannedDive();
            document.getElementById("ring-loading").style.display = "none";
            document.body.style.cursor = "default";
        }, 1000);
}); 

function updatePlannedDive(){
    tabPlannedDives = [];
    SocketManager.getAllPlannedDives();
}

function setListeners(){
    
    for(let i = 0; i < tabPlannedDives.length; i++){
        let actualDate = new Date();

        if(new Date(tabPlannedDives[i].get_planned_date()) >= new Date()) {
            document.getElementById("PD_btn" + tabPlannedDives[i].get_id()).addEventListener("click", (e) => {
                let tmp = tabPlannedDives[i].get_id();
                createInfoPlannedDive(tmp); 
            });
        }
    }
}

function createInfoPlannedDive(id) { 
    let PlannedDiveInfo = getPlannedDiveById(id);
    let PlannedDiveInfoDiveSite = getDiveSiteById(PlannedDiveInfo.get_id_dive_site());
    console.log(PlannedDiveInfo);

    currentPlannedDive = PlannedDiveInfo.get_id();
    currentDiveSite = PlannedDiveInfoDiveSite.get_id();

    //console.log(currentPlannedDive, currentDiveSite);

    document.getElementById("container-modal2").style.display = "block";

    document.getElementById("site-name-pd").innerHTML = "Site de plongée : " + PlannedDiveInfoDiveSite.get_site_name();
    if(PlannedDiveInfo.get_diver_dive_price() == 0){
        document.getElementById("diver-price-pd").innerHTML = "Prix plongeur : Gratuit";
    }
    else{
        document.getElementById("diver-price-pd").innerHTML = "Prix plongeur : " + PlannedDiveInfo.get_diver_dive_price() + "€";
    }
    if(PlannedDiveInfo.get_instructor_dive_price() == 0){
        document.getElementById("instructor-price-pd").innerHTML = "Prix moniteur : Gratuit";
    }
    else{
        document.getElementById("instructor-price-pd").innerHTML = "Prix moniteur : " + PlannedDiveInfo.get_instructor_dive_price() + "€";
    }
    if(PlannedDiveInfo.get_comments() == ""){
        document.getElementById("comments-pd").innerHTML = "Commentaires : Aucun";
    }
    else{
        document.getElementById("comments-pd").innerHTML = "Commentaires : " + PlannedDiveInfo.get_comments();
    }
    if(PlannedDiveInfo.get_special_needs() == ""){
        document.getElementById("special-needs-pd").innerHTML = "Besoins spéciaux : Aucun";
    }
    else{
        document.getElementById("special-needs-pd").innerHTML = "Besoins spéciaux : " + PlannedDiveInfo.get_special_needs();
    }
    document.getElementById("date-pd").innerHTML = "Date : " + PlannedDiveInfo.get_planned_date();
    document.getElementById("time-pd").innerHTML = "Heure : " + PlannedDiveInfo.get_planned_time();


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

    // Parcours du tableau des dives registration
    tabDiveRegistrations.forEach(element => {
        if(element.get_planned_dive_id() == PlannedDiveInfo.get_id()){
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");

            td1.innerHTML = tabDivers[element.get_diver_id()].get_last_name();
            td2.innerHTML = tabDivers[element.get_diver_id()].get_first_name();
            td3.innerHTML = element.get_diver_role();

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            if(isAdmin == 1){
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
                        supprimerRegistration(element.get_diver_id());
                    }
                    else{
                        console.log("Annulation de la suppression");
                    }
                });
            }

            document.getElementById("tbody-pd").appendChild(tr);
        }
    });

}

function supprimerRegistration(id){
    console.log(id);
}

document.getElementById("inscription-planned-dive").addEventListener("click", (e) => {
    document.getElementById("container-modal3").style.display = "block";
});

document.getElementById("inscription-planned-dive-modal").addEventListener("click", (e) => {
    let id_planned_dive = currentPlannedDive;
    let diver_role = document.getElementById("diver-role").value;
    let registration_timestamp = new Date();
    let personal_comment = document.getElementById("personal-comment").value;
    let car_pooling_seat_offered;
    let car_pooling_seat_request;
    let tmp_blablacar = document.getElementById("car-pooling").value;

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

    SocketManager.diverRegistration(id_planned_dive, diver_role, registration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request);

    document.getElementById("container-modal3").style.display = "none";
});


function createCardsPlannedDive(tabPlannedDives, tabDiveSites){

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

            /* Remplissage des cartes */   

            let div = document.createElement("div");
            div.classList.add("card");

            /* Div Haut */
            let div_haut = document.createElement("div");
            div_haut.classList.add("div_haut");

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
                dive_status.innerHTML = "Statut : Fermée";
            }else{
                dive_status.innerHTML = "Statut : Ouverte";
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
    }

}

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

export default {
    LoadAllPlannedDives,
    LoadAllDiveSites,
    LoadAllDivers,
    LoadAllDiveRegistrations,
    LoadIsAdmin,
}