const express = require("express");
const app = express()
const http = require('http').Server(app);
const path = require("path");
const io = require('socket.io')(http);
const session = require("express-session")({
	secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
	resave: true,
	saveUninitialized: true,
	proxy: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});

const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator');

const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(session);
const passport = require("passport");
const appID = require("ibmcloud-appid");

const WebAppStrategy = appID.WebAppStrategy;

const CALLBACK_URL = "/ibm/cloud/appid/callback";
const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(passport.session());

let webAppStrategy = new WebAppStrategy(getAppIDConfig());
passport.use(webAppStrategy);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, { failureRedirect: '/error', session: false }));
app.use("/protected", passport.authenticate(WebAppStrategy.STRATEGY_NAME, { session: false }));
app.use(express.static("public"));
app.use('/protected', express.static("protected"));
app.get("/logout", (req, res) => {
	//Note: if you enabled SSO for Cloud Directory be sure to use webAppStrategy.logoutSSO instead.
	WebAppStrategy.logout(req);
	res.redirect("/");
});

app.get("/protected/api/idPayload", (req, res) => {
	res.send(req.session[WebAppStrategy.AUTH_CONTEXT].identityTokenPayload);
});

app.get('/error', (req, res) => {
	res.send('Authentication Error');
});

function getAppIDConfig() {
	let config;

	try {
		// if running locally we'll have the local config file
		config = require('./localdev-config.json');
	} catch (e) {
		if (process.env.APPID_SERVICE_BINDING) { // if running on Kubernetes this env variable would be defined
			config = JSON.parse(process.env.APPID_SERVICE_BINDING);
			config.redirectUri = process.env.redirectUri;
		} else { // running on CF
			let vcapApplication = JSON.parse(process.env["VCAP_APPLICATION"]);
			return { "redirectUri": "https://" + vcapApplication["application_uris"][0] + CALLBACK_URL };
		}
	}
	return config;
}




const BDD = require('./protected/back/bdd/bdd.js');

//BDD.insertInDB();
//BDD.getAllDivers();
//BDD.sizeBDD();
//let tmp;
//BDD.updateDb(tmp, "Application_User", "isAdmin", 1, "6f62d1c4-2522-44d6-a1f4-4e84d21800d7")


io.use(
    sharedsession(session, {
        autoSave: true
    })
);

const hostname = 'localhost';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/index.html');
})

app.get('/login', (req, res) => {
    res.redirect('/');
})

app.get('/protected', (req, res) => {
    res.sendFile(__dirname + '/protected/protected.html');
})

app.get('/app', (req, res) => {
    res.sendFile(__dirname + '/protected/front/html/app.html');
})

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/protected/front/html/profile.html');
})

app.get('/dive_site', (req, res) => {
    res.sendFile(__dirname + '/protected/front/html/dive_site.html');
})

app.get('/diver', (req, res) => {
    if(req.session.isAdmin === 1){
        res.sendFile(__dirname + '/protected/front/html/diver.html');
    }
    else{
        res.redirect('/')
    }
})

app.get('/planned_dive', (req, res) => {
    res.sendFile(__dirname + '/protected/front/html/planned_dive.html');
})

app.get('/app_user', (req, res) => {
    if(req.session.isAdmin === 1){
        res.sendFile(__dirname + '/protected/front/html/app_user.html');
    }
    else{
        res.redirect('/')
    }
})

app.get('/dive', (req, res) => {
    if(req.session.isAdmin === 1){
        res.sendFile(__dirname + '/protected/front/html/dive.html');
    }
    else if(req.session.idPlannedDive == req.session.isAdminForDiveId){
        res.sendFile(__dirname + '/protected/front/html/dive.html');
    }
    else{
        res.redirect('/')
    }
})

app.get('/security_pdf', (req, res) => {
    if(req.session.isAdmin === 1){
        res.sendFile(__dirname + '/protected/front/html/security_pdf.html');
    }
    else{
        res.redirect('/')
    }
})

app.get('/admin', (req, res) => {
    if(req.session.loggedIn === true){
        res.sendFile(__dirname + '/front/html/admin.html')
    }
    else{
        res.redirect('/')
    }
})


/* -------------------------------------------------------------------------- */
/*                                   SOCKET                                   */
/* -------------------------------------------------------------------------- */
io.on('connection', (socket) =>{
    console.log('SOCKET : User connected');

    socket.on('userLogin', (id, first_name, last_name)=>{
        socket.handshake.session.loggedIn = true;
        socket.handshake.session.first_name = first_name;
        socket.handshake.session.last_name = last_name;
        socket.handshake.session.idUser = id;
        
        console.log("SOCKET : " + first_name + " " + last_name+ " logged in.");
        BDD.login(id, first_name, last_name, (isAdmin) => {
            socket.handshake.session.isAdmin = isAdmin; //isAdmin = 1 if admin, 0 if not
            socket.handshake.session.save();
            socket.emit('loginSuccess', isAdmin);
            //console.log(socket.handshake.session.isAdmin + "-----" + socket.handshake.session.idUser);
        });
    });

    /* ----------------------------- GET FUNCTIONS ----------------------------- */

    socket.on('getAllDiveSites', () => {
        BDD.getFromDB((tabDiveSites) => {
            socket.emit('receiveAllDiveSites', tabDiveSites);
            console.log("BDD : All dive sites sent to "+ socket.handshake.session.first_name+ " "+ socket.handshake.session.last_name);
        }, "Dive_Site");
    });

    socket.on('getAllDivers', () => {
        BDD.getFromDB((tabDivers) => {
            socket.emit('receiveAllDivers', tabDivers);
            console.log("BDD : All divers sent to client.");
        }, "Diver");
    });

    socket.on('getAllDives', () => {
        BDD.getFromDB((tabDives) => {
            socket.emit('receiveAllDives', tabDives);
            console.log("BDD : All dives sent to client.");
        }, "Dive");
    });

    socket.on('getAllDiveTeams', () => {
        BDD.getFromDB((tabDiveTeams) => {
            socket.emit('receiveAllDiveTeams', tabDiveTeams);
            console.log("BDD : All dive teams sent to client.");
        }, "Dive_Team");
    });

    socket.on('getAllDiveTeamMembers', () => {
        BDD.getFromDB((tabDiveTeamMembers) => {
            socket.emit('receiveAllDiveTeamMembers', tabDiveTeamMembers);
            console.log("BDD : All dive team members sent to client.");
        }, "Dive_Team_Member");
    });

    socket.on('getAllEmergencies', () => {
        BDD.getFromDB((tabEmergencies) => {
            socket.emit('receiveAllEmergencies', tabEmergencies);
            console.log("BDD : All emergencies sent to client.");
        }, "Emergency");
    });

    socket.on('getAllPlannedDives', () => {
        BDD.getFromDB((tabPlannedDives) => {
            socket.emit('receiveAllPlannedDives', tabPlannedDives);
            console.log("BDD : All planned dives sent to client.");
        }, "Planned_Dive");
    });

    socket.on("getAllDiveRegistrations", () => {
        BDD.getFromDB((tabDiveRegistrations) => {
            socket.emit('receiveAllDiveRegistrations', tabDiveRegistrations);
            console.log("BDD : All dive registrations sent to client.");
        }, "Dive_Registration");
    });

    socket.on('getMaxDepthForQualification', () => {
        BDD.getFromDB((maxDepth) => {
            socket.emit('receiveMaxDepthForQualification', maxDepth);
            console.log("BDD : Max depth for qualification sent to client.");
        }, "Max_Depth_For_Qualification");
    });

    socket.on('getUserProfile', () => {
        BDD.getUserProfile(socket.handshake.session.idUser, (userProfile) => {
            socket.emit('receiveUserProfile', userProfile);
            console.log("BDD : User profile sent to client.");
        });
    });

    socket.on('getAllAppUsers', () => {
        BDD.getFromDB((tabAppUsers) => {
            socket.emit('receiveAllAppUsers', tabAppUsers);
            console.log("BDD : All app users sent to client.");
        }, "Application_User");
    });

    socket.on('getIsAdmin', () => {
        socket.emit('receiveIsAdmin', socket.handshake.session.isAdmin);
    });

    socket.on('getIdPlannedDive', () => {
        socket.emit('receiveIdPlannedDive', socket.handshake.session.idPlannedDive);
    });

    socket.on('setIsAdminForDiveId', (id) => {
        socket.handshake.session.isAdminForDiveId = id;
    });

    socket.on('actualizeBDD', (id, currentPage) => {
        console.log("BDD : Actualizing BDD.");
        socket.broadcast.emit('updatePage', id, currentPage);
    });
    /* ------------------------------ ADD FUNCTIONS ----------------------------- */

    socket.on('addDiver', (id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date) => {
        BDD.createDiverInDB(id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);
    });

    socket.on('addDiveSite', (id,name,latitude,longitude,track_type,track_number,track_name,zip_code,city,coutntry,aditionnal_info,telephone,url,image) => {
        BDD.createDiveSiteInDB(id,name,latitude,longitude,track_type,track_number,track_name,zip_code,city,coutntry,aditionnal_info,telephone,url,image);
    });

    socket.on('addPlannedDive', (id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site) => {
        BDD.createPlannedDiveInDB(id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site);
    });

    socket.on('addDiverRegistration', (id_planned_dive, diver_role, registration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request) => {
        BDD.getUserProfile(socket.handshake.session.idUser, (userProfile) => {
            let id_diver = userProfile.Id_Diver;
            console.log("id_diver : " + id_diver);
            BDD.createDiverRegistrationInDB(id_diver, id_planned_dive, diver_role, registration_timestamp, personal_comment, car_pooling_seat_offered, car_pooling_seat_request);
        });       
    });

    socket.on('addDive', (id, planned_time, planned_date, real_date, stop_time, comment, temp, prix_plongeur, prix_instructeur, temp2, directeurPlongée, plannedDiveID) => {
        BDD.createDiveInDB(id, planned_time, planned_date, real_date, stop_time, comment, temp, prix_plongeur, prix_instructeur, temp2, directeurPlongée, plannedDiveID);
    });

    socket.on('addDiveTeam', (id, minGuidedDepth, maxduration, temp, temp2, dive_type, sequence_number, planned_time, endTime, commentaireInput, guide_id, dive_id) => {
        BDD.createDiveTeamInDB(id, minGuidedDepth, maxduration, temp, temp2, dive_type, sequence_number, planned_time, endTime, commentaireInput, guide_id, dive_id);
    });

    socket.on('addDiveTeamMember', (idDiver, id_dive_team, qualificationTempNombre, qualification, role, instructor_qualification, pourcentageNox, comment, montantPaye) => { 
        BDD.createDiveTeamMemberInDB(idDiver, id_dive_team, qualificationTempNombre, qualification, role, instructor_qualification, pourcentageNox, comment, montantPaye);
    });


    socket.on('disconnect', () => {
        console.log('SOCKET : User disconnected');
    });

    /* ------------------------------ UPDATE FUNCTIONS ----------------------------- */

    socket.on('deleteInDb', (table, id) => {
        BDD.deleteRowInDb(table, id);
    });

    socket.on('deleteDiveRegistrationInDb', (id_diver, id_planned_dive) => {
        BDD.deleteDiveRegistrationInDB(id_diver, id_planned_dive);
    });

    socket.on('modifyDiver', (id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date) => {
        BDD.updateDb("Diver", "Lastname", last_name, id);
        BDD.updateDb("Diver", "Firstname", first_name, id);
        BDD.updateDb("Diver", "Diver_Qualifications", diver_qualification, id);
        BDD.updateDb("Diver", "Instructor_Qualification", instructor_qualification, id);
        BDD.updateDb("Diver", "Nox_Level", nox_level, id);
        BDD.updateDb("Diver", "Additional_Qualifications", additionnal_qualification, id);
        BDD.updateDb("Diver", "License_Number", licence_number, id);
        BDD.updateDb("Diver", "License_Expiration_Date", licence_expiration_date, id);
        BDD.updateDb("Diver", "Medical_Certificate_Expiration_Date", medical_certificate_expiration_date, id);
        BDD.updateDb("Diver", "Birthdate", birth_date, id);
    });

    socket.on('modifyDiveSite', (id,name,latitude,longitude,track_type,track_number,track_name,zip_code,city,coutntry,aditionnal_info,telephone,url,image) => {
        BDD.updateDb("Dive_Site", "Site_Name", name, id);
        BDD.updateDb("Dive_Site", "Gps_Latitude", latitude, id);
        BDD.updateDb("Dive_Site", "Gps_Longitude", longitude, id);
        BDD.updateDb("Dive_Site", "Track_Type", track_type, id);
        BDD.updateDb("Dive_Site", "Track_Number", track_number, id);
        BDD.updateDb("Dive_Site", "Track_Name", track_name, id);
        BDD.updateDb("Dive_Site", "Zip_Code", zip_code, id);
        BDD.updateDb("Dive_Site", "City_Name", city, id);
        BDD.updateDb("Dive_Site", "Country_Name", coutntry, id);
        BDD.updateDb("Dive_Site", "Additional_Address", aditionnal_info, id);
        BDD.updateDb("Dive_Site", "Tel_Number", telephone, id);
        BDD.updateDb("Dive_Site", "Information_URL", url, id);
        if(image != null){
            BDD.updateDb("Dive_Site", "Image", image, id);
        }
    });
    
    socket.on('modifyAppUser', (id, id_diver, isAdmin) => {
        BDD.updateDb("Application_User", "Id_Diver", id_diver, id);
        BDD.updateDb("Application_User", "isAdmin", isAdmin, id);
    });

    socket.on('modifyPlannedDive', (id, planned_date, planned_time, comments, special_needs, statut, diver_dive_price, instructor_dive_price, id_dive_site) => {
        BDD.updateDb("Planned_Dive", "Planned_Date", planned_date, id);
        BDD.updateDb("Planned_Dive", "Planned_Time", planned_time, id);
        BDD.updateDb("Planned_Dive", "Comments", comments, id);
        BDD.updateDb("Planned_Dive", "Special_Needs", special_needs, id);
        BDD.updateDb("Planned_Dive", "Status", statut, id);
        BDD.updateDb("Planned_Dive", "Diver_Price", diver_dive_price, id);
        BDD.updateDb("Planned_Dive", "Instructor_Price", instructor_dive_price, id);
        BDD.updateDb("Planned_Dive", "Dive_Site_Id_Dive_Site", id_dive_site, id);
    });

    socket.on('modifyDive', (Id_Dive, Begin_Time, Begin_Date, End_Date, End_Time, Comment, Surface_Security, Diver_Price, Instructor_Price, Max_Ppo2, Diver_Id_Diver, Planned_Dive_Id_Planned_Dive)=> {
        BDD.updateDb("Dive", "Begin_Time", Begin_Time, Id_Dive);
        BDD.updateDb("Dive", "Begin_Date", Begin_Date, Id_Dive);
        BDD.updateDb("Dive", "End_Date", End_Date, Id_Dive);
        BDD.updateDb("Dive", "End_Time", End_Time, Id_Dive);
        BDD.updateDb("Dive", "Comment", Comment, Id_Dive);
        BDD.updateDb("Dive", "Surface_Security", Surface_Security, Id_Dive);
        BDD.updateDb("Dive", "Dive_Price", Diver_Price, Id_Dive);
        BDD.updateDb("Dive", "Instructor_Price", Instructor_Price, Id_Dive);
        BDD.updateDb("Dive", "Max_Ppo2", Max_Ppo2, Id_Dive);
        BDD.updateDb("Dive", "Diver_Id_Diver", Diver_Id_Diver, Id_Dive);
    });

    socket.on('deleteDiveTeamsInfos' , (id_dive, id_dive_team_table) => {
        BDD.deleteAllDiveTeamAndDiveTeamMemberOfDiveInDb(id_dive, id_dive_team_table);
    });

    /* ------------------------------ OTHER FUNCTIONS ----------------------------- */
    
    socket.on('setPlannedDive', (id_planned_dive) => {
        socket.handshake.session.idPlannedDive = id_planned_dive;
        socket.handshake.session.save();
    });

});

http.listen(port, () => {
    console.log("Server launched on port " + "http://"+ hostname + ":" + port);
})