"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let checkFormResponse = document.getElementById("checkformresponse");
    let saveReserve = document.getElementById("savereservieren");
    let form = document.getElementById("form");
    let formString = new URLSearchParams(sessionStorage.getItem("data"));
    saveReserve.addEventListener("click", function () { checkForm(2, formString); });
    function checkForm(_formSize, _formString) {
        let formFilled = 0;
        let checkMail = 0;
        let formValues = new FormData(form);
        for (let entry of formValues.values()) {
            if (entry != "") {
                formFilled++;
            } //Alle felder ausgefüllt?
            if (entry.toString().includes("@")) {
                checkMail++;
            } //Email auf @ überprüfen
        }
        if (formFilled < _formSize) {
            checkFormResponse.innerText = "Bitte füllen Sie das Formular vollständig aus";
        }
        else if (checkMail != 1) {
            checkFormResponse.innerText = "Bitte verwenden Sie eine echte Email";
        }
        else {
            send(_formString);
        }
        async function send(_data) {
            let formData = new FormData(form);
            let formString = new URLSearchParams(formData);
            formString.append("_id", "user");
            for (let entry of _data.values()) {
                formString.append("_id", entry);
            }
            //Senden und fetchen der Antwort
            let response = await fetch("https://pruefungsabgabe.herokuapp.com/", {
                method: "POST",
                body: formString
            });
            let data = await response.text();
            if (data == "Erfolg") {
                refreshData();
            }
            else
                (checkFormResponse.innerText = "Da hat etwas nicht funktioniert. Bitte erneut versuchen");
        }
    }
    function refreshData() {
        sessionStorage.clear();
        window.open("/GIS-WiSe-2020-2021/Prüfungsabgabe/AStA_Verleih.html", "_self");
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=regscript.js.map