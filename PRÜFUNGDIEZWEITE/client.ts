namespace P_3_1Server {

    laden();
    let knopf: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopf");
    knopf.addEventListener("click", laden);

    let knopfRezept: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopfRezept");
    knopfRezept.addEventListener("click", folgen);

    interface Rezept {
        zutatEins: string;
        zutatZwei: string;
        zutatDrei: string;
        zutatVier: string;
        zutatFuenf: string;
        zutatSechs: string;
        zutatSieben: string;
        zutatAcht: string;
        zutatNeun: string;
        zutatZehn: string;
    }

    export let rezepteArray: Rezept[];


    //hier werden die server antworten in das div mit der id text geschrieben
    async function communicate(_url: RequestInfo): Promise<void> {
        /* let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url); */



        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let antwortHTML: string = await response.text();
        let alleRezepte: string[] = antwortHTML.split("=");        

        if (antwortHTML == "User gefunden") {
            window.open("alleRezepte.html");
            //localStorage.setItem("responseUser", antwortSplit[1]);
        } else if (antwortHTML == "User erstellt") {
            window.open("alleRezepte.html");
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } else if (antwortHTML == "User nicht gefunden überprüfen sie ihre eingabe") {
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } else if (antwortHTML == "User existiert schon") {
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } else if (alleRezepte[0] == "Rezept") {  
            //let alleRezepte: string[] = antwortHTML[0].split("=");
            if (alleRezepte[1] != "[]") {
                rezepteArray = JSON.parse(alleRezepte[1]);
            }
            rezepteAnzeigen();
        }

        /* let antwortHTML: string = await response.text();
        (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML; */
    }

    async function rezepteAnzeigen(): Promise<void> {
        for (let i: number = 0; i < rezepteArray.length; i++) {
            let div: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            div.classList.add("alleRezepte");
            document.getElementById("text").appendChild(div);
            div.setAttribute("target", i.toString());

            let zutatEins: HTMLElement = document.createElement("p");
            zutatEins.innerHTML = "Erste Zutat: " + rezepteArray[i].zutatEins;
            div.appendChild(zutatEins);

            let zutatZwei: HTMLElement = document.createElement("p");
            zutatZwei.innerHTML = "Zweite Zutat: " + rezepteArray[i].zutatZwei;
            div.appendChild(zutatZwei);

            let zutatDrei: HTMLElement = document.createElement("p");
            zutatDrei.innerHTML = "Dritte Zutat: " + rezepteArray[i].zutatDrei;
            div.appendChild(zutatDrei);

            let zutatVier: HTMLElement = document.createElement("p");
            zutatVier.innerHTML = "Vierte Zutat: " + rezepteArray[i].zutatVier;
            div.appendChild(zutatVier);

            let zutatFuenf: HTMLElement = document.createElement("p");
            zutatFuenf.innerHTML = "Fünfte Zutat: " + rezepteArray[i].zutatFuenf;
            div.appendChild(zutatFuenf);

            let buttonFolgen: HTMLButtonElement = document.createElement("button");
            //buttonFolgen.id = "buttonFolgen" + i;
            buttonFolgen.classList.add("folgenButtonClass");
            buttonFolgen.innerHTML = "Favorisieren";
            //buttonFolgen.addEventListener("click", handleFolgen);
            div.appendChild(buttonFolgen);
        }
    }

    function folgen(): void {
        console.log("GGwWGgGgaregeargaegsthsrthtzkzful");
    }

    //hier soll er je nach  html seite registrieren anmelden oder nutzer in die url anhängen damit später erkannt werden kann wo man ist
    async function laden(): Promise<void> {

        let location: string[] = window.location.pathname.split("/");
        let teil: string = location[location.length - 1];
        console.log(location);
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url: string = "http://localhost:8100";

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
}