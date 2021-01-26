"use strict";
var Pruefungsabgabe;
(function (Pruefungsabgabe) {
    let tabellenHeader = "<tr>" +
        "<th>Artikel</th>" +
        "<th>Status</th>" +
        "<th>Name</th>" +
        "<th>Mail</th>" +
        "<th>Verwalten</th>" +
        "</tr>";
    let tabellenCode = "<tr>" +
        "<td class=\"artikel\"></td>" +
        "<td class=\"status\"></td>" +
        "<td class=\"name\"></td>" +
        "<td class=\"email\"></td>" +
        "<td> <button class=\"buttonausgeliehen\"> Ausgeliehen </button> <button class=\"buttonfrei\"> Frei </button> </td>" +
        "</tr>";
    let tabelle = document.getElementById("tabelle");
    let artikel = document.getElementsByClassName("artikel");
    let status = document.getElementsByClassName("status");
    let name = document.getElementsByClassName("name");
    let email = document.getElementsByClassName("email");
    let buttonAusgeliehen = document.getElementsByClassName("buttonausgeliehen");
    let buttonFrei = document.getElementsByClassName("buttonfrei");
    getData();
    async function getData() {
        let response = await fetch("https://pruefungsabgabe.herokuapp.com/");
        let json = await response.text();
        let data = JSON.parse(json);
        buildSite(data);
    }
    function buildSite(_data) {
        tabelle.innerHTML = tabellenHeader;
        for (let x = 0; x < _data.length; x++) { //Baue alle Tabelleneinträge
            tabelle.innerHTML = tabelle.innerHTML + tabellenCode;
            artikel[x].textContent = _data[x].name;
            status[x].textContent = _data[x].status;
            if (_data[x].ausleihname != "") {
                name[x].textContent = _data[x].ausleihname;
            }
            else {
                name[x].textContent = " -- ";
            }
            if (_data[x].ausleihemail != "") {
                email[x].textContent = _data[x].ausleihemail;
            }
            else {
                email[x].textContent = " -- ";
            }
        }
        for (let x = 0; x < _data.length; x++) {
            buttonAusgeliehen[x].addEventListener("click", function () { send(_data[x]._id, "ausgeliehen"); });
            buttonFrei[x].addEventListener("click", function () { send(_data[x]._id, "frei"); });
            if (_data[x].status == "frei") {
                buttonFrei[x].className = "buttonfrei buttongrau";
                buttonFrei[x].toggleAttribute("disabled");
                buttonAusgeliehen[x].className = "buttonausgeliehen buttongrau";
                buttonAusgeliehen[x].toggleAttribute("disabled");
            }
            if (_data[x].status == "ausgeliehen") {
                buttonAusgeliehen[x].className = "buttonausgeliehen buttongrau";
                buttonAusgeliehen[x].toggleAttribute("disabled");
            }
        }
    }
    async function send(_id, _operation) {
        let formString = new URLSearchParams();
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
    function clearSite() {
        tabelle.innerHTML = "";
        getData();
    }
})(Pruefungsabgabe || (Pruefungsabgabe = {}));
//# sourceMappingURL=adminscript.js.map