import { InteractionResponseType } from "discord-interactions";
import taskModel from "../models/taskModel";

export const deleteTaskCommand = async (interaction: any, res: any) => {
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

export const createTaskCommand = async (interaction: any, res: any) => {
  const taskName = interaction.data.options[0].value;
  const taskDescription = interaction.data.options[1].value;
  const taskDeadline = interaction.data.options[2].value;
  const taskAlreadyExist = await taskModel.findOne({ taskName: taskName.trim() });

  if (taskAlreadyExist) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: `task ${taskName} already exist!!! Try a new one` },
    });
  }

  const newTask = new taskModel({
    taskDescription,
    taskName: taskName.trim(),
    taskDeadline: taskDeadline,
  });
  await newTask.save();

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `**${
        interaction.member.user.username
      } created a new task** \n${taskName} \n${taskDescription}\n${
        taskDeadline !== "null" ? `deadline: ${taskDeadline}` : ""
      }`,
    },
  });
};

export const seeTaskCommand = async (interaction: any, res: any) => {
  const allTasks = await taskModel.find({});
  const fields = allTasks.map((x) => {
    return {
      name: `\u200B \n${x.taskName}`,
      value: `${x.taskDescription} \n ${
        x.taskDeadline !== "null" ? `until: ${x.taskDeadline}` : ""
      }`,
    };
  });
  const embeds = [
    {
      title: "All Tasks",
      description: `${!allTasks || allTasks.length === 0 ? "No ongoing Task" : "Goodluck sanyo!"}`,
      fields,
      color: 4321431,
    },
  ];

  return res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { embeds },
  });
};
