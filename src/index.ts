import { discord_api } from "./api";
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from "discord-interactions";
import { APPLICATION_ID, GUILD_ID, MONGODB_URI, PUBLIC_KEY } from "./config";
import { slashCommands } from "./commands/commands";
import express from "express";
import mongoose from "mongoose";
import {
  createTaskCommand,
  deleteTaskCommand,
  seeTaskCommand,
} from "./controllers/taskControllers";
import {
  createLinkCommand,
  deleteLinkCommand,
  seeLinksCommand,
} from "./controllers/linkControllers";
import { scheduleCommand } from "./controllers/customControllers";
import axios from "axios";
const app = express();

app.post("/interactions", verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body as any;
  const studentRoleId = "1045624430686130216";
  
  if (!interaction.member?.roles.includes(studentRoleId)) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: `You don't have permission to use this bot. Contact a moderator.` },
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name == "create-task") {
      return await createTaskCommand(interaction, res);
    }
    if (interaction.data.name == "see-tasks") {
      return await seeTaskCommand(interaction, res);
    }
    if (interaction.data.name == "delete-task") {
      return await deleteTaskCommand(interaction, res);
    }

    //Links
    if (interaction.data.name == "create-link") {
      return await createLinkCommand(interaction, res);
    }

    if (interaction.data.name == "delete-link") {
      return await deleteLinkCommand(interaction, res);
    }

    if (interaction.data.name == "see-links") {
      return await seeLinksCommand(interaction, res);
    }

    if (interaction.data.name == "schedule") {
      return await scheduleCommand(interaction, res);
    }
  }
});

app.get("/", async (req, res) => {
  //Uptime robot
  // You can remove this code, this is just for making sure the commands are up all the time
  if (process.env.DEPLOYMENT_URL) {
    axios.post(`${process.env.DEPLOYMENT_URL}/interactions`);
  }
  //Uptime robot

  return res.send("Hello World");
});

app.get("/rc", async (req, res) => {
  try {
    let discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
      slashCommands
    );
    console.log(discord_response.data);
    return res.send("commands have been registered");
  } catch (e: any) {
    console.log(e);
    return res.send(`${e.code} error from discord`);
  }
});

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MONGODB");
  app.listen(process.env.PORT || 8999, () => {
    console.log("Listening to port", process.env.PORT || 8999);
  });
});
