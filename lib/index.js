"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_agent_1 = require("global-agent");
var globalTunnel = require("global-tunnel-ng");
var url_1 = require("url");
var MAJOR_NODEJS_VERSION = parseInt(process.version.slice(1).split('.')[0], 10);
if (MAJOR_NODEJS_VERSION >= 10) {
    global_agent_1.bootstrap();
}
else {
    globalTunnel.initialize();
}
var NodeGlobalProxy = (function () {
    function NodeGlobalProxy() {
        this.config = {
            http: "",
            https: ""
        };
        this.system();
    }
    NodeGlobalProxy.prototype.system = function () {
        var config = {
            http: process.env.HTTP_PROXY,
            https: process.env.HTTPS_PROXY
        };
        console.log(config);
        this.setConfig(config);
    };
    NodeGlobalProxy.prototype.setConfig = function (config) {
        if (!config) {
            this.system();
        }
        else {
            if (typeof config === "string") {
                var url = config;
                if (!url.startsWith('http://') && !url.startsWith('all://') && !url.startsWith('https://')) {
                    url = "all://" + url;
                }
                var p = url_1.parse(url);
                if (p.protocol == "all:") {
                    this.config.http = url.replace("all://", "http://");
                    this.config.https = url.replace("all://", "https://");
                }
                else {
                    if (p.protocol == "http:") {
                        this.config.http = url;
                        this.config.https = url;
                    }
                    if (p.protocol == "https:") {
                        this.config.http = url;
                        this.config.https = url;
                    }
                }
            }
            else {
                this.config = config;
            }
        }
        if (this.started) {
            this.start();
        }
    };
    NodeGlobalProxy.prototype.getConfig = function () {
        return this.config;
    };
    NodeGlobalProxy.prototype.start = function () {
        if (MAJOR_NODEJS_VERSION > 10) {
            global.GLOBAL_AGENT.HTTP_PROXY = this.config.http;
            global.GLOBAL_AGENT.HTTPS_PROXY = this.config.https;
        }
        else {
            var url = this.config.http;
            url = url.replace("http://", "");
            var s = url.split(':');
            var host = s[0];
            var port = 80;
            if (s.length > 1) {
                port = parseInt(s[1]);
            }
            globalTunnel.initialize({
                host: host,
                port: port
            });
        }
        this.started = true;
    };
    NodeGlobalProxy.prototype.stop = function () {
        if (MAJOR_NODEJS_VERSION > 10) {
            global.GLOBAL_AGENT.HTTP_PROXY = null;
            global.GLOBAL_AGENT.HTTPS_PROXY = null;
        }
        else {
            global.stop();
        }
        this.started = false;
    };
    return NodeGlobalProxy;
}());
var proxy = new NodeGlobalProxy();
exports.default = proxy;
//# sourceMappingURL=index.js.map