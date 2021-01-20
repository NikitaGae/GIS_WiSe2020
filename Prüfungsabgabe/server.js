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
        log = mongoClient.db("test").collection("Twitter");
        console.log("Database connection ", log != undefined);
    }
    //function zum vergleichen der eingegeben daten
    async function vergleichen(_url) {
        console.log("vergleichen");
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
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    //hier werden die server antworten geschrieben je nachdem auf welcher html seite wir uns befinden
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let logInArray = await log.find().toArray();
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            if (path == "/login") {
                if (await vergleichen(url.path) == false) {
                    console.log("test");
                    _response.write("User nicht gefunden überprüfen sie ihre eingabe");
                }
                else {
                    _response.write("User gefunden");
                    window.open("hauptseite.html");
                }
            }
            else if (path == "/registrieren") {
                if (await vergleichen(url.path) == false) {
                    log.insertOne(url.query);
                    _response.write("User erstellt");
                    window.open("hauptseite.html");
                }
                else {
                    _response.write("User existiert schon");
                }
            }
            else if (path == "/nutzer") {
                let logInArrayJSON = JSON.stringify(logInArray);
                _response.write(logInArrayJSON);
            }
            _response.end();
        }
    }
})(PruefungsabgabeServer = exports.PruefungsabgabeServer || (exports.PruefungsabgabeServer = {}));
//# sourceMappingURL=server.js.map