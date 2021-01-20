"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let knopf = document.getElementById("knopf");
    knopf.addEventListener("click", laden);
    //hier werden die server antworten in das div mit der id text geschrieben
    async function communicate(_url) {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let antwortHTML = await response.text();
        document.getElementById("text").innerHTML = antwortHTML;
    }
    //hier soll er je nach  html seite registrieren anmelden oder nutzer in die url anhängen damit später erkannt werden kann wo man ist
    async function laden() {
        let location = window.location.pathname.split("/");
        let teil = location[location.length - 1];
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url = "http://localhost:8100";
        switch (teil) {
            case "registrieren.html":
                url += "/registrieren";
                break;
            case "anmelden.html":
                url += "/login";
                break;
            case "nutzer.html":
                url += "/nutzer";
                break;
        }
        await communicate(url);
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=client.js.map