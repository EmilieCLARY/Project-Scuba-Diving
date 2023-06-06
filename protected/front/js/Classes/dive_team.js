// Classe privée de palanquée
export default class DiveTeam {
    constructor(id_, max_depth_, max_duration_, real_depth_, real_duration_, dive_type_, sequence_number_, start_time_, stop_time_, comment_, id_dive_guide_, id_dive_){
        this.id = id_;
        this.max_depth = max_depth_;
        this.max_duration = max_duration_;
        this.real_depth = real_depth_;
        this.real_duration = real_duration_;
        this.dive_type = dive_type_;
        this.sequence_number = sequence_number_;
        this.start_time = start_time_;
        this.stop_time = stop_time_;
        this.comment = comment_;
        this.id_dive_guide = id_dive_guide_;
        this.id_dive = id_dive_;
    }

    get_id() {
        return this.id;
    }

    set_id(id_) {
        this.id = id_;
    }

    get_max_depth() {
        return this.max_depth;
    }

    set_max_depth(max_depth_) {
        this.max_depth = max_depth_;
    }

    get_max_duration() {
        return this.max_duration;
    }

    set_max_duration(max_duration_) {
        this.max_duration = max_duration_;
    }

    get_real_depth() {
        return this.real_depth;
    }

    set_real_depth(real_depth_) {
        this.real_depth = real_depth_;
    }

    get_real_duration() {
        return this.real_duration;
    }

    set_real_duration(real_duration_) {
        this.real_duration = real_duration_;
    }

    get_dive_type() {
        return this.dive_type;
    }

    set_dive_type(dive_type_) {
        this.dive_type = dive_type_;
    }

    get_sequence_number() {
        return this.sequence_number;
    }

    set_sequence_number(sequence_number_) {
        this.sequence_number = sequence_number_;
    }

    get_start_time() {
        return this.start_time;
    }

    set_start_time(start_time_) {
        this.start_time = start_time_;
    }

    get_stop_time() {
        return this.stop_time;
    }

    set_stop_time(stop_time_) {
        this.stop_time = stop_time_;
    }

    get_comment() {
        return this.comment;
    }

    set_comment(comment_) {
        this.comment = comment_;
    }

    get_id_dive_guide() {
        return this.id_dive_guide;
    }

    set_id_dive_guide(id_dive_guide_) {
        this.id_dive_guide = id_dive_guide_;
    }

    get_id_dive() {
        return this.id_dive;
    }

    set_id_dive(id_dive_) {
        this.id_dive = id_dive_;
    }
}