import SocketManager from './SocketManager/SocketAppUser.js'

SocketManager.getAllAppUsers();
SocketManager.getAllDivers();

let tabAppUsers = [];
let tabDivers = [];
let modifiedAppUser;

let modal = document.getElementById("form-appuser-container");
let closeModal = document.getElementById("close-site-modal");
let closeButton = document.getElementById("diver-close-button");

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

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

class app_user{
    constructor(id_, Lastname_, Firstname_, Id_Diver, isAdmin){
        this.id = id_;
        this.Lastname = Lastname_;
        this.Firstname = Firstname_;
        this.Id_Diver = Id_Diver;
        this.isAdmin = isAdmin;
    }

    get_id(){
        return this.id;
    }

    get_Lastname(){
        return this.Lastname;
    }

    get_Firstname(){
        return this.Firstname;
    }

    get_Id_Diver(){
        return this.Id_Diver;
    }

    get_isAdmin(){
        return this.isAdmin;
    }

    set_id(id_){
        this.id = id_;
    }

    set_Lastname(Lastname_){
        this.Lastname = Lastname_;
    }

    set_Firstname(Firstname_){
        this.Firstname = Firstname_;
    }

    set_Id_Diver(Id_Diver_){
        this.Id_Diver = Id_Diver_;
    }

    set_isAdmin(isAdmin_){
        this.isAdmin = isAdmin_;
    }
}

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

function LoadAllAppUsers(tab){
    tab.forEach(element => {
        let tmp = new app_user(element.Id_Application_User, element.Lastname, element.Firstname, element.Id_Diver, element.isAdmin);
        tabAppUsers.push(tmp);
    });
    console.log(tabAppUsers);
    createAppUserTable(tabAppUsers);
    setListeners();
}

function LoadAllDivers(tab){
    tab.forEach(element => {
        let tmp = new diver(element.Id_Diver,element.Lastname,element.Firstname,element.Diver_Qualifications,element.Instructor_Qualification,element.Nox_Level,element.Additional_Qualifications,element.License_Number,element.License_Expiration_Date,element.Medical_Certificate_Expiration_Date,element.Birthdate);
        tabDivers.push(tmp);
    });
    console.log(tabDivers);
}



function setButtonListener(){
    document.getElementById("validate-diver").addEventListener("click", function(){
        // Get all input
        let Id_Diver = document.getElementById("app-user-diver").value;
        let isAdmin = document.getElementById("app-user-admin").value;

        // Send to server
        // Check if Id_Diver exist
        console.log(Id_Diver);
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
            updateAppUser();
            document.getElementById("ring-loading").style.display = "none";
            document.body.style.cursor = "default";
        }, 1000);
    });
}

setButtonListener();

function updateAppUser(){
    tabAppUsers = [];
    SocketManager.getAllAppUsers();
}

function createAppUserTable(tabAppUsers){
    let table = document.getElementById("liste_user");
    table.innerHTML = "";
    console.log(tabAppUsers);

    let tableau = document.createElement("table");
    tableau.classList.add("blueTable");

    let head = document.createElement("thead");

    /* Première Row */

    let tr = document.createElement("tr");
    tr.classList.add("tr");

    let th1 = document.createElement("th");
    th1.innerHTML = "Id Application User";
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.innerHTML = "Nom";
    tr.appendChild(th2);

    let th3 = document.createElement("th");
    th3.innerHTML = "Prénom";
    tr.appendChild(th3);

    let th4 = document.createElement("th");
    th4.innerHTML = "Id Diver";
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

function setListeners(){
    for(let i = 0; i < tabAppUsers.length; i++){
        let btn = document.getElementById("btn_modif" + tabAppUsers[i].get_id());
        btn.addEventListener("click", function(){
            console.log("Modification de l'utilisateur " + tabAppUsers[i].get_id());
            modifierAppUser(tabAppUsers[i].get_id());
        });
    }
}

function modifierAppUser(id){
    modifiedAppUser = id;

    let user = getUserById(id);

    document.getElementById("app-user-diver").value = user.get_Id_Diver();
    document.getElementById("app-user-admin").value = user.get_isAdmin();

    modal.style.display = "block";
}

function getUserById(id){
    for(let i = 0; i < tabAppUsers.length; i++){
        if(tabAppUsers[i].get_id() == id){
            return tabAppUsers[i];
        }
    }
    return null;
}

export default {
    LoadAllAppUsers,
    LoadAllDivers,
}