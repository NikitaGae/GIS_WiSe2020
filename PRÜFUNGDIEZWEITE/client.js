"use strict";
var P_3_1Server;
(function (P_3_1Server) {
    laden();
    let knopf = document.getElementById("knopf");
    knopf.addEventListener("click", laden);
    let knopfRezept = document.getElementById("knopfRezept");
    knopfRezept.addEventListener("click", folgen);
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
            let div = document.createElement("div");
            div.classList.add("alleRezepte");
            document.getElementById("text").appendChild(div);
            div.setAttribute("target", i.toString());
            let zutatEins = document.createElement("p");
            zutatEins.innerHTML = "Erste Zutat: " + P_3_1Server.rezepteArray[i].zutatEins;
            div.appendChild(zutatEins);
            let zutatZwei = document.createElement("p");
            zutatZwei.innerHTML = "Zweite Zutat: " + P_3_1Server.rezepteArray[i].zutatZwei;
            div.appendChild(zutatZwei);
            let zutatDrei = document.createElement("p");
            zutatDrei.innerHTML = "Dritte Zutat: " + P_3_1Server.rezepteArray[i].zutatDrei;
            div.appendChild(zutatDrei);
            let zutatVier = document.createElement("p");
            zutatVier.innerHTML = "Vierte Zutat: " + P_3_1Server.rezepteArray[i].zutatVier;
            div.appendChild(zutatVier);
            let zutatFuenf = document.createElement("p");
            zutatFuenf.innerHTML = "Fünfte Zutat: " + P_3_1Server.rezepteArray[i].zutatFuenf;
            div.appendChild(zutatFuenf);
            let buttonFolgen = document.createElement("button");
            //buttonFolgen.id = "buttonFolgen" + i;
            buttonFolgen.classList.add("folgenButtonClass");
            buttonFolgen.innerHTML = "Favorisieren";
            //buttonFolgen.addEventListener("click", handleFolgen);
            div.appendChild(buttonFolgen);
        }
    }
    function folgen() {
        console.log("GGwWGgGgaregeargaegsthsrthtzkzful");
    }
    //hier soll er je nach  html seite registrieren anmelden oder nutzer in die url anhängen damit später erkannt werden kann wo man ist
    async function laden() {
        let location = window.location.pathname.split("/");
        let teil = location[location.length - 1];
        console.log(location);
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url = "http://localhost:8100";
        switch (teil) {
            case "registrieren.html":
                url += "/registrieren";
                break;
            case "anmelden.html":
                console.log("moin");
                url += "/anmelden";
                break;
            case "eigenRezept.html":
                url += "/eigenRezept";
                break;
            case "alleRezepte.html":
                url += "/alleRezepte";
                break;
        }
        await communicate(url);
    }
})(P_3_1Server || (P_3_1Server = {}));
//# sourceMappingURL=client.js.map