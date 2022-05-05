"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const production_config_1 = require("./env/production.config");
exports.default = () => {
    if (process.env.NODE_ENV !== 'production') {
        dotenv.config();
        let localConfig = {};
        try {
            localConfig = require(`./env/​development.config`).default;
            localConfig = localConfig || {};
        }
        catch (error) {
            localConfig = {};
        }
        return localConfig;
    }
    return production_config_1.default;
};
//# sourceMappingURL=index.js.map