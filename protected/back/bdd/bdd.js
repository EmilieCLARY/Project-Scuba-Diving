const sqlite3 = require('sqlite3').verbose();

var fs = require('fs');

var db;

// open the database
async function openDB(){
    console.time("BDD : Connection to data base");
    try {
        db = await new sqlite3.Database('ScubaDB', (err) => {
            console.log('Connected to the database.');
            // Insert two rows to table "users"
            db.run('INSERT INTO Diver (Lastname, Firstname, Diver_Qualifications, Instructor_Qualification, Nox_Level, Additional_Qualifications, License_Number, License_Expiration_Date, Medical_Certificate_Expiration_Date, Birthdate) VALUES("BOULES-UN-GAY", "David", "5", "5", "3", "None", "954734982", 01/12/2027, 03/11/2024, 23/05/1997)', ['C'], (err) => {
                if(err) {
                    return console.log(err.message); 
                }
                console.log('BDD : Row was added to the table: ${this.lastID}');
                });
            });
    }
    catch (err) {
        console.log(err);
    }
    finally {
		console.timeEnd("BDD : Connection to data base");
	}
}
// close the database
async function closeDB(){
    try {
        await db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('BDD : Close the database connection.');
        });
    }
    catch (err) {
        console.log(err);
    }
}

// insert a row into the database à la mano
function insertInDB(){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    // Diver
    /*let sql = `INSERT INTO Diver(Id_Diver, Lastname, Firstname, Diver_Qualifications, Instructor_Qualification, Nox_Level, Additional_Qualifications, License_Number, License_Expiration_Date, Medical_Certificate_Expiration_Date, Birthdate) 
                    VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, ["1234","BOULES-UN-GAYYYYY", "DavidEE", "5", "5", "3", "None", "954734982", "01/12/2027", "03/11/2024", "23/05/1997"], (err) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log('Row was added to the table');
    });*/

    // Dive Site
    /*let sql = `INSERT INTO Dive_Site(Id_Dive_Site,Site_Name, Gps_Latitude, Gps_Longitude, Track_Type, Track_Number, Track_Name, Zip_Code, City_Name, Country_Name, Additional_Address, Tel_Number, Information_URL ) 
                    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, ["1","Nom du site", 131.123032, 50.21312, "Type", "Numéro", "Non", "Code postale", "Ville", "Pays", "Complément d'adresse", "Téléphone", "URL info"], (err) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log('Row was added to the table');
    });*/

/*
    let image1 = fs.readFileSync('./protected/front/img/Image_site/Image site/Adeps.jpg');
    let image2 = fs.readFileSync('./protected/front/img/Image_site/Image site/Barges.jpg');
    let image3 = fs.readFileSync('./protected/front/img/Image_site/Image site/Barrage-eau-heure.jpg');
    let image4 = fs.readFileSync('./protected/front/img/Image_site/Image site/BERGSEDIEPSLUIS.jpg');
    let image5 = fs.readFileSync('./protected/front/img/Image_site/Image site/Cap-Blanc.jpeg');
    let image6 = fs.readFileSync('./protected/front/img/Image_site/Image site/Carriere-de-trélon.jpg');
    let image7 = fs.readFileSync('./protected/front/img/Image_site/Image site/CARRIERE-DU-FLATO.jpg');
    let image8 = fs.readFileSync('./protected/front/img/Image_site/Image site/chera-Gombe.jpg');
    let image9 = fs.readFileSync('./protected/front/img/Image_site/Image site/DEN-OSSE-DIVE-SPOT.jpg');
    let image10 = fs.readFileSync('./protected/front/img/Image_site/Image site/dour.jpg');
    let image11 = fs.readFileSync('./protected/front/img/Image_site/Image site/duiktank.jpg');
    let image12 = fs.readFileSync('./protected/front/img/Image_site/Image site/EKEREN.jpg');
    let image13 = fs.readFileSync('./protected/front/img/Image_site/Image site/forme4.jpg');
    let image14 = fs.readFileSync('./protected/front/img/Image_site/Image site/fosse-emeraude.jpg');
    let image15 = fs.readFileSync('./protected/front/img/Image_site/Image site/FOSSE-GEORGES-GUYNEMER.jpg');
    let image16 = fs.readFileSync('./protected/front/img/Image_site/Image site/FOSSE-VILLENEUVE-LA-GARENNE.jpg');
    let image17 = fs.readFileSync('./protected/front/img/Image_site/Image site/LA-CROISETTE.jpg');
    let image18 = fs.readFileSync('./protected/front/img/Image_site/Image site/Lac-Bleu.jpg');
    let image19 = fs.readFileSync('./protected/front/img/Image_site/Image site/lille.jpg');
    let image20 = fs.readFileSync('./protected/front/img/Image_site/Image site/nautilus.jpg');
    let image21 = fs.readFileSync('./protected/front/img/Image_site/Image site/nemo33.jpg');
    let image22 = fs.readFileSync('./protected/front/img/Image_site/Image site/PISCINE-DE-SAINT-ANDRE-LEZ-LILLE.jpg');
    let image23 = fs.readFileSync('./protected/front/img/Image_site/Image site/PORTO-SAN-POLO.jpg');
    let image24 = fs.readFileSync('./protected/front/img/Image_site/Image site/ROCHEFONTAINE.jpg');
    let image25 = fs.readFileSync('./protected/front/img/Image_site/Image site/todi.jpg');
    let image26 = fs.readFileSync('./protected/front/img/Image_site/Image site/Vodelee.jpg');
  */  
    
    

    /*
    // Test Insert Image:
    let imageData = fs.readFileSync('./protected/front/img/boat.jpg');
    let tmp_id = 1;
    let sql = 'UPDATE Dive_Site SET Image = ? WHERE Id_Dive_Site = ' + tmp_id;
    db.run(sql, [imageData], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Row was added to the table');
    });*/



    // Test Sortir Image:
    /*let query = `SELECT * FROM Tmp_Image`;
    db.get(query, [], (err, row) => {
        if(err) {
            return console.log(err.message);
        }
        else if(row) {
            let imageData = row.Image;
            let blob = new Blob([imageData], {type: "image/jpeg"});

            let imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(blob);

            let imageContainer = document.getElementById("imageContainer");
            imageContainer.appendChild(imgElement);

            console.log(blob);
        }   
        else {
            console.log("No image found"); 
        }

    });*/
/*
    
    db.run(`CREATE TABLE Dive_Site(
        Id_Dive_Site TEXT NOT NULL,
        Site_Name TEXT NOT NULL,
        Gps_Latitude NUMERIC(11,8),
        Gps_Longitude NUMERIC(11,8),
        Track_Type TEXT,
        Track_Number TEXT,
        Track_Name TEXT,
        Zip_Code TEXT,
        City_Name TEXT,
        Country_Name TEXT NOT NULL,
        Additional_Address TEXT,
        Tel_Number TEXT,
        Information_URL TEXT,
        CONSTRAINT PK_Dive_Site PRIMARY KEY(Id_Dive_Site)
     
          );`, (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Row was deleted from the table');  
    });*/

    
    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });
}

/*********************************************************************/
/*                          CREATE FUNCTIONS                         */
/*********************************************************************/

// create a diver in the database
function createDiverInDB(id_diver, lastname, firstname, diver_qualifications, instructor_qualification, nox_level, additional_qualifications, license_number, license_expiration_date, medical_certificate_expiration_date, birthdate){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Diver(Id_Diver, Lastname, Firstname, Diver_Qualifications, Instructor_Qualification, Nox_Level, Additional_Qualifications, License_Number, License_Expiration_Date, Medical_Certificate_Expiration_Date, Birthdate) 
    VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, [id_diver, lastname, firstname, diver_qualifications, instructor_qualification, nox_level, additional_qualifications, license_number, license_expiration_date, medical_certificate_expiration_date, birthdate], (err) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log('Diver was added to the table');
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });
}

// create a dive site in the database
function createDiveSiteInDB(id_dive_site, site_name, gps_latitude, gps_longitude, track_type, track_number, track_name, zip_code, city_name, country_name, additional_address, tel_number, information_url, image){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Dive_Site(Id_Dive_Site,Site_Name, Gps_Latitude, Gps_Longitude, Track_Type, Track_Number, Track_Name, Zip_Code, City_Name, Country_Name, Additional_Address, Tel_Number, Information_URL, Image )
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, [id_dive_site, site_name, gps_latitude, gps_longitude, track_type, track_number, track_name, zip_code, city_name, country_name, additional_address, tel_number, information_url, image], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Dive site was added to the table');
    });
    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });
}

// create a dive in the database
function createDiveInDB(id_dive, begin_time, begin_date, end_date, end_time, comment, surface_safety, dive_price, instructor_price, max_ppo2, diver_id_diver, planned_dive_id_planned_dive) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Dive(Id_Dive, Begin_Time, Begin_Date, End_Date, End_Time, Comment, Surface_Safety, Dive_Price, Instructor_Price, Max_PPO2, Diver_Id_Diver, Planned_Dive_Id_Planned_Dive)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, [id_dive, begin_time, begin_date, end_date, end_time, comment, surface_safety, dive_price, instructor_price, max_ppo2, diver_id_diver, planned_dive_id_planned_dive], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Dive was added to the table');
    });
    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });
}


// create a dive team in the database
function createDiveTeamInDB(id_dive_team, max_depth, max_duration, actual_depth, actual_duration, dive_type, sequence_number, start_time, stop_time, comment, diver_id_diver, dive_id_dive){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });   
    let sql = `INSERT INTO Dive_team(Id_Dive_Team, Max_Depth, Max_Duration, Actual Depth, Actual_Duration, Dive_Type, Sequence_number, Start_Time, Stop_Time, Comment, Diver_Id_Diver, Dive_Id_Dive)
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, [id_dive_team, max_depth, max_duration, actual_depth, actual_duration, dive_type, sequence_number, start_time, stop_time, comment, diver_id_diver, dive_id_dive], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Dive team was added to the table');
    });
    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });
}

function createEmergencyInDB(sos_number, emergency_plan, post_accident_procedure, version) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });
    let sql = `INSERT INTO Emergency(SOS_Number, Emergency_Plan, Post_Accident_Procedure, Version)
    VALUES(?,?,?,?)`;

    db.run(sql, [sos_number, emergency_plan, post_accident_procedure, version], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Emergency was added to the table');
    });
    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });

    
}

function createPlannedDiveInDB(id_planned_dive, planned_date, planned_time, comment, special_needs, status, diver_dive_price, instructor_dive_price, diver_price, instructor_price, dive_site_id_dive_site) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Planned_Dive(Id_Planned_Dive, Planned_Date, Planned_Time, Comment, Special_Needs, Status, Diver_Dive_Price, Instructor_Dive_Price, Diver_Price, Instructor_Price, Dive_Site_Id_Dive_Site)
    VALUES(?,?,?,?,?,?,?,?,?,?,?)`;

    db.run(sql, [id_planned_dive, planned_date, planned_time, comment, special_needs, status, diver_dive_price, instructor_dive_price, diver_price, instructor_price, dive_site_id_dive_site], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Planned dive was added to the table');
    });
    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });
}



function login(id, first_name, last_name){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    //Check if the user is in the database by id
    let sql = `SELECT * FROM Application_User WHERE Id_Application_User = ?`;
    let userAlreadyExist = false;
    db.get(sql, [id], (err, row) => {
        if(err) {
            return console.log(err.message);
        }
        //console.log(row);
        if(row != undefined){
            userAlreadyExist = true;
        }

        console.log(userAlreadyExist);
        if(userAlreadyExist == false){
            //Create the user in the database
            let sql = `INSERT INTO Application_User(Id_Application_User, Firstname, Lastname)
            VALUES(?,?,?)`;
            db.run(sql, [id, first_name, last_name], (err) => {
                if(err) {
                    return console.log(err.message);
                }
                console.log('BDD : User was added to the table');
            });
        }
        else{
            console.log("BDD : User already exist");
        }

    });
    

    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });

}


/*********************************************************************/
/*                           GET FUNCTIONS                           */
/*********************************************************************/

function getFromDB(callback, info) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });
    
    let sql = `SELECT * FROM ` + info;     
        
    db.all(sql, [], (err, rows) => {
        if (err) { throw err;}

        let tab = [];
        rows.forEach((row) => {
            //console.log(row);
            tab.push(row);
        });
        
        callback(tab);
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Close the database connection.');
    });

}

// export the functions
module.exports = {
    // Connection functions
    openDB,
    closeDB,
    insertInDB, // à la mano

    // Get functions
    getFromDB,

    // Creation functions
    createDiverInDB,
    createDiveSiteInDB,
    createPlannedDiveInDB,
    createDiveInDB,
    createDiveTeamInDB,
    createEmergencyInDB,

    // Login function
    login
}