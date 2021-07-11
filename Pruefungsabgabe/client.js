"use strict";
var P_3_1Server;
(function (P_3_1Server) {
    let knopf = document.getElementById("knopf");
    let knopfRezept = document.getElementById("knopfRezept");
    main();
    //erkennt auf welcher html er sich befindet und hängt dementsprechen eine url dran und schickt die an die communicate funktion
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
                url += "/eigenRezeptEinfuegen";
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
    //die url wird an den server geschickt und empfangen und je nach antwort verarbeitet und weiter geleitet
    async function communicate(_url) {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let antwortHTML = await response.text();
        let alleRezepte = antwortHTML.split("=");
        if (antwortHTML == "User gefunden") {
            window.open("alleRezepte.html");
        }
        else if (alleRezepte[0] == "User erstellt") {
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
            if (alleRezepte[1] != "[]") {
                P_3_1Server.rezepteArray = JSON.parse(alleRezepte[1]);
            }
            rezepteAnzeigen();
        }
    }
    //alle rezepte werden hier in html Elemente verpackt und auf der html abgebildet zu jedem rezept wird noch ein Button zugeteilt
    async function rezepteAnzeigen() {
        for (let i = 0; i < P_3_1Server.rezepteArray.length; i++) {
            let zutatenDiv = document.createElement("div");
            let komplettDiv = document.createElement("div");
            zutatenDiv.id = "ausgewaehltesRezept" + i;
            zutatenDiv.classList.add("alleRezepte");
            document.getElementById("text").appendChild(komplettDiv);
            komplettDiv.setAttribute("ziel", i.toString());
            komplettDiv.appendChild(zutatenDiv);
            let zubereitung = document.createElement("p");
            zubereitung.innerHTML = "Zubereitung: " + P_3_1Server.rezepteArray[i].zubereitung;
            zutatenDiv.appendChild(zubereitung);
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
    //die rezepte welche im localStorage sind werden als favoriten abgebildet  
    function uebertragen() {
        let favoritenArray = [];
        for (let i = 0; i <= localStorage.i; i++) {
            favoritenArray[i] = localStorage.getItem("favoriten" + i);
            let kopierenDiv = document.createElement("div");
            kopierenDiv.id = "rezept" + i;
            kopierenDiv.classList.add("rezepteClass");
            kopierenDiv.innerHTML = favoritenArray[i];
            document.getElementById("favorit")?.appendChild(kopierenDiv);
            let buttonEntfavorisieren = document.createElement("button");
            buttonEntfavorisieren.id = "buttonEntfavorisieren" + i;
            buttonEntfavorisieren.classList.add("entfavorisierenButtonClass");
            buttonEntfavorisieren.innerHTML = "Entfavorisieren";
            buttonEntfavorisieren.addEventListener("click", entfavorisieren);
            kopierenDiv.appendChild(buttonEntfavorisieren);
            kopierenDiv.setAttribute("ziel", i.toString());
        }
    }
    //das angeklickte rezept wird in den localStorage gespeichert
    function favorisieren(_event) {
        let localstorageArray = [];
        let targetZaehler = _event.currentTarget.parentElement.getAttribute("ziel");
        document.getElementById("buttonFavorisieren" + targetZaehler).innerHTML = "Entfavorisieren";
        if (localStorage.i) {
            localStorage.i = Number(localStorage.i) + 1;
        }
        else {
            localStorage.i = 0;
        }
        localstorageArray[localStorage.i] = document.getElementById("ausgewaehltesRezept" + targetZaehler)?.innerHTML;
        localStorage.setItem("favoriten" + localStorage.i, localstorageArray[localStorage.i]);
    }
    //das angeklickte rezept wird aus dem localStorage entfernt und die unteren rezepte werden nach gerückt
    function entfavorisieren(_event) {
        let targetZaehler = _event.currentTarget.parentElement.getAttribute("ziel");
        localStorage.removeItem("favoriten" + targetZaehler);
        document.getElementById("rezept" + targetZaehler).remove();
        localStorage.i--;
        for (let i = parseInt(targetZaehler); i <= localStorage.i; i++) {
            let addition = i + 1;
            localStorage.setItem("favoriten" + i, localStorage.getItem("favoriten" + addition));
        }
    }
})(P_3_1Server || (P_3_1Server = {}));
//# sourceMappingURL=client.js.map