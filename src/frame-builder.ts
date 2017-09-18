
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
        }


        if (options.styles) {
            this.buildStyles(options.styles);
        }

        if (options.scripts && options.scripts.initial) {
            this.loadScripts(options.scripts.initial, options.scripts.async);
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
     * Loads all the scripts dynamically. The scripts are loaded one by one, 
     * after they're loaded. IE11 is causing trouble as it doesn't seem to 
     * work nicely with multiple files and multiple onload script commands.
     */
    loadScripts(scripts: Array<string>, asyncScripts: Array<string>) {
        if (!scripts) {
            return;
        }

        const script = this.frameDoc.createElement('script');
        script.onload = function(l: any) {
            scripts.shift();
            if (scripts.length > 0) {
                this.loadScripts(scripts, asyncScripts);
            }else {
                if (asyncScripts) {
                    this.loadScripts(asyncScripts);
                }
            }
        }.bind(this);

        script.src = scripts[0];
        this.frameDoc.body.appendChild(script);
    }


}
