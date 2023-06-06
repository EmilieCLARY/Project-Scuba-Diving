// Classe privée d'utilisateur de l'application
export default class AppUser{
    constructor(id_, Lastname_, Firstname_, Id_Diver, isAdmin){
        this.id = id_;
        this.Lastname = Lastname_;
        this.Firstname = Firstname_;
        this.Id_Diver = Id_Diver;
        this.isAdmin = isAdmin;
    }

    get_id(){
        return this.id;
    }

    get_Lastname(){
        return this.Lastname;
    }

    get_Firstname(){
        return this.Firstname;
    }

    get_Id_Diver(){
        return this.Id_Diver;
    }

    get_isAdmin(){
        return this.isAdmin;
    }

    set_id(id_){
        this.id = id_;
    }

    set_Lastname(Lastname_){
        this.Lastname = Lastname_;
    }

    set_Firstname(Firstname_){
        this.Firstname = Firstname_;
    }

    set_Id_Diver(Id_Diver_){
        this.Id_Diver = Id_Diver_;
    }

    set_isAdmin(isAdmin_){
        this.isAdmin = isAdmin_;
    }
}