"use strict";
var Aufgabe2_3;
(function (Aufgabe2_3) {
    tausch();
    document.getElementById("breit").addEventListener("click", tausch);
    document.getElementById("schmaler").addEventListener("click", tausch2);
    document.getElementById("mittel").addEventListener("click", tausch3);
    function tausch() {
        /* let el: HTMLImageElement = document.createElement("img");
        el.id = "test";
        document.getElementById("bilder").appendChild(el);
        el.setAttribute("src", "dick.png");
        el.dataset.name = "breit"; */
        document.getElementById("bilder").setAttribute("src", "dick.png");
        let el = document.querySelector("#bilder");
        el.dataset.name = "breit";
        console.log(el.dataset.name);
        console.log(Aufgabe2_3.breit);
    }
    function tausch2() {
        /* let el: HTMLImageElement = document.createElement("img");
        el.id = "test";
        document.getElementById("bilder").appendChild(el);
        el.setAttribute("src", "dünn.png");
        el.dataset.name = "schmal"; */
        document.getElementById("bilder").setAttribute("src", "dünn.png");
        let el = document.querySelector("#bilder");
        el.dataset.name = "schmal";
        console.log(el.dataset.name);
        console.log(Aufgabe2_3.schmal);
    }
    function tausch3() {
        /* let el: HTMLImageElement = document.createElement("img");
        el.id = "test";
        document.getElementById("bilder").appendChild(el);
        el.setAttribute("src", "dünn.png");
        el.dataset.name = "schmal"; */
        document.getElementById("bilder").setAttribute("src", "normal.png");
        let el = document.querySelector("#bilder");
        el.dataset.name = "mittel";
        console.log(el.dataset.name);
        console.log(Aufgabe2_3.mittel);
    }
})(Aufgabe2_3 || (Aufgabe2_3 = {}));
//# sourceMappingURL=script.js.map