let array: number[] = [22, 100, 1, 3, 8, 14, 16, 7, 12];
console.log(min(array));

function min(werte: number[]): number {
    let min: number = werte[0];
    for (let x: number = 0; werte.length - 1 > x; x++) {
        if (min > werte[x + 1]) {
            min = werte[x + 1];
        }
    }
    return min;
}

let z: number = 0;
console.log(isEven(-50));

function isEven(z: number): boolean {
    let ergebnis: number = z - 2;

    ergebnis = Math.abs(ergebnis);

    if (ergebnis == 0) {
        return true;
    } else if (ergebnis == 1) {
        return false;
    } else {
        return isEven(ergebnis);
    }
}

interface Student {
    vorName: string;
    nachName: string;
    alter: number;
    größe: number;
    matrikelnummer: number;
}

let student1: Student = { vorName: "Paul", nachName: "Müller", alter: 20, größe: 170, matrikelnummer: 12345 };
let student2: Student = { vorName: "David", nachName: "Schreiner", alter: 21, größe: 165, matrikelnummer: 23451 };
let student3: Student = { vorName: "Alina", nachName: "Meier", alter: 22, größe: 160, matrikelnummer: 34512 };

console.log(student1);
console.log(student2);
console.log(student3);

let student: Student[] = [student1, student2, student3];

showInfo(12345);

function showInfo(_matrikelnummer: number): void {
    if (_matrikelnummer == 12345) {
        console.log(student1);
    } else if (_matrikelnummer == 23451) {
        console.log(student2);
    } else {
        console.log(student3);
    }
}


let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("myFirstCanvas");
let context: CanvasRenderingContext2D = canvas.getContext("2d");

context.lineWidth = 10;

context.strokeRect(75, 140, 150, 110);

context.fillRect(130, 190, 40, 60);

context.beginPath();
context.moveTo(50, 140);
context.lineTo(150, 60);
context.lineTo(250, 140);
context.closePath();
context.fillStyle = "#654321";
context.fill();
context.strokeStyle = "brown";
context.stroke();

context.beginPath();
context.moveTo(500, 250);
context.lineTo(0, 250);
context.closePath();
context.fillStyle = "#654321";
context.fill();
context.strokeStyle = "brown";
context.stroke();

let path: Path2D = new Path2D();
path.arc(25, 25, 50, 0, 2 * Math.PI);
context.fillStyle = "#ffff00";
context.fill();
context.strokeStyle = "yellow";
context.stroke(path);

context.beginPath();
context.moveTo(350, 250);
context.lineTo(350, 150);
context.closePath();
context.fillStyle = "#654321";
context.fill();
context.strokeStyle = "brown";
context.stroke();

let baum: Path2D = new Path2D();
baum.arc(350, 100, 50, 0, 2 * Math.PI);
context.fillStyle = "#006400";
context.fill();
context.strokeStyle = "green";
context.stroke(baum);

interface Rechteck {
    breite: number;
    hoehe: number;
    x: number;
    y: number;
}

let rechteck1: Rechteck = { breite: 50, hoehe: 50, x: 300, y: 300 };

context.strokeRect(rechteck1.x, rechteck1.y, rechteck1.breite, rechteck1.hoehe);

context.fillRect(rechteck1.x, rechteck1.y, rechteck1.breite, rechteck1.hoehe);

function createRect(): Rechteck {
    
    let rechteck1: Rechteck = { breite: Math.random() * 50 + 50, hoehe: Math.random() * 50 + 50, x: Math.random() * 50 + 50, y: Math.random() * 50 + 50 };

    return rechteck1;
}

drawRect(createRect());

function drawRect(_rechteck1: Rechteck): void {


    context.strokeRect(_rechteck1.x, _rechteck1.y, _rechteck1.breite, _rechteck1.hoehe);

    context.fillRect(_rechteck1.x, _rechteck1.y, _rechteck1.breite, _rechteck1.hoehe);

}

