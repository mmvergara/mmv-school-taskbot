import { InteractionResponseType } from "discord-interactions";
import linkModel from "../models/linkModel";

export const createLinkCommand = async (interaction: any, res: any) => {
  const linkName = interaction.data.options[0].value;
  const linkUrl = interaction.data.options[1].value;
  const linkAlreadyExists = await linkModel.findOne({ linkName: linkName.trim() });
  if (linkAlreadyExists) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: `Link name of ${linkName} already exist!!! Try a new one` },
    });
  }
  const newLink = new linkModel({
    linkName,
    linkUrl,
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
};

export const seeLinksCommand = async (interaction: any, res: any) => {
  const allLinks = await linkModel.find({});
  const fields = allLinks.map((x) => {
    return {
      name: `\u200B`,
      value: `[${x.linkName}](${x.linkUrl})`,
    };
  });
  const embeds = [
    {
      title: "All Links",
      fields,
      description: `${allLinks.length === 0 ? "Found no links" : ""}`,
      color: 0x009191,
    },
  ];

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { embeds },
  });
};

export const deleteLinkCommand = async (interaction: any, res: any) => {
  const linkName = interaction.data.options[0].value;
  const allLinks = await linkModel.findOneAndDelete({ linkName: linkName.trim() });

  if (!allLinks) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: `Link ${linkName} does not exist` },
    });
  }

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `**${interaction.member.user.username} deleted a link** \n[${allLinks?.linkName}](${allLinks?.linkUrl})`,
    },
  });
};
