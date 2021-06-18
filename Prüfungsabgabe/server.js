"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PruefungsabgabeServer = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var PruefungsabgabeServer;
(function (PruefungsabgabeServer) {
    let log;
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let databaseUrl = "mongodb://localhost:27017";
    //let databaseUrl: string = "mongodb+srv://Testuser:Testuser@nikita-gis-ist-geil.gl0tb.mongodb.net/Nikita-GIS-IST-GEIL?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        console.log("Server starting on port:" + _port);
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
        function handleListen() {
            console.log("Listening");
        }
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        log = mongoClient.db("Prüfungsabgabe").collection("Snapchat");
        console.log("Database connection ", log != undefined);
    }
    //function zum vergleichen der eingegeben daten beim einloggen also nur das Passwort und der Name
    async function anmeldenVergleichen(_url) {
        let pathSplit = _url.split("?");
        let daten = pathSplit[1].split("&");
        let ntzName = daten[0].split("=");
        let ntzPasswort = daten[1].split("=");
        let logInArray = await log.find().toArray();
        for (let i = 0; i < logInArray.length; i++) {
            if (ntzName[1] == (logInArray[i].vorname)) {
                if (ntzPasswort[1] == (logInArray[i].passwort)) {
                    JSON.stringify(logInArray);
                    return logInArray[i];
                }
            }
        }
        return null;
    }
    //Hier sollen alle eingegeben sachen Verglichen werden mit der Datenbank und es wird geprüft ob es den Nutzer schon gibt
    async function registrierenVergleichen(_url) {
        let pathSplit = _url.split("?");
        let daten = pathSplit[1].split("&");
        let ntzName = daten[0].split("=");
        let ntzFirstname = daten[1].split("=");
        let ntzStudiengang = daten[2].split("=");
        let ntzSemesterangabe = daten[3].split("=");
        let logInArray = await log.find().toArray();
        for (let i = 0; i < logInArray.length; i++) {
            if (ntzName[1] == (logInArray[i].vorname)) {
                if (ntzFirstname[1] == (logInArray[i].nachname)) {
                    if (ntzStudiengang[1] == logInArray[i].studiengang) {
                        if (ntzSemesterangabe[1] == logInArray[i].semesterangabe) {
                            JSON.stringify(logInArray);
                            return logInArray[i];
                        }
                    }
                }
            }
        }
        return null;
    }
    //hier werden die server antworten geschrieben je nachdem auf welcher html seite wir uns befindendazu sollen noch daten mitgegeben werden wie z.B
    //für das Profil die eingegeben sachen oder für den Nutzer alle NUtzer die existieren
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            let user;
            if (path == "/anmelden") {
                user = await anmeldenVergleichen(url.path);
                if (user == null) {
                    _response.write("User nicht gefunden überprüfen sie ihre eingabe$");
                }
                else {
                    let message2 = url.query;
                    log.findOneAndUpdate({ _id: new Mongo.ObjectId(message2.id) }, { $push: { beitraege: message2.subject } });
                    let allMsg = await log.find().toArray();
                    let nachricht = [];
                    console.log(allMsg);
                    if (allMsg != null) {
                        for (let i = allMsg.length - 1; i >= 0; i--) {
                            for (let j = allMsg[i].beitraege.length - 1; j >= 0; j--) {
                                nachricht.push(allMsg[i].beitraege[j] + "</br>");
                            }
                        }
                    }
                    _response.write("User$" + "Nachname: " + user.nachname + " " + "Vorname: " + user.vorname + "," + " " + "Studiengang: " + user.studiengang + " " + "Semester: " + user.semesterangabe + "$</br>" + "Daten$" + JSON.stringify(nachricht));
                }
            }
            else if (path == "/registrieren") {
                user = await registrierenVergleichen(url.path);
                if (user == null) {
                    log.insertOne(url.query);
                    _response.write("Erstellt$");
                }
                else {
                    _response.write("Existiert$");
                }
            }
            else if (path == "/nutzer") {
                let allUser = await log.find().toArray();
                let jsonString = "";
                jsonString += "[";
                for (let i = 0; i < allUser.length; i++) {
                    jsonString += JSON.stringify(allUser[i]);
                    if (i < allUser.length - 1) {
                        jsonString += ",";
                    }
                }
                jsonString += "]";
                _response.write("Nutzer$" + jsonString);
            }
            else if (path == "/profil") {
                _response.write("Profil$" + "Nachname: " + user.nachname + " " + "Vorname: " + user.vorname + "," + " " + "Studiengang: " + user.studiengang + " " + "Semester: " + user.semesterangabe + "</br>");
            }
            else if (path == "/hauptseite") {
                let message = url.query;
                log.findOneAndUpdate({ _id: new Mongo.ObjectId(message.id) }, { $push: { beitraege: message.subject } });
                _response.write("Nachricht$" + message.subject);
            }
            _response.end();
        }
    }
})(PruefungsabgabeServer = exports.PruefungsabgabeServer || (exports.PruefungsabgabeServer = {}));
//# sourceMappingURL=server.js.map