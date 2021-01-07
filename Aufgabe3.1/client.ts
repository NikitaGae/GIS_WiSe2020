namespace P_3_1Server {

    let knopf: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopf");
    //let knopfRegistrieren: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopfRegistrieren");
    knopf.addEventListener("click", laden);
    //knopfRegistrieren.addEventListener("click", work);

    /* async function work(_event: Event): Promise<void> {
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url: string = "http://localhost:8100";
        let target: HTMLButtonElement = <HTMLButtonElement>_event.currentTarget;

        if (target.id == "knopfLogin") {
            console.log(url);
            url += "/login";
        } else if (target.id == "knopfRegistrieren") {
            console.log(url);
            url += "/registrieren";
        }
        await communicate(url);
    } */

    /*  let antwortJSON: string = await response.text();
            let jsonString: string = JSON.parse(antwortJSON);
            console.log("antwort", jsonString); */

    async function communicate(_url: RequestInfo): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);

        if (_url.includes("/login")) {
            let antwortHTML: string = await response.text();
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } else if (_url.includes("/registrieren")) {
            let antwortHTML: string = await response.text();
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } else if (_url.includes("/nutzer")) {
            let antwortHTML: string = await response.text();
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        }
    }

    async function laden(): Promise<void> {

        let location: string[] = window.location.pathname.split("/");
        let teil: string = location[location.length - 1];
        console.log(teil);
        //let url: string = "https://testgiswise2020.herokuapp.com";
        let url: string = "http://localhost:8100";

        switch (teil) {
            case "index.html":
                url += "/registrieren";
                break;
            case "anmelden.html":
                url += "/login";
                break;
            case "nutzer.html":
                url += "/nutzer";
                break;
        }
        await communicate(url);
    }

}