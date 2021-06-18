"use strict";
var P_3_1Server;
(function (P_3_1Server) {
    let knopf = document.getElementById("knopf");
    knopf.addEventListener("click", laden);
    //hier werden die server antworten in das div mit der id text geschrieben
    async function communicate(_url) {
        /* let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url); */
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let antwortHTML = await response.text();
        if (antwortHTML == "User gefunden") {
            window.open("alleRezepte.html");
            //localStorage.setItem("responseUser", antwortSplit[1]);
        }
        else if (antwortHTML == "User erstellt") {
            window.open("alleRezepte.html");
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (antwortHTML == "User nicht gefunden überprüfen sie ihre eingabe") {
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (antwortHTML == "User existiert schon") {
            document.getElementById("text").innerHTML = antwortHTML;
        }
        /* let antwortHTML: string = await response.text();
        (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML; */
    }
    //hier soll er je nach  html seite registrieren anmelden oder nutzer in die url anhängen damit später erkannt werden kann wo man ist
    async function laden() {
        let location = window.location.pathname.split("/");
        let teil = location[location.length - 1];
        let url = "https://testgiswise2020.herokuapp.com";
        //let url: string = "http://localhost:8100";
        switch (teil) {
            case "registrieren.html":
                url += "/registrieren";
                break;
            case "anmelden.html":
                url += "/anmelden";
                break;
            case "nutzer.html":
                url += "/nutzer";
                break;
        }
        await communicate(url);
    }
})(P_3_1Server || (P_3_1Server = {}));
//# sourceMappingURL=client.js.map