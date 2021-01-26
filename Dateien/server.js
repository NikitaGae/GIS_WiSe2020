"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const Http = require("http");
const querystring = require("querystring");
const Mongo = require("mongodb");
var Server;
(function (Server) {
    let daten;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let databaseUrl = "mongodb+srv://test-user:hhtkDpO0wsSZ4V4Q@giswise2020.wgtcu.mongodb.net/Daten?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server auf: " + _port);
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        daten = mongoClient.db("Prüfungsabgabe").collection("Daten");
        console.log("Database connection ", daten != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        if (_request.method == "GET") {
            let body = "";
            body = body;
            _request.on("data", data => {
                body += data;
            });
            _request.on("end", async () => {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(body = await retrieveAll()); //Rückgabe von kompletter Datenbank zur Seitengenerierung
                _response.end();
            });
        }
        if (_request.method == "POST") {
            let body = "";
            _request.on("data", data => {
                body += data.toString();
            });
            _request.on("end", async () => {
                let daten = querystring.parse(body);
                let datenobjekt = JSON.parse(JSON.stringify(daten));
                if (datenobjekt._id[0] == "user") { //Reservierung
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    _response.write(await reserveById(datenobjekt));
                    _response.end();
                }
                if (datenobjekt._id[0] == "ausgeliehen") { //Auf ausgeliehen setzen
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    await setAusgeliehen(datenobjekt);
                    _response.end();
                }
                if (datenobjekt._id[0] == "frei") { //Auf frei setzen
                    _response.setHeader("content-type", "text/html; charset=utf-8");
                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    await setFrei(datenobjekt);
                    _response.end();
                }
            });
        }
        async function retrieveAll() {
            let alleDaten = await daten.find().toArray();
            let alleDatenString = JSON.stringify(alleDaten);
            return alleDatenString;
        }
        async function reserveById(_Daten) {
            for (let x = 1; x < _Daten._id.length; x++) {
                await daten.findOneAndUpdate({ _id: new Mongo.ObjectId(_Daten._id[x]) }, { $set: { "status": "reserviert" } });
                await daten.findOneAndUpdate({ _id: new Mongo.ObjectId(_Daten._id[x]) }, { $set: { "ausleihname": _Daten.Name } });
                await daten.findOneAndUpdate({ _id: new Mongo.ObjectId(_Daten._id[x]) }, { $set: { "ausleihemail": _Daten.Email } });
            }
            return "Erfolg";
        }
        async function setAusgeliehen(_Daten) {
            let x = 1;
            await daten.findOneAndUpdate({ _id: new Mongo.ObjectId(_Daten._id[x]) }, { $set: { "status": "ausgeliehen" } });
        }
        async function setFrei(_Daten) {
            let x = 1;
            await daten.findOneAndUpdate({ _id: new Mongo.ObjectId(_Daten._id[x]) }, { $set: { "status": "frei" } });
            await daten.findOneAndUpdate({ _id: new Mongo.ObjectId(_Daten._id[x]) }, { $set: { "ausleihname": "" } });
            await daten.findOneAndUpdate({ _id: new Mongo.ObjectId(_Daten._id[x]) }, { $set: { "ausleihemail": "" } });
        }
    }
})(Server = exports.Server || (exports.Server = {}));
//# sourceMappingURL=server.js.map