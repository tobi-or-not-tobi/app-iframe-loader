# iframeloader
iframeloader is a small javascript library that can be used to load a URL in an iframe. 

The code is developed in typescript and compiled with webpack.
The code does not have any dependencies as we want this code to be very clean so that it can run in a hosted page (i.e. a confluence page) without any conficts with existing JS.

## Development environment
Using yarn or npm to install and run.

```bash
# Install dependencies (first time only)
yarn

# Start the local server (open https:localhost:9000)
yarn run start

# Set up an automatic build of js files with:
yarn run build
```

Webpack dev server is used to serve the files. The webserver is configured to watch any changes and rebuild and serves them right away. The webserver is serving under: https://localhost:9000.

The index.html page is used for testing, it is not part of the generated lib.

A proxy can be used for any third party webservices that requies CORS configuration for the client.

The dev server can be configured using the `webpack.config.js`.

