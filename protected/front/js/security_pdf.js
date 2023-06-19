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
    dive_director_name = dive.get_id_dive_director();

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


/********************************************************************/
/*                    CREATE HTML PAGE FOR PDF                      */
/********************************************************************/


function createPdfPage() {
    // Ajouter les infos dans les divs de la page security_pdf.html
    let container = document.getElementById("pdf_info");
    let page = document.createElement("div");
    page.setAttribute("id", "page");
    page.setAttribute("class", "page");
    container.appendChild(page);
    let header = document.createElement("div");
    header.setAttribute("class", "header");
    page.appendChild(header);

    createPDF();
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