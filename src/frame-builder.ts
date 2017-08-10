
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
            this.buildScripts(options.scripts.initial, options.scripts.async);
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
    }
    /**
     * Loads all the scripts dynamically and waits while they're
     * all loaded before the async scripts are loaded. The later 
     * was requried - unclear why.
     */
    protected buildScripts(scripts: Array<any>, asyncScripts?: Array<any>) {
        if (!scripts) {
            return;
        }
        let count = scripts.length;
        scripts.forEach(function(url: string) {
            const script = this.frameDoc.createElement('script');
            script.onload = function(l: any) {
                if (--count === 0) {
                    // once all scripts are loaded
                    // we load additional async scripts
                    if (asyncScripts) {
                        this.buildScripts(asyncScripts);
                    }
                }
            }.bind(this);
            script.src = url;
            this.frameDoc.body.appendChild(script);
        }.bind(this));
    }

}
