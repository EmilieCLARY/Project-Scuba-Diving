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
let dive_director_first_name;
let dive_director_last_name;
let dive_director_qualification;
let dive_city;
let pageNumber = 1;


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
    
    dive_director_first_name = getDiverById(dive.get_id_dive_director()).get_first_name();
    dive_director_last_name = getDiverById(dive.get_id_dive_director()).get_last_name();
    dive_director_qualification = getDiverById(dive.get_id_dive_director()).get_diver_qualification();
    switch(parseInt(dive_director_qualification)){
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

    /*
    console.log(tabActualDiveTeamMembers);
    console.log(tabActualDiveTeams);
    console.log(dive_city);
    console.log(dive_director_first_name);
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
    */
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

function getDiveTeambyId(id){
    for(let i = 0; i < tabDiveTeams.length; i++){
        if(tabDiveTeams[i].get_id() == id){
            return tabDiveTeams[i];
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
    for (let i = 1; i <= tabActualDiveTeams.length; i++) {
        createPdrTable(page, i);
    }
    createPdfComment(page);
    let allSeparators = document.getElementsByClassName("page-separator");
    console.log(allSeparators);
    console.log(document.getElementById("download-pdf-btn"));
    document.getElementById("download-pdf-btn").addEventListener("click", (e) => {
        console.log("click");
        for (let i = 0; i < allSeparators.length; i++) {
            allSeparators[i].style.display = "none";
        }
        createPDF();
        setTimeout(function(){ for (let i = 0; i < allSeparators.length; i++) {
            allSeparators[i].style.display = "block";
        } }, 5000);
});
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
    site.setAttribute("class", "header-info-item");
    site.innerHTML = "Site de plongée : " + dive_city;
    headerInfo1.appendChild(site);
    let date = document.createElement("div");
    date.setAttribute("class", "header-info-item");
    date.innerHTML = "Date : " + begin_date;
    headerInfo1.appendChild(date);
    let time = document.createElement("div");
    time.setAttribute("class", "header-info-item");
    time.innerHTML = "Heure : " + begin_time;
    headerInfo1.appendChild(time);
    headerBottom.appendChild(headerInfo1);
    let headerInfo2 = document.createElement("div");
    headerInfo2.setAttribute("class", "header-info");
    let diveDirector = document.createElement("div");
    diveDirector.setAttribute("class", "header-info-item");
    diveDirector.innerHTML = "Directeur de plongée : " + dive_director_last_name + " " + dive_director_first_name;
    headerInfo2.appendChild(diveDirector);
    let diveDirectorQualification = document.createElement("div");
    diveDirectorQualification.setAttribute("class", "header-info-item");
    diveDirectorQualification.innerHTML = "Qualification : " + dive_director_qualification;
    headerInfo2.appendChild(diveDirectorQualification);
    let DiverNumber = document.createElement("div");
    DiverNumber.setAttribute("class", "header-info-item");
    DiverNumber.innerHTML = "Nombre de plongeurs : " + tabActualDiveTeamMembers.length;
    headerInfo2.appendChild(DiverNumber);
    headerBottom.appendChild(headerInfo2);
    let headerInfo3 = document.createElement("div");
    headerInfo3.setAttribute("class", "header-info");
    let sign = document.createElement("div");
    sign.setAttribute("class", "header-info-item");
    sign.innerHTML = "Signature du DP :";
    let signBox = document.createElement("div");
    signBox.setAttribute("class", "signBox");
    sign.appendChild(signBox);
    headerInfo3.appendChild(sign);
    let surfaceSecurity = document.createElement("div");
    surfaceSecurity.setAttribute("class", "header-info-item");
    surfaceSecurity.innerHTML = "Sécurité de surface : " + surface_security;
    headerInfo3.appendChild(surfaceSecurity);
    let maxPpo2 = document.createElement("div");
    maxPpo2.setAttribute("class", "header-info-item");
    maxPpo2.innerHTML = "PPO2 max : " + max_ppo2;
    headerInfo3.appendChild(maxPpo2);
    headerBottom.appendChild(headerInfo3);
    header.appendChild(headerBottom);
    page.appendChild(header);
}

function createPdrTable(page,i) {
    let container = document.createElement("div");
    container.setAttribute("class", "table-container");
    page.appendChild(container);
    
    let table = document.createElement("table");
    table.setAttribute("class", "table");
    container.appendChild(table);

    // Create table head
    let thead = document.createElement("thead");
    table.appendChild(thead);
    let tr1 = document.createElement("tr");
    tr1.setAttribute("class", "table-title");
    thead.appendChild(tr1);
    let teamNumber = document.createElement("th");
    teamNumber.setAttribute("colspan", "6");
    teamNumber.innerHTML = "Palanquée n°" + (i);
    tr1.appendChild(teamNumber);
    let diveType = document.createElement("th");
    diveType.setAttribute("colspan", "4");
    let diveTypeName = "";
    switch (tabActualDiveTeams[i-1].get_dive_type()) {
        case "1":
            diveTypeName = "Exploration encadrée";
            break;
        case "2":
            diveTypeName = "Exploration autonome";
            break;
        case "3":
            diveTypeName = "Formation";
            break;
        default:
            break;
    }
    diveType.innerHTML = "Type de plongée : " + diveTypeName;
    tr1.appendChild(diveType);
    let tr2 = document.createElement("tr");
    thead.appendChild(tr2);
    let th1 = document.createElement("th");
    th1.innerHTML = "Nom";
    tr2.appendChild(th1);
    let th2 = document.createElement("th");
    th2.innerHTML = "Prénom";
    tr2.appendChild(th2);
    let th3 = document.createElement("th");
    th3.innerHTML = "Fonction";
    tr2.appendChild(th3);
    let th4 = document.createElement("th");
    th4.innerHTML = "Qualification";
    tr2.appendChild(th4);
    let th5 = document.createElement("th");
    th5.setAttribute("class", "thin")
    th5.innerHTML = "€";
    tr2.appendChild(th5);
    let th6 = document.createElement("th");
    th6.setAttribute("class", "thin")
    th6.innerHTML = "Nitrox %";
    tr2.appendChild(th6);
    let th7 = document.createElement("th");
    th7.innerHTML = "Horaire";
    tr2.appendChild(th7);
    let th8 = document.createElement("th");
    th8.innerHTML = "Profondeur";
    tr2.appendChild(th8);
    let th9 = document.createElement("th");
    th9.innerHTML = "Durée";
    tr2.appendChild(th9);
    let th10 = document.createElement("th");
    th10.setAttribute("class", "wide")
    th10.innerHTML = "Paliers";
    tr2.appendChild(th10);

    // Create table body
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    //console.log(tabActualDiveTeams[i-1].get_id());
    tabActualDiveTeamMembers.forEach(element => {
        if(element.get_id_palanquée() == tabActualDiveTeams[i-1].get_id()){
            let tr = document.createElement("tr");
            tbody.appendChild(tr);
            let td1 = document.createElement("td");
            td1.innerHTML = getDiverById(element.get_id()).get_last_name();
            tr.appendChild(td1);
            let td2 = document.createElement("td");
            td2.innerHTML = getDiverById(element.get_id()).get_first_name();
            tr.appendChild(td2);
            let td3 = document.createElement("td");
            td3.innerHTML = element.get_diver_role();
            tr.appendChild(td3);
            let td4 = document.createElement("td");
            let diverQualification = "";
            switch(parseInt(element.get_current_diver_qualification())){
                case 1:
                    diverQualification = "Etoile de mer 1";
                    break;
                case 2:
                    diverQualification = "Bronze";
                    break;
                case 3:
                    diverQualification = "Argent";
                    break;
                case 4:
                    diverQualification = "Or";
                    break;
                case 5:
                    diverQualification = "N1";
                    break;
                case 6:
                    diverQualification = "N2";
                    break;
                case 7:
                    diverQualification = "N3";
                    break;
                case 8:
                    diverQualification = "N4";
                    break;
                case 9:
                    diverQualification = "N5";
                    break;
                case 11:
                    diverQualification = "Aucun";
                    break;
                case 12:
                    diverQualification = "Etoile de mer 2";
                    break;
                case 13:
                    diverQualification = "Etoile de mer 3";
                    break;
                default:
                    diverQualification = "Inconnu"
                    break;
            }
                
            td4.innerHTML = diverQualification;
            tr.appendChild(td4);
            let td5 = document.createElement("td");
            if(element.get_paid_amount() == "") {
                td5.innerHTML = "0";
            }
            else {
                td5.innerHTML = element.get_paid_amount();
            }
            tr.appendChild(td5);
            let td6 = document.createElement("td");
            if(element.get_nox_percentage() == "") {
                td6.innerHTML = "0";
            }
            else {
                td6.innerHTML = element.get_nox_percentage();
            }
            tr.appendChild(td6);
            if (tr.parentElement.firstChild == tr) {
                let td7 = document.createElement("td");
                td7.setAttribute("rowspan", tabActualDiveTeamMembers.length);
                //td7.innerHTML = tabActualDiveTeams[i-1].get_start_time() + " - " + tabActualDiveTeams[i-1].get_stop_time();
                let divTime = document.createElement("div");
                let divTimeItem1 = document.createElement("div");
                divTimeItem1.setAttribute("class", "div-item");
                divTimeItem1.innerHTML = "Départ : ";
                divTime.appendChild(divTimeItem1);
                let divTimeItem2 = document.createElement("div");
                divTimeItem2.setAttribute("class", "div-item");
                divTimeItem2.innerHTML = "Retour : ";
                divTime.appendChild(divTimeItem2);
                td7.appendChild(divTime);
                tr.appendChild(td7);
                let td8 = document.createElement("td");
                td8.setAttribute("rowspan", tabActualDiveTeamMembers.length);
                //td8.innerHTML = tabActualDiveTeams[i-1].get_max_depth() + " m";
                let divDepth = document.createElement("div");
                let divDepthItem1 = document.createElement("div");
                divDepthItem1.setAttribute("class", "div-item");
                if(tabActualDiveTeams[i-1].get_max_depth() == "") {
                    divDepthItem1.innerHTML = "Prévue :";
                }
                else {
                    divDepthItem1.innerHTML = "Prévue : <br><br>&emsp;&emsp;" + tabActualDiveTeams[i-1].get_max_depth() + " m";
                }
                divDepth.appendChild(divDepthItem1);
                let divDepthItem2 = document.createElement("div");
                divDepthItem2.setAttribute("class", "div-item");
                divDepthItem2.innerHTML = "Réelle : ";
                divDepth.appendChild(divDepthItem2);
                td8.appendChild(divDepth);
                tr.appendChild(td8);
                let td9 = document.createElement("td");
                td9.setAttribute("rowspan", tabActualDiveTeamMembers.length);
                //td9.innerHTML = tabActualDiveTeams[i-1].get_max_duration() + " min";
                let divDuration = document.createElement("div");
                let divDurationItem1 = document.createElement("div");
                divDurationItem1.setAttribute("class", "div-item");
                if(tabActualDiveTeams[i-1].get_max_duration() == "00:00") {
                    divDurationItem1.innerHTML = "Prévue :";
                }
                else {
                    divDurationItem1.innerHTML = "Prévue : <br><br>&emsp;&emsp;"+ tabActualDiveTeams[i-1].get_max_duration();
                }
                divDuration.appendChild(divDurationItem1);
                let divDurationItem2 = document.createElement("div");
                divDurationItem2.setAttribute("class", "div-item");
                divDurationItem2.innerHTML = "Réelle : ";
                divDuration.appendChild(divDurationItem2);
                td9.appendChild(divDuration);
                tr.appendChild(td9);
                td9.setAttribute("rowspan", tabActualDiveTeamMembers.length);
                let td10 = document.createElement("td");
                td10.innerHTML = "";
                tr.appendChild(td10);
                td10.setAttribute("rowspan", tabActualDiveTeamMembers.length);
            }
            
        }

    });
    //console.log(container);
    //console.log(container.getBoundingClientRect().bottom);
    if(container.getBoundingClientRect().bottom > 3508*pageNumber){
        //console.log("page " + pageNumber);
        //console.log("top " + container.getBoundingClientRect().top);
        //console.log("bottom " + container.getBoundingClientRect().bottom);
        //console.log("boundary " + 3508*pageNumber);
        let shift = 3508*pageNumber - container.getBoundingClientRect().top + 50;
        container.style.marginTop = shift + "px";
        //console.log("décalage " + shift + "px");
        //console.log("page " + pageNumber);
        //console.log("top " + container.getBoundingClientRect().top);
        //console.log("bottom " + container.getBoundingClientRect().bottom);
        //console.log("boundary " + 3508*pageNumber);
        pageNumber++;
        page.style.height = 3508*pageNumber + "px";
        let pageSeparator = document.createElement("div");
        pageSeparator.setAttribute("class", "page-separator");
        pageSeparator.style.top = 3508*(pageNumber-1) + "px";
        page.appendChild(pageSeparator);

    }
}

function createPdfComment(page) {
    let container = document.createElement("div");
    container.setAttribute("class", "comment-container");
    page.appendChild(container);
    let title = document.createElement("div");
    title.setAttribute("class", "title");
    title.innerHTML = "Commentaires";
    container.appendChild(title);
    let DivComment = document.createElement("div");
    DivComment.setAttribute("class", "comment");
    DivComment.innerHTML = comment;
    container.appendChild(DivComment);
    if(container.getBoundingClientRect().bottom > 3508*pageNumber){
        //console.log("page " + pageNumber);
        //console.log("top " + container.getBoundingClientRect().top);
        //console.log("bottom " + container.getBoundingClientRect().bottom);
        //console.log("boundary " + 3508*pageNumber);
        let shift = 3508*pageNumber - container.getBoundingClientRect().top + 50;
        container.style.marginTop = shift + "px";
        //console.log("décalage " + shift + "px");
        //console.log("page " + pageNumber);
        //console.log("top " + container.getBoundingClientRect().top);
        //console.log("bottom " + container.getBoundingClientRect().bottom);
        //console.log("boundary " + 3508*pageNumber);
        pageNumber++;
        page.style.height = 3508*pageNumber + "px";
    }
}


window.html2canvas = html2canvas;
window.jsPDF = window.jspdf.jsPDF;

function createPDF() {      
    //html2canvas(document.querySelector("#pdf_info"), {
    //    
    //    allowTaint: true,
    //    useCORS: true,
    //    scale: 1,
    //}).then(canvas => {
        //    //document.body.appendChild(canvas);
        //    
        //    var img = canvas.toDataURL("image/png");
        //    var doc = new jsPDF("p", "mm", "a4");
        //    //doc.setFont('Arial');
        //    //doc.getFontSize(40);
        //    doc.addImage(img, 'JPEG', 0, 0, 1920, 1920);
        //    doc.save("TEST"); 
        //});   
        let doc = new jsPDF({  
            unit: 'px',  
            format: 'a4'  
        }); 
        doc.html(document.querySelector("#pdf_info"), {
            callback: function (doc) {
                doc.save("Fiche_de_securite");
            },
            x: 0,
            y: 0,
            //autoPaging: "text",
            //width: 793,
            width: 450,
            windowWidth: 2480,
            //windowHeight: 3508,
            //height: 1122,
        });
    }
    
    
function downloadPDF() { setTimeout(createPDF(), 5000);}

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