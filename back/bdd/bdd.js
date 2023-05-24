const sqlite3 = require('sqlite3').verbose();

var db;

// open the database
async function openDB(){
    console.time("Connection to data base");
    try {
        db = await new sqlite3.Database('ScubaDB', (err) => {
            console.log('Connected to the database.');
            // Insert two rows to table "users"
            db.run('INSERT INTO Diver (Lastname, Firstname, Diver_Qualifications, Instructor_Qualification, Nox_Level, Additional_Qualifications, License_Number, License_Expiration_Date, Medical_Certificate_Expiration_Date, Birthdate) VALUES("BOULES-UN-GAY", "David", "5", "5", "3", "None", "954734982", 01/12/2027, 03/11/2024, 23/05/1997)', ['C'], (err) => {
                if(err) {
                    return console.log(err.message); 
                }
                console.log('Row was added to the table: ${this.lastID}');
                });
            });
    }
    catch (err) {
        console.log(err);
    }
    finally {
		console.timeEnd("Connection to data base");
	}
}
// close the database
async function closeDB(){
    console.time("Connection to data base");
    try {
        await db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
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
        console.log('Connected to the database.');
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
        console.log('Close the database connection.');
    });
    
}

// Récupérer toutes les informations de la bdd
function getAllDivers(){
    db = new sqlite3.Database('./back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    let sql = `SELECT * FROM Dive_Site`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
        console.log(row);
        return row;
        });
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    
}

function sizeBDD(){
    db = new sqlite3.Database('./back/bdd/ScubaDB.db', sqlite3.OPEN_READWRITE , (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });

    // Compter le nombre de ligne dans la table Dive_Site
    let sql = `SELECT COUNT(*) FROM Dive_Site`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
        console.log(row);
        return row;
        });
    });    
}

// export the functions
module.exports = {
    openDB,
    closeDB,
    insertInDB,
    getAllDivers,
    sizeBDD
}