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
                break;
            case "profil.html":
                url += "/profil";
                (<HTMLDivElement>document.getElementById("profil")).innerHTML = localStorage.getItem("response");
                break;
            case "hauptseite.html":
                url += "/hauptseite";
                sendenButton.addEventListener("click", senden);
                await communicate(url); 
                break;
        }
    }
    //hier werden die server antworten in das div mit der id text geschrieben
    async function communicate(_url: RequestInfo): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let antwortHTML: string = await response.text();
        let antwortSplit: string[] = antwortHTML.split("$");
        console.log(antwortSplit[0]); 

        if (antwortSplit[0] == "User") {
            window.open("hauptseite.html");
            localStorage.setItem("response", antwortSplit[1]);
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
        } else if (antwortSplit[0] == "hauptseite") {
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        }
    }

    async function senden(): Promise<void> {
        //let myText: string = "Nachricht= ";
        //myText += (<HTMLTextAreaElement>document.getElementById("subject")).value; */
        /* let userJSON: LogIn = JSON.parse(localStorage.getItem("response"));
        let abschicken: Daten = {_id: userJSON._id, nachricht: (<HTMLTextAreaElement>document.getElementById("subject")).value};
        let url: string = "http://localhost:8100/hauptseite";
        url = url + "?" + JSON.stringify(abschicken);
        console.log(url);
        await communicate(url); */




        /* let userJSON: LogIn = JSON.parse(localStorage.getItem("response"));
        let abschicken: Daten = {_id: userJSON._id, nachricht: (<HTMLFormElement>document.getElementById("subjectForm")).value};
        

        let query: URLSearchParams = new URLSearchParams(JSON.stringify(abschicken));
        
        let url: string = "http://localhost:8100/hauptseite";
        url = url + "?" + query.toString();
        console.log(url);
        await communicate(url); */

        let id: LogIn = JSON.parse(localStorage.getItem("response"));
        let form: HTMLFormElement = <HTMLFormElement> document.getElementById("subjectForm");
        let formdata: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<URLSearchParams>formdata);
        query.append("id" , id._id);
        
        let url: string = "http://localhost:8100/hauptseite";
        url = url + "?" + query.toString();
        console.log(url);
        let response: Response = await fetch(url);
        let antwortHTML: string = await response.text();
        console.log(antwortHTML);
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

    function handleFolgen(_event: Event): void {
        let targetZaehler: string = (<HTMLDivElement>(<HTMLElement>_event.currentTarget).parentElement).getAttribute("target")!;
        (<HTMLDivElement>document.getElementById("buttonFolgen" + targetZaehler)).innerHTML = "Entfolgen";
    }
}