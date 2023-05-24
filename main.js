const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require("path");
const session = require('express-session')({
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});
const sharedsession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const {body, validationResult} = require('express-validator');

const jsonParser = bodyParser.json();
//const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(express.static(path.join(__dirname, "front")));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);

const BDD = require('./back/bdd/bdd.js');

//BDD.insertInDB();
//BDD.getAllDivers();
BDD.sizeBDD();

io.use(
    sharedsession(session, {
        autoSave: true
    })
);

const hostname = 'localhost';
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/html/index.html');
})

app.get('/app', (req, res) => {
    res.sendFile(__dirname + '/front/html/app.html');
})

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/front/html/profile.html');
})
  

app.get('/dive_site', (req, res) => {
    res.sendFile(__dirname + '/front/html/dive_site.html');
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
    console.log('User connected');

    socket.on('getAllDiveSites', () => {
        BDD.getAllDiveSites((tabDiveSites) => {
            socket.emit('receiveAllDiveSites', tabDiveSites);
            console.log("BDD : All dive sites sent to client.");
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(port, () => {
    console.log("Server launched on port " + "http://"+ hostname + ":" + port);
})
