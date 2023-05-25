import SocketManager from './SocketManager/SocketDiver.js'

SocketManager.getAllDivers();

let tabDivers = [];

// Classe privée pour un plongeur

class diver {
    constructor(last_name_,first_name_,diver_qualification_,instructor_qualification_,nox_level_,additionnal_qualification_,licence_number_,licence_expiration_date_,medical_certificate_expiration_date_,birth_date_) {
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

function LoadAllDivers(tab){
    tab.forEach(element => {
        let tmp = new diver(element.Lastname,element.Firstname,element.Diver_Qualifications,element.Instructor_Qualification,element.Nox_Level,element.Additionnal_Qualifications,element.Licence_Number,element.Licence_Expiration_Date,element.Medical_Certificate_Expiration_Date,element.Birthdate);
        tabDivers.push(tmp);
    });
    console.log(tabDivers);
}

document.getElementById("validate").addEventListener("click", (e) => {
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

    // Send to server
    let id = tabDivers.length+1;
    SocketManager.addDiver(id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);
    console.log(id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);

    // Clear all input
    document.getElementById("diver-firstname").value = "";
    document.getElementById("diver-lastname").value = "";
    document.getElementById("diver-qualification").value = "";
    document.getElementById("diver-instructor-qualification").value = "";
    document.getElementById("diver-nox-level").value = "";
    document.getElementById("diver-additionnal-qualification").value = "";
    document.getElementById("diver-license-number").value = "";
    document.getElementById("diver-license-expiration-date").value = "";
    document.getElementById("diver-medical-certificate-expiration-date").value = "";
    document.getElementById("diver-birthdate").value = "";

    updateDiver();//PB async
});

function updateDiver(){
    tabDivers = [];
    SocketManager.getAllDivers();
}



export default {
    LoadAllDivers,
}