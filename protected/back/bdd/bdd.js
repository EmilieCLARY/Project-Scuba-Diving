const sqlite3 = require('sqlite3').verbose();

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
    db = new sqlite3.Database('./back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
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
function createDiveSiteInDB(id_dive_site, site_name, gps_latitude, gps_longitude, track_type, track_number, track_name, zip_code, city_name, country_name, additional_address, tel_number, information_url){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Dive_Site(Id_Dive_Site,Site_Name, Gps_Latitude, Gps_Longitude, Track_Type, Track_Number, Track_Name, Zip_Code, City_Name, Country_Name, Additional_Address, Tel_Number, Information_URL )
    VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, [id_dive_site, site_name, gps_latitude, gps_longitude, track_type, track_number, track_name, zip_code, city_name, country_name, additional_address, tel_number, information_url], (err) => {
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

/*********************************************************************/
/*                           GET FUNCTIONS                           */
/*********************************************************************/

// get all the dive sites from the database and return them in a tab
function getAllDiveSites(callback){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    let sql = `SELECT * FROM Dive_Site`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
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

// get all the divers from the database and return them in a tab
function getAllDivers(callback){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('BDD : Connected to the database.');
    });

    let sql = `SELECT * FROM Diver`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
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
    getAllDiveSites,
    getAllDivers,

    // Creation functions
    createDiverInDB,
    createDiveSiteInDB,
    
}
