export interface NodeGlobalProxyConfig {
    http: string;
    https: string;
}
declare class NodeGlobalProxy {
    config: NodeGlobalProxyConfig;
    started: boolean;
    constructor();
    system(): void;
    setConfig(config?: NodeGlobalProxyConfig | string): void;
    getConfig(): NodeGlobalProxyConfig;
    start(): void;
    stop(): void;
}
declare const proxy: NodeGlobalProxy;
export default proxy;
