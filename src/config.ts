import dotenv from "dotenv";
dotenv.config();

if (!process.env.APPLICATION_ID) throw new Error("APPLICATION_ID is not set");
if (!process.env.TOKEN) throw new Error("TOKEN is not set");
if (!process.env.PUBLIC_KEY) throw new Error("PUBLIC_KEY is not set");
if (!process.env.GUILD_ID) throw new Error("GUILD_ID is not set");
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set");

export const APPLICATION_ID = process.env.APPLICATION_ID;
export const TOKEN = process.env.TOKEN;
export const PUBLIC_KEY = process.env.PUBLIC_KEY;
export const GUILD_ID = process.env.GUILD_ID;

export const MONGODB_URI = process.env.MONGODB_URI;
