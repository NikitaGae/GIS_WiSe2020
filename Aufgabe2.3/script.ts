/*
document.body.style.height = "100vh";
document.body.style.width = "100vw";
let body: HTMLBodyElement = <HTMLBodyElement> document.getElementById("koerper");
const element: HTMLElement  = document.body;

let viereck: HTMLDivElement = document.createElement("div");
viereck.style.position = "absolute";
viereck.style.backgroundColor = "orange";
viereck.style.width = "50px";
viereck.style.height = "50px";
viereck.style.top = "200px";
viereck.style.left = "200px";
body.appendChild(viereck);

const elements: HTMLElement  = document.body;

let neu: HTMLElement = document.getElementById("neu");
let reset: HTMLElement = document.getElementById("reset");

function erschaffen(): void {
    let rechteck: HTMLParagraphElement = document.createElement("div");
    rechteck.style.width = "50px";
    rechteck.style.height = "50px";
    rechteck.style.backgroundColor = "orange";
    rechteck.style.margin = "auto";
    rechteck.style.marginTop = "20px";
    rechteck.className = "rechteck";
    element.appendChild(rechteck);
}

function resetpage(): void {

    let elements: HTMLCollectionOf <HTMLDivElement> = <HTMLCollectionOf <HTMLDivElement> > document.getElementsByClassName("rechteck");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

neu.addEventListener("click", erschaffen);
reset.addEventListener("click", resetpage);


interface Topping {
    name: string;
    preis: number;
    menge: number;
}

interface KugelnGeschmack {
    name: string;
    preis: number;
}

interface EisBehaelter {
    name: string;
    preis: number;
    groeße: number;
}

interface EisBestellung {
    Topping: Topping;
    KugelnGeschmack: KugelnGeschmack;
    EisBehaelter: EisBehaelter;
    menge: number;
    KugelGroeße: number;
}


let schokosauce: Topping = {name: "Schoko", preis: 0.10, menge: 10}; // Vanille.preis
let streusel: Topping = {name: "Streusel", preis: 0.10, menge: 30}; // Vanille.preis
let sahne: Topping = {name: "Sahne", preis: 0.10, menge: 15}; // Vanille.preis
let vanille: KugelnGeschmack = {name: "Vanille", preis: 1.10}; // Vanille.preis
let schokolade: KugelnGeschmack = {name: "Schokolade", preis: 1.10}; // Vanille.preis
let oreo: KugelnGeschmack = {name: "Oreo", preis: 1.10}; // Vanille.preis
let waffel: KugelnGeschmack = {name: "Waffel", preis: 1.10}; // Vanille.preis
let becher: KugelnGeschmack = {name: "Becher", preis: 1.10}; // Vanille.preis
let glas: KugelnGeschmack = {name: "Glas", preis: 1.10}; // Vanille.preis


//let d1: EisBehälter = {name: "Sir Woofalot", owner: "Martin", age: 5}; */
//let d1: EisBehälter = {name: "Sir Woofalot", owner: "Martin", age: 5};

namespace Aufgabe2_3 {

    document.getElementById("b2").addEventListener("click", tausch);
    document.getElementById("b1").addEventListener("click", tausch2);
    document.getElementById("b1").addEventListener("click", tausch3);
/*
    function finalTausch(_event: Event): void {
        let target: HTMLButtonElement = (<HTMLButtonElement>_event.currentTarget);
        let targetId: String = target.getAttribute("id");

        if (targetId == "b1") {
            let aBild: HTMLImageElement = <HTMLImageElement> document.getElementById("bilder");
            
        }
    } */
            //typ number reihenfolge arrays

    function tausch(): void {
        document.getElementById("dBilder").setAttribute("src", "dick.png");
        let el: HTMLElement = document.querySelector("#bilder");
        el.dataset.name = "breit";
        console.log(el.dataset.name);
        console.log(breit);
    }
    function tausch2(): void {
        document.getElementById("dBilder").setAttribute("src", "dünn.png");
        let el: HTMLElement = document.querySelector("#bilder");
        el.dataset.name = "schmal";
        console.log(el.dataset.name);
        console.log(schmal);
    }
    function tausch3(): void {
        document.getElementById("dBilder").setAttribute("src", "normal.png");
        let el: HTMLElement = document.querySelector("#bilder");
        el.dataset.name = "mittel";
        console.log(el.dataset.name);
        console.log(mittel);
    }
}