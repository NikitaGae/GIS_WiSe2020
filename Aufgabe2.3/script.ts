namespace Aufgabe2_3 {
    
    //deklerationen
    let mensch: Menschen;
    const element: HTMLElement = document.body;

    window.addEventListener("load", work);

    //interfaces

    export interface KTeil {
        name: string;
        source: string;
        typ: string;
    }

    export interface Menschen {
        allKopf: KTeil[];
        allKoerper: KTeil[];
        allBeine: KTeil[];
    }

    export interface Meldung {
        error: string;
        message: string;
    }

    //damit konvertierer und laden richtig ablaufen

    async function work(): Promise<void> {
        await konvertierer();
        laden();
    }

    //soll erkennen auf welcher seite man sich befindet und damit immer das erste bild angezeigt wird 

    function laden(): void {

        let location: string[] = window.location.pathname.split("/");
        let teil: string = location[location.length - 1];
        console.log(teil);
        switch (teil) {
            case "index.html":
                wechseln(mensch.allKopf[0]);
                createButtons(mensch.allKopf);
                break;
            case "koerper.html":
                wechseln(mensch.allKoerper[0]);
                createButtons(mensch.allKoerper);
                break;
            case "beine.html":
                wechseln(mensch.allBeine[0]);
                createButtons(mensch.allBeine);
                break;
            case "final.html":
                zusammensetzen();
                communicate("https://gis-communication.herokuapp.com");
                break;
        }
    }

    //Bilder werden im sessionStorage abgespeichert und auf der endseite wieder zusammengesetzt

    function zusammensetzen(): void {
        console.log(sessionStorage.getItem("Kopf"));
        console.log(sessionStorage.getItem("Körper"));
        console.log(sessionStorage.getItem("Bein"));

        document.getElementById("bildKoerperteil").setAttribute("src", sessionStorage.getItem("Kopf"));
        document.getElementById("bildKoerperteil1").setAttribute("src", sessionStorage.getItem("Körper"));
        document.getElementById("bildKoerperteil2").setAttribute("src", sessionStorage.getItem("Bein"));
    }
    
    //Je nachdem wie viele Körperteile es gibt werden Buttons erstellt 

    function createButtons(_KTeilArray: KTeil[]): void {
        let button: HTMLDivElement = <HTMLDivElement>document.getElementById("dropdown-content");
        for (let i: number = 0; i < _KTeilArray.length; i++) {
            let newA: HTMLAnchorElement = document.createElement("a");
            newA.id = _KTeilArray[i].typ + i;
            newA.addEventListener("click", function (): void { wechseln(_KTeilArray[i]); });
            newA.innerHTML = _KTeilArray[i].name + " " + _KTeilArray[i].typ;
            button.appendChild(newA);
        }
    }

    //Nimmt das bild aus der json um es dann in der html anzuzeigen

    function wechseln(_KoerperTeile: KTeil): void {
        console.log(_KoerperTeile);
        document.getElementById("bildKoerperteil").setAttribute("src", _KoerperTeile.source);
        sessionStorage.setItem(_KoerperTeile.typ, _KoerperTeile.source);
    }

    //serverkommunikation um error oder erfolgreiche kommunikation anzuzeigen

    async function communicate(_url: RequestInfo): Promise<void> {
        let query: URLSearchParams = new URLSearchParams(<any>sessionStorage);
        _url = _url + "?" + query.toString();

        let response: Response = await fetch(_url);
        let antwort: Meldung = await response.json();
        console.log(antwort);

        if (antwort.error) {
            console.log("Failure", antwort);
            let meldung: HTMLDivElement = <HTMLDivElement>document.getElementById("meldung");
            meldung.style.backgroundColor = "red";
            let p1: HTMLParagraphElement = document.createElement("p");
            p1.innerText = "Server:" + " " + antwort.error;
            element.appendChild(p1);
        } else {
            console.log("Success", antwort);
            let meldung: HTMLDivElement = <HTMLDivElement>document.getElementById("meldung");
            meldung.style.backgroundColor = "green";
            let p1: HTMLParagraphElement = document.createElement("p");
            p1.innerText = "Server:" + " " + antwort.message;
            element.appendChild(p1);
        }
    }

    //von json in ts umwandeln

    async function konvertierer(): Promise<Menschen> {
        let response: Response = await fetch("data.json");
        mensch = await response.json();
        console.log(mensch);
        return mensch;
    }
}