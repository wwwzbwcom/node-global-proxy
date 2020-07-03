import {
    bootstrap
} from 'global-agent';
import * as globalTunnel from 'global-tunnel-ng';
import { parse } from 'url';

const MAJOR_NODEJS_VERSION = parseInt(process.version.slice(1).split('.')[0], 10);

if (MAJOR_NODEJS_VERSION >= 10) {
    // `global-agent` works with Node.js v10 and above.
    bootstrap();
} else {
    // `global-tunnel-ng` works only with Node.js v10 and below.
    globalTunnel.initialize();
}

export interface NodeGlobalProxyConfig {
    http: string;
    https: string;
}

class NodeGlobalProxy {
    config: NodeGlobalProxyConfig = {
        http:"",
        https:""
    };
    started: boolean;

    constructor() {
        this.system();
    }

    /** Use system proxy */
    system(): void {
        let config: NodeGlobalProxyConfig = {
            http: process.env.HTTP_PROXY,
            https: process.env.HTTPS_PROXY
        }

        this.setConfig(config);
    }

    /** Set proxy config */
    setConfig(config?: NodeGlobalProxyConfig | string): void {
        if(!config)
        {
            this.system();
        }
        else
        {
            if(typeof config === "string")
            {
                let url = config;
                if(!url.startsWith('http://') && !url.startsWith('all://') && !url.startsWith('https://'))
                {
                    url = "all://" + url;
                }
                let p = parse(url);

                if(p.protocol == "all:") {
                    this.config.http = url.replace("all://", "http://");
                    this.config.https = url.replace("all://", "https://");
                }
                else {
                    if(p.protocol == "http:") {
                        this.config.http = url;
                        this.config.https = url;
                    }
                    if(p.protocol == "https:") {
                        this.config.http = url;
                        this.config.https = url;
                    }
                }
            }
            else {
                this.config = config;
            }
        }

        if(this.started) {
            this.start();
        }
    }

    /** Get proxy config */
    getConfig() : NodeGlobalProxyConfig {
        return this.config;
    }

    /** Start proxy */
    start() {
        if (MAJOR_NODEJS_VERSION > 10) {
            (global as any).GLOBAL_AGENT.HTTP_PROXY = this.config.http;
            (global as any).GLOBAL_AGENT.HTTPS_PROXY = this.config.https;
        }
        else {
            let url = this.config.http;
            url = url.replace("http://", "");
            let s = url.split(':');
            let host = s[0];
            let port = 80;
            if (s.length > 1) {
                port = parseInt(s[1]);
            }
            globalTunnel.initialize({
                host: host,
                port: port
            });
        }

        this.started = true;
    }

    /** Stop proxy */
    stop() {
        if (MAJOR_NODEJS_VERSION > 10) {
            (global as any).GLOBAL_AGENT.HTTP_PROXY = null;
            (global as any).GLOBAL_AGENT.HTTPS_PROXY = null;
        }
        else {
            global.stop();
        }

        this.started = false;
    }
}

const proxy = new NodeGlobalProxy();
export default proxy;
