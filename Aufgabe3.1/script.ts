import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

//https://mongodbnetbrowser.herokuapp.com/?u=Testuser&p=Testuser&a=nikita-gis-ist-geil.gl0tb.mongodb.net&n=test&c=Students

export namespace P_3_1Server {

    interface LogIn {
        name: string;
        firstname: string;
        registration: string;
    }

    let log: Mongo.Collection;

    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    //let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl: string = "https://mongodbnetbrowser.herokuapp.com/?u=Testuser&p=Testuser&a=nikita-gis-ist-geil.gl0tb.mongodb.net&n=test&c=Students";
    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {

        console.log("Server starting on port:" + _port);

        let server: Http.Server = Http.createServer();

        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);

        function handleListen(): void {
            console.log("Listening");
        }
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        log = mongoClient.db("test").collection("Students");
        console.log("Database connection ", log != undefined);
    }
    //function zum vergleichen der eingegeben daten
    /* async function vergleichen(_url: string): Promise<boolean> {

        let pathSplit: string[] = _url.split("?");
        let daten: string[] = pathSplit[1].split("&");
        let ntzName: string[] = daten[0].split("=");
        let ntzFirstname: string[] = daten[1].split("=");
        let ntzRegistration: string[] = daten[2].split("=");

        let logInArray: LogIn[] = await log.find().toArray();

        for (let i: number = 0; i < logInArray.length; i++) {
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
    } */

    //hier werden die server antworten geschrieben je nachdem auf welcher html seite wir uns befinden
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        /* if (_request.url) {

            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let path: String | null = url.pathname;

            if (path == "/login") {
                if (await vergleichen(url.path) == false) {
                    _response.write("User nicht gefunden überprüfen sie ihre eingabe");
                } else {
                    _response.write("User gefunden");
                }
            } else if (path == "/registrieren") {
                if ( await vergleichen(url.path) == false) {
                    log.insertOne(url.query);
                    _response.write("User erstellt");
                } else {
                    _response.write("User existiert schon");
                }
            } else if (path == "/nutzer") {
                let logInArray: LogIn[] = await log.find().toArray();
                let logInArrayJSON: string = JSON.stringify(logInArray);
                _response.write(logInArrayJSON);
            }
        } */
        _response.write("test");
        _response.end();
    }
}