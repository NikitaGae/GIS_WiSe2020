"use strict";
var P_3_1Server;
(function (P_3_1Server) {
    let knopf = document.getElementById("knopf");
    knopf.addEventListener("click", laden);
    async function communicate(_url) {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        if (_url.includes("/login")) {
            let antwortHTML = await response.text();
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (_url.includes("/registrieren")) {
            let antwortHTML = await response.text();
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (_url.includes("/nutzer")) {
            let antwortHTML = await response.text();
            document.getElementById("text").innerHTML = antwortHTML;
        }
    }
    async function laden() {
        let location = window.location.pathname.split("/");
        let teil = location[location.length - 1];
        console.log(teil);
        let url = "https://testgiswise2020.herokuapp.com";
        //let url: string = "http://localhost:8100";
        switch (teil) {
            case "index.html":
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
})(P_3_1Server || (P_3_1Server = {}));
//# sourceMappingURL=client.js.map