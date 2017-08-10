
export class FrameBuilder {
    frameDoc: Document;

    constructor(iframe: HTMLIFrameElement, options: any) {
        this.init(iframe, options);
    }

    protected init(iframe: HTMLIFrameElement, options: any) {
        this.frameDoc = iframe.contentWindow.document;
        if (options.frameId) {
            iframe.id = options.frameId;
        }

        if (options.url) {
            iframe.src = options.url;
        }else {
            iframe.setAttribute('src', 'about:blank');
        }

        let html = '';
        if (options.baseUrl) {
            html += `<base href="${options.baseUrl}" />`;
        }
        if (options.body) {
            html += `<body>${options.body}</body>`;
        }
        if (html) {
            this.frameDoc.open();
            this.frameDoc.write(`
                <!doctype html>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                ${html}`);
            this.frameDoc.close();
        }

        if (options.styles) {
            this.buildStyles(options.styles);
        }

        if (options.scripts && options.scripts.initial) {
            this.buildScripts(options.scripts.initial);
        }
        if (options.scripts && options.scripts.async) {
            iframe.contentWindow.setTimeout(function() {
                this.buildScripts(options.scripts.async);
            }.bind(this), 500);
        }

    }

    protected buildStyles(styles: Array<any>) {
        styles.forEach(function(url: string) {
            const link = this.frameDoc.createElement('link');
            link.setAttribute('href', url);
            link.rel = 'stylesheet';
            link.type = 'text/css'; // no need for HTML5
            this.frameDoc.head.insertBefore(link, this.frameDoc.head.firstChild);
        }.bind(this));
        console.log(this.frameDoc.head);
    }

    protected buildScripts(scripts: Array<any>) {
        if (!scripts) {
            return;
        }
        scripts.forEach(function(url: string) {
            const script = this.frameDoc.createElement('script');
            script.src = url;
            this.frameDoc.body.appendChild(script);
        }.bind(this));
    }



}
