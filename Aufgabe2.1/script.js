"use strict";
var Aufgabe2_1_1_3;
(function (Aufgabe2_1_1_3) {
    //Aufgabe1
    function a1() {
        let x = "Alles";
        console.log(x);
        func2();
        console.log(x);
        func1();
        console.log(x);
        func3();
    }
    a1();
    function func1() {
        console.log("Klar?");
    }
    function func2() {
        console.log("Gute!");
    }
    function func3() {
        console.log("Logo!");
    }
    //Aufgabe2
    function a2() {
        let i = 9;
        do {
            console.log(i);
            i = i - 1;
        } while (i > 0);
    }
    a2();
    //Aufgabe3
})(Aufgabe2_1_1_3 || (Aufgabe2_1_1_3 = {}));
var Aufgabe2_1_4;
(function (Aufgabe2_1_4) {
    //Aufgabe4
    let x = "Hallo";
    console.log(x);
    func1(x);
    console.log(x);
    func2();
    func3();
    console.log(x);
    function func1(y) {
        y = "Bla";
        console.log(y);
    }
    function func2() {
        let x = "Blubb";
        console.log(x);
    }
    function func3() {
        x = "Test";
    }
})(Aufgabe2_1_4 || (Aufgabe2_1_4 = {}));
var Aufgabe2_1_5;
(function (Aufgabe2_1_5) {
    function multiply(x, y) {
        return x * y;
    }
    function max(x, y) {
        if (y > x) {
            return y;
        }
        else {
            return x;
        }
    }
    let zaehler = 0;
    let zahl = 0;
    do {
        zahl = zahl + zaehler;
        zaehler++;
    } while (zaehler <= 100);
    console.log(multiply(5, 5));
    console.log(max(1, 5));
    console.log(zahl);
    console.log("10 Random Zahlen");
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    for (let zaehler = 0; zaehler < 10; zaehler++) {
        console.log(getRandomInt(101));
    }
    function factorial(n) {
        if (n < 1) {
            return 1;
        }
        let ruckgabe = 1;
        for (let zaehler = 1; zaehler <= n; zaehler++) {
            ruckgabe = ruckgabe * zaehler;
        }
        return ruckgabe;
    }
    console.log("Fakultät:");
    console.log(factorial(3));
    function leapyears() {
        for (let jahr = 1900; jahr < 2021; jahr++) {
            if (jahr % 4 == 0 && jahr % 100 != 0 || jahr % 400 == 0) {
                console.log("Schaljahr:" + jahr);
            }
        }
    }
    leapyears();
})(Aufgabe2_1_5 || (Aufgabe2_1_5 = {}));
var Aufgabe2_1_6;
(function (Aufgabe2_1_6) {
    let string = "#";
    for (let zaehler = 1; zaehler < 8; zaehler++) {
        console.log(string);
        string = string + "#";
    }
    for (let zaehler = 1; zaehler <= 100; zaehler++) {
        if (zaehler % 3 == 0 && zaehler % 5 != 0) {
            console.log("Fizz");
        }
        else if (zaehler % 5 == 0 && zaehler % 3 != 0) {
            console.log("Buzz");
        }
        else if (zaehler % 5 == 0 && zaehler % 3 == 0) {
            console.log("FizzBuzz");
        }
        else {
            console.log(zaehler);
        }
    }
    function schach(x, y) {
        let string = "";
        for (let zaehler1 = 0; zaehler1 < x; zaehler1++) {
            for (let zaehler2 = 0; zaehler2 < y; zaehler2++) {
                if (zaehler1 % 2 == zaehler2 % 2) {
                    string = string + "#";
                }
                else
                    (string = string + " ");
            }
            string = string + "/n";
        }
        return string;
    }
    console.log(schach(9, 10));
})(Aufgabe2_1_6 || (Aufgabe2_1_6 = {}));
//# sourceMappingURL=script.js.map