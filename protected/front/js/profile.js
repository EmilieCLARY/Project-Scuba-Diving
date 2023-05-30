import SocketManager from './SocketManager/SocketProfile.js'

SocketManager.getUserProfile();

function LoadUserProfile(userProfile){
    console.log("Id : " + userProfile.Id_Diver);
    console.log("First name : " + userProfile.Firstname);
    console.log("Last name : " + userProfile.Lastname);

    switch(parseInt(userProfile.Diver_Qualifications)){
        case 1:
            console.log("Diver Qualification : Etoile de mer 1");
            break;
        case 2:
            console.log("Diver Qualification : Bronze");
            break;
        case 3:
            console.log("Diver Qualification : Argent");
            break;
        case 4:
            console.log("Diver Qualification : Or");
            break;
        case 5:
            console.log("Diver Qualification : N1");
            break;
        case 6:
            console.log("Diver Qualification : N2");
            break;
        case 7:
            console.log("Diver Qualification : N3");
            break;
        case 8:
            console.log("Diver Qualification : N4");
            break;
        case 11:
            console.log("Diver Qualification : Aucune");
            break;
        case 12:
            console.log("Diver Qualification : Etoile de mer 2");
            break;
        case 13:
            console.log("Diver Qualification : Etoile de mer 3");
            break;
        default:
            console.log("Diver Qualification : Inconnue");
            break;
    }

    switch(parseInt(userProfile.Instructor_Qualification)){
        case 1:
            console.log("Instructor Qualification : Aucune");
            break;
        case 2:
            console.log("Instructor Qualification : E1");
            break;
        case 3:
            console.log("Instructor Qualification : E2");
            break;
        case 4:
            console.log("Instructor Qualification : E3");
            break;
        case 5:
            console.log("Instructor Qualification : E4");
            break;
        default:
            console.log("Instructor Qualification : Inconnue");
            break;
    }

    switch(parseInt(userProfile.Nox_Level)){
        case 1:
            console.log("Nox Level : Aucun");
            break;
        case 2:
            console.log("Nox Level : NITROX");
            break;
        case 3:
            console.log("Nox Level : NITROX Confirmé");
            break;
        case 4:
            console.log("Nox Level : Moniteur NITROX");
            break;
        default:
            console.log("Nox Level : Inconnu");
            break;
    }

    console.log("Additionnal Qualifications : " + userProfile.Additional_Qualifications);
    console.log("License Number : " + userProfile.License_Number);
    console.log("License Expiration Date : " + userProfile.License_Expiration_Date);
    console.log("Medical Certificate Expiration Date : " + userProfile.Medical_Certificate_Expiration_Date);
    console.log("Birth Date : " + userProfile.Birthdate);

    console.log(userProfile); // Le tableau est bien reçu par le front
}


export default {
    LoadUserProfile,
}