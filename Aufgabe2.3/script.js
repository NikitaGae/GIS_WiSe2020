"use strict";
var Aufgabe2_3;
(function (Aufgabe2_3) {
    let mensch;
    const element = document.body;
    window.addEventListener("load", work);
    async function work() {
        await konvertierer();
        laden();
    }
    function laden() {
        let location = window.location.pathname.split("/");
        let teil = location[location.length - 1];
        console.log(teil);
        switch (teil) {
            case "index.html":
                wechseln(mensch.allKopf[0]);
                createButtons(mensch.allKopf);
                break;
            case "koerper.html":
                wechseln(mensch.allKoerper[0]);
                createButtons(mensch.allKoerper);
                break;
            case "beine.html":
                wechseln(mensch.allBeine[0]);
                createButtons(mensch.allBeine);
                break;
            case "final.html":
                zusammensetzen();
                communicate("https://gis-communication.herokuapp.com");
                break;
        }
    }
    function zusammensetzen() {
        console.log(sessionStorage.getItem("Kopf"));
        console.log(sessionStorage.getItem("Körper"));
        console.log(sessionStorage.getItem("Bein"));
        document.getElementById("bildKoerperteil").setAttribute("src", sessionStorage.getItem("Kopf"));
        document.getElementById("bildKoerperteil1").setAttribute("src", sessionStorage.getItem("Körper"));
        document.getElementById("bildKoerperteil2").setAttribute("src", sessionStorage.getItem("Bein"));
    }
    function createButtons(_KTeilArray) {
        let button = document.getElementById("dropdown-content");
        for (let i = 0; i < _KTeilArray.length; i++) {
            let newA = document.createElement("a");
            newA.id = _KTeilArray[i].typ + i;
            newA.addEventListener("click", function () { wechseln(_KTeilArray[i]); });
            newA.innerHTML = _KTeilArray[i].name + " " + _KTeilArray[i].typ;
            button.appendChild(newA);
        }
    }
    function wechseln(_KoerperTeile) {
        console.log(_KoerperTeile);
        document.getElementById("bildKoerperteil").setAttribute("src", _KoerperTeile.source);
        sessionStorage.setItem(_KoerperTeile.typ, _KoerperTeile.source);
    }
    async function communicate(_url) {
        let query = new URLSearchParams(sessionStorage);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let antwort = await response.json();
        console.log(antwort);
        if (antwort.error) {
            console.log("Failure", antwort);
            let meldung = document.getElementById("meldung");
            meldung.style.backgroundColor = "red";
            let p1 = document.createElement("p");
            p1.innerText = "Server:" + " " + antwort.error;
            element.appendChild(p1);
        }
        else {
            console.log("Success", antwort);
            let meldung = document.getElementById("meldung");
            meldung.style.backgroundColor = "green";
            let p1 = document.createElement("p");
            p1.innerText = "Server:" + " " + antwort.message;
            element.appendChild(p1);
        }
    }
    async function konvertierer() {
        let response = await fetch("data.json");
        mensch = await response.json();
        console.log(mensch);
        return mensch;
    }
})(Aufgabe2_3 || (Aufgabe2_3 = {}));
//# sourceMappingURL=script.js.map