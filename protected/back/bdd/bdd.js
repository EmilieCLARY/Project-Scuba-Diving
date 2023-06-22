const sqlite3 = require('sqlite3').verbose();

var db;

/*********************************************************************/
/*                          CREATE FUNCTIONS                         */
/*********************************************************************/

// create a diver in the database
function createDiverInDB(id_diver, lastname, firstname, diver_qualifications, instructor_qualification, nox_level, additional_qualifications, license_number, license_expiration_date, medical_certificate_expiration_date, birthdate){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Diver(Id_Diver, Lastname, Firstname, Diver_Qualifications, Instructor_Qualification, Nox_Level, Additional_Qualifications, License_Number, License_Expiration_Date, Medical_Certificate_Expiration_Date, Birthdate) 
    VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
    db.run(sql, [id_diver, firstname, lastname, diver_qualifications, instructor_qualification, nox_level, additional_qualifications, license_number, license_expiration_date, medical_certificate_expiration_date, birthdate], (err) => {
        if(err) {
            return console.log(err.message); 
        }
        console.log('Diver was added to the table');
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });
}

// create a dive site in the database
function createDiveSiteInDB(id_dive_site, site_name, gps_latitude, gps_longitude, track_type, track_number, track_name, zip_code, city_name, country_name, additional_address, tel_number, information_url, image){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
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
        //console.log('BDD : Close the database connection.');
    });
}

// create a dive in the database
function createDiveInDB(id_dive, begin_time, begin_date, end_date, end_time, comment, surface_safety, dive_price, instructor_price, max_ppo2, diver_id_diver, planned_dive_id_planned_dive) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Dive(Id_Dive, Begin_Time, Begin_Date, End_Date, End_Time, Comment, Surface_Security, Dive_Price, Instructor_Price, Max_Ppo2, Diver_Id_Diver, Planned_Dive_Id_Planned_Dive)
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
        //console.log('BDD : Close the database connection.');
    });
}


// create a dive team in the database
function createDiveTeamInDB(id_dive_team, max_depth, max_duration, actual_depth, actual_duration, dive_type, sequence_number, start_time, stop_time, comment, diver_id_diver, dive_id_dive){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });   
    let sql = `INSERT INTO Dive_team(Id_Dive_Team, Max_Depth, Max_Duration, Real_Depth, Real_Duration, Dive_Type, Sequence_number, Start_Time, Stop_Time, Comment, Diver_Guide_Id_Diver, Dive_Id_Dive)
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
        //console.log('BDD : Close the database connection.');
    });
}

function createEmergencyInDB(sos_number, emergency_plan, post_accident_procedure, version) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
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
        //console.log('BDD : Close the database connection.');
    });

}

function createPlannedDiveInDB(id_planned_dive, planned_date, planned_time, comment, special_needs, status, diver_price, instructor_price, dive_site_id_dive_site) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Planned_Dive(Id_Planned_Dive, Planned_Date, Planned_Time, Comments, Special_Needs, Status, Diver_Price, Instructor_Price, Dive_Site_Id_Dive_Site)
    VALUES(?,?,?,?,?,?,?,?,?)`;

    db.run(sql, [id_planned_dive, planned_date, planned_time, comment, special_needs, status, diver_price, instructor_price, dive_site_id_dive_site], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Planned dive was added to the table');
    });
    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });
}

function createDiverRegistrationInDB(id_diver, id_planned_dive, diver_role, resgistration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Dive_Registration(Diver_Id_Diver, Planned_Dive_Id_Planned_Dive, Diver_Role, Resgistration_Timestamp, Personal_Comment, Car_Pooling_Seat_Offered, Car_Pooling_Seat_Request)
    VALUES(?,?,?,?,?,?,?)`;

    db.run(sql, [id_diver, id_planned_dive, diver_role, resgistration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Diver registration was added to the table');
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });
}

function createDiveTeamMemberInDB(idDiver, id_dive_team, qualificationTempNombre, qualification, role, instructor_qualification, pourcentageNox, comment, montantPaye) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `INSERT INTO Dive_Team_Member(Diver_Id_Diver, Dive_team_Id_Dive_Team, Temporary_Diver_Qualification, Current_Diver_Qualification, Diver_Role, Current_Instructorr_Qualification, Nox_Percentage, Comment, Paid_Amount)
    VALUES(?,?,?,?,?,?,?,?,?)`;

    db.run(sql, [idDiver, id_dive_team, qualificationTempNombre, qualification, role, instructor_qualification, pourcentageNox, comment, montantPaye], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('Dive team member was added to the table');
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });

}

/*********************************************************************/
/*                           LOGIN FUNCTION                          */
/*********************************************************************/

function login(id, first_name, last_name, callback){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
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

        //console.log(userAlreadyExist);
        //If the user is not in the database, create it
        if(userAlreadyExist == false){
            //Create the user in the database
            let sql = `INSERT INTO Application_User(Id_Application_User, Firstname, Lastname)
            VALUES(?,?,?)`;
            db.run(sql, [id, first_name, last_name], (err) => {
                if(err) {
                    return console.log(err.message);
                }
                console.log('BDD : User was added to the table');
                callback(0);
            });
        }
        else{
            //The user is already in the database
            //Check if the user is admin
            let sql = `SELECT isAdmin FROM Application_User WHERE Id_Application_User = ?`;
            db.get(sql, [id], (err, row) => {
                if(err) {
                    return console.log(err.message);
                }
                if(row.isAdmin == 1){
                    callback(1);
                }
                else{
                    callback(0);
                }
            });
            console.log("BDD : User already exist");
        }

    });
    
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
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
        //console.log('BDD : Connected to the database.');
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
        //console.log('BDD : Close the database connection.');
    });

}

// Get the user profile from the database with the id
function getUserProfile(id, callback) {
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });
    let sql = `SELECT Diver.Id_Diver, Diver.Lastname, Diver.Firstname, Diver.Diver_Qualifications, Diver.Instructor_Qualification, Diver.Instructor_Qualification, Diver.Nox_Level, Diver.Additional_Qualifications, Diver.License_Number, Diver.License_Expiration_Date, Diver.Medical_Certificate_Expiration_Date, Diver.Birthdate FROM Diver, Application_User 
    WHERE Application_User.Id_Application_User = ?
    AND Diver.Id_Diver = Application_User.Id_Diver`;

    db.get(sql, [id], (err, row) => {
        if(err) {
            return console.log(err.message);
        }
        //console.log(row);
        callback(row);
    });


    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });
}

/*********************************************************************/
/*                          EDIT FUNCTIONS                           */
/*********************************************************************/

function updateDb(table, column, value, id){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `UPDATE ` + table + ` SET ` + column + ` = ? WHERE Id_` + table + ` = ?`;
    db.run(sql, [value, id], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('BDD : ' + table + ' was updated');
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });
}

function deleteRowInDb(table, id){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `DELETE FROM ` + table + ` WHERE Id_` + table + ` = ?`;
    db.run(sql, [id], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('BDD : ' + table + id + ' was deleted');
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });
}

function deleteAllDiveTeamAndDiveTeamMemberOfDiveInDb(id_dive, id_dive_team_table){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `DELETE FROM Dive_Team_Member WHERE Dive_team_Id_Dive_Team IN (` + id_dive_team_table[0];
    for(let i = 1; i < id_dive_team_table.length; i++){
        sql += `, ` + id_dive_team_table[i];
        if(i == id_dive_team_table.length - 1){
            sql += `)`;
        }
    }    

    //console.log(sql);
    
    db.run(sql, [],(err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('BDD : Dive team members was deleted');
    });

    sql = `DELETE FROM Dive_team WHERE Dive_Id_Dive = ?`;

    db.run(sql, [id_dive], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('BDD : Dive teams was deleted');
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });
}

function deleteDiveRegistrationInDB(id_diver, id_planned_dive){
    db = new sqlite3.Database('./protected/back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Connected to the database.');
    });

    let sql = `DELETE FROM Dive_Registration WHERE Diver_Id_Diver = ? AND Planned_Dive_Id_Planned_Dive = ?`;
    db.run(sql, [id_diver, id_planned_dive], (err) => {
        if(err) {
            return console.log(err.message);
        }
        console.log('BDD : Dive registration of diver '+ id_diver +' was deleted');
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('BDD : Close the database connection.');
    });
}

// export the functions
module.exports = {
    // Get functions
    getFromDB,
    getUserProfile,

    // Edit functions
    updateDb,
    deleteRowInDb,
    deleteDiveRegistrationInDB,
    deleteAllDiveTeamAndDiveTeamMemberOfDiveInDb,

    // Creation functions
    createDiverInDB,
    createDiveSiteInDB,
    createPlannedDiveInDB,
    createDiveInDB,
    createDiveTeamInDB,
    createEmergencyInDB,
    createDiverRegistrationInDB,
    createDiveTeamMemberInDB,

    // Login function
    login
}