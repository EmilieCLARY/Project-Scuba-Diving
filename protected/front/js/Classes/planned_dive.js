// Classe privée plannedDive
export default class PlannedDive {
    constructor(id_,planned_date_, planned_time_, comments_, special_needs_, statut_, diver_dive_price_, instructor_dive_price_, id_dive_site_) {
        this.id = id_;
        this.planned_date = planned_date_;
        this.planned_time = planned_time_;
        this.comments = comments_;
        this.special_needs = special_needs_;
        this.statut = statut_;
        this.diver_dive_price = diver_dive_price_;
        this.instructor_dive_price = instructor_dive_price_;
        this.id_dive_site = id_dive_site_;
    }

    get_id() {
        return this.id;
    }
    
    set_id(id) {
        this.id = id;
    }

    get_planned_date() {
        return this.planned_date;
    }

    set_planned_date(planned_date) {
        this.planned_date = planned_date;
    }

    get_planned_time() {
        return this.planned_time;
    }

    set_planned_time(planned_time) {
        this.planned_time = planned_time;
    }

    get_comments() {
        return this.comments;
    }

    set_comments(comments) {
        this.comments = comments;
    }

    get_special_needs() {
        return this.special_needs;
    }

    set_special_needs(special_needs) {
        this.special_needs = special_needs;
    }

    get_statut() {
        return this.statut;
    }

    set_statut(status) {
        this.statut = statut;
    }


    get_diver_dive_price() {
        return this.diver_dive_price;
    }

    set_diver_dive_price(diver_dive_price) {
        this.diver_dive_price = diver_dive_price;
    }

    get_instructor_dive_price() {
        return this.instructor_dive_price;
    }

    set_instructor_dive_price(instructor_dive_price) {
        this.instructor_dive_price = instructor_dive_price;
    }

    get_id_dive_site() {
        return this.id_dive_site;
    }

    set_id_dive_site(id_dive_site) {
        this.id_dive_site = id_dive_site;
    }
}