export default class MaxDepthForQualification {
    constructor(id_, diver_qualification_, diver_age_, guided_diver_depth, autonomous_diver_depth_){
        this.id = id_;
        this.diver_qualification = diver_qualification_;
        this.diver_age = diver_age_;
        this.guided_diver_depth = guided_diver_depth;
        this.autonomous_diver_depth = autonomous_diver_depth_;
    }

    get_id(){
        return this.id;
    }

    set_id(id_){
        this.id = id_;
    }

    get_diver_qualification(){
        return this.diver_qualification;
    }

    set_diver_qualification(diver_qualification_){
        this.diver_qualification = diver_qualification_;
    }

    get_diver_age(){
        return this.diver_age;
    }

    set_diver_age(diver_age_){
        this.diver_age = diver_age_;
    }

    get_guided_diver_depth(){
        return this.guided_diver_depth;
    }

    set_guided_diver_depth(guided_diver_depth_){
        this.guided_diver_depth = guided_diver_depth_;
    }

    get_autonomous_diver_depth(){
        return this.autonomous_diver_depth;
    }

    set_autonomous_diver_depth(autonomous_diver_depth_){
        this.autonomous_diver_depth = autonomous_diver_depth_;
    }
}