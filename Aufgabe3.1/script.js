"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
//mongodb+srv://<Testuser>:<Testuser>@nikita-gis-ist-geil.gl0tb.mongodb.net/<dbname>?retryWrites=true&w=majority
//https://mongodbnetbrowser.herokuapp.com/?u=Testuser&p=Testuser&a=nikita-gis-ist-geil.gl0tb.mongodb.net&n=test&c=Students
var P_3_1Server;
(function (P_3_1Server) {
    let log;
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    //let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl = "mongodb+srv://<Testuser>:<Testuser>@nikita-gis-ist-geil.gl0tb.mongodb.net/<dbname>?retryWrites=true&w=majority";
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
        log = mongoClient.db("test").collection("Students");
        console.log("Database connection ", log != undefined);
    }
    async function vergleichen(_url) {
        let pathSplit = _url.split("?");
        let daten = pathSplit[1].split("&");
        let ntzName = daten[0].split("=");
        let ntzFirstname = daten[1].split("=");
        let ntzRegistration = daten[2].split("=");
        let logInArray = await log.find().toArray();
        for (let i = 0; i < logInArray.length; i++) {
            if (ntzName[1] == (logInArray[i].name)) {
                if (ntzFirstname[1] == (logInArray[i].firstname)) {
                    if (ntzRegistration[1] == logInArray[i].registration) {
                        JSON.stringify(logInArray);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            if (path == "/login") {
                if (await vergleichen(url.path) == false) {
                    _response.write("User nicht gefunden überprüfen sie ihre eingabe");
                }
                else {
                    _response.write("User gefunden");
                }
            }
            else if (path == "/registrieren") {
                if (await vergleichen(url.path) == false) {
                    log.insertOne(url.query);
                    _response.write("User erstellt");
                }
                else {
                    _response.write("User existiert schon");
                }
            }
            else if (path == "/nutzer") {
                let logInArray = await log.find().toArray();
                let logInArrayJSON = JSON.stringify(logInArray);
                _response.write(logInArrayJSON);
            }
        }
        _response.end();
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=script.js.map