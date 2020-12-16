"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
var P_3_1Server;
(function (P_3_1Server) {
    let knopfHTML = document.getElementById("knopfHTML");
    let knopfJSON = document.getElementById("knopfJSON");
    knopfHTML.addEventListener("click", work);
    knopfJSON.addEventListener("click", work);
    async function work(_event) {
        let url = "https://testgiswise2020.herokuapp.com";
        //let url: string = "localhorst:8100";
        let target = _event.currentTarget;
        if (target.id == "knopfHTML") {
            url += "/html";
        }
        else if (target.id == "knopfJSON") {
            url += "/json";
        }
        await communicate(url);
    }
    async function communicate(_url) {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        if (_url.includes("/html")) {
            let antwortHTML = await response.text();
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (_url.includes("/json")) {
            let antwortJSON = await response.json();
            let jsonString = JSON.parse(antwortJSON);
            console.log("antwort", jsonString);
        }
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=client.js.map