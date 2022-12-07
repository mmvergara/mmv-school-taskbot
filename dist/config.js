"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUILD_ID = exports.PUBLIC_KEY = exports.TOKEN = exports.APPLICATION_ID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (process.env.APPLICATION_ID)
    throw new Error('APPLICATION_ID is not set');
if (process.env.TOKEN)
    throw new Error('TOKEN is not set');
if (process.env.PUBLIC_KEY)
    throw new Error('PUBLIC_KEY is not set');
if (process.env.GUILD_ID)
    throw new Error('GUILD_ID is not set');
exports.APPLICATION_ID = process.env.APPLICATION_ID;
exports.TOKEN = process.env.TOKEN;
exports.PUBLIC_KEY = process.env.PUBLIC_KEY || "not set";
exports.GUILD_ID = process.env.GUILD_ID;
