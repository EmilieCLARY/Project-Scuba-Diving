import SocketManager from './SocketManager/SocketProfile.js'

SocketManager.getUserProfile();

function LoadUserProfile(userProfile){
    console.log("Id : " + userProfile.Id_Diver);
    console.log("First name : " + userProfile.Firstname);
    console.log("Last name : " + userProfile.Lastname);

    switch(parseInt(userProfile.Diver_Qualifications)){
        case 1:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Etoile de mer 1";
            console.log("Diver Qualification : Etoile de mer 1");
            break;
        case 2:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Bronze";
            console.log("Diver Qualification : Bronze");
            break;
        case 3:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Argent";
            console.log("Diver Qualification : Argent");
            break;
        case 4:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Or";
            console.log("Diver Qualification : Or");
            break;
        case 5:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : N1";
            console.log("Diver Qualification : N1");
            break;
        case 6:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : N2";
            console.log("Diver Qualification : N2");
            break;
        case 7:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : N3";
            console.log("Diver Qualification : N3");
            break;
        case 8:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : N4";
            console.log("Diver Qualification : N4");
            break;
        case 11:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Aucun";
            console.log("Diver Qualification : Aucune");
            break;
        case 12:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Etoile de mer 2";
            console.log("Diver Qualification : Etoile de mer 2");
            break;
        case 13:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Etoile de mer 3";
            console.log("Diver Qualification : Etoile de mer 3");
            break;
        default:
            document.getElementById("profile_dive_level").innerHTML = "Niveau de plongée : Inconnu"
            console.log("Diver Qualification : Inconnue");
            break;
    }

    switch(parseInt(userProfile.Instructor_Qualification)){
        case 1:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : Aucun";
            console.log("Instructor Qualification : Aucune");
            break;
        case 2:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : E1";
            console.log("Instructor Qualification : E1");
            break;
        case 3:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : E2";
            console.log("Instructor Qualification : E2");
            break;
        case 4:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : E3";
            console.log("Instructor Qualification : E3");
            break;
        case 5:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : E4";
            console.log("Instructor Qualification : E4");
            break;
        default:
            document.getElementById("profile_inst_level").innerHTML = "Niveau d'encadrant : Inconnu" 
            console.log("Instructor Qualification : Inconnue");
            break;
    }

    switch(parseInt(userProfile.Nox_Level)){
        case 1:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : Aucune";
            console.log("Nox Level : Aucun");
            break;
        case 2:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox :NITROX";
            console.log("Nox Level : NITROX");
            break;
        case 3:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : NITROX confirmé";
            console.log("Nox Level : NITROX Confirmé");
            break;
        case 4:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : Moniteur NITROX";
            console.log("Nox Level : Moniteur NITROX");
            break;
        default:
            document.getElementById("profile_nox_quali").innerHTML = "Qualification Nitrox : Inconnue";
            console.log("Nox Level : Inconnu");
            break;
    }

    //document.getElementById("").innerHTML = "Additionnal Qualifications : " + userProfile.Additional_Qualifications;

    document.getElementById("profile_name").innerHTML = "Nom : " +userProfile.Lastname;
    document.getElementById("profile_firstname").innerHTML = "Prénom : " +userProfile.Firstname;
    document.getElementById("profile_license_number").innerHTML = "Numéro de licence FFESSM : " +userProfile.License_Number;
    document.getElementById("profile_expi_license").innerHTML = "Date d'expiration de la licence FFESSM : " + userProfile.License_Expiration_Date;
    document.getElementById("profile_expi_medic").innerHTML = "Date d'expiration du certificat médical : " + userProfile.Medical_Certificate_Expiration_Date;
    document.getElementById("profile_birthdate").innerHTML = "Date de naissance : " + userProfile.Birthdate;

    console.log(userProfile); // Le tableau est bien reçu par le front
}


export default {
    LoadUserProfile,
}