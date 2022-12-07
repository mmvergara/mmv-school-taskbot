"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discord_api = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
exports.discord_api = axios_1.default.create({
    baseURL: "https://discord.com/api/",
    timeout: 3000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Authorization",
        Authorization: `Bot ${config_1.TOKEN}`,
    },
});
