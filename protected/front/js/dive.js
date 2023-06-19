// Imports
import SocketManager from './SocketManager/SocketDives.js'
import DiveTeam from './Classes/dive_team.js'
import Dive from './Classes/dive.js'
import DiveSite from './Classes/dive_site.js'
import DiveRegistration from './Classes/dive_registration.js'
import Diver from './Classes/diver.js';
import DiveTeamMember from './Classes/dive_team_member.js';
import PlannedDive from './Classes/planned_dive.js';
import MaxDepthForQualification from './Classes/max_depth_for_qualification.js'


// Calling socket functions
SocketManager.getIdPlannedDive();
SocketManager.getAllDiveSites();
SocketManager.getAllPlannedDives();
SocketManager.getAllDivers();
SocketManager.getAllDiveRegistrations();
SocketManager.getAllDiveTeamMembers();
SocketManager.getAllDiveTeams();
SocketManager.getAllDives();
SocketManager.getIsAdmin();
SocketManager.getUserProfile();
SocketManager.getMaxDepthForQualification();

// Global variables
let tabPlannedDives = [];
let tabDiveSites = [];
let tabDivers = [];
let tabDiveRegistrations = [];
let tabDives = [];
let tabDiveTeamMembers = [];
let tabDiveTeams = [];
let tabMaxDepthForQualification = [];
let isAdmin = false;
let userProfile;
let isThereDirector = false;
let nbEssais = 0;

let idPlannedDive;

let loaded = 0;
let nbOfLoaded = 11;
var palanqueesValide = false;

let attributionAutomatique = false;

var tablecounter = 0;

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


/********************************************************************/
/*                         LOAD INFORMATIONS                        */
/********************************************************************/

function LoadAllPlannedDives(tab) {
    tab.forEach(element => {
        let tmp = new PlannedDive(element.Id_Planned_Dive,element.Planned_Date, element.Planned_Time, element.Comments, element.Special_Needs, element.Status, element.Diver_Price, element.Instructor_Price, element.Dive_Site_Id_Dive_Site);
        tabPlannedDives.push(tmp);
    });
    //console.log(tabPlannedDives);
    loaded++;
    checkLoaded();
}

function LoadAllDiveSites(tab){
    tab.forEach(element => {
        let tmp = new DiveSite(element.Id_Dive_Site,element.Site_Name, element.Gps_Latitude, element.Gps_Longitude, element.Track_Type, element.Track_Number, element.Track_Name, element.Zip_Code, element.City_Name, element.Country_Name, element.Additional_Address, element.Tel_Number, element.Information_URL, element.Image);
        tabDiveSites.push(tmp);
    });
    //console.log(tabDiveSites);
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
    console.log(tabDiveRegistrations);
    loaded++;
    checkLoaded();
}

function LoadAllDives(tab){
    tab.forEach(element => {
        let tmp = new Dive(element.Id_Dive,element.Begin_Time,element.Begin_Date,element.End_Date,element.End_Time,element.Comment,element.Surface_Security,element.Dive_Price,element.Instructor_Price,element.Max_Ppo2,element.Diver_Id_Diver,element.Planned_Dive_Id_Planned_Dive);
        tabDives.push(tmp);
    });
    console.log(tabDives);
    loaded++;
    checkLoaded();
}

function LoadIsAdmin(isAdmin_){
    isAdmin = isAdmin_;
    loaded++;
    checkLoaded();
}

function LoadUserProfile(userProfile_){
    userProfile = userProfile_;
    //console.log(userProfile);
    loaded++;
    checkLoaded();
}

function LoadAllDiveTeamMembers(tab){
    tab.forEach(element => {
        let tmp = new DiveTeamMember(element.Diver_Id_Diver,element.Dive_team_Id_Dive_Team,element.Temporary_Diver_Qualification,element.Current_Diver_Qualification,element.Diver_Role,element.Current_Instructor_Qualification,element.Nox_Percentage,element.Comment,element.Paid_Amount);
        tabDiveTeamMembers.push(tmp);
    });
    console.log(tabDiveTeamMembers);
    loaded++;
    checkLoaded();
}

function LoadAllDiveTeams(tab){
    tab.forEach(element => {
        let tmp = new DiveTeam(element.Id_Dive_Team,element.Max_Depth,element.Max_Duration,element.Real_Depth,element.Dive_Type,element.Dive_Type, element.Sequence_number,element.Start_Time,element.Stop_Time,element.Comment,element.Diver_Guide_Id_Diver, element.Dive_Id_Dive);
        tabDiveTeams.push(tmp);
    });
    console.log(tabDiveTeams);
    loaded++;
    checkLoaded();
}

function LoadMaxDepthForQualification(tab){
    tab.forEach(element => {
        let tmp = new MaxDepthForQualification(element.Id_Max_Depth_for_Qualification,element.Diver_Qualification,element.Diver_Age,element.Guided_Diver_Depth,element.Autonomous_Diver_Depth);
        tabMaxDepthForQualification.push(tmp);
    });
    //console.log(tabMaxDepthForQualification);
    loaded++;
    checkLoaded();
}

function LoadIdPlannedDive(idPlannedDive_){
    idPlannedDive = idPlannedDive_;
    loaded++;
    checkLoaded();
}

function setButtonListener(){
    const ajoutTabBouton = document.getElementById('ajouter-tableau');
    ajoutTabBouton.addEventListener('click', event => {
        creationTableauPalanquee(5,10,false);
    });

    const deleteAllTab = document.getElementById('clear-tableaux');
    deleteAllTab.addEventListener('click', event => {
        supprimerTousLesTableaux();
    });

    const attributionAutomatique = document.getElementById('attribution-automatique');
    attributionAutomatique.addEventListener('click', event => {
        funcAttributionAutomatique(); // Run myFunction with a timeout of 5 seconds (5000 milliseconds)
    });

    const validerButton = document.getElementById('valider');
    validerButton.addEventListener('click', event => {
        validerPalanquées();
    });
}

function validerPalanquées(attributionAutomatique){

    let idQualification;
    let minGuidedDepth = 9999;
    let nbrUnderage = 0;  
    let tableMinGuidedDepth = [];
    let directeurPlongée = 0;

    //Check if there is a table
    if (tablecounter == 0){
        if(attributionAutomatique == false){
            alert("Il n'y a aucune palanquée à valider, merci d'en créer au moins une.");
        }
        return;
    }
    //Check if tableInscrits is empty
    let tableInscrits = document.getElementById('tableInscrits')
    //console.log(tableInscrits)

    let trElements = tableInscrits.getElementsByTagName('tr');
    if (trElements.length > 1){
        if(attributionAutomatique == false){
            alert("Une ou plusieurs personnes n'ont pas été attribuées à une palanquée, merci de les attribuer manuellement.");
        }
        return;
    }

    //Check if there is a director of diving
    isThereDirector = false;
    for (let i = 1; i <= tablecounter; i++) {
        let table = document.getElementById(i);
        let trElements = table.getElementsByTagName('tr');
        for(let j = 4; j < trElements.length; j++){
            let role = trElements[j].getElementsByTagName('td')[4].innerHTML
            if (role == "Directeur de plongée"){
                //console.log("Directeur trouvé");
                //Fill the id of the director in a variable with getIdDiverByLastnameFirstNameAge
                let name = trElements[j].getElementsByTagName('td')[0].innerHTML;
                let firstname = trElements[j].getElementsByTagName('td')[1].innerHTML;
                let age = trElements[j].getElementsByTagName('td')[3].innerHTML;
                //console.log("Nom : " + name + " Prénom : " + firstname + " Age : " + age);
                let idDiver = getIdDiverByLastnameFirstNameAge(name,firstname,age);
                directeurPlongée = idDiver;
                //console.log("idDirecteurPlongée : " + idDiver);
                
                isThereDirector = true;
            }
        }
    }

    //Check if each table has a guide
    let isThereGuide = true;
    let tableGuide = []
    //Fill tableGuide with 1 for each tablecounter
    tableGuide[0] = 0;
    for (let i = 1; i <= tablecounter; i++) {
        tableGuide.push(0);
    }

    let nbrGuide = 0;
    //console.log("Nombre de tableaux : " + tablecounter);

    //Check if there is an empty table
    for(let i = 0; i < tablecounter; i++){
        let table = document.getElementById(i+1);
        let trElements = table.getElementsByTagName('tr');

        if (trElements.length == 2){
            //console.log("Tableau vide");
            if(attributionAutomatique == false){
                confirm("Impossible de valider si une palanquée est vide.\nLa palanquée " + (i+1) + " est vide");
            }
            return;
        }   
    }


    //Check how many child under 16 there are in each table
    for(let i = 0; i < tablecounter; i++){

        let table = document.getElementById(i+1);
        let trElements = table.getElementsByTagName('tr');
        let nbrDiver = trElements.length - 4;
        let nbrUnderage = 0;
        //console.log("Nombre de plongeur dans le tableau " + (i+1) + " : " + nbrDiver);

        let isThereUnderage = false;

        for(let j = 4; j < trElements.length; j++){
            let age = trElements[j].getElementsByTagName('td')[3].innerHTML
            if (age < 16){
                //console.log("Enfant trouvé");
                nbrUnderage++;
                isThereUnderage = true;
            }
        }

        let nbrGuide = 0;
        // Count the number of guide in the table
        for(let j = 4; j < trElements.length; j++){
            let role = trElements[j].getElementsByTagName('td')[4].innerHTML
            if (role == "Guide de palanquée" || role == "Directeur de plongée"){
                nbrGuide++;
            }
        }
        

        if(isThereUnderage && nbrDiver > 3){
            if(attributionAutomatique == false){
                confirm("Impossible de valider si une palanquée contient un enfant de moins de 16 ans et plus de 3 personnes totales.\nLa palanquée " + (i+1) + " contient " + nbrUnderage + " enfants de moins de 16 ans et " + nbrDiver + " plongeurs au total.");
            }
            return;
        }
        else if(nbrDiver > 5){
            if(attributionAutomatique == false){
                confirm("Impossible de valider si une palanquée contient plus de 5 plongeurs.\nLa palanquée " + (i+1) + " contient " + nbrDiver + " plongeurs.");
            }
            return;
        } else if(nbrUnderage > 2){
            if(attributionAutomatique == false){
                confirm("Impossible de valider si une palanquée contient plus de 2 enfants de moins de 16 ans.\nLa palanquée " + (i+1) + " contient " + nbrUnderage + " enfants de moins de 16 ans.");
            }
            return;
        }
        else if(nbrDiver == 5 && nbrGuide < 2){
            if(attributionAutomatique == false){
                confirm("Impossible de valider si une palanquée contient 5 plongeurs et moins de 2 guides.\nLa palanquée " + (i+1) + " contient " + nbrGuide + " guide(s).");
            }
            return;
        }
    }


    for (let i = 1; i <= tablecounter; i++) {
        let hasGuide = false;
        let table = document.getElementById(i);
        let trElements = table.getElementsByTagName('tr');
        //console.log(trElements);       

        
        for(let j = 4; j < trElements.length; j++){

            
            //Check if there is a guide
            let role = trElements[j].getElementsByTagName('td')[4].innerHTML
            if (role == "Guide de palanquée" || role == "Directeur de plongée"){
                //console.log("Guide trouvé");
                hasGuide = true;
                nbrGuide++;
                
                //Complete the table with the ID of the guide with the getIdDiverByLastnameFirstNameAge function
                let name = trElements[j].getElementsByTagName('td')[0].innerHTML
                let firstname = trElements[j].getElementsByTagName('td')[1].innerHTML
                let age = trElements[j].getElementsByTagName('td')[3].innerHTML
                let idDiver = getIdDiverByLastnameFirstNameAge(name, firstname, age);
                tableGuide[i] = idDiver;
                //console.log("Guide de la palanquée " + i + " : " + idDiver);
            }

            //Check the lowest qualification
            let qualification = trElements[j].getElementsByTagName('td')[2].innerHTML
            //console.log(qualification);
            idQualification = getIdQualification(qualification);
            /*
            switch(qualification){
                case "Etoile de mer 1":
                    idQualification = 1;
                    break;
                case "Etoile de mer 2":
                    idQualification = 12;
                    break;
                case "Etoile de mer 3":
                    idQualification = 13;
                    break;
                case "Bronze":
                    idQualification = 2;
                    break;
                case "Argent":
                    idQualification = 3;
                    break;
                case "Or":
                    idQualification = 4;
                    break;
                case "N1":
                    idQualification = 5;
                    break;
                case "N2":
                    idQualification = 6;
                    break;
                case "N3":
                    idQualification = 7;
                    break;
                case "N4":
                    idQualification = 8;
                    break;
                case "N5":
                    idQualification = 9;
                    break;
                case "Aucun":
                    idQualification = 11;
                    break;
                default:
                    break;
            }
            */
        
            tabMaxDepthForQualification.forEach(element => {
                //console.log(parseInt(element.get_diver_qualification()) + " " + idQualification);
                if (parseInt(element.get_diver_qualification()) == idQualification){
                    let GuidedDepth = parseInt(element.get_guided_diver_depth());
                    if(GuidedDepth < minGuidedDepth){
                        minGuidedDepth = GuidedDepth;
                        tableMinGuidedDepth[i] = minGuidedDepth;
                        //console.log("Profondeur maximale : " + minGuidedDepth)
                    }
                }
            }); 
        }
        console.log("Vérifications terminées")
        
    }

    if(!isThereGuide){
        let message ="Les palanquées suivantes n'ont pas de guide : ";
        for(let i = 1; i < tableGuide.length; i++){
            if (tableGuide[i] == 0){
                message +=  i + ", ";
            }
        }
        if(nbrGuide >= tablecounter){
            message += "\n Vous disposez de " + nbrGuide + " guides pour " + tablecounter + " palanquées : Essayez de les réorganiser";
        }else if (nbrGuide < tablecounter){
            message += "\n Vous disposez de " + nbrGuide + " guides pour " + tablecounter + " palanquées : Vous devez réduire le nombre de palanquées. ";
        }
        if(attributionAutomatique == false){
            confirm(message);
        }
        return;
    }

    if(!isThereDirector){
        if(attributionAutomatique == false){
            confirm("Impossible de valider si il n'y a pas de directeur de plongée \n");
        }
        return;
    }

    console.log("Je passe");
    palanqueesValide = true;

    let dive = créationDive(directeurPlongée);

    // Check si la diveTeam existe déjà
    let id_dive = dive.get_id();
    let isDiveTeamExist = false;
    let diveTeamId = [];
    tabDiveTeams.forEach(element => {
        if(element.get_id_dive() == id_dive){
            isDiveTeamExist = true;
            diveTeamId.push(element.get_id());
        }
    });

    // Update tables
    if(isDiveTeamExist){
        // Delete all the dive teams of the table tabDiveTeams with diveTeamId
        tabDiveTeams.forEach(element => {
            diveTeamId.forEach(id => {
                if(element.get_id() == id){
                    let index = tabDiveTeams.indexOf(element);
                    tabDiveTeams.splice(index, 1);
                }
            });
        });

        // Delete all the dive teams members of the table tabDiveTeamMembers with diveTeamId
        tabDiveTeamMembers.forEach(element => {
            diveTeamId.forEach(id => {
                if(element.get_id_palanquée() == id){
                    let index = tabDiveTeamMembers.indexOf(element);
                    tabDiveTeamMembers.splice(index, 1);
                }
            });
        });
    }

    if(isDiveTeamExist){
        //console.log("La diveTeam existe déjà");
        //console.log(diveTeamId);
        SocketManager.deleteAllDiveTeamsInfos(id_dive, diveTeamId);
        //console.log("DiveTeam supprimée");
        document.getElementById("ring-loading").style.display = "block";
        setTimeout(function(){
            for(let i = 1; i <= tablecounter; i++){
                let table = document.getElementById(i);
                let trElements = table.getElementsByTagName('tr');
        
                let idDiveTeam = créationDiveTeam(i, tableGuide, dive);
                for(let j = 4; j < trElements.length; j++){
                    créationDiveTeamMember(i, j, trElements, tableGuide, idDiveTeam);
                }
            }
            document.getElementById("ring-loading").style.display = "none";
        }, 1000);
    }
    else{
        for(let i = 1; i <= tablecounter; i++){
            let table = document.getElementById(i);
            let trElements = table.getElementsByTagName('tr');
            let idDiveTeam = créationDiveTeam(i, tableGuide, dive);
            for(let j = 4; j < trElements.length; j++){
                créationDiveTeamMember(i, j, trElements, tableGuide, idDiveTeam);
            }
        }
    }

}

function créationDive(directeurPlongée,i){
    //Création Dive

    let temp = -1;
    let planned_time = 0;
    let planned_date = 0;
    let prix_plongeur = 0;
    let prix_instructeur = 0;
    let comment = "";
    let ppo2 = document.getElementById("ppo2").value;
    let surface_security = document.getElementById("surface_security").value;

    let plannedDiveID = idPlannedDive
    tabPlannedDives.forEach(element => {
        if (element.get_id() == plannedDiveID){
            planned_time = element.get_planned_time();
            planned_date = element.get_planned_date();
            prix_plongeur = element.get_diver_dive_price();
            prix_instructeur = element.get_instructor_dive_price();
            comment = element.get_comments();
            //console.log("Planned Time : " + planned_time + " Planned Date : " + planned_date);
        }
    });

    // Si la dive n'existe pas, on la crée
    let isDiveExist = false;
    let diveId = -1;
    tabDives.forEach(element => {
        if (element.get_id_planned_dive() == plannedDiveID){
            //console.log("Dive déjà existante");
            isDiveExist = true;
            diveId = element.get_id();
        }
    });

    let dive;
    
    if(!isDiveExist){
        SocketManager.addDive(tabDives.length+1, planned_time, planned_date, planned_date, temp, comment, surface_security, prix_plongeur, prix_instructeur, ppo2, directeurPlongée, plannedDiveID);
        dive = new Dive(tabDives.length+1,planned_time, planned_date, planned_date, temp, comment, surface_security, prix_plongeur, prix_instructeur, ppo2, directeurPlongée, plannedDiveID);
    }
    else{
        //console.log("Dive déjà existante");
        dive = new Dive(diveId,planned_time, planned_date, planned_date, temp, comment, surface_security, prix_plongeur, prix_instructeur, ppo2, directeurPlongée, plannedDiveID);
        SocketManager.updateDive(diveId, planned_time, planned_date, planned_date, temp, comment, surface_security, prix_plongeur, prix_instructeur, ppo2, directeurPlongée, plannedDiveID);
    }
    return dive;
}

function créationDiveTeam(i, tableGuide, dive){
    // Création DiveTeam
    let temp = -1;
    let planned_time = 0;
    let planned_date = 0;
    //let stop_time = dive.get_end_time();

    let id_dive = dive.get_id();
    
    let plannedDiveID = idPlannedDive

    tabPlannedDives.forEach(element => {
        if (element.get_id() == plannedDiveID){
            planned_time = element.get_planned_time();
            planned_date = element.get_planned_date();
            console.log("Planned Time : " + planned_time + " Planned Date : " + planned_date);
        }
    });
   
    //tabDiveRegistrations[i].get_planned_dive_id()

    let table = document.getElementById(i);
    let trElements = table.getElementsByTagName('tr');

    let commentaireInput = document.getElementById('commentairePlongee' + i).value;

    let maxduration = document.getElementById('dureePlongee' + i).value;
    let endTime = addTimes(planned_time, maxduration);

    let dive_type = document.getElementById('typePlongee' + i).value;

    let minGuidedDepth = document.getElementById('profondeurPlongee' + i).value;

    //let id_dive_team = tabDiveTeams.length + i;
    let max_id_dive_team = 0;
    // Search max id
    tabDiveTeams.forEach(element => {
        if (parseInt(element.get_id()) > max_id_dive_team){
            max_id_dive_team = parseInt(element.get_id());
        }
    });
    let id_dive_team = max_id_dive_team + 1;

    let tmp = new DiveTeam(id_dive_team, minGuidedDepth, maxduration, temp, temp, dive_type, i, planned_time, endTime, commentaireInput, tableGuide[i], id_dive);
    tabDiveTeams.push(tmp);

    console.log("Création DiveTeam");
    SocketManager.addDiveTeam(id_dive_team, minGuidedDepth, maxduration, temp, temp, dive_type, i, planned_time, endTime, commentaireInput, tableGuide[i], id_dive);

    return id_dive_team;
}

function créationDiveTeamMember(i, j, trElements, tableGuide, idDiveTeam){

    //Get the current name, firstname and age
    let name = trElements[j].getElementsByTagName('td')[0].innerHTML;
    let firstname = trElements[j].getElementsByTagName('td')[1].innerHTML;
    let age = trElements[j].getElementsByTagName('td')[3].innerHTML;
    
    //console.log(name, firstname, age);

    let tempInt = -1;
    let tempString = "";
    
    let idDiver = getIdDiverByLastnameFirstNameAge(name, firstname, age);
    //console.log("Id du plongeur : " + idDiver);

    //Get the current diver role with idDiver
    let role = tabDiveRegistrations[i].get_diver_role();
    //console.log("Rôle du plongeur : " + role);

    let qualification = tabDivers[idDiver-1].get_diver_qualification();
    //console.log("Qualification plongeur : " + qualification);

    let instructor_qualification = tabDivers[idDiver-1].get_instructor_qualification();
    //console.log("Qualification instructeur : " + instructor_qualification);

    let idDiveRegInputs = 0;
    tabDiveRegistrations.forEach(element => {
        if(element.get_diver_id() == idDiver && element.get_planned_dive_id() == idPlannedDive){
            idDiveRegInputs = element.get_diver_id();
            idDiveRegInputs += element.get_planned_dive_id();
        }
    });

    let qualificationTemp = document.getElementById("qualifTempInput"+idDiveRegInputs).value;
    let qualificationTempNombre = getIdQualification(qualificationTemp);

    let pourcentageNox = document.getElementById("pourcentageNoxInput"+idDiveRegInputs).value;

    let comment = document.getElementById("commentaireInput"+idDiveRegInputs).value;

    let montantPaye = document.getElementById("montantPayeInput"+idDiveRegInputs).value;

    //let id_dive_team = tabDiveTeams.length + i - 1;
    let id_dive_team = idDiveTeam;

    let tmp = new DiveTeamMember(idDiver, id_dive_team, qualificationTempNombre, qualification, role, instructor_qualification, pourcentageNox, comment, montantPaye);

    tabDiveTeamMembers.push(tmp);
    //console.log(tmp);

    SocketManager.addDiveTeamMember(idDiver, id_dive_team, qualificationTempNombre, qualification, role, instructor_qualification, pourcentageNox, comment, montantPaye);
}

function funcAttributionAutomatique(){
    
    let nbDiversPlongeeActuelle = 0;
    palanqueesValide = false
    attributionAutomatique = true;

    //Counting the number of divers for the current dive
    for (let i = 0; i < tabDiveRegistrations.length; i++) {
        if(tabDiveRegistrations[i].get_planned_dive_id() == idPlannedDive) {
            nbDiversPlongeeActuelle += 1;
        }
    }
    //console.log("Nombre de plongeurs à la plongée actuelle : " + nbDiversPlongeeActuelle);

    //Calculating the number of dive teams depending on the number of divers
    let nbDiveTeams = Math.ceil(nbDiversPlongeeActuelle/4);
    //console.log("Nombre de palanquées : " + nbDiveTeams);

    //Deleting all the already registered dive teams
    if(supprimerTousLesTableaux(attributionAutomatique) == false){
        //console.log("Erreur lors de la suppression des tableaux");
        return;
    }

    //Creating the dive teams tables depending on the number of dive teams
    for(let i = 0; i < nbDiveTeams; i++){
        creationTableauPalanquee(5,10,false);
        //console.log("Création tableau palanquée " + i);
    }

    //Creating the dive teams randomly
    let idDive = -1;

    let nbEssais = 0;

    while(palanqueesValide == false){

        if(nbEssais>5000){
            //console.log("Erreur lors de la création des palanquées");
                   
            for(let i = 1; i <= nbDiveTeams; i++){
                let tableBody = document.getElementById("tableBody" + i);
                let nbLignes = tableBody.rows.length;
                for(let j = 0; j < nbLignes; j++){
                    tableBody.deleteRow(0);
                }
            }

            alert("Erreur lors de la création des palanquées, les membres inscrits ne correspondent pas aux critères nécessaires pour créer les palanquées. \nLa page va se recharger.");

            if(!isThereDirector){
                alert("Il n'y a pas de directeur de plongée pour cette plongée, impossible de créer les palanquées. \nLa page va se recharger.");
            }

            window.location = document.location;
            return;
        }
    
        for (let i = 0; i < tabDiveRegistrations.length; i++) {
            if(tabDiveRegistrations[i].get_planned_dive_id() == idPlannedDive) {
                //Calculating the random dive team for the current diver
                let random = Math.floor(Math.random() * nbDiveTeams);
                //console.log("Plongeur " + i + " dans la palanquée " + random);
                random = random + 1;
            
                let palanquee = document.getElementById("tableBody" + random);
                let ligne = document.createElement("tr");
                ligne.classList.add("tr");

                let diver = getDiverById(tabDiveRegistrations[i].get_diver_id());
                //console.log(diver);
            
                let celluleNom = document.createElement("td");
                celluleNom.innerHTML = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_last_name();
            
                let cellulePrenom = document.createElement('td');
                cellulePrenom.innerHTML = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_first_name();
            
                let celluleNiveau = document.createElement('td');
                let diverqualif = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_diver_qualification();
            
                switch(parseInt(diverqualif)){
                    case 1:
                        celluleNiveau.innerHTML = "Etoile de mer 1";
                        break;
                    case 2:
                        celluleNiveau.innerHTML = "Bronze";
                        break;
                    case 3:
                        celluleNiveau.innerHTML = "Argent";
                        break;
                    case 4:
                        celluleNiveau.innerHTML = "Or";
                        break;
                    case 5:
                        celluleNiveau.innerHTML = "N1";
                        break;
                    case 6:
                        celluleNiveau.innerHTML = "N2";
                        break;
                    case 7:
                        celluleNiveau.innerHTML = "N3";
                        break;
                    case 8:
                        celluleNiveau.innerHTML = "N4";
                        break;
                    case 9:
                        celluleNiveau.innerHTML = "N5";
                        break;
                    case 11:
                        celluleNiveau.innerHTML = "Aucun";
                        break;
                    case 12:
                        celluleNiveau.innerHTML = "Etoile de mer 2";
                        break;
                    case 13:
                        celluleNiveau.innerHTML = "Etoile de mer 3";
                        break;
                    default:
                        celluleNiveau.innerHTML = "Inconnu"
                        break;
                }
        
        
                let celluleAge = document.createElement('td');
                let age = calculerAge(getDiverById(tabDiveRegistrations[i].get_diver_id()).get_birth_date());
                celluleAge.innerHTML = age;
        
                let celluleRole = document.createElement('td');
                celluleRole.innerHTML = tabDiveRegistrations[i].get_diver_role();
        
                let celluleQualifTemp = document.createElement('td');
                let qualifTempInput = document.createElement('input');
                qualifTempInput.setAttribute("type", "text");
                qualifTempInput.setAttribute("id", "qualifTempInput" + tabDiveRegistrations[i].get_diver_id()+idPlannedDive);            
                qualifTempInput.setAttribute("value", "");
                celluleQualifTemp.appendChild(qualifTempInput);
        
                let cellulePourcentageNox = document.createElement('td');
                let pourcentageNoxInput = document.createElement('input');
                pourcentageNoxInput.setAttribute("type", "number");
        
                pourcentageNoxInput.setAttribute("min", "0");
                pourcentageNoxInput.setAttribute("max", "100");
        
                pourcentageNoxInput.setAttribute("id", "pourcentageNoxInput" + tabDiveRegistrations[i].get_diver_id()+idPlannedDive);
                    
                pourcentageNoxInput.setAttribute("value", "");
                cellulePourcentageNox.appendChild(pourcentageNoxInput);
        
                let celluleMontantPaye = document.createElement('td');
                let montantPayeInput = document.createElement('input');
                montantPayeInput.setAttribute("type", "number");
                montantPayeInput.setAttribute("min", "0");
                montantPayeInput.setAttribute("id", "montantPayeInput" + tabDiveRegistrations[i].get_diver_id()+idPlannedDive);
                //montantPayeInput.setAttribute("max", getDiverById(tabDiveRegistrations[i].get_diver_id()).get_additionnal_qualification());
                montantPayeInput.setAttribute("value", "");
                celluleMontantPaye.appendChild(montantPayeInput);
        
                let celluleCommentaire = document.createElement('td');
                let commentaireInput = document.createElement('textarea');
                commentaireInput.setAttribute("id", "commentaireInput" +  + tabDiveRegistrations[i].get_diver_id()+idPlannedDive);
                commentaireInput.setAttribute("value", "");
                commentaireInput.setAttribute("placeholder", "Commentaire");
                commentaireInput.classList.add("commentInput");
                celluleCommentaire.appendChild(commentaireInput);
        
                let celluleHandle = document.createElement('td');
                celluleHandle.classList.add('my-handle');
                celluleHandle.innerHTML = '<i class="fas fa-grip-vertical"></i>';
        
                ligne.appendChild(celluleNom);
                ligne.appendChild(cellulePrenom);
                ligne.appendChild(celluleNiveau);
                ligne.appendChild(celluleAge);
                ligne.appendChild(celluleRole);
                ligne.appendChild(celluleQualifTemp);
                ligne.appendChild(cellulePourcentageNox);
                ligne.appendChild(celluleMontantPaye);
                ligne.appendChild(celluleCommentaire);
                ligne.appendChild(celluleHandle);
        
                let tmp = false;
                    let tabDiveTeamId = [];
                    tabDiveTeams.forEach(element => {
                        tabDives.forEach(element2 => {
                            if(element.get_id_dive() == element2.get_id() && element2.get_id_planned_dive() == idPlannedDive){
                                tmp = true;
                                //console.log("tmp = true");
                                tabDiveTeamId.push(element.get_id());
                            }
                        });
                    });
                    tabDiveTeamId.sort();
                    //console.log(tabDiveTeamId);
                    let diveTeamMemberFound = false;
                    let diveTeamMemberDiveTeamId = 0;
                    tabDiveTeamMembers.forEach(element => {
                        tabDiveTeamId.forEach(element2 => {
                            if(element.get_id_palanquée() == element2){
                                if(element.get_id() == tabDiveRegistrations[i].get_diver_id() && tmp){
                                    switch(parseInt(element.get_temporary_diver_qualification())){
                                        case 1:
                                            qualifTempInput.value = "Etoile de mer 1";
                                            break;
                                        case 2:
                                            qualifTempInput.value = "Bronze";
                                            break;
                                        case 3:
                                            qualifTempInput.value = "Argent";
                                            break;
                                        case 4:
                                            qualifTempInput.value = "Or";
                                            break;
                                        case 5:
                                            qualifTempInput.value = "N1";
                                            break;
                                        case 6:
                                            qualifTempInput.value = "N2";
                                            break;
                                        case 7:
                                            qualifTempInput.value = "N3";
                                            break;
                                        case 8:
                                            qualifTempInput.value = "N4";
                                            break;
                                        case 9:
                                            qualifTempInput.value = "N5";
                                            break;
                                        case 11:
                                            qualifTempInput.value = "Aucune";
                                            break;
                                        case 12:
                                            qualifTempInput.value = "Etoile de mer 2";
                                            break;
                                        case 13:
                                            qualifTempInput.value = "Etoile de mer 3";
                                            break;
                                        default:
                                            qualifTempInput.value = "Inconnue"
                                            break;
                                    }
                                    pourcentageNoxInput.value = element.get_nox_percentage();
                                    montantPayeInput.value = element.get_paid_amount();
                                    commentaireInput.value = element.get_comment();
                                    diveTeamMemberFound = true;
                                    diveTeamMemberDiveTeamId = element.get_id_palanquée();
                                    //console.log(diveTeamMemberDiveTeamId);
                                    tmp = false;
                                }
                            }
                        });
                    });
                    
            
                    if(diveTeamMemberFound){;
                        //let idTab = diveTeamMemberDiveTeamId - countNotDiveTeam;
                        console.log("diveTeamMemberDiveTeamId = " + diveTeamMemberDiveTeamId)
                        console.log("tabDiveTeamId = " + tabDiveTeamId)
                        let idTab = tabDiveTeamId.indexOf(diveTeamMemberDiveTeamId)+1;
                        //console.log("idTab = " + idTab)
                        //console.log("diveTeamMemberDiveTeamId = " + diveTeamMemberDiveTeamId)
                        console.log("idTab = " + idTab)
                        let tableBodyPalanquee = document.getElementById("tableBody"+idTab);
                        tableBodyPalanquee.appendChild(ligne);
                        tabDiveTeams.forEach(function (item) {
                            if(item.get_id_dive() == idDive) { // Mettre l'id de la plongée ici
                                setDivInfosPalanquee(idTab);
                            }
                        });
                    }
                    else{
                        palanquee.appendChild(ligne);
                    }
                }
        
        
        
        
            let tableInscrits = document.getElementById('tableInscrits')
            let trElements = tableInscrits.getElementsByTagName('tr');
            //Delete all the diver in table inscription
            let tableBodyInscription = document.getElementById("tableInscrits");
            //get child of tableBodyInscription
            let child = tableBodyInscription.lastElementChild;
            child.innerHTML = "";

            validerPalanquées(attributionAutomatique)

            //console.log("Attribution automatique" + attributionAutomatique + " : " + palanqueesValide);
            nbEssais++;

        }

        console.log("Attribution automatique" + attributionAutomatique + " : " + palanqueesValide);
    }


    //validerPalanquées(attributionAutomatique);
    alert("Attribution automatique des palanquées terminée ! Veuillez cliquer sur le bouton valider avant de quitter la page")

    for(let i = 0; i < nbDiveTeams; i++){
        setDivInfosPalanquee(i+1)
    }
    console.log("Palanquées validées : " + palanqueesValide);
}



function getIdQualification(qualification){
    let idQualification = -1;
    switch(qualification){
        case "Etoile de mer 1":
            idQualification = 1;
            break;
        case "Etoile de mer 2":
            idQualification = 12;
            break;
        case "Etoile de mer 3":
            idQualification = 13;
            break;
        case "Bronze":
            idQualification = 2;
            break;
        case "Argent":
            idQualification = 3;
            break;
        case "Or":
            idQualification = 4;
            break;
        case "N1":
            idQualification = 5;
            break;
        case "N2":
            idQualification = 6;
            break;
        case "N3":
            idQualification = 7;
            break;
        case "N4":
            idQualification = 8;
            break;
        case "N5":
            idQualification = 9;
            break;
        case "Aucune":
            idQualification = 11;
            break;
        case "" :
            idQualification = 11;
            break;
        default:
            idQualification = 11;
            break;
    }
    return idQualification;
}


function getIdDiverByLastnameFirstNameAge(lastname, firstname, age){
    for(let i = 0; i < tabDiveRegistrations.length; i++){
        if(tabDiveRegistrations[i].get_planned_dive_id() == idPlannedDive) {
            let diver = getDiverById(tabDiveRegistrations[i].get_diver_id());
            let diver_age = calculerAge(diver.get_birth_date());
            //console.log(diver_age);
            if(lastname == diver.get_last_name() && firstname == diver.get_first_name() && age == diver_age){
                return diver.get_id();
            }
        }
    }
}


function suppressionTableauPalanquée(tableId){
    //console.log("Suppression du tableau " + tableId);
    const table = document.getElementById(tableId);
    const tableBody = document.getElementById('tableBody');
    var trElements = table.getElementsByTagName('tr');

    //Check if the table is empty
    if (trElements.length > 4) {
        //console.log("Tableau rempli");
        confirm("Impossible de supprimer un tableau rempli, merci de vider le tableau avant de le supprimer");
    }
    else{
        for (let i = tableId; i < tablecounter; i++) {
            //console.log("Tableau " + i);
            let tmp = parseInt(i)+1;
            //console.log(tmp);
            let table2 = document.getElementById(tmp);
            //console.log(table2);
            table2.setAttribute('id', i);
            // Append
            let td = table2.getElementsByTagName('th')[0];
            td.innerHTML = "Palanquée " + table2.id;
        }
        // Remove the table
        //console.log(tableId);
        table.parentNode.remove();
        tablecounter--; 
    }
    //console.log("Nombre tableaux : " + tablecounter)
}

function supprimerTousLesTableaux(attributionAutomatique){
    let nbrRempli = 0;

    //Firstly, check if the tables are empty
    for(let i = 1; i <= tablecounter; i++){
        
        const table = document.getElementById(i);
        const tableBody = document.getElementById('tableBody');
        var trElements = table.getElementsByTagName('tr');
        //console.log("Id : " + i + "Nombre d'éléments : " + trElements.length + "Nombre de tableaux : " + tablecounter);
        
        if (trElements.length > 4) {
            //console.log("Tableau rempli");
            nbrRempli++;
        }
    }

    if(attributionAutomatique == true){

        if(nbrRempli == 0){
            const tableContainer = document.getElementById('tableContainer');
            tableContainer.innerHTML = "";
            tablecounter = 0;
            return true;
        }
        else if(nbrRempli == 1){
            confirm("Merci de vider le tableau concerné avant l'attribution automatique");
            return false;
        }
        else{
            confirm("Merci de vider les tableaux concernés avant l'attribution automatique. \n Nombre de tableaux remplis : " + nbrRempli + "");
            return false;
        }

    }

    if(nbrRempli == 0){
        if (confirm("Voulez-vous vraiment supprimer tous les tableaux ?")) {
            const tableContainer = document.getElementById('tableContainer');
            tableContainer.innerHTML = "";
            tablecounter = 0;
        }
    }
    else if(nbrRempli == 1){
        confirm("Impossible de supprimer un tableau rempli, merci de vider le tableau concerné avant la suppression");
    }
    else{
        confirm("Impossible de supprimer des tableaux remplis, merci de vider les tableaux concernés avant la suppression. \n Nombre de tableaux remplis : " + nbrRempli + "");
    }

}

// TABLEAU PALANQUÉE

function creationTableauPalanquee(rows, columns, isTabToFill, item) {
    tablecounter++;

    const tableDiv = document.createElement('div');
    tableDiv.classList.add('tableDiv');

    // Create a new table element
    const table = document.createElement('table');
    table.classList.add('blueTable');
    table.classList.add('tableDiveTeam');
    const tableId = tablecounter;
    table.id = tableId;


    // Create the table header
    const thead = document.createElement('thead');
    
    const tr1 = document.createElement('tr');
    tr1.classList.add('tr');

    const thnumber = document.createElement('th');
    thnumber.innerHTML = "Palanquée " + tableId;
    thnumber.setAttribute('colspan', columns);
    tr1.appendChild(thnumber);

    let tr2 = document.createElement('tr');
    tr2.classList.add('tr');

    let thInfoDuration = document.createElement('th');
    thInfoDuration.innerHTML = "Durée de la plongée";
    thInfoDuration.setAttribute('colspan', 2);
    tr2.appendChild(thInfoDuration);

    let thInfoDiveType = document.createElement('th');
    thInfoDiveType.innerHTML = "Type de plongée";
    thInfoDiveType.setAttribute('colspan', 2);
    tr2.appendChild(thInfoDiveType);

    let thInfoGuide = document.createElement('th');
    thInfoGuide.innerHTML = "Guide";
    thInfoGuide.setAttribute('colspan', 1);
    tr2.appendChild(thInfoGuide);

    let thInfoDiverNumber = document.createElement('th');
    thInfoDiverNumber.innerHTML = "Nombre de plongeurs";
    thInfoDiverNumber.setAttribute('colspan', 1);
    tr2.appendChild(thInfoDiverNumber);

    let thInfoDepth = document.createElement('th');
    thInfoDepth.setAttribute('colspan', 2);
    let thInfoDepthText = document.createElement('p');
    let thInfoDepthI = document.createElement('i');
    thInfoDepthI.classList.add("fa-regular", "fa-mask-snorkel", 'infoIcon');
    thInfoDepthI.id = "iMaxDepth" + tableId;
    thInfoDepthText.innerHTML = "Profondeur (max : 0m)";
    thInfoDepthText.classList.add('p-info');
    thInfoDepthText.id = "maxDepth" + tableId;
    //thInfoDepth.appendChild(thInfoDepthI);
    thInfoDepth.appendChild(thInfoDepthText);
    tr2.appendChild(thInfoDepth);

    let thInfoComment = document.createElement('th');
    thInfoComment.innerHTML = "Commentaire";
    thInfoComment.setAttribute('colspan', 2);
    tr2.appendChild(thInfoComment);

    let tr3 = document.createElement('tr');
    tr3.classList.add('tr');
    tr3.classList.add('whiteTr');
    
    let thDuration = document.createElement('th');
    thDuration.setAttribute('colspan', 2);
    let thDurationInput = document.createElement('input');
    thDurationInput.setAttribute('type', 'time');
    thDurationInput.setAttribute('id', 'dureePlongee' + tableId);
    thDurationInput.setAttribute('min', '00:00');
    thDurationInput.setAttribute('value', '00:00');
    thDuration.appendChild(thDurationInput);
    tr3.appendChild(thDuration);

    let thDiveType = document.createElement('th');
    thDiveType.setAttribute('colspan', 2);
    let thDiveTypeInput = document.createElement('select');
    thDiveTypeInput.setAttribute('id', 'typePlongee' + tableId);
    thDiveTypeInput.classList.add('selectList');
    let Option1 = document.createElement('option');
    Option1.setAttribute('value', '1');
    Option1.innerHTML = "Exploration encadrée";
    let Option2 = document.createElement('option');
    Option2.setAttribute('value', '2');
    Option2.innerHTML = "Exploration autonome";
    let Option3 = document.createElement('option');
    Option3.setAttribute('value', '3');
    Option3.innerHTML = "Formation";
    thDiveTypeInput.appendChild(Option1);
    thDiveTypeInput.appendChild(Option2);
    thDiveTypeInput.appendChild(Option3);
    thDiveType.appendChild(thDiveTypeInput);
    tr3.appendChild(thDiveType);

    let thGuide = document.createElement('th');
    thGuide.setAttribute('colspan', 1);
    //let thGuideText = document.createElement('p');
    let thGuideI = document.createElement('i');
    thGuideI.classList.add('fa-solid', 'fa-xmark', 'red');
    thGuideI.id = "iDiveGuide" + tableId;
    //thGuideText.innerHTML = "Guide de palanquée";
    //thGuideText.classList.add('p-info', 'red');
    //thGuideText.id = "diveGuide" + tableId;
    thGuide.appendChild(thGuideI);
    //thGuide.appendChild(thGuideText);
    tr3.appendChild(thGuide);

    let thDiverNumber = document.createElement('th');
    thDiverNumber.setAttribute('colspan', 1);
    let thDiverNumberText = document.createElement('p');
    let thDiverNumberI = document.createElement('i');
    thDiverNumberI.classList.add('fa-solid', 'fa-xmark', 'fa-2xs', 'red', 'infoIcon');
    thDiverNumberI.id = "iNbPlongeur" + tableId;
    thDiverNumberText.innerHTML =(rows - 5) + " / 5";
    thDiverNumberText.classList.add('p-info', 'red');
    thDiverNumberText.id = "nbPlongeur" + tableId;
    //thDiverNumber.appendChild(thDiverNumberI);
    thDiverNumber.appendChild(thDiverNumberText);
    tr3.appendChild(thDiverNumber);

    let thDepth = document.createElement('th');
    thDepth.setAttribute('colspan', 2);
    let thDepthInput = document.createElement('input');
    thDepthInput.setAttribute('type', 'number');
    thDepthInput.setAttribute('id', 'profondeurPlongee' + tableId);
    thDepthInput.setAttribute('min', '0');
    thDepthInput.setAttribute('placeholder', '0');
    thDepth.appendChild(thDepthInput);
    tr3.appendChild(thDepth);

    let thComment = document.createElement('th');
    thComment.setAttribute('colspan', 2);
    let thCommentInput = document.createElement('textarea');
    thCommentInput.setAttribute('id', 'commentairePlongee' + tableId);
    thCommentInput.setAttribute('placeholder', 'Commentaire');
    thCommentInput.classList.add('commentInput');
    thComment.appendChild(thCommentInput);
    tr3.appendChild(thComment);

    // Filling the table if we need to
    if(isTabToFill){
        thDurationInput.value = item.get_max_duration();
        thDiveTypeInput.value = item.get_dive_type();
        thDepthInput.value = item.get_max_depth();
        thCommentInput.value = item.get_comment();
    }

    const tr4 = document.createElement('tr');
    tr4.classList.add('tr');

    let th1 = document.createElement('th');
    th1.innerHTML = "Nom";
    tr4.appendChild(th1);

    let th2 = document.createElement('th');
    th2.innerHTML = "Prénom";
    tr4.appendChild(th2);

    let th3 = document.createElement('th');
    th3.innerHTML = "Niveau";
    tr4.appendChild(th3);

    let th4 = document.createElement('th');
    th4.innerHTML = "Âge";
    tr4.appendChild(th4);

    let th5 = document.createElement('th');
    th5.innerHTML = "Rôle";
    tr4.appendChild(th5);

    let th6 = document.createElement('th');
    th6.innerHTML = "Qualification temporaire";
    tr4.appendChild(th6);

    let th7 = document.createElement('th');
    th7.innerHTML = "Pourcentage Nox";
    tr4.appendChild(th7);

    let th8 = document.createElement('th');
    th8.innerHTML = "Montant payé";
    tr4.appendChild(th8);

    let th9 = document.createElement('th');
    th9.innerHTML = "Commentaire";
    tr4.appendChild(th9);

    let th0 = document.createElement('th');
    th0.innerHTML = "";
    tr4.appendChild(th0);

    thead.appendChild(tr1);
    thead.appendChild(tr2);
    thead.appendChild(tr3);
    thead.appendChild(tr4);
    table.appendChild(thead);

    // Create the table body with rows and cells
    const tbody = document.createElement('tbody');
    tbody.id = "tableBody"+tableId;

    table.appendChild(tbody);


    // Append the table to the container
    const tableContainer = document.getElementById('tableContainer');
    tableDiv.appendChild(table);
    const supprButton = document.createElement('button');
    supprButton.setAttribute("id", "supprButton" + tableId);
    supprButton.classList.add('TabSupprButton');
    supprButton.innerHTML = '<i class="fas fa-xmark"></i>';
    tableDiv.appendChild(supprButton);
    supprButton.addEventListener('click', event => {
        //console.log(event.currentTarget.parentNode.firstChild.id);
        suppressionTableauPalanquée(event.currentTarget.parentNode.firstChild.id);
    });
    tableContainer.appendChild(tableDiv);

    // Initialize SortableJS for the new table
    new Sortable(tbody, {
        filter : ".static",
        group: 'shared',
        handle: ".my-handle",
        animation: 150,
        draggable: ".tr",
        multiDrag: true,
        selectedClass: "selected",
        
        // Called by any change to the list (add / update / remove)
        onUpdate: function (evt) {
            setDivInfosPalanquee(evt.to.id.replace("tableBody", ""));
        },
        onRemove: function (evt) {
            setDivInfosPalanquee(evt.from.id.replace("tableBody", ""));
        },
        onAdd: function (evt) {
            setDivInfosPalanquee(evt.to.id.replace("tableBody", ""));
        }
    });
}

function setDivInfosPalanquee(id){
    let table = document.getElementById("tableBody"+id);
    let trElements = table.getElementsByTagName('tr');
    let nbDiver = trElements.length;

    let typePlongee = document.getElementById("typePlongee" + id).value;

    // Nombre de plongeurs
    let nbPlongeurDiv = document.getElementById("nbPlongeur" + id);

    let errorNbPlongeur = false;
    let errorAdditionnalDiver = false;

    if(typePlongee != 2){
        if(nbDiver > 5){
            errorNbPlongeur = true;
        }
        else if(nbDiver < 2){
            errorNbPlongeur = true;
        }
        else if(nbDiver == 5){
            // Vérification de la présence de deux guides de palanquée
            let isThereTwoDiveGuide = false;
            let nbrDiveGuide = 0;

            for(let i = 0; i < nbDiver; i++){
                let role = trElements[i].getElementsByTagName('td')[4].innerHTML;
                if(role == "Guide de palanquée" || role == "Directeur de plongée"){
                    nbrDiveGuide++;
                }
            }
            if(nbrDiveGuide >= 2){
                isThereTwoDiveGuide = true;
            }

            let isThereOneLevel4= false;

            for(let i = 0; i < nbDiver; i++){
                let level = trElements[i].getElementsByTagName('td')[2].innerHTML;
                let role = trElements[i].getElementsByTagName('td')[4].innerHTML;
                if((level == "N4" || level == "N5") && role != "Guide de palanquée" && role != "Directeur de plongée"){
                    isThereOneLevel4 = true;
                }
            }

            if(!isThereTwoDiveGuide && !isThereOneLevel4){
                errorNbPlongeur = true;
                errorAdditionnalDiver = true;
            }
        }

        // Vérification de la présence d'enfants
        let isThereUnderage = false;
        let nbrUnderage = 0;

        if(nbDiver > 0){
            for(let i = 0; i < nbDiver; i++){
                let age = trElements[i].getElementsByTagName('td')[3].innerHTML
                if (age < 16){
                    //console.log("Enfant trouvé");
                    isThereUnderage = true;
                    nbrUnderage++;
                }
            }
        }

        // Contrôle du nombre d'enfants
        if(isThereUnderage && nbDiver > 3){
            errorNbPlongeur = true;
        }
        else if(nbrUnderage > 2){
            errorNbPlongeur = true;
        }

        // Mise à jour du nombre de plongeurs
        if(isThereUnderage){
            nbPlongeurDiv.innerHTML = (nbDiver) + " / 3";
        }
        else if(!errorAdditionnalDiver){
            nbPlongeurDiv.innerHTML = (nbDiver) + " / 5";
        }
        else{
            nbPlongeurDiv.innerHTML = "Le plongeur supplémentaire doit être au moins niveau 4 ou guide de palanquée";
        }
    }
    else{
        if(nbDiver > 3){
            errorNbPlongeur = true;
        }
        // Vérification de la présence d'enfants
        let isThereUnderage = false;

        if(nbDiver > 0){
            for(let i = 0; i < nbDiver; i++){
                let age = trElements[i].getElementsByTagName('td')[3].innerHTML
                if (age < 16){
                    //console.log("Enfant trouvé");
                    errorNbPlongeur = true;
                    isThereUnderage = true;
                }
            }
        }

        // Mise à jour du nombre de plongeurs
        if(isThereUnderage){
            nbPlongeurDiv.innerHTML = "Enfant non autorisé en plongée en autonomie";
        }
        else{
            nbPlongeurDiv.innerHTML = "Nombre de plongeurs : " + (nbDiver) + " / 3";
        }
    }

    // Affichage du message d'erreur
    if(errorNbPlongeur){
        nbPlongeurDiv.classList.remove("green");
        nbPlongeurDiv.classList.add("red");
    }
    else{
        nbPlongeurDiv.classList.remove("red");
        nbPlongeurDiv.classList.add("green");
    }

    let iDiveGuide = document.getElementById("iDiveGuide" + id);
    let isThereGuide = false;

    if(nbDiver > 0){
        for(let i = 0; i < nbDiver; i++){
            let role = trElements[i].getElementsByTagName('td')[4].innerHTML;
            if(role == "Guide de palanquée" || role == "Directeur de plongée"){
                isThereGuide = true;
            }
        }
    }

    // Affichage du message d'erreur
    if(isThereGuide){
        iDiveGuide.classList.remove("red", "fa-solid", "fa-xmark");
        iDiveGuide.classList.add("fa-solid", "fa-check", "green");
    }
    else{
        iDiveGuide.classList.remove("fa-check", "green");
        iDiveGuide.classList.add("red", "fa-solid", "fa-xmark");
    }

    let maxDepthDiv = document.getElementById("maxDepth" + id);
    let max = 9999;

    for(let i = 0; i < nbDiver; i++){
        let lastname = trElements[i].getElementsByTagName('td')[0].innerHTML;
        let firstname = trElements[i].getElementsByTagName('td')[1].innerHTML;
        let age = trElements[i].getElementsByTagName('td')[3].innerHTML;

        let id_diver = getIdDiverByLastnameFirstNameAge(lastname, firstname, age);
        let diver = getDiverById(id_diver);

        let Diver_Qualification = diver.get_diver_qualification();

        for(let i = 0; i < tabMaxDepthForQualification.length; i++){
            let qualification = tabMaxDepthForQualification[i].get_diver_qualification();
            if(Diver_Qualification == qualification){
                if(tabMaxDepthForQualification[i].get_guided_diver_depth() == ""){
                    // Pas de profondeur max
                }
                else if(tabMaxDepthForQualification[i].get_guided_diver_depth() < max){
                    max = tabMaxDepthForQualification[i].get_guided_diver_depth();
                }
            }
        }        
    }
    if(max == 9999){
        maxDepthDiv.innerHTML = "Profondeur max : 60+m";
    }
    else{
        maxDepthDiv.innerHTML = "Profondeur max : " + max + "m";
    }
}

// TABLEAU INSCRITS
function createTableInscrits() {
    // Create a new table element
    const table = document.createElement('table');
    table.classList.add('blueTable');
    table.classList.add('tableInscrits');
    table.setAttribute('id', 'tableInscrits');

    // Create the table header
    const thead = document.createElement('thead');

    const tr = document.createElement('tr');
    tr.classList.add('tr');

    let th1 = document.createElement('th');
    th1.innerHTML = "Nom";
    tr.appendChild(th1);

    let th2 = document.createElement('th');
    th2.innerHTML = "Prénom";
    tr.appendChild(th2);

    let th3 = document.createElement('th');
    th3.innerHTML = "Niveau";
    tr.appendChild(th3);

    let th4 = document.createElement('th');
    th4.innerHTML = "Âge";
    tr.appendChild(th4);

    let th5 = document.createElement('th');
    th5.innerHTML = "Rôle";
    tr.appendChild(th5);
    
    let th6 = document.createElement('th');
    th6.innerHTML = "Qualification temporaire";
    tr.appendChild(th6);

    let th7 = document.createElement('th');
    th7.innerHTML = "Pourcentage Nox";
    tr.appendChild(th7);

    let th8 = document.createElement('th');
    th8.innerHTML = "Montant payé";
    tr.appendChild(th8);

    let th9 = document.createElement('th');
    th9.innerHTML = "Commentaire";
    tr.appendChild(th9);

    let th0 = document.createElement('th');
    th0.innerHTML = "";
    tr.appendChild(th0);

    thead.appendChild(tr);
    table.appendChild(thead);

    // Create the table body with rows and cells

    let idDive = -1;
    tabDives.forEach(function (item) {
        if(item.get_id_planned_dive() == idPlannedDive) { // Mettre l'id de la plongée ici
            idDive = item.get_id();
            document.getElementById("ppo2").value = item.get_max_ppo2();
            document.getElementById("surface_security").value = item.get_surface_security();
        }
    });

    let tabIdDiveTeams = [];
    tabDiveTeams.forEach(function (item) {
        if(item.get_id_dive() == idDive) { // Mettre l'id de la plongée ici
            tabIdDiveTeams.push(item.get_id());
        }
    });
    // J'ai fait ça car des fois les palanquées ne sont pas dans l'ordre dans le tableau tabDiveTeams
    tabIdDiveTeams.sort();
    tabIdDiveTeams.forEach(function (item) {
        tabDiveTeams.forEach(function (item2) {
            if(item == item2.get_id()) {
                creationTableauPalanquee(5, 10, true, item2);
            }
        });
        //creationTableauPalanquee(5, 10, true, item);
    });

    const tbody = document.createElement('tbody');

    for (let i = 0; i < tabDiveRegistrations.length; i++) {
        if(tabDiveRegistrations[i].get_planned_dive_id() == idPlannedDive) { // Mettre l'id de la plongée ici
            let ligne = document.createElement('tr');
            ligne.classList.add('tr');
            //ligne.classList.add('my-handle');

            let celluleNom = document.createElement('td');
            celluleNom.innerHTML = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_last_name();

            let cellulePrenom = document.createElement('td');
            cellulePrenom.innerHTML = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_first_name();

            let celluleNiveau = document.createElement('td');
            let diverqualif = getDiverById(tabDiveRegistrations[i].get_diver_id()).get_diver_qualification();

            switch(parseInt(diverqualif)){
                case 1:
                    celluleNiveau.innerHTML = "Etoile de mer 1";
                    break;
                case 2:
                    celluleNiveau.innerHTML = "Bronze";
                    break;
                case 3:
                    celluleNiveau.innerHTML = "Argent";
                    break;
                case 4:
                    celluleNiveau.innerHTML = "Or";
                    break;
                case 5:
                    celluleNiveau.innerHTML = "N1";
                    break;
                case 6:
                    celluleNiveau.innerHTML = "N2";
                    break;
                case 7:
                    celluleNiveau.innerHTML = "N3";
                    break;
                case 8:
                    celluleNiveau.innerHTML = "N4";
                    break;
                case 9:
                    celluleNiveau.innerHTML = "N5";
                    break;
                case 11:
                    celluleNiveau.innerHTML = "Aucun";
                    break;
                case 12:
                    celluleNiveau.innerHTML = "Etoile de mer 2";
                    break;
                case 13:
                    celluleNiveau.innerHTML = "Etoile de mer 3";
                    break;
                default:
                    celluleNiveau.innerHTML = "Inconnu"
                    break;
            }


            let celluleAge = document.createElement('td');
            let age = calculerAge(getDiverById(tabDiveRegistrations[i].get_diver_id()).get_birth_date());
            celluleAge.innerHTML = age;

            let celluleRole = document.createElement('td');
            celluleRole.innerHTML = tabDiveRegistrations[i].get_diver_role();

            let celluleQualifTemp = document.createElement('td');
            let qualifTempInput = document.createElement('input');
            qualifTempInput.setAttribute("type", "text");
            qualifTempInput.setAttribute("id", "qualifTempInput" + tabDiveRegistrations[i].get_diver_id()+idPlannedDive);            
            qualifTempInput.setAttribute("value", "");
            celluleQualifTemp.appendChild(qualifTempInput);

            let cellulePourcentageNox = document.createElement('td');
            let pourcentageNoxInput = document.createElement('input');
            pourcentageNoxInput.setAttribute("type", "number");

            pourcentageNoxInput.setAttribute("min", "0");
            pourcentageNoxInput.setAttribute("max", "100");

            pourcentageNoxInput.setAttribute("id", "pourcentageNoxInput" + tabDiveRegistrations[i].get_diver_id()+idPlannedDive);
                
            pourcentageNoxInput.setAttribute("value", "");
            cellulePourcentageNox.appendChild(pourcentageNoxInput);

            let celluleMontantPaye = document.createElement('td');
            let montantPayeInput = document.createElement('input');
            montantPayeInput.setAttribute("type", "number");
            montantPayeInput.setAttribute("min", "0");
            montantPayeInput.setAttribute("id", "montantPayeInput" + tabDiveRegistrations[i].get_diver_id()+idPlannedDive);
            //montantPayeInput.setAttribute("max", getDiverById(tabDiveRegistrations[i].get_diver_id()).get_additionnal_qualification());
            montantPayeInput.setAttribute("value", "");
            celluleMontantPaye.appendChild(montantPayeInput);

            let celluleCommentaire = document.createElement('td');
            let commentaireInput = document.createElement('textarea');
            commentaireInput.setAttribute("id", "commentaireInput" +  + tabDiveRegistrations[i].get_diver_id()+idPlannedDive);
            commentaireInput.setAttribute("value", "");
            commentaireInput.setAttribute("placeholder", "Commentaire");
            commentaireInput.classList.add("commentInput");
            celluleCommentaire.appendChild(commentaireInput);

            let celluleHandle = document.createElement('td');
            celluleHandle.classList.add('my-handle');
            celluleHandle.innerHTML = '<i class="fas fa-grip-vertical"></i>';

            ligne.appendChild(celluleNom);
            ligne.appendChild(cellulePrenom);
            ligne.appendChild(celluleNiveau);
            ligne.appendChild(celluleAge);
            ligne.appendChild(celluleRole);
            ligne.appendChild(celluleQualifTemp);
            ligne.appendChild(cellulePourcentageNox);
            ligne.appendChild(celluleMontantPaye);
            ligne.appendChild(celluleCommentaire);
            ligne.appendChild(celluleHandle);

            let tmp = false;
            let tabDiveTeamId = [];
            tabDiveTeams.forEach(element => {
                tabDives.forEach(element2 => {
                    if(element.get_id_dive() == element2.get_id() && element2.get_id_planned_dive() == idPlannedDive){
                        tmp = true;
                        //console.log("tmp = true");
                        tabDiveTeamId.push(element.get_id());
                    }
                });
            });
            tabDiveTeamId.sort();
            //console.log(tabDiveTeamId);
            let diveTeamMemberFound = false;
            let diveTeamMemberDiveTeamId = 0;
            tabDiveTeamMembers.forEach(element => {
                tabDiveTeamId.forEach(element2 => {
                    if(element.get_id_palanquée() == element2){
                        if(element.get_id() == tabDiveRegistrations[i].get_diver_id() && tmp){
                            switch(parseInt(element.get_temporary_diver_qualification())){
                                case 1:
                                    qualifTempInput.value = "Etoile de mer 1";
                                    break;
                                case 2:
                                    qualifTempInput.value = "Bronze";
                                    break;
                                case 3:
                                    qualifTempInput.value = "Argent";
                                    break;
                                case 4:
                                    qualifTempInput.value = "Or";
                                    break;
                                case 5:
                                    qualifTempInput.value = "N1";
                                    break;
                                case 6:
                                    qualifTempInput.value = "N2";
                                    break;
                                case 7:
                                    qualifTempInput.value = "N3";
                                    break;
                                case 8:
                                    qualifTempInput.value = "N4";
                                    break;
                                case 9:
                                    qualifTempInput.value = "N5";
                                    break;
                                case 11:
                                    qualifTempInput.value = "Aucune";
                                    break;
                                case 12:
                                    qualifTempInput.value = "Etoile de mer 2";
                                    break;
                                case 13:
                                    qualifTempInput.value = "Etoile de mer 3";
                                    break;
                                default:
                                    qualifTempInput.value = "Inconnue"
                                    break;
                            }
                            pourcentageNoxInput.value = element.get_nox_percentage();
                            montantPayeInput.value = element.get_paid_amount();
                            commentaireInput.value = element.get_comment();
                            diveTeamMemberFound = true;
                            diveTeamMemberDiveTeamId = element.get_id_palanquée();
                            //console.log(diveTeamMemberDiveTeamId);
                            tmp = false;
                        }
                    }
                });
            });
            

            if(diveTeamMemberFound){;
                //let idTab = diveTeamMemberDiveTeamId - countNotDiveTeam;
                let idTab = tabDiveTeamId.indexOf(diveTeamMemberDiveTeamId) + 1;
                //console.log("idTab = " + idTab)
                //console.log("diveTeamMemberDiveTeamId = " + diveTeamMemberDiveTeamId)
                let tableBodyPalanquee = document.getElementById("tableBody"+idTab);
                tableBodyPalanquee.appendChild(ligne);
                tabDiveTeams.forEach(function (item) {
                    if(item.get_id_dive() == idDive) { // Mettre l'id de la plongée ici
                        setDivInfosPalanquee(idTab);
                    }
                });
            }
            else{
                tbody.appendChild(ligne);
            }
        }
    }

    

    table.appendChild(tbody);

    // Append the table to the container
    const tableContainer = document.getElementById('tableContainerInscrits');
    tableContainer.appendChild(table);

    // Initialize SortableJS for the new table

    // Initialize SortableJS for the new table
    new Sortable(tbody, {
        group: 'shared',
        handle: ".my-handle",
        animation: 150,
        draggable: ".tr",
        multiDrag: true,
        selectedClass: "selected",
    });

}



function addTimes(startTime, duration) {
    let startTimeArray = startTime.split(':');
    let durationArray = duration.split(':');
  
    let startSeconds = (parseInt(startTimeArray[0])) * 3600 + (parseInt(startTimeArray[1])) * 60;
    if(startTimeArray[2] != undefined){
        startSeconds += parseInt(startTimeArray[2]);
    }
    let durationSeconds = (+durationArray[0]) * 3600 + (+durationArray[1]) * 60;
  
    let totalSeconds = startSeconds + durationSeconds;
  
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
  
    let endTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);

    return endTime;
}
  
function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

function calculerAge(dateNaissance) {
    let maintenant = new Date();
    let anneeActuelle = maintenant.getFullYear();
    let anneeNaissance = new Date(dateNaissance).getFullYear();
    
    let age = anneeActuelle - anneeNaissance;
    
    return age;
}

function getDiverById(id){
    for(let i = 0; i < tabDivers.length; i++){
        if(tabDivers[i].get_id() == id){
            return tabDivers[i];
        }
    }
    return null;
}

function checkLoaded(){
    if(loaded == nbOfLoaded){
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
        loaded = 0;
        setButtonListener();
        createTableInscrits();
    }
}

export default {
    LoadAllPlannedDives,
    LoadAllDivers,
    LoadAllDiveSites,
    LoadAllDiveRegistrations,
    LoadAllDives,
    LoadIsAdmin,
    LoadUserProfile,
    LoadAllDiveTeamMembers,
    LoadAllDiveTeams,
    LoadMaxDepthForQualification,
    LoadIdPlannedDive,
}