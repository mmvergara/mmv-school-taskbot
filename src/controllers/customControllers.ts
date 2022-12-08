import { InteractionResponseType } from "discord-interactions";

export const scheduleCommand = async (interaction: any, res: any) => {
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
};
