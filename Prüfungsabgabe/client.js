"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let sendenButton = document.getElementById("senden");
    main();
    async function main() {
        let location = window.location.pathname.split("/");
        let teil = location[location.length - 1];
        let url = "https://testgiswise2020.herokuapp.com";
        //let url: string = "http://localhost:8100";
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
                //knopf.addEventListener("click", nachrichtenAbrufen);
                break;
            case "nutzer.html":
                url += "/nutzer";
                await communicate(url);
                break;
            case "profil.html":
                url += "/profil";
                document.getElementById("profil").innerHTML = localStorage.getItem("responseUser");
                break;
            case "hauptseite.html":
                url += "/hauptseite";
                document.getElementById("divNachrichten").innerHTML = localStorage.getItem("responseNachricht");
                sendenButton.addEventListener("click", senden);
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
        console.log(antwortHTML);
        let antwortSplit = antwortHTML.split("$");
        console.log(antwortSplit[2]);
        if (antwortSplit[0] == "User") {
            window.open("hauptseite.html");
            localStorage.setItem("responseUser", antwortSplit[1]);
            localStorage.setItem("responseNachricht", antwortSplit[3]);
            await nachrichtenAbrufen();
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
        else if (antwortSplit[0] == "Nachricht") {
            document.getElementById("divNachrichten").innerHTML = antwortHTML;
        }
    }
    async function nachrichtenAbrufen() {
        let id = JSON.parse(localStorage.getItem("responseNachricht"));
        let form = document.getElementById("subjectForm");
        let formdata = new FormData(form);
        let query = new URLSearchParams(formdata);
        query.append("id", id._id);
        let url = "http://localhost:8100/hauptseite";
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let antwortHTML = await response.text();
        let antwortSplit = JSON.parse(antwortHTML.split("$")[1]);
        let safe = document.getElementById("divNachrichten");
        for (let i = 0; i < antwortSplit.length; i++) {
            let divNachricht = document.createElement("div");
            divNachricht.innerHTML = antwortSplit[i];
            safe.appendChild(divNachricht);
            divNachricht.classList.add("alleNachrichten");
        }
    }
    //hier wird für jede Nachricht ein div erstellt und die Nachricht ins div iengefügt
    async function senden() {
        let id = JSON.parse(localStorage.getItem("response"));
        let form = document.getElementById("subjectForm");
        let formdata = new FormData(form);
        let query = new URLSearchParams(formdata);
        query.append("id", id._id);
        let url = "http://localhost:8100/hauptseite";
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let antwortHTML = await response.text();
        let antwortSplit = antwortHTML.split("$");
        //(<HTMLDivElement>document.getElementById("divNachrichten")).innerHTML = antwortSplit[1];
        let safe = document.getElementById("divNachrichten");
        let divNachricht = document.createElement("div");
        divNachricht.innerHTML = antwortSplit[1];
        safe.appendChild(divNachricht);
        divNachricht.classList.add("alleNachrichten");
    }
    //Jeder Nutzer wird unter einander aufgeschrieben und jedem nutzer wird ein Button zugewiesen 
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
            buttonFolgen.classList.add("folgenButtonClass");
            buttonFolgen.innerHTML = "Folgen";
            buttonFolgen.addEventListener("click", handleFolgen);
            div.appendChild(buttonFolgen);
        }
    }
    //function damit man anderen Nutzern Folgen kann
    function handleFolgen(_event) {
        let targetZaehler = _event.currentTarget.parentElement.getAttribute("target");
        document.getElementById("buttonFolgen" + targetZaehler).innerHTML = "Entfolgen";
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=client.js.map