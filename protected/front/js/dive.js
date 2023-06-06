import SocketManager from './SocketManager/SocketDives.js'
import DiveTeam from './Classes/dive_team.js'
import Dive from './Classes/dive.js'
import DiveTeamMember from './Classes/dive_team_member.js';
import PlannedDive from './Classes/planned_dive.js';

//let tmp = new DiveTeamMember(1, 1, "P1", "P2", "P3", "P4", "P5", "P6", "P7");   
//console.log(tmp);

var tablecounter = 0;

function setButtonListener(){

    const ajoutTabBouton = document.getElementById('ajouter-tableau');
    ajoutTabBouton.addEventListener('click', event => {
        creationTableauPalanquee(5,6);
    });

    const deleteAllTab = document.getElementById('clear-tableaux');
    deleteAllTab.addEventListener('click', event => {
        supprimerTousLesTableaux();
    });

    const attriubtionAutomatique = document.getElementById('attribution-automatique');
    attriubtionAutomatique.addEventListener('click', event => {
        attributionAutomatique();
    });

}

setButtonListener();

function suppressionTableauPalanquée(tableId){
    const table = document.getElementById(tableId);
    table.parentNode.remove();
}

function supprimerTousLesTableaux(){
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = "";
    tablecounter = 0;
}

function attributionAutomatique(){
    // Cette fonction a pour but de répartir les inscrits en fonction de l'âge et du niveau dans les différentes palanquées
    console.log("Non réalisé")
    
}

// TABLEAU PALANQUÉE

function creationTableauPalanquee(rows, columns) {

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

    thead.appendChild(tr);
    table.appendChild(thead);

    // Create the table body with rows and cells
    const tbody = document.createElement('tbody');

    for (let i = 0; i < rows; i++) {

        const row = document.createElement('tr');
        row.classList.add('tr');
        row.classList.add('my-handle');

        for (let j = 0; j < columns - 1; j++) {
            
            const cell = document.createElement('td');
            cell.textContent = `Data ${i + 1}-${j + 1}`;
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    table.appendChild(tbody);


    // Append the table to the container
    const tableContainer = document.getElementById('tableContainer');
    tableDiv.appendChild(table);
    const supprButton = document.createElement('button');
    supprButton.setAttribute("id", "supprButton" + tableId);
    supprButton.addEventListener('click', event => {
        suppressionTableauPalanquée(tableId);
        tablecounter--;
    });
    supprButton.innerHTML = "Supprimer le tableau";
    tableDiv.appendChild(supprButton);
    tableContainer.appendChild(tableDiv);

    // Initialize SortableJS for the new table
    new Sortable(tbody, {
        group: 'shared',
        handle: ".my-handle",
        animation: 150,
    });


}



// TABLEAU INSCRITS

function createTableInscrits() {

    // Create a new table element
    const table = document.createElement('table');
    table.classList.add('blueTable');
    table.classList.add('tableInscrits');

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

    thead.appendChild(tr);
    table.appendChild(thead);

    // Create the table body with rows and cells

    const tbody = document.createElement('tbody');

    for (let i = 0; i < tabDivers.length; i++) {

        let ligne = document.createElement('tr');
        ligne.classList.add('tr');

        let celluleNom = document.createElement('td');

        let cellulePrenom = document.createElement('td');

        let celluleNiveau = document.createElement('td');

        let celluleAge = document.createElement('td');
        celluleAge.innerHTML = calculerAge(calculerAge());

        let celluleRole = document.createElement('td');

        ligne.appendChild(celluleNom);
        ligne.appendChild(cellulePrenom);
        ligne.appendChild(celluleNiveau);
        ligne.appendChild(celluleAge);
        ligne.appendChild(celluleRole);

        tbody.appendChild(ligne);

    }

    table.appendChild(tbody);

    // Append the table to the container
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.appendChild(table);

    // Initialize SortableJS for the new table

    new Sortable(tbody, {
        group: 'shared',
        handle: ".my-handle",
        animation: 150,
    });

}


function calculerAge(dateNaissance) {
    let maintenant = new Date();
    let anneeActuelle = maintenant.getFullYear();
    let anneeNaissance = new Date(dateNaissance).getFullYear();
    
    let age = anneeActuelle - anneeNaissance;
    
    return age;
}

// Algorithme de répartition des palanquées en fonction du niveau, de l'âge et de l'expérience des plongeurs
function repartitionPalanquees() {
 
    // Séparation des plongeurs en fonction de leur âge
    let diversJunior = [];
    let diversSenior = [];

    for (let i = 0; i < tabDives.length; i++) {
        if(calculerAge(tabDives[i].birthdate) < 18) {
            diversJunior.push(tabDives[i]);
        }
        else {
            diversSenior.push(tabDives[i]);
        }
    }

    // Séparation des plongeurs en fonction de leur niveau de plongeur

    let diversN1 = [];
    let diversN2 = [];
    let diversN3 = [];
    let diversN4 = [];
    let diversN5 = [];
    let diversEM1 = [];
    let diversEM2 = [];
    let diversEM3 = [];

    for (let i = 0; i < tabDivers[i].length; i++) {
        
        switch (tabDivers[i].get_diver_qualification()) {
            case "N1":
                diversN1.push(tabDivers[i]);
                break;
            case "N2":
                diversN2.push(tabDivers[i]);
                break;
            case "N3":
                diversN3.push(tabDivers[i]);
                break;
            case "N4":
                diversN4.push(tabDivers[i]);
                break;
            case "N5":
                diversN5.push(tabDivers[i]);
                break;
            case "EM1":
                diversEM1.push(tabDivers[i]);
                break;
            case "EM2":
                diversEM2.push(tabDivers[i]);
                break;
            case "EM3":
                diversEM3.push(tabDivers[i]);
                break;
            default:
                break;
        }
    
    }
    


    


}

export default {

}
