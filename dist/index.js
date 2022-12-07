"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const discord_interactions_1 = require("discord-interactions");
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.post("/interactions", (0, discord_interactions_1.verifyKeyMiddleware)(config_1.PUBLIC_KEY), async (req, res) => {
    const interaction = req.body;
    if (interaction.type === discord_interactions_1.InteractionType.APPLICATION_COMMAND) {
        if (interaction.data.name == "yo") {
            return res.send({
                type: discord_interactions_1.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Yo ${interaction.member.user.username}!`,
                },
            });
        }
        if ((interaction.data.name = "schedule")) {
            const subjectOnDayX = [
                {
                    name: "Monday",
                    value: "CC104 - **8:00am** \n GE-CW - **1:00pm**",
                },
                {
                    name: "Tuesday",
                    value: "GE-ELECT - **8:00am** \n PE 3 - **10:00am** \n GE AA - **1:00pm**\n",
                },
                {
                    name: "Wednesday",
                    value: "CC104 - **8:00am** \n GE-CW - **1:00pm**",
                },
                {
                    name: "Thursday",
                    value: "GE-ELECT - **8:00am** \n PE 3 - **10:00am** \n GE AA - **1:00pm**",
                },
                {
                    name: "Friday",
                    value: "CC104 - **8:00am**\n PE 3 - **10:00am**",
                },
                {
                    name: "Saturday",
                    value: "WALANG PASOK",
                },
                {
                    name: "Sunday",
                    value: "WALANG PASOK",
                },
            ];
            let dateToday = new Date().getDay();
            if (dateToday == 0)
                dateToday = 7;
            const todayScheduleInfo = subjectOnDayX[dateToday - 1];
            const embeds = [
                {
                    title: "Schedule of BSIT 2-A",
                    description: `======**Today is ${todayScheduleInfo.name}**======\n ${todayScheduleInfo.value} \n ======**${todayScheduleInfo.name}**======\n`,
                    url: "https://i.ibb.co/StGcn7B/schedule.jpg",
                    image: {
                        url: "https://i.ibb.co/StGcn7B/schedule.jpg",
                    },
                    fields: [...subjectOnDayX.slice(0, 5)],
                    color: 4321431,
                },
            ];
            return res.send({ embeds });
        }
    }
});
app.get("/register_commands", async (req, res) => {
    let slash_commands = [
        {
            name: "create-tasks",
            description: "Create a new task",
            options: [
                {
                    type: "STRING",
                    name: "Task Subject ex. CC104",
                    required: true,
                },
                {
                    type: "STRING",
                    name: "Task Description Assignment",
                    required: true,
                },
            ],
        },
        {
            name: "see-tasks",
            description: "See all tasks",
        },
        {
            name: "schedule",
            description: "BSIT 2-A School Schedule",
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
mongoose_1.default.connect(config_1.MONGODB_URI).then(() => {
    console.log("Connected to MONGODB");
    app.listen(process.env.GUILD_ID || 3000, () => {
        console.log("Listening to port", process.env.GUILD_ID || 3000);
    });
});
