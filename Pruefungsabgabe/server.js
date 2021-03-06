"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var P_3_1Server;
(function (P_3_1Server) {
    let log;
    let rezepte;
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    //let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl = "mongodb+srv://Testuser:Testuser@cluster0.ymlqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
        log = mongoClient.db("test").collection("user");
        rezepte = mongoClient.db("test").collection("rezepte");
        console.log("Database connection ", log != undefined);
    }
    //daten werden zur registrierung verglichen und überprüft ob sie sich in der datenbank befinden
    async function vergleichenRegistrieren(_url) {
        let pathSplit = _url.split("?");
        let daten = pathSplit[1].split("&");
        let ntzNutzername = daten[0].split("=");
        let logInArray = await log.find().toArray();
        for (let i = 0; i < logInArray.length; i++) {
            if (ntzNutzername[1] == (logInArray[i].vorname)) {
                JSON.stringify(logInArray);
                return true;
            }
        }
        return false;
    }
    //daten werden zur anmeldung verglichen und überprüft ob der user existiert
    async function vergleichenAnmelden(_url) {
        let pathSplit = _url.split("?");
        let daten = pathSplit[1].split("&");
        let ntzUserName = daten[0].split("=");
        let ntzPasswort = daten[1].split("=");
        let logInArray = await log.find().toArray();
        for (let i = 0; i < logInArray.length; i++) {
            if (ntzUserName[1] == (logInArray[i].nutzername)) {
                if (ntzPasswort[1] == (logInArray[i].passwort)) {
                    JSON.stringify(logInArray);
                    return true;
                }
            }
        }
        return false;
    }
    //hier werden die server antworten geschrieben je nachdem welcher path ausgewählt wird 
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let rezeptArray = await rezepte.find().toArray();
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            //server antwort ob user schon existiert oder nicht
            if (path == "/anmelden") {
                if (await vergleichenAnmelden(url.path) == false) {
                    _response.write("User nicht gefunden überprüfen sie ihre eingabe");
                }
                else {
                    _response.write("User gefunden");
                }
                //serverantwort ob user schon existiert oder nicht
            }
            else if (path == "/registrieren") {
                if (await vergleichenRegistrieren(url.path) == false) {
                    log.insertOne(url.query);
                    _response.write("User erstellt");
                }
                else {
                    _response.write("User existiert schon");
                }
                //rezept wird in die datenbank eingeführt
            }
            else if (path == "/eigenRezeptEinfuegen") {
                rezepte.insertOne(url.query);
                _response.write("Rezept wurde erstellt");
                //alle rezepte werden aus der datenbank zurück geschickt
            }
            else if (path == "/alleRezepte") {
                let jsonString = "";
                jsonString += "[";
                for (let i = 0; i < rezeptArray.length; i++) {
                    jsonString += JSON.stringify(rezeptArray[i]);
                    if (i < rezeptArray.length - 1) {
                        jsonString += ",";
                    }
                }
                jsonString += "]";
                _response.write("Rezept=" + jsonString);
            }
            _response.end();
        }
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=server.js.map