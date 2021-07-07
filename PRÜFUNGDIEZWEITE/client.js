"use strict";
var P_3_1Server;
(function (P_3_1Server) {
    let knopf = document.getElementById("knopf");
    let knopfRezept = document.getElementById("knopfRezept");
    main();
    //hier soll er je nach  html seite registrieren anmelden oder nutzer in die url anhängen damit später erkannt werden kann wo man ist
    async function main() {
        let location = window.location.pathname.split("/");
        let teil = location[location.length - 1];
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url = "http://localhost:8100";
        switch (teil) {
            case "registrieren.html":
                url += "/registrieren";
                knopf.addEventListener("click", function () { communicate(url); });
                break;
            case "anmelden.html":
                url += "/anmelden";
                knopf.addEventListener("click", function () { communicate(url); });
                break;
            case "eigenRezept.html":
                url += "/eigenRezept";
                knopfRezept.addEventListener("click", function () { communicate(url); });
                break;
            case "alleRezepte.html":
                url += "/alleRezepte";
                await communicate(url);
                break;
            case "favoriten.html":
                uebertragen();
                break;
        }
    }
    //hier werden die server antworten in das div mit der id text geschrieben
    async function communicate(_url) {
        /* let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url); */
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let antwortHTML = await response.text();
        let alleRezepte = antwortHTML.split("=");
        if (antwortHTML == "User gefunden") {
            window.open("alleRezepte.html");
            //localStorage.setItem("responseUser", antwortSplit[1]);
        }
        else if (antwortHTML == "User erstellt") {
            window.open("alleRezepte.html");
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (antwortHTML == "User nicht gefunden überprüfen sie ihre eingabe") {
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (antwortHTML == "User existiert schon") {
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (antwortHTML == "Rezept wurde erstellt") {
            document.getElementById("text").innerHTML = antwortHTML;
        }
        else if (alleRezepte[0] == "Rezept") {
            //let alleRezepte: string[] = antwortHTML[0].split("=");
            if (alleRezepte[1] != "[]") {
                P_3_1Server.rezepteArray = JSON.parse(alleRezepte[1]);
            }
            rezepteAnzeigen();
        }
        /* let antwortHTML: string = await response.text();
        (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML; */
    }
    async function rezepteAnzeigen() {
        for (let i = 0; i < P_3_1Server.rezepteArray.length; i++) {
            let zutatenDiv = document.createElement("div");
            let komplettDiv = document.createElement("div");
            zutatenDiv.id = "ausgewaehltesRezept" + i;
            zutatenDiv.classList.add("alleRezepte");
            document.getElementById("text").appendChild(zutatenDiv);
            zutatenDiv.setAttribute("target", i.toString());
            komplettDiv.appendChild(zutatenDiv);
            let zutatEins = document.createElement("p");
            zutatEins.innerHTML = "Erste Zutat: " + P_3_1Server.rezepteArray[i].zutatEins;
            zutatenDiv.appendChild(zutatEins);
            let zutatZwei = document.createElement("p");
            zutatZwei.innerHTML = "Zweite Zutat: " + P_3_1Server.rezepteArray[i].zutatZwei;
            zutatenDiv.appendChild(zutatZwei);
            let zutatDrei = document.createElement("p");
            zutatDrei.innerHTML = "Dritte Zutat: " + P_3_1Server.rezepteArray[i].zutatDrei;
            zutatenDiv.appendChild(zutatDrei);
            let zutatVier = document.createElement("p");
            zutatVier.innerHTML = "Vierte Zutat: " + P_3_1Server.rezepteArray[i].zutatVier;
            zutatenDiv.appendChild(zutatVier);
            let zutatFuenf = document.createElement("p");
            zutatFuenf.innerHTML = "Fünfte Zutat: " + P_3_1Server.rezepteArray[i].zutatFuenf;
            zutatenDiv.appendChild(zutatFuenf);
            let zutatSechs = document.createElement("p");
            zutatSechs.innerHTML = "Sechste Zutat: " + P_3_1Server.rezepteArray[i].zutatSechs;
            zutatenDiv.appendChild(zutatSechs);
            let zutatSieben = document.createElement("p");
            zutatSieben.innerHTML = "Siebte Zutat: " + P_3_1Server.rezepteArray[i].zutatSieben;
            zutatenDiv.appendChild(zutatSieben);
            let zutatAcht = document.createElement("p");
            zutatAcht.innerHTML = "Achte Zutat: " + P_3_1Server.rezepteArray[i].zutatAcht;
            zutatenDiv.appendChild(zutatAcht);
            let zutatNeun = document.createElement("p");
            zutatNeun.innerHTML = "Neunte Zutat: " + P_3_1Server.rezepteArray[i].zutatNeun;
            zutatenDiv.appendChild(zutatNeun);
            let zutatZehn = document.createElement("p");
            zutatZehn.innerHTML = "Zehnte Zutat: " + P_3_1Server.rezepteArray[i].zutatZehn;
            zutatenDiv.appendChild(zutatZehn);
            let buttonFavorisieren = document.createElement("button");
            buttonFavorisieren.id = "buttonFavorisieren" + i;
            buttonFavorisieren.classList.add("favorisierenButtonClass");
            buttonFavorisieren.innerHTML = "Favorisieren";
            buttonFavorisieren.addEventListener("click", favorisieren);
            komplettDiv.appendChild(buttonFavorisieren);
        }
    }
    function favorisieren(_event) {
        let localstorageArray = [];
        let targetZaehler = _event.currentTarget.parentElement.getAttribute("target");
        document.getElementById("buttonFavorisieren" + targetZaehler).innerHTML = "Entfavorisieren";
        if (localStorage.i) {
            localStorage.i = Number(localStorage.i) + 1;
        }
        else {
            localStorage.i = 1;
        }
        localstorageArray[localStorage.i] = document.getElementById("ausgewaehltesRezept" + targetZaehler)?.innerHTML;
        localStorage.setItem("favoriten" + localStorage.i, localstorageArray[localStorage.i]);
    }
    function uebertragen() {
        let favoritenArray = [];
        for (let i = 1; i <= localStorage.i; i++) {
            favoritenArray[i] = localStorage.getItem("favoriten" + i);
            let kopierenDiv = document.createElement("div");
            kopierenDiv.id = "rezept" + i;
            kopierenDiv.classList.add("rezepteClass");
            kopierenDiv.innerHTML = favoritenArray[i];
            document.getElementById("favorit")?.appendChild(kopierenDiv);
            let buttonEntfavorisieren = document.createElement("button");
            kopierenDiv.appendChild(buttonEntfavorisieren);
        }
    }
})(P_3_1Server || (P_3_1Server = {}));
//# sourceMappingURL=client.js.map