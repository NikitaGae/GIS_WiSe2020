import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_3_1Server {

    interface LogIn {
        nutzername: string;
        vorname: string;
        nachname: string;
        passwort: string;
    }

    interface Rezept {
        zubereitung: string;
        zutatEins: string;
        zutatZwei: string;
        zutatDrei: string;
        zutatVier: string;
        zutatFuenf: string;
        zutatSechs: string;
        zutatSieben: string;
        zutatAcht: string;
        zutatNeun: string;
        zutatZehn: string;
    }

    let log: Mongo.Collection;
    let rezepte: Mongo.Collection;

    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    //let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl: string = "mongodb+srv://Testuser:Testuser@cluster0.ymlqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
        log = mongoClient.db("test").collection("user");
        rezepte = mongoClient.db("test").collection("rezepte");
        console.log("Database connection ", log != undefined);
    }

    //daten werden zur registrierung verglichen und überprüft ob sie sich in der datenbank befinden
    async function vergleichenRegistrieren(_url: string): Promise<boolean> {

        let pathSplit: string[] = _url.split("?");
        let daten: string[] = pathSplit[1].split("&");
        let ntzNutzername: string[] = daten[0].split("=");
        let logInArray: LogIn[] = await log.find().toArray();

        for (let i: number = 0; i < logInArray.length; i++) {
            if (ntzNutzername[1] == (logInArray[i].vorname)) {
                JSON.stringify(logInArray);
                return true;
            }
        }
        return false;
    }

    //daten werden zur anmeldung verglichen und überprüft ob der user existiert
    async function vergleichenAnmelden(_url: string): Promise<boolean> {

        let pathSplit: string[] = _url.split("?");
        let daten: string[] = pathSplit[1].split("&");
        let ntzUserName: string[] = daten[0].split("=");
        let ntzPasswort: string[] = daten[1].split("=");

        let logInArray: LogIn[] = await log.find().toArray();

        for (let i: number = 0; i < logInArray.length; i++) {
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
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let rezeptArray: Rezept[] = await rezepte.find().toArray();
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let path: String | null = url.pathname;

            //server antwort ob user schon existiert oder nicht
            if (path == "/anmelden") {
                if (await vergleichenAnmelden(url.path) == false) {
                    _response.write("User nicht gefunden überprüfen sie ihre eingabe");
                } else {
                    _response.write("User gefunden");
                }
            //serverantwort ob user schon existiert oder nicht
            } else if (path == "/registrieren") {
                if (await vergleichenRegistrieren(url.path) == false) {
                    log.insertOne(url.query);
                    _response.write("User erstellt");
                } else {
                    _response.write("User existiert schon");
                }
            //rezept wird in die datenbank eingeführt
            } else if (path == "/eigenRezeptEinfuegen") {
                rezepte.insertOne(url.query);
                _response.write("Rezept wurde erstellt");
            //alle rezepte werden aus der datenbank zurück geschickt
            } else if (path == "/alleRezepte") {
                let jsonString: string = "";

                jsonString += "[";
                for (let i: number = 0; i < rezeptArray.length; i++) {
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
}