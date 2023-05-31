import SocketManager from './SocketManager/SocketAppUser.js'

SocketManager.getAllAppUsers();

let tabAppUsers = [];

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

function LoadAllAppUsers(tab){
    tab.forEach(element => {
        let tmp = new app_user(element.Id_Application_User, element.Lastname, element.Firstname, element.Id_Diver, element.isAdmin);
        tabAppUsers.push(tmp);
    });
    console.log(tabAppUsers);
    createAppUserTable(tabAppUsers);
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

        ligne.appendChild(td1);
        ligne.appendChild(td2);
        ligne.appendChild(td3);
        ligne.appendChild(td4);
        ligne.appendChild(td5);

        tbody.appendChild(ligne);
        tableau.appendChild(tbody);
        table.appendChild(tableau);


    }


    
}

export default {
    LoadAllAppUsers,
}