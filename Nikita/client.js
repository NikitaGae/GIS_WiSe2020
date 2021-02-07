"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let sendenButton = document.getElementById("senden");
    main();
    async function main() {
        let location = window.location.pathname.split("/");
        let teil = location[location.length - 1];
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url = "http://localhost:8100";
        let knopf;
        switch (teil) {
            case "registrieren.html":
                url += "/registrieren";
                knopf = document.getElementById("knopf");
                knopf.addEventListener("click", function () { communicate(url); });
                break;
            case "anmelden.html":
                url += "/anmelden";
                knopf = document.getElementById("knopf");
                knopf.addEventListener("click", function () { communicate(url); });
                break;
            case "nutzer.html":
                url += "/nutzer";
                await communicate(url);
                break;
            case "profil.html":
                url += "/profil";
                document.getElementById("profil").innerHTML = localStorage.getItem("response");
                break;
            case "hauptseite.html":
                url += "/hauptseite";
                sendenButton.addEventListener("click", senden);
                await communicate(url);
                break;
        }
    }
    //hier werden die server antworten in das div mit der id text geschrieben
    async function communicate(_url) {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let antwortHTML = await response.text();
        let antwortSplit = antwortHTML.split("$");
        console.log(antwortSplit[0]);
        if (antwortSplit[0] == "User") {
            window.open("hauptseite.html");
            localStorage.setItem("response", antwortSplit[1]);
            //(<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        }
        else if (antwortSplit[0] == "Erstellt") {
            window.open("hauptseite.html");
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (antwortSplit[0] == "Profil") {
            localStorage.setItem("response", antwortHTML);
        }
        else if (antwortSplit[0] == "Nutzer") {
            if (antwortSplit[1] != "[]") {
                Pruefungsabgabe.userArray = JSON.parse(antwortSplit[1]);
            }
            createUser();
        }
        else if (antwortSplit[0] == "hauptseite") {
            document.getElementById("text").innerHTML = antwortHTML;
        }
    }
    async function senden() {
        //let myText: string = "Nachricht= ";
        //myText += (<HTMLTextAreaElement>document.getElementById("subject")).value; */
        /* let userJSON: LogIn = JSON.parse(localStorage.getItem("response"));
        let abschicken: Daten = {_id: userJSON._id, nachricht: (<HTMLTextAreaElement>document.getElementById("subject")).value};
        let url: string = "http://localhost:8100/hauptseite";
        url = url + "?" + JSON.stringify(abschicken);
        console.log(url);
        await communicate(url); */
        /* let userJSON: LogIn = JSON.parse(localStorage.getItem("response"));
        let abschicken: Daten = {_id: userJSON._id, nachricht: (<HTMLFormElement>document.getElementById("subjectForm")).value};
        

        let query: URLSearchParams = new URLSearchParams(JSON.stringify(abschicken));
        
        let url: string = "http://localhost:8100/hauptseite";
        url = url + "?" + query.toString();
        console.log(url);
        await communicate(url); */
        let id = JSON.parse(localStorage.getItem("response"));
        let form = document.getElementById("subjectForm");
        let formdata = new FormData(form);
        let query = new URLSearchParams(formdata);
        query.append("id", id._id);
        let url = "http://localhost:8100/hauptseite";
        url = url + "?" + query.toString();
        console.log(url);
        let response = await fetch(url);
        let antwortHTML = await response.text();
        console.log(antwortHTML);
    }
    async function createUser() {
        for (let i = 0; i < Pruefungsabgabe.userArray.length; i++) {
            let div = document.createElement("div");
            div.id = "nutzerID" + i;
            div.classList.add("alleNutzer");
            document.getElementById("text").appendChild(div);
            div.setAttribute("target", i.toString());
            let vornameP = document.createElement("h2");
            vornameP.innerHTML = "Vorname: " + Pruefungsabgabe.userArray[i].vorname;
            div.appendChild(vornameP);
            let nachnameP = document.createElement("h2");
            nachnameP.innerHTML = "Nachname: " + Pruefungsabgabe.userArray[i].nachname;
            div.appendChild(nachnameP);
            let studiengangP = document.createElement("p");
            studiengangP.innerHTML = "Studiengang: " + Pruefungsabgabe.userArray[i].studiengang;
            div.appendChild(studiengangP);
            let semesterangabeP = document.createElement("p");
            semesterangabeP.innerHTML = "Semesterangabe: " + Pruefungsabgabe.userArray[i].semesterangabe;
            div.appendChild(semesterangabeP);
            let buttonFolgen = document.createElement("button");
            buttonFolgen.id = "buttonFolgen" + i;
            //console.log(buttonFolgen.getAttribute("target"));
            buttonFolgen.classList.add("folgenButtonClass");
            buttonFolgen.innerHTML = "Folgen";
            buttonFolgen.addEventListener("click", handleFolgen);
            div.appendChild(buttonFolgen);
        }
    }
    function handleFolgen(_event) {
        let targetZaehler = _event.currentTarget.parentElement.getAttribute("target");
        document.getElementById("buttonFolgen" + targetZaehler).innerHTML = "Entfolgen";
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=client.js.map