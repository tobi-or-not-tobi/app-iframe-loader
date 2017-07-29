
export class FrameWrapper {
    private url: string;
    private options: any;
    private parentElement: HTMLElement;
    public iframe: HTMLIFrameElement ;

    constructor(options: any) {
        this.options = options;
        this.init();
    }

    launch() {
        this.append();
    }

    togglePanel(cls: string) {
        console.log('toggle', cls);
        this.parentElement.classList.toggle(cls);
    }

    private init() {
        if (this.options.frameId) {
            this.iframe = <HTMLIFrameElement>document.getElementById(this.options.frameId);
        }
        if (!this.iframe) {
            this.iframe = document.createElement('iframe');
            this.iframe.id = this.options.frameId;
            this.iframe.src = this.options.url;
        }
        // add css class to control the iframe layout
        if (this.options.targetFrameClass) {
            for (const c of this.options.targetFrameClass.split(' ')) {
                this.iframe.classList.add(c);
            }
        }

        this.bootstrap();
    }

    /**
     * Pass optional parameters to the app
     * to bootstrap the app with data that comes from outside
     * 
     */
    private bootstrap() {
        if (!this.options.bootstrap) {
            return;
        }
        
        // if (this.iframe.contentWindow) {
        //     this.iframe.contentWindow.postMessage({
        //         type: 'bootstrap',
        //         params: this.options.bootstrap
        //     }, '*');
        // }else {
            this.iframe.onload = function() {
                this.iframe.contentWindow.postMessage({
                    type: 'bootstrap',
                    params: this.options.bootstrap
                }, '*');
            }.bind(this);
        // }
    }

    private append() {

        if (this.options && this.options.targetElementId && document.getElementById(this.options.targetElementId)) {
            this.parentElement = document.getElementById(this.options.targetElementId);
        }else {
            this.parentElement = document.body;
        }

        this.addTargetClass();

        // add iframe if not yet being done elsewhere
        if (!this.parentElement.querySelector('#' + this.iframe.id)) {
            this.parentElement.appendChild(this.iframe);
        }
    }

    private addTargetClass() {
        // add css class to control the iframe layout
        if (this.options && this.options.targetElementClass) {
            for (const c of this.options.targetElementClass.split(' ')) {
                this.parentElement.classList.add(c);
            }
        }
    }

}
