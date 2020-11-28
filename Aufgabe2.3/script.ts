namespace Aufgabe2_3 {

    let mensch: Menschen = konvertierer();

    document.getElementById("erster").addEventListener("click", function(): void {wechseln(mensch.allKopf[0]); });
    document.getElementById("zweiter").addEventListener("click", function(): void {wechseln(mensch.allKopf[1]); });
    document.getElementById("dritter").addEventListener("click", function(): void {wechseln(mensch.allKopf[2]); });
    window.addEventListener("load", laden);

    function laden(): void {
        wechseln(mensch.allKopf[0]);
    }

    function wechseln(_Kopf: Kopf): void {

        switch (_Kopf.name) {
            case mensch.allKopf[0].name: 
                    document.getElementById("bilder").setAttribute("src", _Kopf.source);
                    localStorage.setItem("Name", "Erster");
                    console.log(localStorage.getItem("Name"));
                    break;
            case mensch.allKopf[1].name: 
                    document.getElementById("bilder").setAttribute("src", _Kopf.source);
                    localStorage.setItem("Name", "Zweiter");
                    console.log(localStorage.getItem("Name"));
                    break;
            case mensch.allKopf[2].name: 
                    document.getElementById("bilder").setAttribute("src", _Kopf.source);
                    localStorage.setItem("Name", "Dritter");
                    console.log(localStorage.getItem("Name"));
                    break;
        }
    }

    konvertierer();

    function konvertierer(): Menschen {
        let m2: Menschen = JSON.parse(m1JSON);
        console.log(m2.allKopf[0].name);
        //console.log(m2.allBeine[0].name);
        return m2;
    }
}