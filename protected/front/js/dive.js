// Classe privée de plongée

class dive {
    constructor() {
        this.begin_time = begin_time;
        this.end_time = end_time;
        this.begin_date = begin_date;
        this.end_date = end_date;
        this.comment = comment;
        this.surface_security = surface_security;
        this.diver_price = diver_price;
        this.instructor_price = instructor_price;
        this.max_ppo2 = max_ppo2;
    }

    get begin_time() {
        return this.begin_time;
    }

    set begin_time(begin_time) {
        this.begin_time = begin_time;
    }

    get end_time() {
        return this.end_time;
    }

    set end_time(end_time) {
        this.end_time = end_time;
    }

    get begin_date() {
        return this.begin_date;
    }

    set begin_date(begin_date) {
        this.begin_date = begin_date;
    }

    get end_date() {
        return this.end_date;
    }

    set end_date(end_date) {
        this.end_date = end_date;
    }

    get comment() {
        return this.comment;
    }

    set comment(comment) {
        this.comment = comment;
    }

    get surface_security() {
        return this.surface_security;
    }

    set surface_security(surface_security) {
        this.surface_security = surface_security;
    }

    get diver_price() {
        return this.diver_price;
    }

    set diver_price(diver_price) {
        this.diver_price = diver_price;
    }

    get instructor_price() {
        return this.instructor_price;
    }

    set instructor_price(instructor_price) {
        this.instructor_price = instructor_price;
    }

    get max_ppo2() {
        return this.max_ppo2;
    }

    set max_ppo2(max_ppo2) {
        this.max_ppo2 = max_ppo2;
    }
}