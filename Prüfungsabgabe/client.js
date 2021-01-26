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
                /* let response: Response = await fetch("http://localhost:8100/nutzer");
                let antwortHTML: string = await response.json(); */
                /* if (antwortHTML != "[]") {
                    userArray = JSON.parse(JSON.stringify(antwortHTML));
                } */
                /* let antwortHTML2: LogIn[] = await response.text();
                (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML; */
                //createButtons(antwortHTML);
                //createUser();
                /* userArray = JSON.parse(antwortHTML);
                //let antwortHTML2: LogIn[] = await response.text();
                createButtons(); */
                //(<HTMLDivElement>document.getElementById("text")).innerHTML = localStorage.getItem("response");
                break;
            case "profil.html":
                url += "/profil";
                /* let response2: Response = await fetch("http://localhost:8100/profil");
                let antwortHTML2: string = await response2.text();
                (<HTMLDivElement>document.getElementById("profil")).innerHTML = antwortHTML2; */
                document.getElementById("profil").innerHTML = localStorage.getItem("response");
                break;
            case "hauptseite.html":
                url += "/hauptseite";
                sendenButton.addEventListener("click", senden);
                await communicate(url);
                /* let response2: Response = await fetch("http://localhost:8100/hauptseite");
                let antwortHTML2: string = await response2.json();

                if (antwortHTML2 != "[]") {
                    msgArray = JSON.parse(JSON.stringify(antwortHTML));
                } */
                //createMgs();
                /* let response2: Response = await fetch("http://localhost:8100/hauptseite");
                let antwortHTML2: string = await response2.text();
                (<HTMLDivElement>document.getElementById("divNachrichten")).innerHTML = localStorage.getItem("response"); */
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
        //console.log(antwortSplit[1]);
        if (antwortSplit[0] == "User") {
            window.open("hauptseite.html");
            localStorage.setItem("response", antwortHTML);
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
                console.log(Pruefungsabgabe.userArray);
            }
            createUser();
        }
        else if (antwortSplit[0] == "hauptseite") {
            document.getElementById("text").innerHTML = antwortHTML;
        }
    }
    async function senden() {
        let myText = "Nachricht= ";
        myText += document.getElementById("subject").nodeValue;
        let url = "http://localhost:8100/hauptseite";
        url = url + "?" + myText;
        localStorage.getItem("");
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
    /* async function createMgs(): Promise<void> {

        for (let i: number = 0; i < userArray.length; i++) {
            let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            div.id = "nutzerID" + i;
            div.classList.add("alleNutzer");
            document.getElementById("text").appendChild(div);
            div.setAttribute("target", i.toString());

            let vornameP: HTMLElement = document.createElement("h2");
            vornameP.innerHTML = "Vorname: " + userArray[i].vorname;
            div.appendChild(vornameP);

            let nachnameP: HTMLElement = document.createElement("h2");
            nachnameP.innerHTML = "Nachname: " + userArray[i].nachname;
            div.appendChild(nachnameP);

            let studiengangP: HTMLElement = document.createElement("p");
            studiengangP.innerHTML = "Studiengang: " + userArray[i].studiengang;
            div.appendChild(studiengangP);

            let semesterangabeP: HTMLElement = document.createElement("p");
            semesterangabeP.innerHTML = "Semesterangabe: " + userArray[i].semesterangabe;
            div.appendChild(semesterangabeP);

            let buttonFolgen: HTMLButtonElement = document.createElement("button");
            buttonFolgen.id = "buttonFolgen" + i;
            //console.log(buttonFolgen.getAttribute("target"));
            buttonFolgen.classList.add("folgenButtonClass");
            buttonFolgen.innerHTML = "Folgen";
            buttonFolgen.addEventListener("click", handleFolgen);
            div.appendChild(buttonFolgen);
        }
    } */
    function handleFolgen(_event) {
        let targetZaehler = _event.currentTarget.parentElement.getAttribute("target");
        document.getElementById("buttonFolgen" + targetZaehler).innerHTML = "Entfolgen";
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=client.js.map