"use strict";
var Aufgabe2_3;
(function (Aufgabe2_3) {
    let mensch = konvertierer();
    document.getElementById("breit").addEventListener("click", function () { tausch(mensch.allKopf[0]); });
    document.getElementById("breit").addEventListener("click", function () { tausch2(mensch.allKopf[1]); });
    document.getElementById("breit").addEventListener("click", function () { tausch3(mensch.allKopf[2]); });
    function tausch(_Kopf) {
        document.getElementById("bilder").setAttribute("src", _Kopf.source);
        let el = document.querySelector("#bilder");
        el.dataset.name = "breit";
        console.log(el.dataset.name);
    }
    function tausch2(_Kopf) {
        document.getElementById("bilder").setAttribute("src", _Kopf.source);
        let el = document.querySelector("#bilder");
        el.dataset.name = "mittel";
        console.log(el.dataset.name);
    }
    function tausch3(_Kopf) {
        document.getElementById("bilder").setAttribute("src", _Kopf.source);
        let el = document.querySelector("#bilder");
        el.dataset.name = "schmal";
        console.log(el.dataset.name);
    }
    /* let breitJSON: string = JSON.stringify(breit);
    console.log(breitJSON); // '{"name":"John", "age": 31, "city": "New York"}'

    let schmalJSON: string = JSON.stringify(schmal);
    console.log(schmalJSON); // '{"name":"John", "age": 31, "city": "New York"}'

    let mittelJSON: string = JSON.stringify(mittel);
    console.log(mittelJSON); // '{"name":"John", "age": 31, "city": "New York"}'

    let korpulentJSON: string = JSON.stringify(korpulent);
    console.log(korpulentJSON); // '{"name":"John", "age": 31, "city": "New York"}'

    let duennJSON: string = JSON.stringify(duenn);
    console.log(duennJSON); // '{"name":"John", "age": 31, "city": "New York"}'

    let normalJSON: string = JSON.stringify(normal);
    console.log(normalJSON); // '{"name":"John", "age": 31, "city": "New York"}'

    let mueskeloesJSON: string = JSON.stringify(mueskeloes);
    console.log(mueskeloesJSON); // '{"name":"John", "age": 31, "city": "New York"}'

    let standardJSON: string = JSON.stringify(standard);
    console.log(standardJSON); // '{"name":"John", "age": 31, "city": "New York"}'

    let dickJSON: string = JSON.stringify(dick);
    console.log(dickJSON); // '{"name":"John", "age": 31, "city": "New York"}'  */
    konvertierer();
    function konvertierer() {
        let m2 = JSON.parse(Aufgabe2_3.m1JSON);
        console.log(m2.allKopf[0].name);
        return m2;
    }
})(Aufgabe2_3 || (Aufgabe2_3 = {}));
//# sourceMappingURL=script.js.map