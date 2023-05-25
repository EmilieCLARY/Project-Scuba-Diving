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


io.use(
    sharedsession(session, {
        autoSave: true
    })
);

const hostname = 'localhost';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/index.html');
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
    res.sendFile(__dirname + '/protected/front/html/diver.html');
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

    socket.on('getAllDiveSites', () => {
        BDD.getFromDB((tabDiveSites) => {
            socket.emit('receiveAllDiveSites', tabDiveSites);
            console.log("BDD : All dive sites sent to client.");
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

    socket.on('addDiver', (id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date) => {
        BDD.createDiverInDB(id,first_name,last_name,diver_qualification,instructor_qualification,nox_level,additionnal_qualification,licence_number,licence_expiration_date,medical_certificate_expiration_date,birth_date);
    });

    socket.on('disconnect', () => {
        console.log('SOCKET : User disconnected');
    });
});

http.listen(port, () => {
    console.log("Server launched on port " + "http://"+ hostname + ":" + port);
})