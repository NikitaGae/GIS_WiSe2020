namespace Aufgabe2_3 {

    interface Kopf {
        name: string;
        umfang: number;
        gewicht: number;
    }

    interface Koerper {
        name: string;
        umfang: number;
        gewicht: number;
    }

    interface Beine {
        name: string;
        umfang: number;
        gewicht: number;
    }

    interface Mensch {
        Kopf: Kopf;
        Koerper: Koerper;
        Beine: Beine;
    }
    export let breit: Kopf = { name: "Breit", umfang: 150, gewicht: 300 }; // Vanille.preis
    export let schmal: Kopf = { name: "Schmal", umfang: 50, gewicht: 250 }; // Vanille.preis
    export let mittel: Kopf = { name: "Mittel", umfang: 100, gewicht: 200 }; // Vanille.preis
    export let korpulent: Koerper = { name: "Korpulent", umfang: 200, gewicht: 250 }; // Vanille.preis
    export let duenn: Koerper = { name: "Dünn", umfang: 100, gewicht: 150 }; // Vanille.preis
    export let normal: Koerper = { name: "Normal", umfang: 100, gewicht: 200 }; // Vanille.preis
    export let mueskeloes: Beine = { name: "Muskelös", umfang: 100, gewicht: 200 }; // Vanille.preis
    export let standard: Beine = { name: "Standard", umfang: 100, gewicht: 200 }; // Vanille.preis
    export let dick: Beine = { name: "Dick", umfang: 100, gewicht: 200 }; // Vanille.preis
    export let m1: Mensch = { Kopf: breit, Koerper: korpulent, Beine: dick }; // Vanille.preis
}