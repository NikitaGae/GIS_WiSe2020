namespace Pruefungsabgabe {

    interface LogIn {
        _id: string;
        vorname: string;
        nachname: string;
        studiengang: string;
        semesterangabe: string;
        beitraege: string[];
    }

    export let userArray: LogIn[];

    let sendenButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("senden");

    main();

    async function main(): Promise<void> {
        let location: string[] = window.location.pathname.split("/");
        let teil: string = location[location.length - 1];
        let url: string = "https://testgiswise2020.herokuapp.com";
        //let url: string = "http://localhost:8100";

        let knopf: HTMLButtonElement;

        switch (teil) {
            case "registrieren.html":
                url += "/registrieren";
                knopf = <HTMLButtonElement>document.getElementById("knopf");
                knopf.addEventListener("click", function (): void { communicate(url); });
                break;
            case "anmelden.html":
                url += "/anmelden";
                knopf = <HTMLButtonElement>document.getElementById("knopf");
                knopf.addEventListener("click", function (): void { communicate(url); });
                //knopf.addEventListener("click", nachrichtenAbrufen);
                break;
            case "nutzer.html":
                url += "/nutzer";
                await communicate(url);
                break;
            case "profil.html":
                url += "/profil";
                (<HTMLDivElement>document.getElementById("profil")).innerHTML = localStorage.getItem("responseUser");               
                break;
            case "hauptseite.html":
                url += "/hauptseite";
                (<HTMLDivElement>document.getElementById("divNachrichten")).innerHTML = localStorage.getItem("responseNachricht");
                sendenButton.addEventListener("click", senden);
                break;
        }
    }

    //hier werden die server antworten in das div mit der id text geschrieben
    async function communicate(_url: RequestInfo): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let antwortHTML: string = await response.text();
        console.log(antwortHTML);
        let antwortSplit: string[] = antwortHTML.split("$");
        console.log(antwortSplit[2]);

        if (antwortSplit[0] == "User") {
            window.open("hauptseite.html");
            localStorage.setItem("responseUser", antwortSplit[1]);
            localStorage.setItem("responseNachricht", antwortSplit[3]);
            await nachrichtenAbrufen();
            //(<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;

        } else if (antwortSplit[0] == "Erstellt") {
            window.open("hauptseite.html");
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;

        } else if (antwortSplit[0] == "Profil") {
            localStorage.setItem("response", antwortHTML);

        } else if (antwortSplit[0] == "Nutzer") {
            if (antwortSplit[1] != "[]") {
                userArray = JSON.parse(antwortSplit[1]);
            }
            createUser();
        } else if (antwortSplit[0] == "Nachricht") {
            (<HTMLDivElement>document.getElementById("divNachrichten")).innerHTML = antwortHTML;
        }
    }


    async function nachrichtenAbrufen(): Promise<void> {
        let id: LogIn = JSON.parse(localStorage.getItem("responseNachricht"));
        let form: HTMLFormElement = <HTMLFormElement>document.getElementById("subjectForm");
        let formdata: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        query.append("id", id._id);

        let url: string = "http://localhost:8100/hauptseite";
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        let antwortHTML: string = await response.text();
        let antwortSplit: string[] = JSON.parse(antwortHTML.split("$")[1]);

        let safe: HTMLDivElement = (<HTMLDivElement>document.getElementById("divNachrichten"));

        for (let i: number = 0; i < antwortSplit.length; i++) {
            let divNachricht: HTMLDivElement = <HTMLDivElement>document.createElement("div");
            divNachricht.innerHTML = antwortSplit[i];
            safe.appendChild(divNachricht);
            divNachricht.classList.add("alleNachrichten");
        }
    }

    //hier wird für jede Nachricht ein div erstellt und die Nachricht ins div iengefügt
    async function senden(): Promise<void> {
        let id: LogIn = JSON.parse(localStorage.getItem("response"));
        let form: HTMLFormElement = <HTMLFormElement>document.getElementById("subjectForm");
        let formdata: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        query.append("id", id._id);

        let url: string = "http://localhost:8100/hauptseite";
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        let antwortHTML: string = await response.text();
        let antwortSplit: string[] = antwortHTML.split("$");
        //(<HTMLDivElement>document.getElementById("divNachrichten")).innerHTML = antwortSplit[1];

        let safe: HTMLDivElement = (<HTMLDivElement>document.getElementById("divNachrichten"));
        let divNachricht: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        divNachricht.innerHTML = antwortSplit[1];
        safe.appendChild(divNachricht);
        divNachricht.classList.add("alleNachrichten");
    }

    //Jeder Nutzer wird unter einander aufgeschrieben und jedem nutzer wird ein Button zugewiesen 
    async function createUser(): Promise<void> {
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
            buttonFolgen.classList.add("folgenButtonClass");
            buttonFolgen.innerHTML = "Folgen";
            buttonFolgen.addEventListener("click", handleFolgen);
            div.appendChild(buttonFolgen);
        }
    }

    //function damit man anderen Nutzern Folgen kann
    function handleFolgen(_event: Event): void {
        let targetZaehler: string = (<HTMLDivElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("target")!;
        (<HTMLDivElement>document.getElementById("buttonFolgen" + targetZaehler)).innerHTML = "Entfolgen";
    }
}