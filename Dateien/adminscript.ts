

namespace Pruefungsabgabe {

    let tabellenHeader: string =


        "<tr>" +

        "<th>Artikel</th>" +
        "<th>Status</th>" +
        "<th>Name</th>" +
        "<th>Mail</th>" +
        "<th>Verwalten</th>" +

        "</tr>";



    let tabellenCode: string =

        "<tr>" +

        "<td class=\"artikel\"></td>" +
        "<td class=\"status\"></td>" +
        "<td class=\"name\"></td>" +
        "<td class=\"email\"></td>" +
        "<td> <button class=\"buttonausgeliehen\"> Ausgeliehen </button> <button class=\"buttonfrei\"> Frei </button> </td>" +

        "</tr>";






    let tabelle: HTMLTableElement = <HTMLTableElement>document.getElementById("tabelle");
    let artikel: HTMLCollection = document.getElementsByClassName("artikel");
    let status: HTMLCollection = document.getElementsByClassName("status");
    let name: HTMLCollection = document.getElementsByClassName("name");
    let email: HTMLCollection = document.getElementsByClassName("email");
    let buttonAusgeliehen: HTMLCollection = document.getElementsByClassName("buttonausgeliehen");
    let buttonFrei: HTMLCollection = document.getElementsByClassName("buttonfrei");


    getData();


    async function getData(): Promise<void> {

        let response: Response = await fetch("https://pruefungsabgabe.herokuapp.com/");
        let json: string = await response.text();
        let data: Daten[] = JSON.parse(json);
        buildSite(data);

    }


    function buildSite(_data: Daten[]): void {

        tabelle.innerHTML = tabellenHeader;

        for (let x: number = 0; x < _data.length; x++) { //Baue alle Tabelleneinträge

            tabelle.innerHTML = tabelle.innerHTML + tabellenCode;



            artikel[x].textContent = _data[x].name;
            status[x].textContent = _data[x].status;

            if (_data[x].ausleihname != "") { name[x].textContent = _data[x].ausleihname; }
            else { name[x].textContent = " -- "; }

            if (_data[x].ausleihemail != "") { email[x].textContent = _data[x].ausleihemail; }
            else { email[x].textContent = " -- "; }

        }


        for (let x: number = 0; x < _data.length; x++) {

            buttonAusgeliehen[x].addEventListener("click", function (): void { send(_data[x]._id, "ausgeliehen"); });
            buttonFrei[x].addEventListener("click", function (): void { send(_data[x]._id, "frei"); });

            if (_data[x].status == "frei") {

                buttonFrei[x].className = "buttonfrei buttongrau"; buttonFrei[x].toggleAttribute("disabled");
                buttonAusgeliehen[x].className = "buttonausgeliehen buttongrau"; buttonAusgeliehen[x].toggleAttribute("disabled");

            }

            if (_data[x].status == "ausgeliehen") {

                buttonAusgeliehen[x].className = "buttonausgeliehen buttongrau"; buttonAusgeliehen[x].toggleAttribute("disabled");

            }

        }

    }



    async function send(_id: string, _operation: string): Promise<void> {


        let formString: URLSearchParams = new URLSearchParams();

        formString.append("Email", "asta.furtwangen");
        formString.append("Name", "Asta");
        formString.append("_id", _operation);
        formString.append("_id", _id);






        //Senden und fetchen der Antwort
        await fetch("https://pruefungsabgabe.herokuapp.com/", {

            method: "POST",

            body: formString
        });

        clearSite();



    }

    function clearSite(): void {

        tabelle.innerHTML = "";

        getData();

    }

    interface Daten {

        _id: string;
        name: string;
        produktbild: string;
        beschreibung: string;
        preis: number;
        status: string;
        ausleihname: string;
        ausleihemail: string;



    }


}