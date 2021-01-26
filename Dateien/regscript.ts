

namespace Pruefungsabgabe {


    let checkFormResponse: HTMLElement = document.getElementById("checkformresponse");
    let saveReserve: HTMLElement = document.getElementById("savereservieren");
    let form: HTMLFormElement = <HTMLFormElement>document.getElementById("form");

    let formString: URLSearchParams = new URLSearchParams(sessionStorage.getItem("data"));

    saveReserve.addEventListener("click", function (): void { checkForm(2, formString); });



    function checkForm(_formSize: number, _formString: URLSearchParams): void {

        let formFilled: number = 0;
        let checkMail: number = 0;

        let formValues: FormData = new FormData(form);



        for (let entry of formValues.values()) {
            if (entry != "") { formFilled++; } //Alle felder ausgefüllt?
            if (entry.toString().includes("@")) { checkMail++; } //Email auf @ überprüfen
        }



        if (formFilled < _formSize) { checkFormResponse.innerText = "Bitte füllen Sie das Formular vollständig aus"; }
        else if (checkMail != 1) { checkFormResponse.innerText = "Bitte verwenden Sie eine echte Email"; }
        else { send(_formString); }



        async function send(_data: URLSearchParams): Promise<void> {

            let formData: FormData = new FormData(form);
            let formString: URLSearchParams = new URLSearchParams(<URLSearchParams>formData);
            formString.append("_id", "user");

            for (let entry of _data.values()) {

                formString.append("_id", entry);
            }



            //Senden und fetchen der Antwort
            let response: Response = await fetch("https://pruefungsabgabe.herokuapp.com/", {
                method: "POST",

                body: formString
            });

            let data: string = await response.text();


            if (data == "Erfolg") {

                refreshData();

            }
            else (checkFormResponse.innerText = "Da hat etwas nicht funktioniert. Bitte erneut versuchen");





        }
    }



    function refreshData(): void {

        sessionStorage.clear();
        window.open("/GIS-WiSe-2020-2021/Prüfungsabgabe/AStA_Verleih.html", "_self");



    }
}
