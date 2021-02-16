import proxy from '../src/index';
import * as assert from 'assert';



describe('Test Proxy Config Parsing', () => {
    it("Should get system proxy", () => {
        let http_proxy = process.env.HTTP_PROXY;
        let https_proxy = process.env.HTTPS_PROXY;

        let config = {
            http: "http://systemproxy",
            https: "https://sytemproxy"
        };
        process.env.HTTP_PROXY = config.http;
        process.env.HTTPS_PROXY = config.https;
        proxy.system();
        assert.deepStrictEqual(config, proxy.getConfig());
        process.env.HTTP_PROXY = http_proxy;
        process.env.HTTPS_PROXY = https_proxy;
    });

    it("Should get setting proxy (set by object)", () => {
        let config = {
            http: "http://userproxy",
            https: "https://userproxy",
        };
        proxy.setConfig(config);
        assert.deepStrictEqual(config, proxy.getConfig())
    });


    it("Should get setting proxy (set by string)", () => {
        let config = {
            http: "http://stringproxy",
            https: "https://stringproxy",
        };
        proxy.setConfig("stringproxy");
        assert.deepStrictEqual(config, proxy.getConfig())
    });
});



