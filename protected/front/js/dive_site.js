import SocketManager from './SocketManager/SocketDiveSite.js'

SocketManager.getAllDiveSites();

let tabDiveSites = [];

// Classe privée Site de plongée
class dive_site {
    constructor(site_name_, gps_latitude_, gps_longitude_, track_type_, track_number_, track_name_, zip_code_, city_, country_, aditionnal_info_, telephone_, url_) {
        this.site_name = site_name_;
        this.gps_latitude = gps_latitude_;
        this.gps_longitude = gps_longitude_;
        this.track_type = track_type_;
        this.track_number = track_number_;
        this.track_name = track_name_;
        this.zip_code = zip_code_;
        this.city = city_;
        this.country = country_;
        this.aditionnal_info = aditionnal_info_;
        this.telephone = telephone_;
        this.url = url_;
    }

    get_site_name() {
        return this.site_name;
    }

    set_site_name(site_name) {
        this.site_name = site_name;
    }

    get_gps_latitude() {
        return this.gps_latitude;
    }

    set_gps_latitude(gps_latitude) {
        this.gps_latitude = gps_latitude;
    }

    get_gps_longitude() {
        return this.gps_longitude;
    }

    set_gps_longitude(gps_longitude) {
        this.gps_longitude = gps_longitude;
    }

    get_track_type() {
        return this.track_type;
    }

    set_track_type(track_type) {
        this.track_type = track_type;
    }

    get_track_number() {
        return this.track_number;
    }

    set_track_number(track_number) {
        this.track_number = track_number;
    }
    
    get_track_name() {
        return this.track_name;
    }

    set_track_name(track_name) {
        this.track_name = track_name;
    }

    get_zip_code() {
        return this.zip_code;
    }

    set_zip_code(zip_code) {
        this.zip_code = zip_code;
    }

    get_city() {
        return this.city;
    }

    set_city(city) {
        this.city = city;
    }

    get_country() {
        return this.country;
    }

    set_country(country) {
        this.country = country;
    }

    get_aditionnal_info() {
        return this.aditionnal_info;
    }

    set_aditionnal_info(aditionnal_info) {
        this.aditionnal_info = aditionnal_info;
    }

    get_telephone() {
        return this.telephone;
    }

    set_telephone(telephone) {
        this.telephone = telephone;
    }

    get_url() {
        return this.url;
    }

    set_url(url) {
        this.url = url;
    }
}

function LoadAllDiveSites(tab){
    tab.forEach(element => {
        let tmp = new dive_site(element.Site_Name, element.Gps_Latitude, element.Gps_Longitude, element.Track_Type, element.Track_Number, element.Track_Name, element.Zip_Code, element.City_Name, element.Country_Name, element.Additional_Address, element.Tel_Number, element.Information_URL);
        tabDiveSites.push(tmp);
    });
    console.log(tabDiveSites);
    create_elements(tabDiveSites);
}

function create_elements(tab_dive_sites) {
    // Création de l'affichage des sites de plongée
    let container = document.getElementById("liste_dive_site");;
    console.log(tab_dive_sites)
    // Parcourir le tableau d'éléments et créer des <li> pour chaque élément
    for (let i = 0; i < tab_dive_sites.length; i++) {
        // Créer un nouvel élément div
        let siteElement = document.createElement('div');
        siteElement.classList.add("dive-site-list-item");

        let siteElementTop = document.createElement('div');
        siteElementTop.classList.add("top-part");
        let siteElementTopName = document.createElement('h1');
        siteElementTopName.innerHTML = tab_dive_sites[i].get_site_name();
        siteElementTop.appendChild(siteElementTopName);
        let siteElementTopTown = document.createElement('h2');
        siteElementTopTown.innerHTML = tab_dive_sites[i].get_city();
        siteElementTop.appendChild(siteElementTopTown);
        siteElement.appendChild(siteElementTop);

        let siteElementBottom = document.createElement('div');
        siteElementBottom.classList.add("bottom-part");
        let siteElementBottomInfo = document.createElement('div');
        siteElementBottomInfo.classList.add("bottom-left");
        let siteElementBottomInfoTrackType = document.createElement('p');
        siteElementBottomInfoTrackType.innerHTML = tab_dive_sites[i].get_track_type();
        siteElementBottomInfo.appendChild(siteElementBottomInfoTrackType);
        let siteElementBottomInfoTrackName = document.createElement('p');
        siteElementBottomInfoTrackName.innerHTML = tab_dive_sites[i].get_track_name();
        siteElementBottomInfo.appendChild(siteElementBottomInfoTrackName);
        let siteElementBottomInfoTrackNumber = document.createElement('p');
        siteElementBottomInfoTrackNumber.innerHTML = tab_dive_sites[i].get_track_number();
        siteElementBottomInfo.appendChild(siteElementBottomInfoTrackNumber);
        let siteElementBottomContact = document.createElement('div');
        siteElementBottomContact.classList.add("bottom-right");
        let siteElementBottomContactTel = document.createElement('p');
        siteElementBottomContactTel.innerHTML = tab_dive_sites[i].get_telephone();
        siteElementBottomContact.appendChild(siteElementBottomContactTel);
        let siteElementBottomContactUrl = document.createElement('p');
        siteElementBottomContactUrl.innerHTML = tab_dive_sites[i].get_url();
        siteElementBottomContact.appendChild(siteElementBottomContactUrl);
        siteElementBottom.appendChild(siteElementBottomInfo);
        siteElementBottom.appendChild(siteElementBottomContact);
        siteElement.appendChild(siteElementBottom);

        let siteElementHoverContainer = document.createElement('div');
        siteElementHoverContainer.classList.add("hover-container");
        let siteElementHover = document.createElement('div');
        siteElementHover.classList.add("hover-div");
        siteElementHoverContainer.appendChild(siteElementHover);
        let siteElementHoverTop = document.createElement('div');
        siteElementHoverTop.classList.add("top-part");
        let siteElementHoverTopCity = document.createElement('h1');
        siteElementHoverTopCity.innerHTML = tab_dive_sites[i].get_city() + ", " + tab_dive_sites[i].get_zip_code();
        siteElementHoverTop.appendChild(siteElementHoverTopCity);
        let siteElementHoverTopCountry = document.createElement('h2');
        siteElementHoverTopCountry.innerHTML = tab_dive_sites[i].get_country();
        siteElementHoverTop.appendChild(siteElementHoverTopCountry);
        siteElementHover.appendChild(siteElementHoverTop);
        let siteElementHoverBottom = document.createElement('div');
        siteElementHoverBottom.classList.add("bottom-part");
        let siteElementHoverBottomMap = document.createElement('div');
        siteElementHoverBottomMap.classList.add("map");
        siteElementHoverBottomMap.innerHTML = "Map";
        siteElementHoverBottom.appendChild(siteElementHoverBottomMap);
        let siteElementHoverBottomLocation = document.createElement('div');
        siteElementHoverBottomLocation.classList.add("location");
        let siteElementHoverBottomLocationZip = document.createElement('p');
        siteElementHoverBottomLocationZip.innerHTML = tab_dive_sites[i].get_zip_code();
        siteElementHoverBottomLocation.appendChild(siteElementHoverBottomLocationZip);
        let siteElementHoverBottomLocationAddress = document.createElement('p');
        siteElementHoverBottomLocationAddress.innerHTML = tab_dive_sites[i].get_aditionnal_info();
        siteElementHoverBottomLocation.appendChild(siteElementHoverBottomLocationAddress);
        let siteElementHoverBottomLocationPosition = document.createElement('p');
        siteElementHoverBottomLocationPosition.innerHTML = tab_dive_sites[i].get_gps_latitude() + " " + tab_dive_sites[i].get_gps_longitude();
        siteElementHoverBottomLocation.appendChild(siteElementHoverBottomLocationPosition);
        siteElementHoverBottom.appendChild(siteElementHoverBottomLocation);
        
        siteElementHover.appendChild(siteElementHoverBottom);
        siteElementBottom.appendChild(siteElementHoverContainer);
        




        

        
        //siteElement.innerHTML = tab_dive_sites[i].get_site_name() + "<br>" + tab_dive_sites[i].get_track_type() + " " + tab_dive_sites[i].get_track_number() + " " + tab_dive_sites[i].get_track_name() + "<br>" + tab_dive_sites[i].get_zip_code() + " " + tab_dive_sites[i].get_city() + "<br>" + tab_dive_sites[i].get_country() + "<br>" + tab_dive_sites[i].get_aditionnal_info() + "<br>" + tab_dive_sites[i].get_telephone() + "<br>" + tab_dive_sites[i].get_url() + "<br>" + tab_dive_sites[i].get_gps_latitude() + " " + tab_dive_sites[i].get_gps_longitude() + "<br>" + "<br>";
        // Ajouter du contenu ou des styles si nécessaire
        //for(let element of tab_dive_sites){
        //    console.log(element);
        //    div.innerHTML = element.get_site_name() + "<br>" + element.get_track_type() + " " + element.get_track_number() + " " + element.get_track_name() + "<br>" + element.get_zip_code() + " " + element.get_city() + "<br>" + element.get_country() + "<br>" + element.get_aditionnal_info() + "<br>" + element.get_telephone() + "<br>" + element.get_url() + "<br>" + element.get_gps_latitude() + " " + element.get_gps_longitude() + "<br>" + "<br>";
        //}

        // Ajouter la div à l'élément parent
        container.appendChild(siteElement);
    }
}

export default {
    LoadAllDiveSites,
}