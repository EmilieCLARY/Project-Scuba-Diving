import SocketManager from './SocketManager/SocketEmergency.js'

SocketManager.getAllEmergencies();

let tabEmergencies = [];

// Classe privée de plan d'urgence

class emergency {
    constructor() {
        this.sos_number = sos_number;
        this.emergency_plan = emergency_plan;
        this.post_accident_procedure = post_accident_procedure;
        this.version = version;
    }

    get sos_number() {
        return this.sos_number;
    }

    set sos_number(sos_number) {
        this.sos_number = sos_number;
    }

    get emergency_plan() {
        return this.emergency_plan;
    }

    set emergency_plan(emergency_plan) {
        this.emergency_plan = emergency_plan;
    }

    get post_accident_procedure() {
        return this.post_accident_procedure;
    }

    set post_accident_procedure(post_accident_procedure) {
        this.post_accident_procedure = post_accident_procedure;
    }

    get version() {
        return this.version;
    }
    
    set version(version) {
        this.version = version;
    }
}
