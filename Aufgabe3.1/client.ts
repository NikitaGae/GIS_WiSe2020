export namespace P_3_1Server {

    let knopfHTML: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopfHTML");
    let knopfJSON: HTMLButtonElement = <HTMLButtonElement>document.getElementById("knopfJSON");
    knopfHTML.addEventListener("click", work);
    knopfJSON.addEventListener("click", work);

    async function work(_event: Event): Promise<void> {
        let url: string = "https://testgiswise2020.herokuapp.com";
        //let url: string = "localhorst:8100";
        let target: HTMLButtonElement = <HTMLButtonElement>_event.currentTarget;

        if (target.id == "knopfHTML") {
            url += "/html";
        } else if (target.id == "knopfJSON") {
            url += "/json";
        }
        await communicate(url);
    }

    async function communicate(_url: RequestInfo): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);

        if (_url.includes("/html")) {
            let antwortHTML: string = await response.text();
            (<HTMLDivElement>document.getElementById("text")).innerHTML = antwortHTML;
        } else if (_url.includes("/json")) {
            let antwortJSON: string = await response.json();
            let jsonString: string = JSON.parse(antwortJSON);
            console.log("antwort", jsonString);
        }
    }
}