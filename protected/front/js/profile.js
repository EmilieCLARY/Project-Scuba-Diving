import SocketManager from './SocketManager/SocketProfile.js'

SocketManager.getUserProfile();

document.getElementById("ring-loading").style.display = "none";

let userId_Diver;

let modal = document.getElementById("form-profile-container");
let openModal = document.getElementById("open-site-modal-profile");
let closeModal = document.getElementById("close-site-modal");
let closeButton = document.getElementById("profile-close-button");
let mézon = document.getElementById("mézon");

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

function LoadUserProfile(userProfile){

    userId_Diver = userProfile.Id_Diver;

    switch(parseInt(userProfile.Diver_Qualifications)){
        case 1:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Etoile de mer 1";
            break;
        case 2:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Bronze";
            break;
        case 3:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Argent";
            break;
        case 4:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Or";
            break;
        case 5:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : N1";
            break;
        case 6:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : N2";
            break;
        case 7:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : N3";
            break;
        case 8:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : N4";
            break;
        case 11:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Aucun";
            break;
        case 12:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Etoile de mer 2";
            break;
        case 13:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Etoile de mer 3";
            break;
        default:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Inconnu"
            break;
    }

    switch(parseInt(userProfile.Instructor_Qualification)){
        case 1:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : Aucun";
            break;
        case 2:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : E1";
            break;
        case 3:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : E2";
            break;
        case 4:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : E3";
            break;
        case 5:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : E4";
            break;
        default:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : Inconnu" 
            break;
    }

    switch(parseInt(userProfile.Nox_Level)){
        case 1:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : Aucune";
            break;
        case 2:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : NITROX";
            break;
        case 3:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : NITROX confirmé";
            break;
        case 4:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : Moniteur NITROX";
            break;
        default:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : Inconnue";
            break;
    }

    document.getElementById("profile_add_quali").innerHTML = "Qualification(s) additionnelle(s) : " + userProfile.Additional_Qualifications;

    document.getElementById("profile_name").innerHTML = "Nom : " +userProfile.Lastname;
    document.getElementById("profile_firstname").innerHTML = "Prénom : " + userProfile.Firstname;
    document.getElementById("profile_license_number").innerHTML = "Numéro de licence FFESSM : " +userProfile.License_Number;
    document.getElementById("profile_expi_license").innerHTML = "Date d'expiration de la licence FFESSM : " + userProfile.License_Expiration_Date;
    document.getElementById("profile_expi_medic").innerHTML = "Date d'expiration du certificat médical : " + userProfile.Medical_Certificate_Expiration_Date;
    document.getElementById("profile_birthdate").innerHTML = "Date de naissance : " + userProfile.Birthdate;

    //console.log(userProfile); // Le tableau est bien reçu par le front
    updateModal(userProfile);
}

function updateModal(userProfile){
    document.getElementById("diver-firstname").value = userProfile.Firstname;
    document.getElementById("diver-lastname").value = userProfile.Lastname;
    document.getElementById("diver-qualification").value = userProfile.Diver_Qualifications;
    document.getElementById("diver-instructor-qualification").value = userProfile.Instructor_Qualification;
    document.getElementById("diver-nox-level").value = userProfile.Nox_Level;
    document.getElementById("diver-additionnal-qualification").value = userProfile.Additional_Qualifications;
    document.getElementById("diver-license-number").value = userProfile.License_Number;
    document.getElementById("diver-license-expiration-date").value = userProfile.License_Expiration_Date;
    document.getElementById("diver-medical-certificate-expiration-date").value = userProfile.Medical_Certificate_Expiration_Date;
    document.getElementById("diver-birthdate").value = userProfile.Birthdate;
}

document.getElementById("validate-profile").addEventListener("click", (e) => {
    // Get all input
    let first_name = document.getElementById("diver-firstname").value;
    let last_name = document.getElementById("diver-lastname").value;
    let diver_qualification = document.getElementById("diver-qualification").value;
    let instructor_qualification = document.getElementById("diver-instructor-qualification").value;
    let nox_level = document.getElementById("diver-nox-level").value;
    let additionnal_qualification = document.getElementById("diver-additionnal-qualification").value;
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
    //console.log(id);
    SocketManager.modifyDiver(userId_Diver,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);

    // Closing modal
    modal.style.display = "none";

    // Update the list
    
    console.log("Modifying diver " + userId_Diver + " in database");
    
    
    document.getElementById("ring-loading").style.display = "block";
    document.body.style.cursor = "wait";        
    setTimeout(function() {
        SocketManager.getUserProfile();
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
    }, 1000);
});


export default {
    LoadUserProfile,
}