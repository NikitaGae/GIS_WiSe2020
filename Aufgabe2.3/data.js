"use strict";
var Aufgabe2_3;
(function (Aufgabe2_3) {
    let breit = { name: "Breit", source: "dick.png" };
    let schmal = { name: "Schmal", source: "dünn.png" };
    let mittel = { name: "Mittel", source: "normal.png" };
    let allKopf = [breit, schmal, mittel];
    let korpulent = { name: "Korpulent" };
    let duenn = { name: "Dünn" };
    let normal = { name: "Normal" };
    let allKoerper = [korpulent, duenn, normal];
    let mueskeloes = { name: "Muskelös" };
    let standard = { name: "Standard" };
    let dick = { name: "Dick" };
    let allBeine = [mueskeloes, standard, dick];
    let m1 = { allKopf, allKoerper, allBeine };
    Aufgabe2_3.m1JSON = JSON.stringify(m1);
})(Aufgabe2_3 || (Aufgabe2_3 = {}));
//# sourceMappingURL=data.js.map