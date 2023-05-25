import SocketManager from './SocketManager/SocketPlannedDive.js'

SocketManager.getAllPlannedDives();

let tabPlannedDives = [];

// Classe privée planned_dives

class planned_dives {
    constructor() {
        this.planned_date = planned_date;
        this.planned_time = planned_time;
        this.comments = comments;
        this.special_needs = special_needs;
        this.statut = statut;
        this.diver_dive_price = diver_dive_price;
        this.instructor_dive_price = instructor_dive_price;
    }

    get planned_date() {
        return this.planned_date;
    }

    set planned_date(planned_date) {
        this.planned_date = planned_date;
    }

    get planned_time() {
        return this.planned_time;
    }

    set planned_time(planned_time) {
        this.planned_time = planned_time;
    }

    get comments() {
        return this.comments;
    }

    set comments(comments) {
        this.comments = comments;
    }

    get special_needs() {
        return this.special_needs;
    }

    set special_needs(special_needs) {
        this.special_needs = special_needs;
    }

    get status() {
        return this.status;
    }

    set status(status) {
        this.status = status;
    }


    get diver_dive_price() {
        return this.diver_dive_price;
    }

    set diver_dive_price(diver_dive_price) {
        this.diver_dive_price = diver_dive_price;
    }

    get instructor_dive_price() {
        return this.instructor_dive_price;
    }

    set instructor_dive_price(instructor_dive_price) {
        this.instructor_dive_price = instructor_dive_price;
    }

}