# Node Global Proxy

Global Proxy for Node.JS with Friendly APIs.

Work with Axios, Request, Got, Superagent etc.

## Install

```bash
npm install node-global-proxy --save
```

## Introduction

Basic use with Javascript:

```js
const proxy = require("node-global-proxy").default;

proxy.setConfig("localhost:1080");
proxy.start();

/** Proxy working now! */

proxy.stop();

/** Proxy stop working now! */
```

Also, you can use a config object

```js
const proxy = require("node-global-proxy").default;

proxy.setConfig({
  http: "http://localhost:1080",
  https: "https://localhost:1080",
});
proxy.start();

/** Proxy working now! */

proxy.stop();

/** Proxy stop working now! */
```

Use with typescript or es6+

```ts
import proxy from "node-global-rpoxy";

proxy.setConfig("http://localhost:1080");
proxy.start();
```

### API

- `proxy.start()` Start using global proxy
- `proxy.stop()` Stop using global proxy
- `proxy.setConfig(config : string | NodeGlobalProxyConfig)` Set config global proxy by url string or config object
- `proxy.getConfig()` Get current config object
- `proxy.system()` Get system config and set as node global proxy

### Examples

This is an example with a proxy server run on `localhost:10809`, and get ip information from system proxy, no proxy and user config proxy.

```js
const axios = require('axios');
const proxy = require('node-global-proxy').default;

let PROXY_URL = "localhost:10809"

const test = async () => {
    console.log(proxy);

    proxy.system();
    console.log(proxy.getConfig());
    res = await axios.get("http://ip-api.com/json", {
        timeout: 3000
    });
    console.log(res.data);

    proxy.setConfig(PROXY_URL);
    console.log(proxy.getConfig());

    proxy.start();
    res = await axios.get("http://ip-api.com/json", {
        timeout: 3000
    });
    console.log(res.data);

    proxy.stop();
    res = await axios.get("http://ip-api.com/json", {
        timeout: 3000
    });
    console.log(res.data);

    proxy.setConfig({
        http: "http://" + PROXY_URL,
        https: "https://" + PROXY_URL
    });
    console.log(proxy.getConfig());
    proxy.start();
    res = await axios.get("http://ip-api.com/json", {
        timeout: 3000
    });
    console.log(res.data);
}

test();
```
