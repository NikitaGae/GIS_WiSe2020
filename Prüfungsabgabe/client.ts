namespace Pruefungsabgabe {

    interface LogIn {
        vorname: string;
        nachname: string;
        studiengang: string;
        semesterangabe: string;
    }

    export let userArray: LogIn[];

    let sendenButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("senden");

    main();

    async function main(): Promise<void> {
        let location: string[] = window.location.pathname.split("/");
        let teil: string = location[location.length - 1];
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url: string = "http://localhost:8100";

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

                (<HTMLDivElement>document.getElementById("profil")).innerHTML = localStorage.getItem("response");
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
    async function communicate(_url: RequestInfo): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let antwortHTML: string = await response.text();
        let antwortSplit: string[] = antwortHTML.split("$");
        console.log(antwortSplit[0]);
        //console.log(antwortSplit[1]);
        

        if (antwortSplit[0] == "User") {
            window.open("hauptseite.html");
            localStorage.setItem("response", antwortHTML);
            //(<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;

        } else if (antwortSplit[0] == "Erstellt") {
            window.open("hauptseite.html");
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;

        } else if (antwortSplit[0] == "Profil") {
            localStorage.setItem("response", antwortHTML);


        } else if (antwortSplit[0] == "Nutzer") {
            if (antwortSplit[1] != "[]") {
                userArray = JSON.parse(antwortSplit[1]);
                console.log(userArray);
            }
            createUser();
        } else if (antwortSplit[0] == "hauptseite") {
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        }
    }

    async function senden(): Promise<void> {
        let myText: string = "Nachricht= ";
        myText += document.getElementById("subject").nodeValue;
        let url: string = "http://localhost:8100/hauptseite";
        url = url + "?" + myText;
        localStorage.getItem("");
    }

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

    function handleFolgen(_event: Event): void {
        let targetZaehler: string = (<HTMLDivElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("target")!;
        (<HTMLDivElement>document.getElementById("buttonFolgen" + targetZaehler)).innerHTML = "Entfolgen";
    }
}