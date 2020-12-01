"use strict";
var Aufgabe2_3;
(function (Aufgabe2_3) {
    let mensch = konvertierer();
    window.addEventListener("load", laden);
    async function laden() {
        let response = await fetch("data.json");
        let data = await response.json();
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
                break;
        }
    }
    function zusammensetzen() {
        console.log(localStorage.getItem("Kopf"));
        console.log(localStorage.getItem("Körper"));
        console.log(localStorage.getItem("Bein"));
        document.getElementById("BildKoerperteil").setAttribute("src", localStorage.getItem("Kopf"));
        document.getElementById("BildKoerperteil1").setAttribute("src", localStorage.getItem("Körper"));
        document.getElementById("BildKoerperteil2").setAttribute("src", localStorage.getItem("Bein"));
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
        document.getElementById("BildKoerperteil").setAttribute("src", _KoerperTeile.source);
        localStorage.setItem(_KoerperTeile.typ, _KoerperTeile.source);
    }
    konvertierer();
    function konvertierer() {
        let m2 = JSON.parse("allKopf");
        return m2;
    }
})(Aufgabe2_3 || (Aufgabe2_3 = {}));
//# sourceMappingURL=script.js.map