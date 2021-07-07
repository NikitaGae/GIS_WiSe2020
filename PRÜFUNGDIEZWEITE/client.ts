namespace P_3_1Server {
    let knopf: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopf");
    let knopfRezept: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopfRezept");

    main();

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

    //hier soll er je nach  html seite registrieren anmelden oder nutzer in die url anhängen damit später erkannt werden kann wo man ist
    async function main(): Promise<void> {
        let location: string[] = window.location.pathname.split("/");
        let teil: string = location[location.length - 1];
        let url: string = "https://testgiswise2020.herokuapp.com";
        //let url: string = "http://localhost:8100";

        switch (teil) {
            case "registrieren.html":
                url += "/registrieren";
                knopf.addEventListener("click", function (): void { communicate(url); });
                break;
            case "anmelden.html":
                url += "/anmelden";
                knopf.addEventListener("click", function (): void { communicate(url); });
                break;
            case "eigenRezept.html":
                url += "/eigenRezept";
                knopfRezept.addEventListener("click", function (): void { communicate(url); });
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
        } else if (antwortHTML == "Rezept wurde erstellt") {
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
            div.id = "Rezept" + i;
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

            let zutatSechs: HTMLElement = document.createElement("p");
            zutatSechs.innerHTML = "Sechste Zutat: " + rezepteArray[i].zutatSechs;
            div.appendChild(zutatSechs);

            let zutatSieben: HTMLElement = document.createElement("p");
            zutatSieben.innerHTML = "Siebte Zutat: " + rezepteArray[i].zutatSieben;
            div.appendChild(zutatSieben);

            let zutatAcht: HTMLElement = document.createElement("p");
            zutatAcht.innerHTML = "Achte Zutat: " + rezepteArray[i].zutatAcht;
            div.appendChild(zutatAcht);

            let zutatNeun: HTMLElement = document.createElement("p");
            zutatNeun.innerHTML = "Neunte Zutat: " + rezepteArray[i].zutatNeun;
            div.appendChild(zutatNeun);

            let zutatZehn: HTMLElement = document.createElement("p");
            zutatZehn.innerHTML = "Zehnte Zutat: " + rezepteArray[i].zutatZehn;
            div.appendChild(zutatZehn);

            let buttonFavorisieren: HTMLButtonElement = document.createElement("button");
            buttonFavorisieren.id = "buttonFavorisieren" + i;
            buttonFavorisieren.classList.add("favorisierenButtonClass");
            buttonFavorisieren.innerHTML = "Favorisieren";
            buttonFavorisieren.addEventListener("click", favorisieren);
            div.appendChild(buttonFavorisieren);
        }
    }


    function favorisieren(_event: Event): void {
        let localstorageArray: string[] = [];

        let targetZaehler: string = (<HTMLDivElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("target")!;
        (<HTMLDivElement>document.getElementById("buttonFavorisieren" + targetZaehler)).innerHTML = "Entfavorisieren";

        if (localStorage.i) {
            localStorage.i = Number(localStorage.i) + 1;
        } else {
            localStorage.i = 1;
          }

        localstorageArray[localStorage.i] = document.getElementById("Rezept" + targetZaehler)?.innerHTML!;
        localStorage.setItem("favoriten" + localStorage.i, localstorageArray[localStorage.i]);
        console.log(localStorage.i);
    }

    function uebertragen(): void {
        let favoritenArray: string[] = [];
        
        for (let i: number = 1; i <= localStorage.i; i++) {
            favoritenArray[i] = localStorage.getItem("favoriten" + i)!;
            let xDiv: HTMLDivElement = document.createElement("div");
            xDiv.id = "rezept" + i;
            xDiv.classList.add("rezepteClass");
            xDiv.innerHTML = favoritenArray[i];
            document.getElementById("favorit")?.appendChild(xDiv);
        }
    }
}