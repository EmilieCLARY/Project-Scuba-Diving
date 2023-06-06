// Classe privée de plongée
export default class Dive {
    constructor(id_, begin_time_, begin_date_, end_time_, end_date_, comment_, surface_security_, diver_price_, instructor_price_, max_ppo2_, id_dive_director_, id_planned_dive_){
        this.id = id_;
        this.begin_time = begin_time_;
        this.begin_date = begin_date_;
        this.end_time = end_time_;
        this.end_date = end_date_;
        this.comment = comment_;
        this.surface_security = surface_security_;
        this.diver_price = diver_price_;
        this.instructor_price = instructor_price_;
        this.max_ppo2 = max_ppo2_;
        this.id_dive_director = id_dive_director_;
        this.id_planned_dive = id_planned_dive_;
    }

    get_id() {
        return this.id;
    }

    set_id(id_) {
        this.id = id_;
    }

    get_begin_time() {
        return this.begin_time;
    }

    set_begin_time(begin_time_) {
        this.begin_time = begin_time_;
    }

    get_begin_date() {
        return this.begin_date;
    }

    set_begin_date(begin_date_) {
        this.begin_date = begin_date_;
    }

    get_end_time() {
        return this.end_time;
    }

    set_end_time(end_time_) {
        this.end_time = end_time_;
    }

    get_end_date() {
        return this.end_date;
    }

    set_end_date(end_date_) {
        this.end_date = end_date_;
    }

    get_comment() {
        return this.comment;
    }

    set_comment(comment_) {
        this.comment = comment_;
    }

    get_surface_security() {
        return this.surface_security;
    }

    set_surface_security(surface_security_) {
        this.surface_security = surface_security_;
    }

    get_diver_price() {
        return this.diver_price;
    }

    set_diver_price(diver_price_) {
        this.diver_price = diver_price_;
    }

    get_instructor_price() {
        return this.instructor_price;
    }

    set_instructor_price(instructor_price_) {
        this.instructor_price = instructor_price_;
    }

    get_max_ppo2() {
        return this.max_ppo2;
    }

    set_max_ppo2(max_ppo2_) {
        this.max_ppo2 = max_ppo2_;
    }

    get_id_dive_director() {
        return this.id_dive_director;
    }

    set_id_dive_director(id_dive_director_) {
        this.id_dive_director = id_dive_director_;
    }

    get_id_planned_dive() {
        return this.id_planned_dive;
    }

    set_id_planned_dive(id_planned_dive_) {
        this.id_planned_dive = id_planned_dive_;
    }
}