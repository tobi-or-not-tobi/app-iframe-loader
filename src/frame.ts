import { FrameBuilder } from './frame-builder';

export class FrameWrapper {
    private url: string;
    private options: any;
    private parentElement: HTMLElement;
    public iframe: HTMLIFrameElement;
    builder: FrameBuilder;

    constructor(options: any) {
        this.options = options;
        this.init();
    }

    launch() {
        // this.append();
    }

    togglePanel(cls: string) {
        this.parentElement.classList.toggle(cls);
    }

    private init() {
        if (this.options.frameId) {
            this.iframe = <HTMLIFrameElement>document.getElementById(this.options.frameId);
        }else {
            this.iframe = document.createElement('iframe');
        }
        this.append();
        this.builder = new FrameBuilder(this.iframe, this.options);

        // add css class to control the iframe layout
        if (this.options.targetFrameClass) {
            for (const c of this.options.targetFrameClass.split(' ')) {
                this.iframe.classList.add(c);
            }
        }
    }

    private append() {
        if (this.options && this.options.targetElementId && document.getElementById(this.options.targetElementId)) {
            this.parentElement = document.getElementById(this.options.targetElementId);
        }else {
            this.parentElement = document.body;
        }

        this.addTargetClass();

        // add iframe if not yet being done elsewhere
        // if (!this.parentElement.querySelector('#' + this.iframe.id)) {
            this.parentElement.appendChild(this.iframe);
        // }
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
