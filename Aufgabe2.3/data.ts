namespace Aufgabe2_3 {

    export interface Kopf {
        name: string;
        source: string;
    }

    export interface Koerper {
        name: string;
    }

    export interface Beine {
        name: string;
    }

    export interface Menschen {
        allKopf: Kopf[];
        allKoerper: Koerper[];
        allBeine: Beine[];
    }

    let breit: Kopf = { name: "Breit", source: "dick.png"};
    let schmal: Kopf = { name: "Schmal", source: "dünn.png"};
    let mittel: Kopf = { name: "Mittel", source: "normal.png"};
    let allKopf: Kopf[] = [breit, schmal, mittel];
    let korpulent: Koerper = { name: "Korpulent" };
    let duenn: Koerper = { name: "Dünn" };
    let normal: Koerper = { name: "Normal" };
    let allKoerper: Koerper[] = [korpulent, duenn, normal];
    let mueskeloes: Beine = { name: "Muskelös"};
    let standard: Beine = { name: "Standard" };
    let dick: Beine = { name: "Dick" };
    let allBeine: Beine[] = [mueskeloes, standard, dick];
    let m1: Menschen = {allKopf, allKoerper, allBeine};

    export let m1JSON: string = JSON.stringify(m1);
}