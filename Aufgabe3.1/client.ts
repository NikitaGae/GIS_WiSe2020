namespace P_3_1Server {

    let knopf: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopf");
    knopf.addEventListener("click", laden);

    //hier werden die server antworten in das div mit der id text geschrieben
    async function communicate(_url: RequestInfo): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);

        let antwortHTML: string = await response.text();
        (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;

        /* if (_url.includes("/login")) {
            let antwortHTML: string = await response.text();
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } else if (_url.includes("/registrieren")) {
            let antwortHTML: string = await response.text();
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } else if (_url.includes("/nutzer")) {
            let antwortHTML: string = await response.text();
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } */
    }
    //hier soll er je nach  html seite registrieren anmelden oder nutzer in die url anhängen damit später erkannt werden kann wo man ist
    async function laden(): Promise<void> {

        let location: string[] = window.location.pathname.split("/");
        let teil: string = location[location.length - 1];
        let url: string = "https://testgiswise2020.herokuapp.com";
        //let url: string = "http://localhost:8100";

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