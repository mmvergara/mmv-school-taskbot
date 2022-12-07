import express from "express";
import { discord_api } from "./api";
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from "discord-interactions";

import { APPLICATION_ID, GUILD_ID, MONGODB_URI, PUBLIC_KEY } from "./config";
import mongoose from "mongoose";
const app = express();

app.post("/interactions", verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body as any;
  console.log(`======================================================`);
  console.log({ interaction });
  console.log(`======================================================`);

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    if (interaction.data.name == "yo") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Yo ${interaction.member.user.username}!`,
        },
      });
    }
    if (interaction.data.name == "createtask") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Yo ${interaction.member.user.username}!`,
        },
      });
    }

    if ((interaction.data.name = "schedule")) {
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
          description: `======**Today is ${todayScheduleInfo.name}**======\n ${todayScheduleInfo.value} \n ======**${todayScheduleInfo.name}**======\n`,
          url: "https://i.ibb.co/StGcn7B/schedule.jpg",
          image: {
            url: "https://i.ibb.co/StGcn7B/schedule.jpg",
          },
          fields: [...subjectOnDayX.slice(0, 5)],
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

mongoose.connect(MONGODB_URI).then(() => {
  console.log("Connected to MONGODB");
  app.listen(process.env.PORT || 8999, () => {
    console.log("Listening to port", process.env.PORT || 8999);
  });
});
