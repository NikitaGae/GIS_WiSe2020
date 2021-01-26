namespace Pruefungsabgabe {




    let produktCode: string =  //--> String in div mit id= insert einfügen


        "<div class=\"produkt\">" +

        "<label  >" +
        "<input type=\"checkbox\" class=\"checkbox\" >" +
        "</label>" +

        "<div class=\"container\">" +


        "<img class=\"produktbild\">" +  //--> hier src für Image einfügen

        "<button class=\"detailbutton\">Details</button>" +

        "</div>" +


        "</div>" +

        "<div class=\"detailhide\">" +

        "<div class=\"detaildiv\">" +

        "<p class=\"information\"></p>" + //--> hier informationen einfügen. Nach jeder Info zwei <br> einfügen
        "<button class=\"auswahl\">Auswählen</button>" +
        "</div>" +

        "<p class=\"schließen\">(Zum schließen Fenster anklicken)</p>" +

        "</div>";





    let detailButtons: HTMLCollection = document.getElementsByClassName("detailbutton");
    let detailSeitenShow: HTMLCollection = document.getElementsByClassName("detailshow");
    let detailSeitenHide: HTMLCollection = document.getElementsByClassName("detailhide");
    let auswahlButtons: HTMLCollection = document.getElementsByClassName("auswahl");
    let insertDiv: HTMLElement = document.getElementById("insert");
    let produktBild: HTMLCollection = document.getElementsByClassName("produktbild");
    let information: HTMLCollection = document.getElementsByClassName("information");
    let produktDiv: HTMLCollection = document.getElementsByClassName("produkt");
    let containerDiv: HTMLCollection = document.getElementsByClassName("container");
    let cartText: HTMLElement = document.getElementById("carttext");
    let reserveButton: HTMLElement = document.getElementById("reservieren");
    let checkFormResponse: HTMLElement = document.getElementById("checkformresponse");


    let reload: number = 0; //verhindert mehrfache Events
    let checkboxen: HTMLCollectionOf<HTMLInputElement> = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName("checkbox");





    getData();




    async function getData(): Promise<void> {
        let response: Response = await fetch("https://pruefungsabgabe.herokuapp.com/");
        let json: string = await response.text();
        let data: Daten[] = JSON.parse(json);
        buildSite(data);



    }







    async function save(_data: Daten[]): Promise<void> {

        let cartFilled: number = 0;

        for (let x: number = 0; x < checkboxen.length; x++) {

            if (checkboxen[x].checked) { cartFilled++; }
        }
        if (cartFilled == 0) { checkFormResponse.innerText = "Es befinden sich keine Artikel in Ihrer Auswahl"; } //Etwas ausgewählt?

        //Daten in SessionStorage
        else {

            let formString: URLSearchParams = new URLSearchParams();


            for (let x: number = 0; x < checkboxen.length; x++) {

                if (checkboxen[x].checked) { formString.append("_id", _data[x]._id); }
            }

            sessionStorage.setItem("data", formString.toString());


            window.open("/GIS-WiSe-2020-2021/Prüfungsabgabe/AStA_Reg.html", "_self");
        }
    }



    function buildSite(_data: Daten[]): void {





        for (let x: number = 0; x < _data.length; x++) { //Build all Produkte

            insertDiv.innerHTML = insertDiv.innerHTML + produktCode;
            produktBild[x].setAttribute("src", _data[x].produktbild);
            information[x].innerHTML = "Name: " + _data[x].name + "<br>" + "<br>" + "Beschreibung: " + _data[x].beschreibung + "<br>" + "<br>" + "Ausleihgebühr: " + _data[x].preis + "€" + "<br>" + "<br>";

            if (_data[x].status != "frei") { produktDiv[x].className = "produkt produktgrey"; containerDiv[x].className = "container containergrey"; checkboxen[x].toggleAttribute("disabled"); }



        }



        showhideDetail(); //Eventlistener auf jeden Knopf, der die Details öffnet + Details schließen


        auswahlEvent(_data); //Auswählen auf der Detailseite checked die Checkmark

        onetimeEvent(_data); //verhindert mehrfache Eventlistener nach neuem getdata




    }


    function onetimeEvent(_data: Daten[]): void {


        if (reload == 0) {
            window.addEventListener("click", function (): void { auswahlRefresh(_data); }); //liest alle gecheckten checkboxen + addiert Gebühr + schreibt sie hin

            reserveButton.addEventListener("click", function (): void { save(_data); });
            reload++;
        }


    }


    function auswahlRefresh(_data: Daten[]): void {

        let currentPrice: number = 0;

        for (let x: number = 0; x < checkboxen.length; x++) {

            if (currentPrice != 0) { checkFormResponse.innerText = ""; }
            if (checkboxen[x].checked && _data[x].status == "frei") { currentPrice += _data[x].preis; cartText.innerHTML = "Gesamte Leihgebühr: " + currentPrice.toString() + "€"; }
            else { cartText.innerHTML = "Gesamte Leihgebühr: " + currentPrice.toString() + "€"; }

        }

    }



    function auswahlEvent(_data: Daten[]): void {

        for (let x: number = 0; x < _data.length; x++) {

            if (_data[x].status == "frei") {
                auswahlButtons[x].addEventListener("click", function (): void { checkboxen[x].checked = true; });
            }
            else { auswahlButtons[x].className = "auswahl auswahlgrey"; auswahlButtons[x].toggleAttribute("disabled"); }

        }
    }




    function showhideDetail(): void {

        for (let x: number = 0; x < detailButtons.length; x++) {

            detailButtons[x].addEventListener("click", function (): void { if (detailSeitenShow.length < 1) { detailSeitenHide[x].classList.replace("detailhide", "detailshow"); } });

        }

        for (let x: number = 0; x < detailSeitenHide.length; x++) {

            detailSeitenHide[x].addEventListener("click", function (): void { detailSeitenShow[0].classList.replace("detailshow", "detailhide"); });

        }

    }




    interface Daten {

        _id: string;
        name: string;
        produktbild: string;
        beschreibung: string;
        preis: number;
        status: string;



    }





}