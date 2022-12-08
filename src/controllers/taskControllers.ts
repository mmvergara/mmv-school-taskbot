import { InteractionResponseType } from "discord-interactions";
import taskModel from "../models/taskModel";

export const deleteTaskCommand = async (interaction:any,res:any) => {
  const taskName = interaction.data.options[0].value;
  const task = await taskModel.findOneAndDelete({ taskName });

  if (!task) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: `Task name of ${taskName} does not exist` },
    });
  }

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `**${interaction.member.user.username} deleted a task** \n${task?.taskName} \n${task?.taskDescription}`,
    },
  });
};
