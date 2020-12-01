namespace Aufgabe2_3 {

    let mensch: Menschen = konvertierer();

    window.addEventListener("load", laden);

    async function laden(): Promise<void> {

        let response: Response = await fetch("data.json");
        let data: any = await response.json();

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
                break;
        } 
    }

    function zusammensetzen(): void {
        console.log(localStorage.getItem("Kopf"));
        console.log(localStorage.getItem("Körper"));
        console.log(localStorage.getItem("Bein"));

        document.getElementById("BildKoerperteil").setAttribute("src", localStorage.getItem("Kopf"));
        document.getElementById("BildKoerperteil1").setAttribute("src", localStorage.getItem("Körper"));
        document.getElementById("BildKoerperteil2").setAttribute("src", localStorage.getItem("Bein"));
    }

  
    function createButtons(_KTeilArray: KTeil[]): void {
        let button: HTMLDivElement = <HTMLDivElement> document.getElementById("dropdown-content");
        for (let i: number = 0; i < _KTeilArray.length; i++) {
            let newA: HTMLAnchorElement = document.createElement("a");
            newA.id = _KTeilArray[i].typ + i;
            newA.addEventListener("click", function (): void { wechseln(_KTeilArray[i]); });
            newA.innerHTML = _KTeilArray[i].name + " " + _KTeilArray[i].typ;
            button.appendChild(newA);
        }
    }

    function wechseln(_KoerperTeile: KTeil): void {

        document.getElementById("BildKoerperteil").setAttribute("src", _KoerperTeile.source);
        localStorage.setItem(_KoerperTeile.typ, _KoerperTeile.source);
    }

    konvertierer();

    function konvertierer(): Menschen {
        let m2: Menschen = JSON.parse("allKopf");
        return m2;
    }
}