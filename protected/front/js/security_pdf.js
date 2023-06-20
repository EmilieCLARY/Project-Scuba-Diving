// Import
import SocketManager from './SocketManager/SocketSecurityPDF.js'
import Dive from './Classes/dive.js'
import DiveTeam from './Classes/dive_team.js'
import DiveSite from './Classes/dive_site.js'
import Diver from './Classes/diver.js';
import DiveTeamMember from './Classes/dive_team_member.js';
import PlannedDive from './Classes/planned_dive.js';

// Socket function
SocketManager.getIdPlannedDive();
SocketManager.getAllPlannedDives();
SocketManager.getAllDiveSites();
SocketManager.getAllDivers();
SocketManager.getAllDiveTeamMembers();
SocketManager.getAllDiveTeams();
SocketManager.getAllDives();

// Global variables
let tabPlannedDives = [];
let tabDiveSites = [];
let tabDivers = [];
let tabDives = [];
let tabDiveTeamMembers = [];
let tabDiveTeams = [];

let tabActualDiveTeamMembers = [];
let tabActualDiveTeams = [];

let loaded = 0;
let nbOfLoaded = 7;
let idPlannedDive;

let dive_number;
let begin_time;
let begin_date;
let end_date;
let end_time;
let comment;
let surface_security;
let diver_price;
let instructor_price;
let max_ppo2;
let dive_director_name;
let dive_director_qualification;
let dive_city;


/********************************************************************/
/*                         GET INFORMATIONS                        */
/********************************************************************/

function getAllInformations() {

    let dive;

    tabDives.forEach(element => {
        if(element.get_id_planned_dive() == idPlannedDive) {
            dive = element;
        }
    });

    // Get dive informations
    dive_number = dive.get_id();
    begin_time = dive.get_begin_time();
    begin_date = dive.get_begin_date();
    end_date = dive.get_end_date();
    end_time = dive.get_end_time();
    comment = dive.get_comment();
    surface_security = dive.get_surface_security();
    diver_price = dive.get_diver_price();
    instructor_price = dive.get_instructor_price();
    max_ppo2 = dive.get_max_ppo2();
    
    dive_director_name = getDiverById(dive.get_id_dive_director()).get_first_name();
    let qualification = getDiverById(dive.get_id_dive_director()).get_diver_qualification();
    switch(parseInt(qualification)){
        case 1:
            dive_director_qualification = "Etoile de mer 1";
            break;
        case 2:
            dive_director_qualification = "Bronze";
            break;
        case 3:
            dive_director_qualification = "Argent";
            break;
        case 4:
            dive_director_qualification = "Or";
            break;
        case 5:
            dive_director_qualification = "N1";
            break;
        case 6:
            dive_director_qualification = "N2";
            break;
        case 7:
            dive_director_qualification = "N3";
            break;
        case 8:
            dive_director_qualification = "N4";
            break;
        case 9:
            dive_director_qualification = "N5";
            break;
        case 11:
            dive_director_qualification = "Aucun";
            break;
        case 12:
            dive_director_qualification = "Etoile de mer 2";
            break;
        case 13:
            dive_director_qualification = "Etoile de mer 3";
            break;
        default:
            dive_director_qualification = "Inconnu"
            break;
    }
    // Get dive city
    tabPlannedDives.forEach(element => {
        if(element.get_id() == dive.get_id_planned_dive()) {
            dive_city = getDiveSiteById(element.get_id_dive_site()).get_city();
        }
    });

    // Get dive team
    tabDiveTeams.forEach(element => {
        if(element.get_id_dive() == dive_number) {
            tabActualDiveTeams.push(element);
        }
    });

    // Get dive team members
    tabActualDiveTeams.forEach(element => {
        tabDiveTeamMembers.forEach(member => {
            if(member.get_id_palanquée() == element.get_id()) {
                tabActualDiveTeamMembers.push(member);
            }
        });
    });

    console.log(tabActualDiveTeamMembers);
    console.log(tabActualDiveTeams);
    console.log(dive_city);
    console.log(dive_director_name);
    console.log(max_ppo2);
    console.log(instructor_price);
    console.log(diver_price);
    console.log(surface_security);
    console.log(comment);
    console.log(end_time);
    console.log(end_date);
    console.log(begin_date);
    console.log(begin_time);
    console.log(dive_number);
    
}


/********************************************************************/
/*                         LOAD INFORMATIONS                        */
/********************************************************************/

function LoadIdPlannedDive(idPlannedDive_){
    idPlannedDive = idPlannedDive_;
    //console.log(idPlannedDive);
    loaded++;
    checkLoaded();
}

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

function LoadAllDives(tab){
    tab.forEach(element => {
        let tmp = new Dive(element.Id_Dive,element.Begin_Time,element.Begin_Date,element.End_Date,element.End_Time,element.Comment,element.Surface_Security,element.Dive_Price,element.Instructor_Price,element.Max_Ppo2,element.Diver_Id_Diver,element.Planned_Dive_Id_Planned_Dive);
        tabDives.push(tmp);
    });
    //console.log(tabDives);
    loaded++;
    checkLoaded();
}

function LoadAllDiveTeamMembers(tab){
    tab.forEach(element => {
        let tmp = new DiveTeamMember(element.Diver_Id_Diver,element.Dive_team_Id_Dive_Team,element.Temporary_Diver_Qualification,element.Current_Diver_Qualification,element.Diver_Role,element.Current_Instructor_Qualification,element.Nox_Percentage,element.Comment,element.Paid_Amount);
        tabDiveTeamMembers.push(tmp);
    });
    //console.log(tabDiveTeamMembers);
    loaded++;
    checkLoaded();
}

function LoadAllDiveTeams(tab){
    tab.forEach(element => {
        let tmp = new DiveTeam(element.Id_Dive_Team,element.Max_Depth,element.Max_Duration,element.Real_Depth,element.Dive_Type,element.Dive_Type, element.Sequence_number,element.Start_Time,element.Stop_Time,element.Comment,element.Diver_Guide_Id_Diver, element.Dive_Id_Dive);
        tabDiveTeams.push(tmp);
    });
    //console.log(tabDiveTeams);
    loaded++;
    checkLoaded();
}


function checkLoaded(){
    if(loaded == nbOfLoaded){
        document.getElementById("ring-loading").style.display = "none";
        document.body.style.cursor = "default";
        loaded = 0;
        getAllInformations();
        createPdfPage();
    }
}

function getDiveSiteById(id){
    for(let i = 0; i < tabDiveSites.length; i++){
        if(tabDiveSites[i].get_id() == id){
            return tabDiveSites[i];
        }
    }
    return null;
}

function getDiverById(id){
    for(let i = 0; i < tabDivers.length; i++){
        if(tabDivers[i].get_id() == id){
            return tabDivers[i];
        }
    }
    return null;
}


/********************************************************************/
/*                    CREATE HTML PAGE FOR PDF                      */
/********************************************************************/


function createPdfPage() {
    // Creation des pages pdf

    let container = document.getElementById("pdf_info");
    let page = document.createElement("div");
    page.setAttribute("id", "page");
    page.setAttribute("class", "page");
    container.appendChild(page);
    createPdfPageHeader(page);
    createPdrTable(page, 0);
    //createPDF();
}

function createPdfPageHeader(page) {
    let header = document.createElement("div");
    header.setAttribute("class", "header");

    let headerTop = document.createElement("div");
    headerTop.setAttribute("class", "header-top");
    let logo = document.createElement("div");
    logo.setAttribute("class", "logo");
    logo.innerHTML = "<img src='/protected/front/img/logo.jpg' alt='SAGW' onclick='location.href='/';' style='cursor: pointer;'/>";
    headerTop.appendChild(logo);
    let headerTitle = document.createElement("div");
    headerTitle.setAttribute("class", "header-top-right");
    let headerTitleH1 = document.createElement("h1");
    headerTitleH1.innerHTML = "Fiche de sécurité - SAGW";
    headerTitle.appendChild(headerTitleH1);
    headerTop.appendChild(headerTitle);
    header.appendChild(headerTop);

    let headerBottom = document.createElement("div");
    headerBottom.setAttribute("class", "header-bottom");
    let headerInfo1 = document.createElement("div");
    headerInfo1.setAttribute("class", "header-info");
    let site = document.createElement("div");
    site.setAttribute("id", "site");
    site.setAttribute("class", "header-info-item");
    site.innerHTML = "Site de plongée : " + dive_city;
    headerInfo1.appendChild(site);
    let date = document.createElement("div");
    date.setAttribute("id", "date");
    date.setAttribute("class", "header-info-item");
    date.innerHTML = "Date : " + begin_date;
    headerInfo1.appendChild(date);
    let time = document.createElement("div");
    time.setAttribute("id", "time");
    time.setAttribute("class", "header-info-item");
    time.innerHTML = "Heure : " + begin_time;
    headerInfo1.appendChild(time);
    headerBottom.appendChild(headerInfo1);
    let headerInfo2 = document.createElement("div");
    headerInfo2.setAttribute("class", "header-info");
    let diveDirector = document.createElement("div");
    diveDirector.setAttribute("id", "diveDirector");
    diveDirector.setAttribute("class", "header-info-item");
    diveDirector.innerHTML = "Directeur de plongée : " + dive_director_name;
    headerInfo2.appendChild(diveDirector);
    let diveDirectorQualification = document.createElement("div");
    diveDirectorQualification.setAttribute("id", "qualification");
    diveDirectorQualification.setAttribute("class", "header-info-item");
    diveDirectorQualification.innerHTML = "Qualification : " + dive_director_qualification;
    headerInfo2.appendChild(diveDirectorQualification);
    let DiverNumber = document.createElement("div");
    DiverNumber.setAttribute("id", "DiverNumber");
    DiverNumber.setAttribute("class", "header-info-item");
    DiverNumber.innerHTML = "Nombre de plongeurs : " + tabActualDiveTeamMembers.length;
    headerInfo2.appendChild(DiverNumber);
    headerBottom.appendChild(headerInfo2);
    let headerInfo3 = document.createElement("div");
    headerInfo3.setAttribute("class", "header-info");
    let sign = document.createElement("div");
    sign.setAttribute("id", "sign");
    sign.setAttribute("class", "header-info-item");
    sign.innerHTML = "Signature du DP : ";
    headerInfo3.appendChild(sign);
    let surfaceSecurity = document.createElement("div");
    surfaceSecurity.setAttribute("id", "surfaceSecurity");
    surfaceSecurity.setAttribute("class", "header-info-item");
    surfaceSecurity.innerHTML = "Sécurité de surface : " + surface_security;
    headerInfo3.appendChild(surfaceSecurity);
    headerBottom.appendChild(headerInfo3);
    header.appendChild(headerBottom);
    
    page.appendChild(header);

}

function createPdrTable(page,i) {
    let container = document.createElement("div");
    container.setAttribute("class", "container");
    page.appendChild(container);
    let teamNumber = document.createElement("div");
    teamNumber.setAttribute("class", "team-number");
    teamNumber.innerHTML = "Palanquée n°" + (i+1);
    container.appendChild(teamNumber);
    let table = document.createElement("table");
    table.setAttribute("class", "table");
    container.appendChild(table);
    let thead = document.createElement("thead");
    table.appendChild(thead);
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    let th1 = document.createElement("th");
    th1.innerHTML = "Nom";
    tr.appendChild(th1);
    let th2 = document.createElement("th");
    th2.innerHTML = "Prénom";
    tr.appendChild(th2);
    let th3 = document.createElement("th");
    th3.innerHTML = "fonction";
    tr.appendChild(th3);
    let th4 = document.createElement("th");
    th4.innerHTML = "Qualification";
    tr.appendChild(th4);
    let th5 = document.createElement("th");
    th5.innerHTML = "€";
    tr.appendChild(th5);
    let th6 = document.createElement("th");
    th6.innerHTML = "Nitrox %";
    tr.appendChild(th6);
    let th7 = document.createElement("th");
    th7.innerHTML = "Type de plongée";
    tr.appendChild(th7);
    let th8 = document.createElement("th");
    th7.innerHTML = "Profondeur prévue";
    tr.appendChild(th8);
    let th9 = document.createElement("th");
    th8.innerHTML = "Profondeur réalisée";
    tr.appendChild(th9);
    let th10 = document.createElement("th");
    th9.innerHTML = "Paliers";
    tr.appendChild(th10);

}


/********************************************************************/
export default {
    LoadIdPlannedDive,
    LoadAllPlannedDives,
    LoadAllDiveSites,
    LoadAllDivers,
    LoadAllDives,
    LoadAllDiveTeamMembers,
    LoadAllDiveTeams,
}