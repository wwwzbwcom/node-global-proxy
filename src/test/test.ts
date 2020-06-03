import proxy from '../index';
import * as assert from 'assert';



describe('Test Proxy Config Parsing', () => {
    it("Should get system proxy", () => {
        let http_proxy = (global as any).HTTP_PROXY;
        let https_proxy = (global as any).HTTPS_PROXY;

        let config = {
            http: "http://systemproxy",
            https: "https://sytemproxy"
        };
        (global as any).HTTP_PROXY = config.http;
        (global as any).HTTPS_PROXY = config.https;
        proxy.system();
        assert.deepEqual(config, proxy.getConfig());
        (global as any).HTTP_PROXY = http_proxy;
        (global as any).HTTP_PROXY = https_proxy;
    });

    it("Should get setting proxy (set by object)", () => {
        let config = {
            http: "http://userproxy",
            https: "https://userproxy",
        };
        proxy.setConfig(config);
        assert.deepEqual(config, proxy.getConfig())
    });


    it("Should get setting proxy (set by string)", () => {
        let config = {
            http: "http://stringproxy",
            https: "https://stringproxy",
        };
        proxy.setConfig("all://stringproxy");
        assert.deepEqual(config, proxy.getConfig())
    });
});



