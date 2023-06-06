// Classe privée de membre de palanquée
export default class DiveTeamMember{
    constructor(id_, id_palanquée_, temporary_diver_qualification_, current_diver_qualification_, diver_role_, currennt_instructor_qualification_, nox_percentage_, comment_, paid_amount_){
        this.id = id_;
        this.id_palanquée = id_palanquée_;
        this.temporary_diver_qualification = temporary_diver_qualification_;
        this.current_diver_qualification = current_diver_qualification_;
        this.diver_role = diver_role_;
        this.currennt_instructor_qualification = currennt_instructor_qualification_;
        this.nox_percentage = nox_percentage_;
        this.comment = comment_;
        this.paid_amount = paid_amount_;
    }

    get_id() {
        return this.id;
    }

    set_id(id_) {
        this.id = id_;
    }

    get_id_palanquée() {
        return this.id_palanquée;
    }

    set_id_palanquée(id_palanquée_) {
        this.id_palanquée = id_palanquée_;
    }

    get_temporary_diver_qualification() {
        return this.temporary_diver_qualification;
    }

    set_temporary_diver_qualification(temporary_diver_qualification_) {
        this.temporary_diver_qualification = temporary_diver_qualification_;
    }
    
    get_current_diver_qualification() {
        return this.current_diver_qualification;
    }

    set_current_diver_qualification(current_diver_qualification_) {
        this.current_diver_qualification = current_diver_qualification_;
    }

    get_diver_role() {
        return this.diver_role;
    }

    set_diver_role(diver_role_) {
        this.diver_role = diver_role_;
    }

    get_currennt_instructor_qualification() {
        return this.currennt_instructor_qualification;
    }

    set_currennt_instructor_qualification(currennt_instructor_qualification_) {
        this.currennt_instructor_qualification = currennt_instructor_qualification_;
    }

    get_nox_percentage() {
        return this.nox_percentage;
    }

    set_nox_percentage(nox_percentage_) {
        this.nox_percentage = nox_percentage_;
    }

    get_comment() {
        return this.comment;
    }

    set_comment(comment_) {
        this.comment = comment_;
    }

    get_paid_amount() {
        return this.paid_amount;
    }

    set_paid_amount(paid_amount_) {
        this.paid_amount = paid_amount_;
    }
}