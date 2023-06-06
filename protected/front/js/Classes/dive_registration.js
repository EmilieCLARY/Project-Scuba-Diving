// Classe privée pour une inscription à une plongée
export default class DiveRegistration {
    constructor(diver_id_, planned_dive_id_, diver_role_, registration_timestamp_, personal_comment_, car_pooling_seat_offered_, car_pooling_seat_request_){
        this.diver_id = diver_id_;
        this.planned_dive_id = planned_dive_id_;
        this.diver_role = diver_role_;
        this.registration_timestamp = registration_timestamp_;
        this.personal_comment = personal_comment_;
        this.car_pooling_seat_offered = car_pooling_seat_offered_;
        this.car_pooling_seat_request = car_pooling_seat_request_;
    }

    get_diver_id() {
        return this.diver_id;
    }

    set_diver_id(diver_id) {
        this.diver_id = diver_id;
    }

    get_planned_dive_id() {
        return this.planned_dive_id;
    }

    set_planned_dive_id(planned_dive_id) {
        this.planned_dive_id = planned_dive_id;
    }

    get_diver_role() {
        return this.diver_role;
    }

    set_diver_role(diver_role) {
        this.diver_role = diver_role;
    }

    get_registration_timestamp() {
        return this.registration_timestamp;
    }

    set_registration_timestamp(registration_timestamp) {
        this.registration_timestamp = registration_timestamp;
    }

    get_personal_comment() {
        return this.personal_comment;
    }

    set_personal_comment(personal_comment) {
        this.personal_comment = personal_comment;
    }

    get_car_pooling_seat_offered() {
        return this.car_pooling_seat_offered;
    }

    set_car_pooling_seat_offered(car_pooling_seat_offered) {
        this.car_pooling_seat_offered = car_pooling_seat_offered;
    }

    get_car_pooling_seat_request() {
        return this.car_pooling_seat_request;
    }

    set_car_pooling_seat_request(car_pooling_seat_request) {
        this.car_pooling_seat_request = car_pooling_seat_request;
    }
}