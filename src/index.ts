import express from "express";
import { discord_api } from "./api";
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from "discord-interactions";

import { APPLICATION_ID, GUILD_ID, MONGODB_URI, PUBLIC_KEY } from "./config";
import mongoose from "mongoose";
import taskModel from "./models/taskModel";
import { slashCommands } from "./commands/commands";
import linkModel from "./models/linkModel";
const app = express();

app.post("/interactions", verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body as any;
  console.log(`======================================================`);
  console.log({ interaction });
  console.log(`======================================================`);

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name == "delete-task") {
      const customTaskId = interaction.data.options[0].value;
      const task = await taskModel.findOneAndDelete({ taskCustomId: customTaskId });

      if (!task) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: `Task Id of ${customTaskId} does not exist` },
        });
      }

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `**${interaction.member.user.username} deleted a task** \n${task?.taskInfo} \n${task?.taskDescription}`,
        },
      });
    }

    if (interaction.data.name == "create-link") {
      const linkName = interaction.data.options[0].value;
      const linkUrl = interaction.data.options[1].value;
      const allLinks = await linkModel.find({});

      const newLink = new linkModel({
        linkName,
        linkUrl,
        linkCustomId: String(allLinks ? allLinks.length : 0),
      });
      await newLink.save();

      const embeds = [
        {
          title: `${interaction.member.user.username} created a new link`,
          fields: [
            {
              name: linkName,
              value: linkUrl,
            },
          ],
          color: 4321431,
        },
      ];

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { embeds },
      });
    }
    if (interaction.data.name == "delete-link") {
      const linkCustomId = interaction.data.options[0].value;
      const allLinks = await linkModel.findOneAndDelete({ linkCustomId });

      if (!allLinks) {
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: `Link Id of ${linkCustomId} does not exist` },
        });
      }

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `**${interaction.member.user.username} deleted a link** \n[${allLinks?.linkName}](${allLinks?.linkUrl})`,
        },
      });
    }

    if (interaction.data.name == "see-links") {
      const allLinks = await linkModel.find({});
      const fields = allLinks.map((x) => {
        return {
          name: `id: ${x.linkCustomId}`,
          value: `[${x.linkName}](${x.linkUrl})`,
        };
      });
      const embeds = [
        {
          title: "All Links",
          fields,
          color: 0x009191,
        },
      ];

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { embeds },
      });
    }

    if (interaction.data.name == "create-task") {
      const taskInfo = interaction.data.options[0].value;
      const taskDescription = interaction.data.options[1].value;
      const taskDeadline = interaction.data.options[2].value;
      const totalTask = (await taskModel.find({})).length;

      const newTask = new taskModel({
        taskDescription,
        taskInfo,
        taskDeadline,
        taskCustomId: String(totalTask + 1),
      });
      await newTask.save();

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `**${interaction.member.user.username} created a new task** \n${taskInfo} \n${taskDescription}\nuntil: ${taskDeadline}`,
        },
      });
    }

    if (interaction.data.name == "see-tasks") {
      const allTasks = await taskModel.find({});
      const fields = allTasks.map((x) => {
        return {
          name: `\u200B \n${x.taskInfo} - id { ${x.taskCustomId} }`,
          value: `${x.taskDescription} \n ${x.taskDeadline ? `until: ${x.taskDeadline}` : ""}`,
        };
      });
      const embeds = [
        {
          title: "All Tasks",
          description: `${
            !allTasks || allTasks.length === 0 ? "No ongoing Task" : "Goodluck sanyo!"
          }`,
          fields,
          color: 4321431,
        },
      ];

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { embeds },
      });
    }

    if (interaction.data.name == "schedule") {
      console.log(`Yo ${interaction.member.user.username}! useD SCHEDULE COMMAND`);
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
      if (dateToday == 0) dateToday = 7;
      const todayScheduleInfo = subjectOnDayX[dateToday - 1];
      const embeds = [
        {
          title: "Schedule of BSIT 2-A",
          description: `======**Today is ${todayScheduleInfo.name}**======\n ${todayScheduleInfo.value} \n ======**Today is ${todayScheduleInfo.name}**======\n \u200B \u200B`,
          url: "https://i.ibb.co/StGcn7B/schedule.jpg",
          image: {
            url: "https://i.ibb.co/StGcn7B/schedule.jpg",
          },
          // fields: [...subjectOnDayX.slice(0, 5)],
          color: 4321431,
        },
      ];

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { embeds },
      });
    }
  }
});

app.get("/", async (req, res) => {
  return res.send("Hello World");
});

app.get("/rc", async (req, res) => {
  try {
    // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
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
