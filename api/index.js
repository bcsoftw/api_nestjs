"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express"));
const app_module_1 = require("../src/app.module");
const setup_1 = require("../src/setup");
let cachedServer;
async function bootstrap() {
    if (!cachedServer) {
        const server = (0, express_1.default)();
        const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server), {
            logger: ['error', 'warn'],
        });
        (0, setup_1.configureApp)(app);
        await app.init();
        cachedServer = server;
    }
    return cachedServer;
}
async function handler(req, res) {
    const server = await bootstrap();
    return server(req, res);
}
//# sourceMappingURL=index.js.map