
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

        if (this.options) {

            // add css class to control the iframe layout
            if (this.options.targetFrameClass) {
                this.iframe.classList.add(this.options.targetFrameClass);
            }

            // pass optional parameters to bootstrap the app
            if (this.options.bootstrap) {
                this.iframe.onload = function() {
                    this.iframe.contentWindow.postMessage({
                        type: 'bootstrap',
                        params: this.options.bootstrap
                    }, '*');
                }.bind(this);
            }
        }
    }

    private append() {
        let parentElement: HTMLElement;
        if (this.options && this.options.targetElementId && document.getElementById(this.options.targetElementId)) {
            parentElement = document.getElementById(this.options.targetElementId);
        }else {
            parentElement = document.body;
        }

        // add css class to control the iframe layout
        if (this.options && this.options.targetElementClass) {
            parentElement.classList.add(this.options.targetElementClass);
        }

        parentElement.appendChild(this.iframe);
    }

}
