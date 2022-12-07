"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const discord_interactions_1 = require("discord-interactions");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.post("/interactions", (0, discord_interactions_1.verifyKeyMiddleware)(config_1.PUBLIC_KEY), async (req, res) => {
    const interaction = req.body;
    console.log();
    if (interaction.type === discord_interactions_1.InteractionType.APPLICATION_COMMAND) {
        console.log(interaction.data.name);
        if (interaction.data.name == "yo") {
            return res.send({
                type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Yo ${interaction.member.user.username}!`,
                },
            });
        }
        if (interaction.data.name == "dm") {
            // https://discord.com/developers/docs/resources/user#create-dm
            let c = (await api_1.discord_api.post(`/users/@me/channels`, {
                recipient_id: interaction.member.user.id,
            })).data;
            try {
                // https://discord.com/developers/docs/resources/channel#create-message
                let res = await api_1.discord_api.post(`/channels/${c.id}/messages`, {
                    content: "Yo! I got your slash command. I am not able to respond to DMs just slash commands.",
                });
                console.log(res.data);
            }
            catch (e) {
                console.log(e);
            }
            return res.send({
                // https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction
                type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: "👍",
                },
            });
        }
    }
});
app.get("/register_commands", async (req, res) => {
    let slash_commands = [
        {
            name: "yo",
            description: "replies with Yo!",
            options: [],
        },
        {
            name: "dm",
            description: "sends user a DM",
            options: [],
        },
        {
            name: "schedule",
            description: "BSIT 2-A School Schedule",
            options: [],
        },
    ];
    try {
        // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
        let discord_response = await api_1.discord_api.put(`/applications/${config_1.APPLICATION_ID}/guilds/${config_1.GUILD_ID}/commands`, slash_commands);
        console.log(discord_response.data);
        return res.send("commands have been registered");
    }
    catch (e) {
        console.error(e.code);
        console.error(e.response?.data);
        return res.send(`${e.code} error from discord`);
    }
});
app.get("/", async (req, res) => {
    return res.send("Hello World");
});
app.listen(8999, () => {
    console.log("Listening to port");
});
