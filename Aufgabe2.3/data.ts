namespace Aufgabe2_3 {

    export interface Kopf {
        name: string;
        source: string;
    }

    export interface Koerper {
        name: string;
        source: string;
    }

    export interface Beine {
        name: string;
        source: string;
    }

    export interface Menschen {
        allKopf: Kopf[];
        allKoerper: Koerper[];
        allBeine: Beine[];
    }

    let ersterKopf: Kopf = { name: "Erster", source: "Kopf1.png"};
    let zweiterKopf: Kopf = { name: "Zweiter", source: "Kopf2.png"};
    let dritterKopf: Kopf = { name: "Dritter", source: "Kopf3.png"};
    let allKopf: Kopf[] = [ersterKopf, zweiterKopf, dritterKopf];
    let ersterKoerper: Koerper = { name: "Erster", source: "Koerper1.png" };
    let zweiterKoerper: Koerper = { name: "Zweiter", source: "Koerper2.png" };
    let dritterKoerper: Koerper = { name: "Dritter", source: "Koerper3.png" };
    let allKoerper: Koerper[] = [ersterKoerper, zweiterKoerper, dritterKoerper];
    let erstenBeine: Beine = { name: "Ersten", source: "Koerper1.png"};
    let zweitenBeine: Beine = { name: "Zweiten", source: "Koerper2.png" };
    let drittenBeine: Beine = { name: "Dritte", source: "Koerper3.png" };
    let allBeine: Beine[] = [erstenBeine, zweitenBeine, drittenBeine];
    let m1: Menschen = {allKopf, allKoerper, allBeine};

    export let m1JSON: string = JSON.stringify(m1);
}