
export class FrameWrapper {
    private url: string;
    private options: any;
    public iframe: HTMLIFrameElement ;

    constructor(url: string, options: any) {
        this.url = url;
        this.options = options;
        this.create();
    }

    launch() {
        this.append();
    }

    private create() {
        this.iframe = document.createElement('iframe');
        this.iframe.src = this.url;
        if (this.options && this.options.targetElementClass) {
            this.iframe.classList.add(this.options.targetElementClass);
        }
    }

    private append() {
        let parentElement: HTMLElement;
        if (this.options && this.options.targetElementId && document.getElementById(this.options.targetElementId)) {
            parentElement = document.getElementById(this.options.targetElementId);
        }else{
            parentElement = document.body;
        }
        parentElement.appendChild(this.iframe);
    }

}
