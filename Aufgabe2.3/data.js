"use strict";
var Aufgabe2_3;
(function (Aufgabe2_3) {
    let ersterKopf = { name: "Erster", source: "Kopf1.png" };
    let zweiterKopf = { name: "Zweiter", source: "Kopf2.png" };
    let dritterKopf = { name: "Dritter", source: "Kopf3.png" };
    let allKopf = [ersterKopf, zweiterKopf, dritterKopf];
    let ersterKoerper = { name: "Erster", source: "Koerper1.png" };
    let zweiterKoerper = { name: "Zweiter", source: "Koerper2.png" };
    let dritterKoerper = { name: "Dritter", source: "Koerper3.png" };
    let allKoerper = [ersterKoerper, zweiterKoerper, dritterKoerper];
    let erstenBeine = { name: "Ersten", source: "Koerper1.png" };
    let zweitenBeine = { name: "Zweiten", source: "Koerper2.png" };
    let drittenBeine = { name: "Dritte", source: "Koerper3.png" };
    let allBeine = [erstenBeine, zweitenBeine, drittenBeine];
    let m1 = { allKopf, allKoerper, allBeine };
    Aufgabe2_3.m1JSON = JSON.stringify(m1);
})(Aufgabe2_3 || (Aufgabe2_3 = {}));
//# sourceMappingURL=data.js.map