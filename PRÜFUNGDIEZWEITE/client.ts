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
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url: string = "http://localhost:8100";

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
            let zutatenDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            let komplettDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");

            zutatenDiv.id = "ausgewaehltesRezept" + i;
            zutatenDiv.classList.add("alleRezepte");
            document.getElementById("text").appendChild(komplettDiv);
            komplettDiv.setAttribute("target", i.toString());
            komplettDiv.appendChild(zutatenDiv);

            let zutatEins: HTMLElement = document.createElement("p");
            zutatEins.innerHTML = "Erste Zutat: " + rezepteArray[i].zutatEins;
            zutatenDiv.appendChild(zutatEins);

            let zutatZwei: HTMLElement = document.createElement("p");
            zutatZwei.innerHTML = "Zweite Zutat: " + rezepteArray[i].zutatZwei;
            zutatenDiv.appendChild(zutatZwei);

            let zutatDrei: HTMLElement = document.createElement("p");
            zutatDrei.innerHTML = "Dritte Zutat: " + rezepteArray[i].zutatDrei;
            zutatenDiv.appendChild(zutatDrei);

            let zutatVier: HTMLElement = document.createElement("p");
            zutatVier.innerHTML = "Vierte Zutat: " + rezepteArray[i].zutatVier;
            zutatenDiv.appendChild(zutatVier);

            let zutatFuenf: HTMLElement = document.createElement("p");
            zutatFuenf.innerHTML = "Fünfte Zutat: " + rezepteArray[i].zutatFuenf;
            zutatenDiv.appendChild(zutatFuenf);

            let zutatSechs: HTMLElement = document.createElement("p");
            zutatSechs.innerHTML = "Sechste Zutat: " + rezepteArray[i].zutatSechs;
            zutatenDiv.appendChild(zutatSechs);

            let zutatSieben: HTMLElement = document.createElement("p");
            zutatSieben.innerHTML = "Siebte Zutat: " + rezepteArray[i].zutatSieben;
            zutatenDiv.appendChild(zutatSieben);

            let zutatAcht: HTMLElement = document.createElement("p");
            zutatAcht.innerHTML = "Achte Zutat: " + rezepteArray[i].zutatAcht;
            zutatenDiv.appendChild(zutatAcht);

            let zutatNeun: HTMLElement = document.createElement("p");
            zutatNeun.innerHTML = "Neunte Zutat: " + rezepteArray[i].zutatNeun;
            zutatenDiv.appendChild(zutatNeun);

            let zutatZehn: HTMLElement = document.createElement("p");
            zutatZehn.innerHTML = "Zehnte Zutat: " + rezepteArray[i].zutatZehn;
            zutatenDiv.appendChild(zutatZehn);

            let buttonFavorisieren: HTMLButtonElement = document.createElement("button");
            buttonFavorisieren.id = "buttonFavorisieren" + i;
            buttonFavorisieren.classList.add("favorisierenButtonClass");
            buttonFavorisieren.innerHTML = "Favorisieren";
            buttonFavorisieren.addEventListener("click", favorisieren);
            komplettDiv.appendChild(buttonFavorisieren);
        }
    }

    function uebertragen(): void {
        let favoritenArray: string[] = [];

        for (let i: number = 1; i <= localStorage.i; i++) {
            favoritenArray[i] = localStorage.getItem("favoriten" + i)!;

            let kopierenDiv: HTMLDivElement = document.createElement("div");
            kopierenDiv.id = "rezept" + i;
            kopierenDiv.classList.add("rezepteClass");
            kopierenDiv.innerHTML = favoritenArray[i];
            document.getElementById("favorit")?.appendChild(kopierenDiv);

            let buttonEntfavorisieren: HTMLButtonElement = document.createElement("button");
            buttonEntfavorisieren.id = "buttonEntfavorisieren" + i;
            buttonEntfavorisieren.classList.add("entfavorisierenButtonClass");
            buttonEntfavorisieren.innerHTML = "Entfavorisieren";
            buttonEntfavorisieren.addEventListener("click", entfavorisieren);
            kopierenDiv.appendChild(buttonEntfavorisieren);
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

        localstorageArray[localStorage.i] = document.getElementById("ausgewaehltesRezept" + targetZaehler)?.innerHTML!;
        localStorage.setItem("favoriten" + localStorage.i, localstorageArray[localStorage.i]);
    }

    function entfavorisieren(_event: Event): void {
        let targetZaehler: string = (<HTMLDivElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("target")!;
        localStorage.removeItem("favoriten" + targetZaehler);
        console.log(targetZaehler);
    }

}